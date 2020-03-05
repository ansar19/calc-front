<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Отчет</span>
        <h3 class="page-title">Выбросы по источникам</h3>
      </div>
    </div>
    <!-- Default Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-header class="border-bottom">
            <div class="block-handle" align="right">
              <d-button size="sm" class="btn-info btn-sm ml-2" v-d-tooltip.hover="'Выгрузить Excel'">
                <download-excel :data="company_emissions" title="Выбросы по источникам" :exportFields="json_fields" name="emissions.xls">
                  <font-awesome-icon icon="download"  />
              </download-excel>
              </d-button>
            </div>
          </d-card-header>
          <div class="card-body pb-3 text-center component-props">
            <!-- data table -->
            <div class="meta-table">
          <v-client-table class="dataTables_wrapper" :data="company_emissions" :columns="columns"
            :options="tableOptions">
            <!-- <div slot="child_row" slot-scope="props">
              <table class="meta-table" id="example-1">
                <thead>
                  <tr>
                    <th style="width:25%">
                      Адрес фактический
                    </th>
                    <th style="width:25%">
                      Адрес юридический
                    </th>
                    <th style="width:25%">
                      Банковские детали
                    </th>
                    <th style="width:25%">
                      ФИО первого руководителя
                    </th>
                  </tr>
                </thead>
                <tr>
                  <td data-label="Адрес фактический:">
                    {{props.row.address.actual.country}}, {{props.row.address.actual.address}}, {{props.row.address.actual.zip}}, {{props.row.address.actual.addressComments}}
                  </td>
                  <td data-label="Адрес юридический:">
                    {{props.row.address.legal.country}}, {{props.row.address.legal.address}}, {{props.row.address.legal.zip}}, {{props.row.address.legal.addressComments}}
                    </td>
                  <td data-label="Банковские детали:">
                    {{props.row.iban}} {{props.row.currency}} {{props.row.bank}}
                    </td>
                  <td data-label="Данные первого руководителя:">
                    {{props.row.chief_last_name}} {{props.row.chief_first_name}} {{props.row.chief_middle_name}}
                    <br>{{props.row.chief_position}}
                    <br>{{props.row.chief_phone}}
                    <br>{{props.row.chief_email}}
                    </td>
                </tr>
              </table>
            </div> -->

            <d-button-group slot="actions" slot-scope="props" size="small" class="d-flex justify-content-center">
              <d-button class="btn-white" @click="handleActionClick('confirmed', props.row)"
                v-d-tooltip.hover="'Войти в компанию'">
                <i class="material-icons">&#xE5CA;</i>
              </d-button>
              <router-link :to="{ name: 'show-company', params: { id: props.row.id }}">
                <d-button class="btn-white" v-d-tooltip.hover="'Посмотреть'">
                  <i class="material-icons">&#xe417;</i>
                </d-button>
              </router-link>

              <d-button class="btn-white" @click="updateCompany(props.row.id)" v-d-tooltip.hover="'Редактировать'">
                <i class="material-icons">&#xE254;</i>
              </d-button>

              <d-button class="btn-white" @click="deleteCompany(props.index)" v-d-tooltip.hover="'Удалить'">
                <i class="material-icons">&#xE872;</i>
              </d-button>
            </d-button-group>

            <span slot="status" slot-scope="props" :class="[getStatusClass(props.row.status)]">
              {{ props.row.status }}
            </span>

            <span slot="total" slot-scope="props" class="text-success">
              {{ props.row.total }}
            </span>
          </v-client-table>
        </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import '@/assets/scss/vue-tables.scss';

export default {
  components: {
    ClientTable,
  },
  data() {
    return {
      company_emissions: [
        {
          work_site: 'Завод металлоизделий',
          facility: 'Генерации тепла',
          facility_location: 'Производства тепла',
          emission_source: 'Котельная на газу №1',
          release_source: 'Котел марки КГ-12',
          polCode: 304,
          polName: 'Азот (II) оксид',
          gsecemissions: 0.038926919,
          tyearemissions: 0.012297985,
        },
        {
          work_site: 'Завод металлоизделий',
          facility: 'Генерации тепла',
          facility_location: 'Производства тепла',
          emission_source: 'Котельная на газу №1',
          release_source: 'Котел марки КГ-12',
          polCode: 301,
          polName: 'Азота (IV) диоксид',
          gsecemissions: 0.239550272,
          tyearemissions: 0.239550272,
        },
        {
          work_site: 'Завод металлоизделий',
          facility: 'Генерации тепла',
          facility_location: 'Производства тепла',
          emission_source: 'Котельная на газу №1',
          release_source: 'Котел марки КГ-12',
          polCode: 330,
          polName: 'Сера диоксид',
          gsecemissions: 0.012689922,
          tyearemissions: 0.004009063,
        },
        {
          work_site: 'Завод металлоизделий',
          facility: 'Генерации тепла',
          facility_location: 'Производства тепла',
          emission_source: 'Котельная на газу №1',
          release_source: 'Котел марки КГ-12',
          polCode: 337,
          polName: 'Углерода оксид',
          gsecemissions: 0.743390865,
          tyearemissions: 0.23485572,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Факел',
          release_source: 'Устьевой факел 2',
          polCode: 301,
          polName: 'Азота (IV) диоксид',
          gsecemissions: 0.1868,
          tyearemissions: 1.4606,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Факел',
          release_source: 'Устьевой факел 2',
          polCode: 328,
          polName: 'Углерод',
          gsecemissions: 0.1245,
          tyearemissions: 0.9738,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Факел',
          release_source: 'Устьевой факел 2',
          polCode: 337,
          polName: 'Углерод оксид',
          gsecemissions: 1.2453,
          tyearemissions: 9.7376,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Факел',
          release_source: 'Устьевой факел 2',
          polCode: 410,
          polName: 'Метан',
          gsecemissions: 0.0311,
          tyearemissions: 0.2434,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Цементировочный агрегат (0020)',
          release_source: 'ЦА-32 УЗСТ-006-01 ',
          polCode: 301,
          polName: 'Азота (IV) диоксид',
          gsecemissions: 0.42667,
          tyearemissions: 0.96,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Цементировочный агрегат (0020)',
          release_source: 'ЦА-32 УЗСТ-006-01 ',
          polCode: 304,
          polName: 'Азота оксид',
          gsecemissions: 0.06933,
          tyearemissions: 0.156,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Цементировочный агрегат (0020)',
          release_source: 'ЦА-32 УЗСТ-006-01 ',
          polCode: 328,
          polName: 'Углерод (Сажа)',
          gsecemissions: 0.01984,
          tyearemissions: 0.04286,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Цементировочный агрегат (0020)',
          release_source: 'ЦА-32 УЗСТ-006-01 ',
          polCode: 330,
          polName: 'Ангидрид сернистый',
          gsecemissions: 0.16667,
          tyearemissions: 0.375,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Цементировочный агрегат (0020)',
          release_source: 'ЦА-32 УЗСТ-006-01 ',
          polCode: 337,
          polName: 'Углерод оксид',
          gsecemissions: 0.43056137033,
          tyearemissions: 0.975,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Цементировочный агрегат (0020)',
          release_source: 'ЦА-32 УЗСТ-006-01 ',
          polCode: 703,
          polName: 'Бенз(а)пирен',
          gsecemissions: 4.76e-7,
          tyearemissions: 0.0000015,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Цементировочный агрегат (0020)',
          release_source: 'ЦА-32 УЗСТ-006-01 ',
          polCode: 325,
          polName: 'Формальдегид',
          gsecemissions: 0.004761514,
          tyearemissions: 0.010715,
        },
        {
          work_site: 'Месторождение нефти Моркудук',
          facility: 'Добычи нефти',
          facility_location: 'Скв №12',
          emission_source: 'Цементировочный агрегат (0020)',
          release_source: 'ЦА-32 УЗСТ-006-01 ',
          polCode: 2754,
          polName: 'Алканы С12-19',
          gsecemissions: 0.1150836626,
          tyearemissions: 0.25714,
        },
      ],
      columns: ['work_site', 'facility', 'facility_location', 'emission_source', 'release_source', 'polCode', 'polName', 'gsecemissions', 'tyearemissions'],
      tableOptions: {
        headings: {
          work_site: 'Промплощадка',
          facility: 'Цех, объект',
          facility_location: 'Участок',
          emission_source: 'Источник выбросов',
          release_source: 'Источник выделения',
          polCode: 'Код ЗВ',
          polName: 'Наименование ЗВ',
          gsecemissions: 'Выбросы, г/сек',
          tyearemissions: 'Выбросы, т/год',
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: 'transaction-history table dataTable',
        filterable: ['work_site', 'facility', 'facility_location', 'emission_source', 'release_source', 'polCode', 'polName', 'gsecemissions', 'tyearemissions'],
        sortable: ['work_site', 'facility', 'facility_location', 'emission_source', 'release_source', 'polCode', 'polName', 'gsecemissions', 'tyearemissions'],
        sortIcon: {
          base: 'fas float-right mt-1 text-muted',
          up: 'fa-caret-up',
          down: 'fa-caret-down',
        },
        texts: {
          filterPlaceholder: 'Введите текст для поиска',
          limit: 'Записей',
          filter: 'Поиск',
          noResults: 'Нет подходящих записей',
          loading: 'Идет загрузка...',
          page: 'Стр.:',
          filterBy: 'Фильтровать по {column}',
          count: 'Отображение с {from} по {to} из {count} записей|{count} записей | Запись',
        },
        pagination: {
          edge: true,
          nav: 'scroll',
        },
      },
      // this part related to excel export
      json_fields: {
        Промплощадка: 'work_site',
        // 'Тип юридического лица': {
        //   field: 'company_type.label',
        //   callback: value => `Тип: ${value}`,
        // },
        'Цех, объект': 'facility',
        Участок: 'facility_location',
        'Источник выбросов': 'emission_source',
        'Ист выделения': 'release_source',
        'Код ЗВ': 'polCode',
        'Наименование ЗВ': 'polName',
        'Выбросы, г/сек': 'gsecemissions',
        'Выбросы, т/год': 'tyearemissions',
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
};
</script>
