<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Статистический отчет</span>
        <h3 class="page-title">Статус готовности отчетов 2ТП (воздух)</h3>
      </div>
    </div>
    <!-- Default Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-header class="border-bottom">
            <div class="block-handle" align="right">

                <download-excel class="mb-2 btn btn-sm btn-info ml-2" :data="items" v-d-tooltip.hover="'Выгрузить Excel'" title="Статус статистических отчетов" :exportFields="json_fields"
                  name="statreportsstatus.xls">
                  <font-awesome-icon icon="download" />
                </download-excel>

              <d-link to="new-stat-report">
                <d-button outline size="sm" class="btn-primary btn-sm ml-2">
                  <font-awesome-icon icon="plus" />Добавить отчет 2ТП
                </d-button>
              </d-link>
            </div>
          </d-card-header>
          <d-card-body>
            <!-- data table -->
            <div class="meta-table">
              <v-client-table class="dataTables_wrapper" :data="items" :columns="columns" :options="tableOptions">
                <d-button-group slot="actions" slot-scope="props" size="small" class="d-flex justify-content-center">
                  <router-link :to="{ name: 'new-stat-report', params: { id: props.row.id }}">
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
                <span slot="stat_report_submission" slot-scope="props"
                  :class="[getSubmissionStatusClass(props.row.stat_report_submission)]">
                  {{ props.row.stat_report_submission }}
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

export default {
  components: {
    ClientTable,
  },
  data() {
    return {
      items: [
        {
          year: 2018,
          up_date: '15 Окт 2018',
          declaration_type: 'очередная',
          total_emission_limit: 7879.00,
          over_limit_amount: 0.00,
          status: 'Предоставлены все данные',
          stat_report_submission: 'Подано',
        },
        {
          year: 2018,
          up_date: '15 Окт 2018',
          declaration_type: 'очередная',
          total_emission_limit: 3567,
          over_limit_amount: 0,
          status: 'Не достаточно данных',
          stat_report_submission: 'Не подано',
        },
        {
          year: 2018,
          up_date: '15 Окт 2018',
          declaration_type: 'дополнительная по уведомлению',
          total_emission_limit: 2008,
          over_limit_amount: 0,
          status: 'Не достаточно данных',
          stat_report_submission: 'Не подано',
        },
        {
          year: 2018,
          up_date: '15 Окт 2018',
          total_emission_limit: 8964,
          over_limit_amount: 0,
          status: 'Не достаточно данных',
          stat_report_submission: 'Не подано',
        },
      ],
      columns: ['year', 'up_date', 'total_emission_limit', 'over_limit_amount', 'status', 'stat_report_submission', 'actions'],
      tableOptions: {
        headings: {
          year: 'Год',
          up_date: 'Дата послед. обновления',
          total_emission_limit: 'Выбросы в пределах',
          over_limit_amount: 'Выбросы сверхнормативные',
          status: 'Статус готовности',
          stat_report_submission: 'Статус подачи',
          actions: 'Действия',
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: 'transaction-history table dataTable',
        filterable: ['year', 'up_date', 'total_emission_limit', 'over_limit_amount', 'status', 'stat_report_submission'],
        sortable: ['year', 'up_date', 'total_emission_limit', 'over_limit_amount', 'status', 'stat_report_submission'],
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
        Год: 'year',
        'Дата послед. обновления': 'up_date',
        'Выбросы в пределах': 'total_emission_limit',
        'Выбросы сверхнормативные': 'over_limit_amount',
        'Статус готовности': 'status',
        'Статус подачи': 'stat_report_submission',
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
  methods: {
    getStatusClass(status) {
      const map = {
        'Предоставлены все данные': 'success',
        'Не достаточно данных': 'warning',
      };
      return `text-${map[status]}`;
    },
    // eslint-disable-next-line camelcase
    getSubmissionStatusClass(stat_report_submission) {
      const map = {
        Подано: 'success',
        'Не подано': 'warning',
      };
      return `text-${map[stat_report_submission]}`;
    },
  },
};
</script>
