<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Отчет</span>
        <h3 class="page-title">Суммарные выбросы ЗВ по предприятию</h3>
      </div>
    </div>
    <!-- Default Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-header class="border-bottom">
            <div class="block-handle" align="right">
              <d-button size="sm" class="btn-info btn-sm ml-2" v-d-tooltip.hover="'Выгрузить Excel'">
                <download-excel :data="company_emissions_by_pollutants" title="Выбросы в разрезе ЗВ" :exportFields="json_fields" name="pollutantsemissions.xls">
                  <font-awesome-icon icon="download"  />
              </download-excel>
              </d-button>
            </div>
          </d-card-header>
          <div class="card-body pb-3 text-center component-props">
            <!-- data table -->
            <div class="meta-table">
          <v-client-table class="dataTables_wrapper" :data="company_emissions_by_pollutants" :columns="columns"
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
      company_emissions_by_pollutants: [
        {
          polCode: '123',
          polName: 'Железо (II, III) оксиды (диЖелезо триоксид, Железа оксид) /в пересчете на железо/ (274)',
          gsecemissions: 0.00321,
          tyearemissions: 0.1041,
        },
        {
          polCode: '143',
          polName: 'Марганец и его соединения /в пересчете на марганца (IV) оксид/ -327',
          gsecemissions: 0.000279,
          tyearemissions: 0.01163,
        },
        {
          polCode: '301',
          polName: 'Азота (IV) диоксид (Азота диоксид) -4',
          gsecemissions: 0.21965,
          tyearemissions: 6.1097,
        },
        {
          polCode: '304',
          polName: 'Азот (II) оксид (Азота оксид) (6)',
          gsecemissions: 0.0356,
          tyearemissions: 0.9912,
        },
        {
          polCode: '328',
          polName: 'Углерод (Сажа, Углерод черный) -583',
          gsecemissions: 0.0186,
          tyearemissions: 0.532,
        },
        {
          polCode: '330',
          polName: 'Сера диоксид (Ангидрид сернистый, Сернистый газ, Сера (IV) оксид) -516',
          gsecemissions: 0.0294,
          tyearemissions: 0.798,
        },
        {
          polCode: '337',
          polName: 'Углерод оксид (Окись углерода, Угарный газ) (584)',
          gsecemissions: 0.19599,
          tyearemissions: 5.4131,
        },
        {
          polCode: '342',
          polName: 'Фтористые газообразные соединения /в пересчете на фтор/ (617)',
          gsecemissions: 0.000225,
          tyearemissions: 0.00645,
        },
        {
          polCode: '344',
          polName: 'Фториды неорганические плохо растворимые - (алюминия фторид, кальция фторид, натрия гексафторалюминат) (Фториды неорганические плохо растворимые /в пересчете на фтор/) (615)',
          gsecemissions: 0.00099,
          tyearemissions: 0.0231,
        },
        {
          polCode: '616',
          polName: 'Диметилбензол (смесь о-, м-, п- изомеров) (203)',
          gsecemissions: 0.00884,
          tyearemissions: 2.3544,
        },
        {
          polCode: '703',
          polName: 'Бенз/а/пирен (3,4-Бензпирен) (54)',
          gsecemissions: 4e-7,
          tyearemissions: 0.00001,
        },
        {
          polCode: '1325',
          polName: 'Формальдегид (Метаналь) (609)',
          gsecemissions: 0.004,
          tyearemissions: 0.1064,
        },
        {
          polCode: '2752',
          polName: 'Уайт-спирит (1294*)',
          gsecemissions: 0.00884,
          tyearemissions: 0.6345,
        },
        {
          polCode: '2754',
          polName: 'Алканы С12-19 /в пересчете на С/ (Углеводороды предельные С12-С19 (в пересчете на С); Растворитель РПК-265П) (10)',
          gsecemissions: 0.096,
          tyearemissions: 2.66,
        },
        {
          polCode: '2902',
          polName: 'Взвешенные частицы (116)',
          gsecemissions: 0.00649,
          tyearemissions: 1.09593,
        },
        {
          polCode: '2907',
          polName: 'Пыль неорганическая, содержащая двуокись кремния в %: более 70 (Динас) (493)',
          gsecemissions: 0.1656,
          tyearemissions: 2.056,
        },
        {
          polCode: '2908',
          polName: 'Пыль неорганическая, содержащая двуокись кремния в %: 70-20 (шамот, цемент, пыль цементного производства - глина, глинистый сланец, доменный шлак, песок, клинкер, зола, кремнезем, зола углей -494 казахстанских месторождений)',
          gsecemissions: 0.07994,
          tyearemissions: 1.3877,
        },
        {
          polCode: null,
          polName: 'ВСЕГО:',
          gsecemissions: 0.8736544,
          tyearemissions: 24.28422,
        },
      ],
      columns: ['polCode', 'polName', 'gsecemissions', 'tyearemissions'],
      tableOptions: {
        headings: {
          polCode: 'Код ЗВ',
          polName: 'Наименование ЗВ',
          gsecemissions: 'Выбросы, г/сек',
          tyearemissions: 'Выбросы, т/год',
        },
        perPage: 25,
        recordsPerPage: [10, 25, 50, 100],
        skin: 'transaction-history table dataTable',
        filterable: ['polCode', 'polName', 'gsecemissions', 'tyearemissions'],
        sortable: ['polCode', 'polName', 'gsecemissions', 'tyearemissions'],
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

<style>
th,
td {
  text-align: left;
}
</style>

