<template>
  <div class="main-content-container container-fluid m-0 p-0">
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-body>
            <div class="block-handle mt-2" align="right">
              <d-button size="sm" class="btn-info btn-sm ml-2" v-d-tooltip.hover="'Выгрузить Excel'">
                <download-excel :data="releaseSources" title="Список черновых расчетов" :exportFields="json_fields"
                  name="emissioncalcsactual.xls">
                  <font-awesome-icon icon="download" />
                </download-excel>
              </d-button>
              <router-link to="new-draft-calc">
                <d-button size="sm" class="ml-2" text="Добавить" right>
                  + черновой расчет
                </d-button>
              </router-link>
            </div>
            <div class="meta-table">
              <!-- <div>
                <d-alert
                  dismissible
                  :show="timeUntilDismissed"
                  theme="success"
                  @alert-dismissed="timeUntilDismissed = 0"
                  @alert-dismiss-countdown="handleTimeChange"
                >
                  <b>Успешно!</b>
                  Напоминание отправляется и займет {{ timeUntilDismissed }} секунд!
                </d-alert>
              </div> -->
              <!-- List Manager -->
              <v-client-table class="dataTables_wrapper" :data="releaseSources" :columns="columns"
                :options="tableOptions">

                <div slot="child_row" slot-scope="props">
                  <table class="meta-table">
                    <thead>
                      <tr>
                        <th>Код ЗВ</th>
                        <th>Наименование ЗВ </th>
                        <th>Выбросы, г/сек</th>
                        <th>Выбросы, т/год </th>
                      </tr>
                    </thead>
                    <tr v-for="item in props.row.releasesTable" :key="item.code">
                      <td data-label="Код ЗВ:">{{ item.code }}</td>
                      <td data-label="Наименование ЗВ:">{{ item.name }}</td>
                      <td data-label="Выбросы, г/сек:">{{ item.gseccoef  }}</td>
                      <td data-label="Выбросы, т/год:">{{ item.tyearcoef }}</td>
                    </tr>
                  </table>
                </div>
              </v-client-table>
            </div>
          </d-card-body>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-alert */
// import EmissionSourcesRepository from '@/repositories/emissionSourcesRepository';
import { ClientTable } from 'vue-tables-2';
import '@/assets/scss/vue-tables.scss';
import api from '@/services/api';

export default {
  components: {
    ClientTable,
  },
  data() {
    return {
      releaseSources: [],
      pageerrors: [],
      columns: ['releaseSourceName'],
      // this part related to excel export - uncomment
      json_fields: {
        'Наименование ист.выделения': 'releaseSourceName',
      },
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
      tableOptions: {
        headings: {
          releaseSourceName: 'Наименование ист.выделения',
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: 'transaction-history table data-table',
        // filterable: ['workSiteName', 'facilityName', 'facilityLocationName', 'emissionSourceNumber', 'emissionSourceName', 'emissionSourceType', 'releaseSources.releaseSourceName', 'releaseSources.releaseSourceNumber', 'releaseSourceLimit'],
        // sortable: ['workSiteName', 'facilityName', 'facilityLocationName', 'emissionSourceNumber', 'emissionSourceName', 'emissionSourceType', 'releaseSources.releaseSourceName', 'releaseSources.releaseSourceNumber', 'releaseSourceLimit'],
        // sortIcon: {
        //   base: 'fas float-right mt-1 text-muted',
        //   up: 'fa-caret-up',
        //   down: 'fa-caret-down',
        // },
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
    };
  },
  computed: {
  },
  methods: {
    getStatusClass(sourceType) {
      const map = {
        organized: 'warning',
        unorganized: 'success',
      };
      return `text-${map[sourceType]}`;
    },
    sendReminderResponsible() {
      this.timeUntilDismissed = this.duration;
    },
  },
  created() {
    api.getResource('releaseSourcesDieselCalc')
      .then((response) => {
        this.releaseSources = response;
      });
  },
};

</script>
