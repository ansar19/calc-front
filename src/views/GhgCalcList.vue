<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Список</span>
        <h3 class="page-title">Источники парниковых газов</h3>
      </div>
    </div>
    <!-- Default Table -->
    <div v-if="!loading" class="row">
      <div class="col">
        <d-card class="card-small overflow-hidden mb-4 meta">
          <d-card-header>
            <div class="block-handle mt-2" align="right">
              <router-link to="ghg-calc-example">
                <d-button size="sm" class="ml-2" text="Добавить">+ расчет</d-button>
              </router-link>
            </div>
          </d-card-header>
          <d-card-body>
            <table class="meta-table">
              <thead>
                <tr>
                  <th>Источник выделения</th>
                  <th>Объем выбросов CO2 (оксид углерода), тонн</th>
                  <th>Объем выбросов N2O (закись азота), тонн </th>
                  <th>Объем выбросов CH4 (метан), тонн</th>
                  <th>Объем выбросов ПГ в CO2 эквив., тонн </th>
                </tr>
              </thead>
              <tr v-for="item in releaseSources" :key="item.id">
                <td data-label="Источник выделения:">{{ item.releaseSourceName }}</td>
                <td data-label="Объем выбросов CO2 (оксид углерода), тонн:">{{ item.co2emission }}</td>
                <td data-label="Объем выбросов N2O (закись азота), тонн:">{{ item.no2emission }}</td>
                <td data-label="Объем выбросов CH4 (метан), тонн:">{{ item.ch4emission }}</td>
                <td data-label="Объем выбросов ПГ в CO2 эквив., тонн:">{{ item.co2equivemission }}</td>
              </tr>
            </table>
          </d-card-body>
        </d-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      releaseSources: [],
    };
  },
  created() {
    api.getResource('releaseSourcesGhgCalc')
      .then((res) => {
        this.releaseSources = res;
      });
  },
};
</script>
