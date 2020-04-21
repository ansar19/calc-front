<template>
  <d-form>
    <h5>{{calcMethodName}}</h5>
    <div class="form-group">
      <label class="form-label">Выберите тип оборудования:</label>
      <d-form-select v-model="pwrGenerator" :options="options" :label="label">
        <option
          v-for="(powergenerator, index) in powergenerators"
          :key="index"
          v-bind:value="powergenerator.pollutantvalues"
        >{{ powergenerator.label }}</option>
      </d-form-select>
    </div>
    <div class="form-group">
      <label for="specific-fuel-consumption">Удельный расход топлива г/кВт*ч</label>
      <input
        id="specific-fuel-consumption"
        v-model.number="input.specificFuelConsumption"
        name="total-amount-of-pumps"
        type="text"
        class="form-control"
        aria-describedby="specific-fuel-consumptionHelpBlock"
      />
      <small
        id="specific-fuel-consumptionHelpBlock"
        class="form-text text-muted"
      >берется из паспортных данных на установку</small>
    </div>
    <div class="form-group">
      <label class="form-label">Расход топлива, т/период:</label>
      <d-input
        v-model.number="input.fuelConsumption"
        type="number"
        class="mb-2"
        aria-describedby="fuel-consumptionHelpBlock"
      />
      <small
        id="fuel-consumptionHelpBlock"
        class="form-text text-muted"
      >берется по отчетным данным об эксплуатации установки</small>
    </div>
    <div class="form-group">
      <label class="form-label">Эксплуатационная мощность стационарной дизельной установки, кВт:</label>
      <d-input
        type="number"
        class="form-control"
        v-model.number="input.generatorPower"
        name="generator-power"
        aria-describedby="generator-powerHelpBlock"
      />
      <small
        id="generator-powerHelpBlock"
        class="form-text text-muted"
      >эксплуатационная мощность, если в документации не указывается то принимается значение номинальной мощности</small>
    </div>
    <div v-if="pwrGenerator.length" class="mb-2">
      <label>Таблица выбранных значений ЗВ</label>
      <table class="meta-table mb-3">
        <thead>
          <tr>
            <th>Код ЗВ</th>
            <th>Наименование ЗВ</th>
            <th>Коээфициент, г/сек</th>
            <th>Коээфициент, т/год</th>
          </tr>
        </thead>
        <tr v-for="(selected, index) in pwrGenerator" :key="index">
          <td data-label="Код ЗВ:">{{ selected.code }}</td>
          <td data-label="Наименование ЗВ:">{{ selected.name }}</td>
          <td data-label="Коээфициент, г/сек:">{{ selected.gseccoef }}</td>
          <td data-label="Коээфициент, т/год:">{{ selected.tyearcoef }}</td>
        </tr>
      </table>
      <d-button class="btn btn-primary" @click.prevent="calculate">Расчитать</d-button>
    </div>
    <div v-if="resultView" class="mb-2">
      <label>Результат расчета</label>
      <table class="meta-table">
        <thead>
          <tr>
            <th>Код ЗВ</th>
            <th>Наименование ЗВ</th>
            <th>Выбросы, г/сек</th>
            <th>Выбросы, т/год</th>
          </tr>
        </thead>
        <tr v-for="item in calculated" :key="item.code">
          <td data-label="Код ЗВ:">{{ item.code }}</td>
          <td data-label="Наименование ЗВ:">{{ item.name }}</td>
          <td data-label="Выбросы, г/сек:">{{ item.gseccoef }}</td>
          <td data-label="Выбросы, т/год:">{{ item.tyearcoef }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>{{ calculated.gsecTotal }}</td>
          <td>{{ calculated.tyearTotal }}</td>
        </tr>
      </table>
      <div title=".docx">
        <button class="btn btn-primary m-2" @click.prevent="exportWord">
          <span class="material-icons">cloud_download</span>
        </button>
      </div>
    </div>
  </d-form>
</template>

<script>
/* eslint-disable */
import { powerGenerators } from "@/components/new-calc-example/constants.js";
import { mapMutations } from "vuex";

import JSZip from "jszip";
import { saveAs } from "file-saver";

// import Docxtemplater from "@/components/docxtemplater/Docxtemplater.vue";

export default {
  data() {
    return {
      calcMethodName: "Методика расчета выбросов загрязняющих веществ в атмосферу от стационарных дизельных установок РНД 211.2.02.04-2004",
      resultView: false,
      calculated: null,
      pwrGenerator: [],
      options: [],
      input: {
        fuelConsumption: 117.936, // Bгод - 	расход топлива стационарной дизельной установкой за год, т. (берется по отчетным данным об эксплуатации установки);
        generatorPower: 100, // Рэ - 	эксплуатационная мощность стационарной дизельной установки, кВт.
        specificFuelConsumption: 260 // Удельный расход топлива г/кВт*ч
      },
      powergenerators: powerGenerators
    };
  },

  methods: {
    ...mapMutations("calcStore", [
      "setGsecTotal",
      "setTyearTotal",
      "setPollutants"
    ]),
    calculate() {
      let gsecTotal = 0;
      let tyearTotal = 0;
      let pollutants;
      try {
        const calcs = this.pwrGenerator.map(el => {
          const gseccoef = (1 / 3600) * el.gseccoef * this.input.generatorPower;
          const tyearcoef = (el.tyearcoef * this.input.fuelConsumption) / 1000;
          gsecTotal += gseccoef;
          tyearTotal += tyearcoef;
          return {
            ...el,
            gseccoef: gseccoef.toFixed(8),
            tyearcoef: tyearcoef.toFixed(6)
          };
        });
        pollutants = [...calcs];
        this.calculated = {
          ...calcs,
          gsecTotal: gsecTotal.toFixed(8),
          tyearTotal: tyearTotal.toFixed(6)
        };
      } finally {
        this.resultView = true;
        this.setGsecTotal(gsecTotal);
        this.setTyearTotal(tyearTotal);
        this.setPollutants(pollutants);
      }
    },
    // Click export word
    exportWord() {
      let _this = this;
      // Read and get the binary content of the template file
      // Note: The
      // template file is recommended to be placed under the static directory file.
      // When using vue-cli2, put it in the static directory. When using vue-cli3, put it in the public directory.
      // Because when I use it, I put it in the same directory of the .vue file, and I can't read the template.

      JSZipUtils.getBinaryContent("./templates/reports/diesel.docx", function(
        error,
        content
      ) {
        // input.docx Is a template. When we export, we will export the corresponding data according to this template
        // Throw an exception
        if (error) {
          throw error;
        }

        // Create a JSZip instance with the content of the template
        let zip = new JSZip(content);
        // Create and load docxtemplater instance object
        let doc = new window.docxtemplater().loadZip(zip);
        // Set the value of the template variable
        doc.setData({
          ..._this.input,
          calcMethodName: _this.calcMethodName,
          table: _this.pwrGenerator,
          calcRez: _this.calcRez // calculation result from store
        });

        try {
          // Replace all template variables with the values of template variables
          doc.render();
        } catch (error) {
          // Throw an exception
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          console.log(JSON.stringify({ error: e }));
          throw error;
        }

        // Generate a zip file representing the docxtemplater object (not a real file, but a representation in memory)
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // Save the target file object as a file of the target type and name it
        saveAs(out, "Quotation.docx");
      });
    }
  },
  computed: {
    // calculation results taken from store for exporting to docx file
    calcRez() {
      return this.$store.state.calcStore.pollutants;
    }
  },
  components: {
    // Docxtemplater
  }
};
</script>
