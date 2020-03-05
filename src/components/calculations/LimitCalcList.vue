<template>
  <div class="main-content-container container-fluid m-0 p-0">
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-body>
            <div class="block-handle mt-2" align="right">
              <d-button size="sm" class="btn-info btn-sm ml-2" v-d-tooltip.hover="'Выгрузить Excel'">
                <download-excel :data="releaseSourceList" title="Список расчетов лимитов" :exportFields="json_fields"
                  emissionSourceName="emissioncalcsactual.xls">
                  <font-awesome-icon icon="download" />
                </download-excel>
              </d-button>
            </div>
            <div class="meta-table">
              <!-- List Manager -->
              <v-client-table class="dataTables_wrapper" :data="releaseSourceList" :columns="columns"
                :options="tableOptions">

                <d-button-group slot="actions" slot-scope="props" size="small" class="d-flex justify-content-center">
                  <d-button class="btn-white" @click="handleActionClick('confirmed', props.row)"
                    v-d-tooltip.hover="'Провести расчет'">
                    <i class="material-icons">functions</i>
                  </d-button>
                  <router-link :to="{ name: 'release-source-show', params: { id: props.row.releaseSource.id }}">
                    <d-button class="btn-white" v-d-tooltip.hover="'Посмотреть'">
                      <i class="material-icons">&#xe417;</i>
                    </d-button>
                  </router-link>

                  <d-button class="btn-white" @click="updateCompany(props.row.id)" v-d-tooltip.hover="'Редактировать'">
                    <i class="material-icons">&#xE254;</i>
                  </d-button>

                  <d-button class="btn-white" @click="deleteItem(props.index)" v-d-tooltip.hover="'Удалить'">
                    <i class="material-icons">&#xE872;</i>
                  </d-button>
                </d-button-group>

                <span slot="emissionSourceType" slot-scope="props"
                  :class="[getStatusClass(props.row.emissionSourceType)]">
                  {{ props.row.emissionSourceType }}
                </span>

                <span slot="total" slot-scope="props" class="text-success">
                  {{ props.row.total }}
                </span>

              </v-client-table>
            </div>
          </d-card-body>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ClientTable } from 'vue-tables-2';
import '@/assets/scss/vue-tables.scss';
import { mapState } from 'vuex';

/* eslint-disable no-alert */
export default {
  components: {
    ClientTable,
  },
  data() {
    return {
      componentTitle: 'Список расчетов',
      emissionsources: [],
      pageerrors: [],
      columns: [
        'releaseSource.releaseSourceName',
        'releaseSource.releaseSourceNumber',
        'worksite.workSiteName',
        'facility.facilityName',
        'facilityLocation.facilityLocationName',
        'emissionSource.emissionSourceName',
        'releaseSourceLimit',
        'period',
        'u_at',
        'actions',
      ],
      // this part related to excel export - uncomment
      json_fields: {
        'Наименование ист.выделения': 'releaseSource.releaseSourceName',
        'Номер ист.выделения': 'releaseSource.releaseSourceNumber',
        'Наименование промплощадки': 'workisite.workSiteName',
        'Цех / объект': 'facility.facilityName',
        Участок: 'facilityLocation.facilityLocationName',
        'Источник выбросов': 'emissionSource.emissionSourceName',
        // Ответственный: 'reporter_full_emissionSourceName',
        // email: 'reporter_email',
        // 'Выбросы, т/период': 'release_source_actual_cumulative',
        // Статус: 'status',
        'Лимиты, т/год': 'releaseSourceLimit',
        'Период, год': 'period',
        'Последнее обновление': 'u_at',
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
          'releaseSource.releaseSourceName': 'Источник выделения',
          'releaseSource.releaseSourceNumber': 'Номер ист.выделения',
          'worksite.workSiteName': 'Промплощадка',
          'facility.facilityName': 'Цех / объект',
          'facilityLocation.facilityLocationName': 'Участок',
          'emissionSource.emissionSourceName': 'Источник выбросов',
          releaseSourceLimit: 'Лимиты, т/год',
          period: 'Период, год',
          // reporter_full_emissionSourceName: 'Ответственный',
          // reporter_email: 'email',
          // release_source_actual_cumulative: 'Выбросы, т/период',
          // status: 'Статус',
          u_at: 'Последнее обновление',
          actions: 'Действия',
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: 'transaction-history table data-table',
        filterable: [
          'releaseSource.releaseSourceName',
          'releaseSource.releaseSourceNumber',
          'worksite.workSiteName',
          'facility.facilityName',
          'facilityLocation.facilityLocationName',
          'emissionSource.emissionSourceName',
          'releaseSourceLimit',
          'period',
        ],
        sortable: [
          'releaseSource.releaseSourceName',
          'releaseSource.releaseSourceNumber',
          'worksite.workSiteName',
          'facility.facilityName',
          'facilityLocation.facilityLocationName',
          'emissionSource.emissionSourceName',
          'releaseSourceLimit',
          'period',
        ],
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
    };
  },
  computed: {
    ...mapState('releaseStore', ['releaseSourceList']),
  },
  methods: {
    // deleteItem(index) {
    //   // eslint-disable-next-line no-restricted-globals
    //   if (!confirm('Вы уверены что хотите удалить? Это действие невозможно отменить!')) {
    //     return;
    //   }
    //   index -= 1;
    //   EmissionSourcesRepository.destroy(this.items[index].id)
    //     .then(response => this.items.splice(index, 1))
    //     .catch(error => console.log(error));
    // },
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
    // do nothing yet
  },
};
</script>
