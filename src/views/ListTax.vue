<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Налоговый отчет</span>
        <h3 class="page-title">Статус декларации 870</h3>
      </div>
    </div>
    <!-- Default Dark Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-header class="border-bottom">
            <div class="block-handle" align="right">

                <download-excel class="mb-2 btn btn-sm btn-info ml-2" v-d-tooltip.hover="'Выгрузить Excel'" :data="items" title="Статус декларации 870" :exportFields="json_fields"
                  name="taxdeclarationstatus.xls">
                  <font-awesome-icon icon="download" />
                </download-excel>


              <d-link to="new-tax-declaration">
                <d-button outline size="sm" class="btn-primary btn-sm ml-2">
                  <font-awesome-icon icon="plus" />Добавить налоговый отчет
                </d-button>
              </d-link>
            </div>
          </d-card-header>
          <d-card-body>
            <!-- data table -->
            <div class="meta-table">
              <v-client-table class="dataTables_wrapper" :data="items" :columns="columns" :options="tableOptions">

                <d-button-group slot="actions" slot-scope="props" size="small" class="d-flex justify-content-center">
                  <router-link :to="{ name: 'new-tax-declaration', params: { id: props.row.id }}">
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
          quarter: 1,
          year: 2018,
          up_date: '15 Окт 2018',
          declaration_type: 'очередная',
          total_amount: 0,
          over_limit_amount: 0,
          status: 'Предоставлены все данные',
        },
        {
          quarter: 1,
          year: 2018,
          up_date: '15 Окт 2018',
          declaration_type: 'дополнительная по уведомлению',
          total_amount: 7879,
          over_limit_amount: 0,
          status: 'Не достаточно данных',
        },
        {
          quarter: 2,
          year: 2018,
          up_date: '15 Окт 2018',
          declaration_type: 'очередная',
          total_amount: 3567,
          over_limit_amount: 0,
          status: 'Не достаточно данных',
        },
        {
          quarter: 2,
          year: 2018,
          up_date: '15 Окт 2018',
          declaration_type: 'дополнительная по уведомлению',
          total_amount: 2008,
          over_limit_amount: 0,
          status: 'Не достаточно данных',
        },
        {
          quarter: 3,
          year: 2018,
          up_date: '15 Окт 2018',
          declaration_type: 'очередная',
          total_amount: 8964,
          over_limit_amount: 0,
          status: 'Не достаточно данных',
        },
      ],
      columns: ['quarter', 'year', 'up_date', 'declaration_type', 'total_amount', 'over_limit_amount', 'status', 'actions'],
      tableOptions: {
        headings: {
          quarter: 'Квартал',
          year: 'Год',
          up_date: 'Дата послед. обновления',
          declaration_type: 'Вид декларации',
          total_amount: 'Сумма в пределах',
          over_limit_amount: 'Сверх лимит',
          status: 'Статус',
          actions: 'Действия',
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: 'transaction-history table dataTable',
        filterable: ['quarter', 'year', 'up_date', 'declaration_type', 'total_amount', 'over_limit_amount', 'status'],
        sortable: ['quarter', 'year', 'up_date', 'declaration_type', 'total_amount', 'over_limit_amount', 'status'],
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
        Квартал: 'quarter',
        Год: 'year',
        'Дата послед. обновления': 'up_date',
        'Вид декларации': 'declaration_type',
        'Сумма в пределах': 'total_amount',
        'Сверх лимит': 'over_limit_amount',
        Статус: 'status',
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
  },
};
</script>
