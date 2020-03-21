<template>
  <d-form>
    <h5>Методика расчета выбросов загрязняющих веществ в атмосферу от стационарных дизельных установок РНД 211.2.02.04-2004</h5>
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
      <input id="specific-fuel-consumption" v-model.number="specificFuelConsumption" name="total-amount-of-pumps" type="text" class="form-control" aria-describedby="specific-fuel-consumptionHelpBlock">
      <small id="specific-fuel-consumptionHelpBlock" class="form-text text-muted">берется из паспортных данных на установку</small>
    </div>
    <div class="form-group">
      <label class="form-label">Расход топлива, т/период:</label>
      <d-input v-model.number="input.fuelConsumption" type="number" class="mb-2" aria-describedby="fuel-consumptionHelpBlock" />
      <small id="fuel-consumptionHelpBlock" class="form-text text-muted">берется по отчетным данным об эксплуатации установки</small>
    </div>
    <div class="form-group">
      <label class="form-label">Эксплуатационная мощность стационарной дизельной установки, кВт:</label>
      <d-input type="number" class="form-control" v-model.number="generatorPower" name="generator-power" aria-describedby="generator-powerHelpBlock" />
      <small id="generator-powerHelpBlock" class="form-text text-muted">эксплуатационная мощность, если в документации не указывается то принимается значение номинальной мощности</small>
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
    </div>
  </d-form>
</template>

<script>
/* eslint-disable */
import {
  powerGenerators
} from "@/components/new-calc-example/constants.js";
import { mapMutations } from 'vuex';

export default {
 
  data() {
    return {
      resultView: false,
      calculated: null,
      pwrGenerator: [],
      options: [],
      input: {
        fuelConsumption: 117.936 // Bгод - 	расход топлива стационарной дизельной установкой за год, т. (берется по отчетным данным об эксплуатации установки);
      },
      generatorPower: 100, // Рэ - 	эксплуатационная мощность стационарной дизельной установки, кВт.
      specificFuelConsumption: 260, // Удельный расход топлива г/кВт*ч
      powergenerators: powerGenerators,
    };
  },

  methods: {
    ...mapMutations('calcStore', ['setGsecTotal', 'setTyearTotal', 'setPollutants']),
    calculate() {
      let gsecTotal = 0;
      let tyearTotal = 0;
      let pollutants;
      try {
        const calcs = this.pwrGenerator.map(el => {
          const gseccoef = ((1 / 3600) * el.gseccoef * this.generatorPower);
          const tyearcoef = (el.tyearcoef * this.input.fuelConsumption) / 1000;
          gsecTotal += gseccoef;
          tyearTotal += tyearcoef;
          return {
            ...el,
            gseccoef: gseccoef.toFixed(8),
            tyearcoef: tyearcoef.toFixed(6),
          };
        });
        pollutants = [...calcs];
        this.calculated = {...calcs, gsecTotal: gsecTotal.toFixed(8), tyearTotal: tyearTotal.toFixed(6) };
      } finally {
        this.resultView = true;
        this.setGsecTotal(gsecTotal);
        this.setTyearTotal(tyearTotal);
        this.setPollutants(pollutants);
      }
    },
  },
};
</script>
