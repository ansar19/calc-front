<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Лимит</span>
        <h3 class="page-title">Список лимитов</h3>
      </div>
    </div>
    <!-- Default Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-header class="border-bottom">
            <div class="block-handle" align="right">
              <d-button size="sm" class="btn-info btn-sm ml-2" v-d-tooltip.hover="'Выгрузить Excel'">
                <download-excel :data="items" title="Список лимитов компании" :exportFields="json_fields"
                  name="emissionlimitlist.xls">
                  <font-awesome-icon icon="download" />
                </download-excel>
              </d-button>
              <d-link to="new-limit">
                <d-button outline size="sm" class="btn-primary btn-sm ml-2">
                  <font-awesome-icon icon="plus"/>Добавить новый лимит
                </d-button>
              </d-link>
            </div>
          </d-card-header>
          <d-card-body>
            <!-- data table -->
            <div class="meta-table">
              <v-client-table class="dataTables_wrapper" :data="items" :columns="columns" :options="tableOptions">
                <d-button-group slot="actions" slot-scope="props" size="small" class="d-flex justify-content-center">
                  <router-link :to="{ name: 'new-limit', params: { id: props.row.id }}">
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

                <span slot="emission_limit_status" slot-scope="props" :class="[getStatusClass(props.row.emission_limit_status)]">
                  {{ props.row.emission_limit_status }}
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
          emission_limit_name: 'Индивидуальный технический проект на строительство поисково-разведочной скважины на месторождении Моркудук',
          emission_limit_number_date: '№ 004 от 12-10-2018',
          worksites_covered_limit: ['Скважина №12 ', 'Промышленная база #1 '],
          total_emission_limit: 7879.00,
          emission_limit_start_date: '01-01-2019',
          emission_limit_end_date: '31-12-2022',
          emission_limit_status: 'Действительно',
        },
        {
          emission_limit_name: 'Строительство производственного цеха по адресу: РК, г. Караганда, Октябрьский район, северная промзона, учетный квар-тал 089, участок 424" и "Реконструкция производственного цеха по адресу: РК, г. Караганда, Октябрьский район, северная промзона, учетный квартал 020, участок 484',
          emission_limit_number_date: '№ 992323 от 22-11-2018',
          worksites_covered_limit: ['Завод металлоизделий ', 'Промышленная база #1 '],
          total_emission_limit: 3567,
          emission_limit_start_date: '01-01-2019',
          emission_limit_end_date: '31-12-2023',
          emission_limit_status: 'Действительно',
        },
      ],
      columns: ['emission_limit_name', 'emission_limit_number_date', 'worksites_covered_limit', 'total_emission_limit', 'emission_limit_start_date', 'emission_limit_end_date', 'emission_limit_status', 'actions'],
      tableOptions: {
        headings: {
          emission_limit_name: 'Наименование',
          emission_limit_number_date: '№ и дата выдачи',
          worksites_covered_limit: 'Промплощадки',
          total_emission_limit: 'Лимит, т/год',
          emission_limit_start_date: 'Срок действия, с',
          emission_limit_end_date: 'Срок действия, по',
          emission_limit_status: 'Статус',
          actions: 'Действия',
        },
        columnsClasses: {
          emission_limit_name: 'align-left',
          emission_limit_number_date: 'text-center',
          emission_limit_start_date: 'text-center',
          emission_limit_end_date: 'text-center',
        },
        headingsTooltips: {
          emission_limit_name: 'Наименование разрешения на эмиссию в окружающую среду',
        },
        highlightMatches: true,
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: 'transaction-history table dataTable meta-table',
        filterable: ['emission_limit_name', 'emission_limit_number_date', 'worksites_covered_limit', 'total_emission_limit', 'emission_limit_start_date', 'emission_limit_end_date', 'emission_limit_status'],
        sortable: ['emission_limit_name', 'emission_limit_number_date', 'worksites_covered_limit', 'total_emission_limit', 'emission_limit_start_date', 'emission_limit_end_date', 'emission_limit_status'],
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
        Наименование: 'emission_limit_name',
        '№ и дата выдачи': 'emission_limit_number_date',
        'Выбросы в пределах': 'total_emission_limit',
        'Срок действия, с': 'emission_limit_start_date',
        'Срок действия, по': 'emission_limit_end_date',
        Статус: 'emission_limit_status',
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
    // eslint-disable-next-line camelcase
    getStatusClass(emission_limit_status) {
      const map = {
        Действительно: 'success',
        Просрочено: 'danger',
        Истекает: 'warning',
      };
      return `text-${map[emission_limit_status]}`;
    },
  },
};
</script>
