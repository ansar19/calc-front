<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Общий отчет</span>
        <h3 class="page-title">Сводная таблица</h3>
      </div>
    </div>
    <!-- Default Table -->
    <div class="row">
      <div class="col">
        <d-card class="card-small mb-3">
          <d-card-header class="border-bottom">
            <div class="block-handle" align="right">
              <d-button size="sm" class="btn-info btn-sm ml-2" v-d-tooltip.hover="'Выгрузить Excel'">
                <download-excel :data="asyncData" title="Загрузка сводной таблицы" :exportFields="json_fields"
                  name="pivotdata.xls">
                  <font-awesome-icon icon="download" />
                </download-excel>
              </d-button>
              <d-button size="sm" @click="printData" v-d-tooltip.hover="'Распечатать данные'"
                class="btn-info btn-sm ml-2">
                <font-awesome-icon icon="print" />
              </d-button>
            </div>
          </d-card-header>
          <d-card-body>
            <div class="mb-5 meta-table">
              <div class="table" ref="printTable">
                <pivot :data="data" :fields="fields" :row-fields="rowFields" :col-fields="colFields"
                  available-fields-label-text="Доступные поля" rows-label-text="Строки" cols-label-text="Колонки"
                  hide-settings-text="Скрыть настройки" show-settings-text="Показать настройки"
                  no-data-warning-text="Нет данных для отображения" :reducer="reducer"
                  :default-show-settings="defaultShowSettings" id="printMe">
                  <template slot="value" slot-scope="{ value }">
                    {{ value.toLocaleString() }}
                  </template>
                </pivot>
              </div>
            </div>

            <!-- <h4 class="border-bottom pb-2 mb-4">PivotTable <small>(standalone)</small></h4>
            <div class="mb-5 meta-table">
              <pivot-table :data="asyncData" :fields="fields" :row-fields="rowFields" :col-fields="colFields"
                available-fields-label-text="Доступные поля" rows-label-text="Строки" cols-label-text="Колонки"
                hide-settings-text="Скрыть настройки" show-settings-text="Показать настройки"
                no-data-warning-text="Нет данных для отображения" :reducer="reducer"
                :default-show-settings="defaultShowSettings" :is-data-loading="isDataLoading">
                <template slot="value" slot-scope="{ value }">
                  {{ value.toLocaleString() }}
                </template>
                <template slot="loading">
                  <div class="text-center">
                    Загружается...
                  </div>
                </template>
              </pivot-table>
            </div> -->

          </d-card-body>
        </d-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-duplicates */
/* eslint-disable no-var */
/* eslint-disable no-undef */
// Import the needed Pivot component(s)
import Pivot from '@marketconnect/vue-pivot-table';
import PivotTable from '@marketconnect/vue-pivot-table';

export default {
  components: {
    Pivot,
    PivotTable,
  },
  data() {
    return {
      data: [{
        workSiteName: 'Завод металлоизделий',
        facilityName: 'Сварочный',
        facilityLocationName: 'Крупноузловой сварки',
        year: 2016,
        emissionSourceType: 'организованные',
        emissionsTon: 153295220,
      },
      {
        workSiteName: 'Завод металлоизделий',
        facilityName: 'Сварочный',
        facilityLocationName: 'Крупноузловой сварки',
        year: 2016,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 156588400,
      },
      {
        workSiteName: 'Завод металлоизделий',
        facilityName: 'Сварочный',
        facilityLocationName: 'Крупноузловой сварки',
        year: 2017,
        emissionSourceType: 'организованные',
        emissionsTon: 154591960,
      },
      {
        workSiteName: 'Завод металлоизделий',
        facilityName: 'Сварочный',
        facilityLocationName: 'Крупноузловой сварки',
        year: 2017,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 157800200,
      },
      {
        workSiteName: 'Завод металлоизделий',
        facilityName: 'Сварочный',
        facilityLocationName: 'Крупноузловой сварки',
        year: 2018,
        emissionSourceType: 'организованные',
        emissionsTon: 155851840,
      },
      {
        workSiteName: 'Завод металлоизделий',
        facilityName: 'Сварочный',
        facilityLocationName: 'Крупноузловой сварки',
        year: 2018,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 158944800,
      },
      {
        workSiteName: 'Месторождение Акжаркын',
        facilityName: 'Скважина 15',
        facilityLocationName: 'Участок отгрузки',
        year: 2016,
        emissionSourceType: 'организованные',
        emissionsTon: 690256342,
      },
      {
        workSiteName: 'Месторождение Акжаркын',
        facilityName: 'Скважина 15',
        facilityLocationName: 'Участок отгрузки',
        year: 2016,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 650712406,
      },
      {
        workSiteName: 'Месторождение Акжаркын',
        facilityName: 'Скважина 15',
        facilityLocationName: 'Участок отгрузки',
        year: 2017,
        emissionSourceType: 'организованные',
        emissionsTon: 694106441,
      },
      {
        workSiteName: 'Месторождение Акжаркын',
        facilityName: 'Скважина 15',
        facilityLocationName: 'Участок отгрузки',
        year: 2017,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 654068030,
      },
      {
        workSiteName: 'Месторождение Акжаркын',
        facilityName: 'Скважина 15',
        facilityLocationName: 'Участок отгрузки',
        year: 2018,
        emissionSourceType: 'организованные',
        emissionsTon: 697964288,
      },
      {
        workSiteName: 'Месторождение Акжаркын',
        facilityName: 'Скважина 15',
        facilityLocationName: 'Участок отгрузки',
        year: 2018,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 657422649,
      },
      {
        workSiteName: 'БСУ - 1',
        facilityName: 'Генераторная',
        facilityLocationName: 'Участок электроснабжения',
        year: 2016,
        emissionSourceType: 'организованные',
        emissionsTon: 638354751,
      },
      {
        workSiteName: 'БСУ - 1',
        facilityName: 'Генераторная',
        facilityLocationName: 'Участок электроснабжения',
        year: 2016,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 592629727,
      },
      {
        workSiteName: 'БСУ - 1',
        facilityName: 'Генераторная',
        facilityLocationName: 'Участок электроснабжения',
        year: 2017,
        emissionSourceType: 'организованные',
        emissionsTon: 646873890,
      },
      {
        workSiteName: 'БСУ - 1',
        facilityName: 'Генераторная',
        facilityLocationName: 'Участок электроснабжения',
        year: 2017,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 600572093,
      },
      {
        workSiteName: 'БСУ - 1',
        facilityName: 'Генераторная',
        facilityLocationName: 'Участок электроснабжения',
        year: 2018,
        emissionSourceType: 'организованные',
        emissionsTon: 655193693,
      },
      {
        workSiteName: 'БСУ - 1',
        facilityName: 'Генераторная',
        facilityLocationName: 'Участок электроснабжения',
        year: 2018,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 608395922,
      },
      {
        workSiteName: 'ГОК Васильевский',
        facilityName: 'Фабрика',
        facilityLocationName: 'Участок дробления',
        year: 2016,
        emissionSourceType: 'организованные',
        emissionsTon: 30675773,
      },
      {
        workSiteName: 'ГОК Васильевский',
        facilityName: 'Фабрика',
        facilityLocationName: 'Участок дробления',
        year: 2016,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 32285363,
      },
      {
        workSiteName: 'ГОК Васильевский',
        facilityName: 'Фабрика',
        facilityLocationName: 'Участок дробления',
        year: 2017,
        emissionSourceType: 'организованные',
        emissionsTon: 30815839,
      },
      {
        workSiteName: 'ГОК Васильевский',
        facilityName: 'Фабрика',
        facilityLocationName: 'Участок дробления',
        year: 2017,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 32452566,
      },
      {
        workSiteName: 'ГОК Васильевский',
        facilityName: 'Фабрика',
        facilityLocationName: 'Участок дробления',
        year: 2018,
        emissionSourceType: 'организованные',
        emissionsTon: 30948916,
      },
      {
        workSiteName: 'ГОК Васильевский',
        facilityName: 'Фабрика',
        facilityLocationName: 'Участок дробления',
        year: 2018,
        emissionSourceType: 'неорганизованные',
        emissionsTon: 32612882,
      },
      ],
      asyncData: [],
      fields: [{
        getter: item => item.emissionSourceType,
        label: 'Тип источника',
      }, {
        getter: item => item.facilityName,
        label: 'Цех, объект',
      },
      {
        getter: item => item.facilityLocationName,
        label: 'Участок',
      }],
      rowFields: [{
        getter: item => item.workSiteName,
        label: 'Промплощадка',
      }],
      colFields: [{
        getter: item => item.year,
        label: 'Год',
      }],
      reducer: (sum, item) => sum + item.emissionsTon,
      defaultShowSettings: true,
      shoHeader: true,
      showFooter: true,
      footerSlotName: 'dssd',
      isDataLoading: false,
      // this part related to excel export
      json_fields: {
        'Наименование промплощадки': 'workSiteName',
        'Тип источника': 'emissionSourceType',
        Год: 'year',
        'Цех, объект': 'facilityName',
        Участок: 'facilityLocationName',
        Значения: 'emissionsTon',
      },
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
    };
  },
  // code sample for csv (assuming your pivot table component has the id pivotTable):
  // import XLSX from 'xlsx'
  // const wb = XLSX.utils.table_to_book(document.querySelector('#pivotTable table'))
  // XLSX.writeFile(wb, 'out.csv')
  created() {
    this.isDataLoading = true;
    setTimeout(() => {
      this.asyncData = this.data;
      this.isDataLoading = false;
    }, 3000);
  },
  methods: {
    printData() {
      let newWindow;
      const divToPrint = this.$refs.printTable;
      // eslint-disable-next-line prefer-const
      newWindow = window.open('');
      newWindow.document.write(divToPrint.innerHTML);
      newWindow.print();
      newWindow.close();
    },
  },
};
</script>
