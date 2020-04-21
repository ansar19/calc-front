<template>
  <div id="app">
    <div class="container mt-4">
      <h5>{{calcMethodName}}</h5>
      <form class="mb-3">
        <div class="form-group">
          <label for="specificNOx">
            Удельное выделение i-того загрязняющего вещества при взрыве 1 тонны j-того взрывчатого
            вещества - NOx
          </label>
          <select id="specificNOx" v-model.number="specificNOx" class="custom-select">
            <option value="0.0011">Эмульсионные взрывчатые вещества - Взорванная горная порода</option>
          </select>
        </div>

        <div class="form-group">
          <label for="dustPart">Удельное пылевыделение на 1м3 взорванной горной породы</label>
          <select id="dustPart" v-model.number="dustPart" class="custom-select">
            <option value="0.09">Эмульсионные взрывчатые вещества - Взорванная горная порода</option>
          </select>
        </div>

        <div class="form-group">
          <label for="specificNOx">
            Удельное выделение i-того загрязняющего вещества при взрыве 1 тонны j-того взрывчатого
            вещества - CO
          </label>
          <select id="specificCO" v-model.number="specificCO" class="custom-select">
            <option value="0.004">Эмульсионные взрывчатые вещества - Взорванная горная порода</option>
          </select>
        </div>

        <div class="form-group">
          <label for="blastedmaterial">Количество взорванного j-того взрывчатого вещества, т/год</label>
          <input
            id="blastedmaterial"
            v-model.number="blastedmaterial"
            type="text"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="gasSupression">Эффективность применяемых при взрыве средств газоподавления</label>
          <select id="gasSupression" v-model="gasSupression" class="custom-select">
            <option value="0.35">Гидрозабойка скважин 0.35</option>
            <option value="0.36">Гидрозабойка скважин 0.36</option>
            <option value="0.37">Гидрозабойка скважин 0.37</option>
            <option value="0.38">Гидрозабойка скважин 0.38</option>
            <option value="0.39">Гидрозабойка скважин 0.39</option>
            <option value="0.40">Гидрозабойка скважин 0.40</option>
            <option value="0.41">Гидрозабойка скважин 0.41</option>
            <option value="0.42">Гидрозабойка скважин 0.42</option>
            <option value="0.43">Гидрозабойка скважин 0.43</option>
            <option value="0.44">Гидрозабойка скважин 0.44</option>
            <option value="0.45">Гидрозабойка скважин 0.46</option>
            <option value="0.47">Гидрозабойка скважин 0.48</option>
            <option value="0.49">Гидрозабойка скважин 0.49</option>
            <option value="0.50">Гидрозабойка скважин 0.50</option>
          </select>
          <span id="gasSuppressionHelpBlock" class="form-text text-muted">
            *При применении гидрозабойки эффективность
            подавление оксидов азота составляет =0.35-0.5
          </span>
        </div>

        <div class="form-group">
          <label
            for="noPart"
          >Удельное выделение i-того загрязняющего вещества из взорванной горной породы - NOx</label>
          <select id="noPart" v-model.number="noPart" class="custom-select">
            <option value="0.0006">0.0006</option>
          </select>
        </div>

        <div class="form-group">
          <label
            for="coPart"
          >Удельное выделение i-того загрязняющего вещества из взорванной горной породы - CO</label>
          <div>
            <select id="coPart" v-model.number="coPart" class="custom-select">
              <option value="0.002">Эмульсионные взрывчатые вещества - Взорванная горная порода</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="blastedRock">Объем взорванной горной породы, м3/год</label>
          <input id="blastedRock" v-model.number="blastedRock" type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label for="dustSupression">Эффективность применяемых при взрыве средств пылеподавления</label>
          <select id="dustSupression" v-model="dustSupression" class="custom-select">
            <option value="0.55">Гидрозабойка скважин 0.55</option>
            <option value="0.56">Гидрозабойка скважин 0.56</option>
            <option value="0.57">Гидрозабойка скважин 0.57</option>
            <option value="0.58">Гидрозабойка скважин 0.58</option>
            <option value="0.59">Гидрозабойка скважин 0.59</option>
            <option value="0.6">Гидрозабойка скважин 0.6</option>
          </select>
        </div>

        <div class="form-group">
          <label
            for="sigleBlastQty"
          >Количество взорванного взрывчатого вещества за один массовый взрыв, т/взрыв</label>
          <input
            id="sigleBlastQty"
            v-model.number="singleBlastQty"
            type="text"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label
            for="sigleBlastRock"
          >Максимальный объем взорванной горной породы за один массовый взрыв, м3/взрыв</label>
          <input
            id="sigleBlastRock"
            v-model.number="sigleBlastRock"
            type="text"
            class="form-control"
          />
        </div>

        <div @click.prevent="calculate" class="control">
          <button class="btn btn-primary">Рассчитать</button>
        </div>
      </form>

      <div class="table-responsive" v-if="seen">
        <table class="table meta-table table-sm table-stripped table-bordered table-hover">
          <tr>
            <th>Код ЗВ</th>
            <th>Наименование ЗВ</th>
            <th>Выбросы, г/сек</th>
            <th>Выбросы, т/год</th>
          </tr>
          <tr>
            <td data-label="Код ЗВ">0301</td>
            <td data-label="Наименование ЗВ">Азота диоксид (Азот (IV) оксид)</td>
            <td data-label="Выбросы, г/сек">{{ g0301 }}</td>
            <td data-label="Выбросы, т/год">{{ m0301 }}</td>
          </tr>
          <tr>
            <td data-label="Код ЗВ">0304</td>
            <td data-label="Наименование ЗВ">Азот (II) оксид (Азота оксид)</td>
            <td data-label="Выбросы, г/сек">{{ g0304 }}</td>
            <td data-label="Выбросы, т/год">{{ m0304 }}</td>
          </tr>
          <tr>
            <td data-label="Код ЗВ">0337</td>
            <td data-label="Наименование ЗВ">Углерод оксид</td>
            <td data-label="Выбросы, г/сек">{{ g0337 }}</td>
            <td data-label="Выбросы, т/год">{{ m0337 }}</td>
          </tr>
          <tr>
            <td data-label="Код ЗВ">2909</td>
            <td data-label="Наименование ЗВ">Пыль неорганическая: до 20% SiO2</td>
            <td data-label="Выбросы, г/сек">{{ g2909 }}</td>
            <td data-label="Выбросы, т/год">{{ m2909 }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td data-label="Выбросы, г/сек">{{ gsecTotal }}</td>
            <td data-label="Выбросы, т/год">{{ tyearTotal }}</td>
          </tr>
        </table>
        <div title=".docx">
          <button class="btn btn-sm btn-primary mt-2" @click.prevent="exportWord">
            <span class="material-icons">cloud_download</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
/* eslint-disable */

import JSZip from "jszip";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      seen: false,
      calcMethodName:
        "Методика расчета выбросов загрязняющих веществ в атмосферу от предприятий по производству строительных материалов, Приложение № 11 к Приказу Министра ООС РК от 18.04.2008 года № 100-п",
      specificNOx: "0.0011", // Удельное выделение i-того загрязняющего вещества при взрыве 1 тонны j-того взрывчатого вещества - NOX
      specificCO: "0.004", // Удельное выделение i-того загрязняющего вещества при взрыве 1 тонны j-того взрывчатого вещества - CO
      blastedmaterial: "9288.00", // Количество взорванного j-того взрывчатого вещества, т/год
      gasSupression: "0.50", // Эффективность применяемых при взрыве средств газоподавления
      noPart: "0.0006", // Удельное выделение i-того загрязняющего вещества из взорванной горной породы -NO
      coPart: "0.002", // Удельное выделение i-того загрязняющего вещества из взорванной горной породы - CO
      dustPart: "0.09", // Удельное пылевыделение на 1м3 взорванной горной породы
      blastedRock: "16937938", // Объем взорванной горной породы, м3/год
      dustSupression: "0.6", // Эффективность применяемых при взрыве средств пылеподавления
      singleBlastQty: "37.15", // Количество взорванного взрывчатого вещества за один массовый взрыв, т/взрыв
      sigleBlastRock: "67751.75", // Максимальный объем взорванной горной породы за один массовый взрыв, м3/взрыв
      outputTable: [],
      calc: {}
    };
  },
  computed: {
    g0301() {
      return (this.g0301 =
        ((this.specificNOx *
          this.singleBlastQty *
          (1 - this.gasSupression) *
          1000000) /
          1200) *
        0.8).toFixed(7);
    },
    m0301() {
      return (this.m0301 = (
        (this.specificNOx * this.blastedmaterial * (1 - this.gasSupression) +
          this.noPart * this.blastedmaterial) *
        0.8
      ).toFixed(7));
    },
    g0304() {
      return (this.g0304 =
        ((this.specificNOx *
          this.singleBlastQty *
          (1 - this.gasSupression) *
          1000000) /
          1200) *
        0.13).toFixed(7);
    },
    m0304() {
      return (this.m0304 =
        (this.specificNOx * this.blastedmaterial * (1 - this.gasSupression) +
          this.noPart * this.blastedmaterial) *
        0.13).toFixed(7);
    },
    g0337() {
      return (this.g0337 =
        (this.specificCO *
          this.singleBlastQty *
          (1 - this.gasSupression) *
          1000000) /
        1200).toFixed(7);
    },
    m0337() {
      return (this.m0337 =
        this.specificCO * this.blastedmaterial * (1 - this.gasSupression) +
        this.coPart * this.blastedmaterial).toFixed(7);
    },
    g2909() {
      return (this.g2909 =
        (0.16 *
          this.dustPart *
          this.sigleBlastRock *
          (1 - this.dustSupression) *
          1000) /
        1200).toFixed(7);
    },
    m2909() {
      return (this.m2909 =
        (0.16 * this.dustPart * this.blastedRock * (1 - this.dustSupression)) /
        1000).toFixed(7);
    },
    ...mapState("calcStore", ["gsecTotal", "tyearTotal"]),
    // calculation results taken from store for exporting to docx file
    calcRez() {
      return this.$store.state.calcStore.pollutants;
    }
  },
  methods: {
    ...mapMutations("calcStore", [
      "setGsecTotal",
      "setTyearTotal",
      "setPollutants"
    ]),
    calculate() {
      this.seen = true;
      this.setGsecTotal(this.gsecSubTotal());
      this.setTyearTotal(this.tyearSubTotal());
      this.setPollutants([
        {
          code: "0301",
          name: "Азота диоксид",
          gseccoef: this.g0301,
          tyearcoef: this.m0301
        },
        {
          code: "0304",
          name: "Азота оксид",
          gseccoef: this.g0304,
          tyearcoef: this.m0304
        },
        {
          code: "0337",
          name: "Углерода оксид",
          gseccoef: this.g0337,
          tyearcoef: this.m0337
        },
        {
          code: "2909",
          name: "Пыль неорганическая: до 20% SiO2",
          gseccoef: this.g2909,
          tyearcoef: this.m2909
        }
      ]);
    },
    gsecSubTotal() {
      return (
        Number(this.g0301) +
        Number(this.g0304) +
        Number(this.g0337) +
        Number(this.g2909)
      );
    },
    tyearSubTotal() {
      return (
        Number(this.m0301) +
        Number(this.m0304) +
        Number(this.m0337) +
        Number(this.m2909)
      ).toFixed(7);
    },
    // Click export word
    exportWord() {
      let _this = this;
      // Read and get the binary content of the template file
      // Note: The
      // template file is recommended to be placed under the static directory file.
      // When using vue-cli2, put it in the static directory. When using vue-cli3, put it in the public directory.
      // Because when I use it, I put it in the same directory of the .vue file, and I can't read the template.

      JSZipUtils.getBinaryContent("./templates/reports/blast.docx", function(
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
          specificNOx: _this.specificNOx,
          specificCO: _this.specificCO,
          blastedmaterial: _this.blastedmaterial,
          gasSupression: _this.gasSupression,
          noPart: _this.noPart,
          coPart: _this.coPart,
          dustPart: _this.dustPart,
          blastedRock: _this.blastedRock,
          dustSupression: _this.dustSupression,
          singleBlastQty: _this.singleBlastQty,
          sigleBlastRock: _this.sigleBlastRock,
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
        saveAs(out, "blast.docx");
      });
    }
  }
};
</script>
