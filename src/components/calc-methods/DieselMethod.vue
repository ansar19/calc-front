<template>
  <d-form>
    <div class="form-group">
      <label class="form-label">Выберите тип оборудования:</label>
      <d-form-select v-model="pwrGenerator" :options="options" :label="pwrGenerator.name">
        <option
          v-for="(powergenerator, index) in powergenerators"
          :key="index"
          v-bind:value="powergenerator.pollutantvalues"
        >{{ powergenerator.dictname }}</option>
      </d-form-select>
    </div>
    <div class="form-group">
      <label class="form-label">Расход топлива, т/период:</label>
      <d-input v-model.number="input.fuelConsumption" type="number" class="mb-2" />
    </div>
    <div class="form-group">
      <label class="form-label">Эксплуатационная мощность стационарной дизельной установки, кВт:</label>
      <d-input type="number" class="form-control" v-model.number="power" name="power" />
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
  powerGenerators,
  stitchedMultiplier,
  maxArea
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
        fuelConsumption: 0
      },
      power: 73,
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
          const gseccoef = (el.gseccoef * this.power) / 3600;
          const tyearcoef = (el.tyearcoef * this.input.fuelConsumption) / 1000;
          gsecTotal += gseccoef;
          tyearTotal += tyearcoef;
          return {
            ...el,
            gseccoef: gseccoef.toFixed(7),
            tyearcoef: tyearcoef.toFixed(7),
          };
        });
        pollutants = [...calcs];
        this.calculated = {...calcs, gsecTotal: gsecTotal.toFixed(7), tyearTotal: tyearTotal.toFixed(7) };
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
