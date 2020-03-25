<template>
  <d-card class="card-small mb-3" id="calcResult">
    <d-card-header class="border-bottom">
      <h6 class="card-title">Методика расчета выбросов</h6>
    </d-card-header>
    <d-card-body>
      <d-form>
        <div class="form-group">
          <label class="form-label">Выбрать источник выделения:</label>
          <v-select class="mb-2" :options="releaseSources" label="releaseSourceName" v-model="selectedReleaseSource"/>
          <label class="form-label">Выберите тип оборудования:</label>
          <d-form-select v-model="selected" :options="options" :label="selected.name">
            <option v-for="(powergenerator, index) in powergenerators" :key="index"
              v-bind:value="powergenerator.pollutantvalues">
              {{ powergenerator.dictname }}
            </option>
          </d-form-select>
        </div>
        <div class="form-group">
          <label class="form-label">Расход топлива, т/период:</label>
          <d-input v-model.number="input.fuelConsumption" type="number" class="mb-2" />
        </div>
        <div class="form-group" v-show="false">
          <label class="form-label">Эксплуатационная мощность стационарной дизельной установки, кВт:</label>
          <d-input type="number" class="form-control" v-model.number="power" name='power' />
        </div>
        <div class="mb-2" v-show="true">
          <label>Таблица выбранных значений ЗВ</label>
          <table class="meta-table">
            <thead>
              <tr>
                <th>Код ЗВ</th>
                <th>Наименование ЗВ </th>
                <th>Коээфициент, г/сек</th>
                <th>Коээфициент, т/год </th>
              </tr>
            </thead>
            <tr v-for="(selected, index) in selected" :key="index">
              <td data-label="Код ЗВ:">
                {{ selected.code }}
              </td>
              <td data-label="Наименование ЗВ:">
                {{ selected.name }}
              </td>
              <td data-label="Коээфициент, г/сек:">
                {{ selected.gseccoef }}
              </td>
              <td data-label="Коээфициент, т/год:">
                {{ selected.tyearcoef }}
              </td>
            </tr>
          </table>
        </div>
        <div class="mb-2">
        <label>Результат расчета</label>
        <table class="meta-table">
          <thead>
            <tr>
              <th>Код ЗВ</th>
              <th>Наименование ЗВ </th>
              <th>Выбросы, г/сек</th>
              <th>Выбросы, т/год </th>
            </tr>
          </thead>
          <tr v-for="item in calcSelected" :key="item.code">
            <td data-label="Код ЗВ:">{{ item.code }}</td>
            <td data-label="Наименование ЗВ:">{{ item.name }}</td>
            <td data-label="Выбросы, г/сек:">{{ item.gseccoef  }}</td>
            <td data-label="Выбросы, т/год:">{{ item.tyearcoef }}</td>
          </tr>
        </table>
        </div>
      </d-form>
    </d-card-body>
    <d-card-footer class="border-top">
      <div class="d-flex">
        <d-button outline theme="light" @click="goBack">Отменить</d-button>
        <d-button class="btn btn-success ml-auto" @click="save">Сохранить</d-button>
      </div>
    </d-card-footer>
  </d-card>
</template>

<script>
/* eslint-disable */
import {
  powerGenerators,
  stitchedMultiplier,
  maxArea
} from '@/components/new-calc-example/constants.js';
import api from '@/services/api'

import CalcResult from '@/components/new-calc-example/CalcResult.vue'

export default {
  components: {
    'calc-result': CalcResult,
  },

  data() {
    return {
      releaseSources: [],
      selectedReleaseSource: {},
      selected: [],
      options: [],
      input: {
        fuelConsumption: 0,
      },
      power: 73,
      boxes: Number,
      powergenerators: powerGenerators,
    }
  },
  watch: {
  
    boxes(value) {
      this.$emit('boxes-changed', value);
    }
  },

  methods: {

    save() {
      if (this.selected) {
        api.postResource('releaseSourcesDieselCalc', {
          releaseSourceId: this.selectedReleaseSource.id,
          releaseSourceName: this.selectedReleaseSource.releaseSourceName,
          fuelConsumption: this.input.fuelConsumption,
          releasesTable: this.calcSelected,
        });
        this.goBack();
      } else {
        console.log('select source type')
      }
    },

    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
  
    calcSelected() {
      const some = this.selected.map(el => {
        return {
          ...el,
          gseccoef: el.gseccoef * this.power / 3600,
          tyearcoef: el.tyearcoef * this.input.fuelConsumption / 1000
        };
      });
      return some;
    },
  },

  created() {
    api.getResource('releaseSources')
      .then(res => {
        this.releaseSources = res;
      });
  },
}
</script>
