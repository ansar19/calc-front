<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">XLS/CSV</span>
        <h3 class="page-title">Загрузка таблиц инвентаризации с XLS/CSV файлов в систему</h3>
      </div>
    </div>
    <!-- Default -->
    <d-card>
      <d-card-header>В импортируемом файле должны быть следущие колонки: Наименование
        промплощадки, Наименование Цеха объекта, Наименование участка, № источника и иные опциональные колонки
      </d-card-header>
      <d-card-body>
        <br>
        <xls-csv-parser :columns="columns" @on-validate="onValidate" :help="help" lang="en"></xls-csv-parser>
        <br><br>
        <div class="results" v-if="results">
          <h3>Результат:</h3>
          <pre>{{ JSON.stringify(results, null, 2) }}</pre>
        </div>
      </d-card-body>
      <d-card-footer>
      </d-card-footer>
    </d-card>
  </div>
</template>

<script>
import { XlsCsvParser } from 'vue-xls-csv-parser';

export default {
  components: {
    XlsCsvParser,
  },
  methods: {
    onValidate(results) {
      this.results = results;
    },
  },
  data() {
    return {
      columns: [
        { name: 'workSite', value: 'workSite' },
        { name: 'worksiteFacility', value: 'worksiteFacility' },
        { name: 'worksiteLocation', value: 'worksiteLocation' },
        { name: 'emissionSourceName', value: 'emissionSourceName' },
        { name: 'emissionSourceNumber', value: 'emissionSourceNumber' },
        { name: 'Other', value: 'other', isOptional: true },
      ],
      results: null,
      help: 'Необходимые колонки: workSite, worksiteFacility, worksiteLocation, emissionSourceName and emissionSourceNumber',
    };
  },
};
</script>
