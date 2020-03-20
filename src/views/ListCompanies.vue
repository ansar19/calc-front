<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Компания</span>
        <h3 class="page-title">{{ componentTitle }}</h3>
      </d-col>
    </d-row>
    <!-- Default Table -->
    <d-card class="card-small mb-3">
      <d-card-header class="border-bottom">
        <div class="block-handle" align="right">
          <d-button size="sm" class="btn-info btn-sm ml-2" v-d-tooltip.hover="'Выгрузить Excel'">
            <download-excel
              :data="companies"
              title="Список компании"
              :exportFields="json_fields"
              name="companies.xls"
            >
              <font-awesome-icon icon="download" />
            </download-excel>
          </d-button>
          <d-link to="new-company">
            <d-button outline size="sm" class="btn-primary btn-sm ml-2">
              <font-awesome-icon icon="plus" /> Добавить компанию
            </d-button>
          </d-link>
        </div>
      </d-card-header>
      <d-card-body>
        <div class="meta-table">
          <!-- List Manager -->
          <v-client-table
            class="dataTables_wrapper"
            :data="companies"
            :columns="columns"
            :options="companyTableOptions"
          >
            <div slot="child_row" slot-scope="props">
              <table class="meta-table" id="example-1">
                <thead>
                  <tr>
                    <th style="width:25%">Адрес фактический</th>
                    <th style="width:25%">Адрес юридический</th>
                    <th style="width:25%">Банковские детали</th>
                    <th style="width:25%">ФИО первого руководителя</th>
                  </tr>
                </thead>
                <tr>
                  <td data-label="Адрес фактический:">
                    {{props.row.companyAddress.actual.country}}, {{props.row.companyAddress.actual.oblast.name}}, {{props.row.companyAddress.actual.settlement}}, {{props.row.companyAddress.actual.address}},
                    {{props.row.companyAddress.actual.zip}}, {{props.row.companyAddress.actual.addressComments}}
                  </td>
                  <td data-label="Адрес юридический:">
                    {{props.row.companyAddress.legal.country}}, {{props.row.companyAddress.legal.oblast.name}}, {{props.row.companyAddress.legal.settlement}}, {{props.row.companyAddress.legal.address}},
                    {{props.row.companyAddress.legal.zip}}
                  </td>
                  <td data-label="Банковские детали:">
                    <ul v-for="(bankAccount, i) in props.row.companyAccounts" :key="i">
                      <li>
                        {{bankAccount.iban}} {{bankAccount.currency}}
                        {{bankAccount.bank.label}}
                      </li>
                    </ul>
                  </td>
                  <td data-label="Данные первого руководителя:">
                    {{props.row.companyHead.companyHeadSurename}} {{props.row.companyHead.companyHeadFirstname}}
                    {{props.row.companyHead.companyHeadPatronyme}}
                    <br />
                    {{props.row.companyHead.companyHeadPosition}}
                    <br />
                    {{props.row.companyHead.companyHeadPhone}}
                    <br />
                    {{props.row.companyHead.companyHeadEmail}}
                  </td>
                </tr>
              </table>
            </div>

            <d-button-group
              slot="actions"
              slot-scope="props"
              size="small"
              class="d-flex justify-content-center"
            >
              <d-button
                class="btn-white"
                @click="handleActionClick('confirmed', props.row)"
                v-d-tooltip.hover="'Войти в компанию'"
              >
                <i class="material-icons">&#xE5CA;</i>
              </d-button>
              <router-link :to="{ name: 'show-company', params: { id: props.row.id }}">
                <d-button class="btn-white" v-d-tooltip.hover="'Посмотреть'">
                  <i class="material-icons">&#xe417;</i>
                </d-button>
              </router-link>

              <router-link :to="{ name: 'edit-company', params: { id: props.row.id }}">
                <d-button class="btn-white" v-d-tooltip.hover="'Редактировать'">
                  <i class="material-icons">&#xE254;</i>
                </d-button>
              </router-link>

              <d-button
                class="btn-white"
                @click="deleteCompany(props.row.id)"
                v-d-tooltip.hover="'Удалить'"
              >
                <i class="material-icons">&#xE872;</i>
              </d-button>
            </d-button-group>

            <span
              slot="status"
              slot-scope="props"
              :class="[getStatusClass(props.row.status)]"
            >{{ props.row.status }}</span>

            <span slot="total" slot-scope="props" class="text-success">{{ props.row.total }}</span>
          </v-client-table>
        </div>
      </d-card-body>
    </d-card>
  </d-container>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import { ClientTable } from "vue-tables-2";
import "@/assets/scss/vue-tables.scss";
import axios from "axios";

Vue.use(ClientTable);

export default {
  components: {
    ClientTable
  },
  data() {
    return {
      // fields: FieldsDef(this.$i18n),
      componentTitle: "Список компании",
      companies: [],
      pageerrors: [],
      locale: "ru",
      dateRange: {
        from: null,
        to: null
      },

      columns: [
        "companyName",
        "binInn",
        "companyType",
        "companyEmail",
        "companyPhone",
        "actions"
      ],

      // this part related to excel export
      json_fields: {
        "Название компании": "companyName",
        "Тип юридического лица": {
          field: "companyType.label",
          callback: value => `Тип: ${value}`
        },
        "БИН / ИНН": "binInn",
        "Телефон компании": "companyPhone",
        "Email компании": "companyEmail",
        "Имя руководителя": "companyHead.companyHeadFirstname",
        "Фамилия руководителя": "companyHead.companyHeadSurename",
        "Отчество руководителя": "companyHead.companyHeadPatronyme",
        "Должность руководителя": "companyHead.companyHeadPosition",
        "Email руководителя": "companyHead.companyHeadEmail",
        "Телефон руководителя": "companyHead.companyHeadPhone",
        "Страна фактический адрес": "companyAddress.actual.country",
        "Адрес фактический": "companyAddress.actual.address",
        "Почтовый индекс фактический": "companyAddress.actual.zip",
        "Комментарии к фактическому адресу":
          "companyAddress.actual.addressComments",
        "Страна юридический адрес": "companyAddress.legal.country",
        "Адрес юридический": "companyAddress.legal.address",
        "Почтовый индекс юридический": "companyAddress.legal.zip"
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ],

      /**
       * Table Data
       */
      // tableData: transactionHistoryData,

      /**
       * Vue Tables Configuration Options
       * @see https://github.com/matfish2/vue-tables-2
       */
      startDownload() {
        alert("загрузить?");
      },
      finishDownload() {
        alert("скрываеть загрузку");
      },
      companyTableOptions: {
        headings: {
          companyName: "Название компании",
          binInn: "БИН / ИНН",
          companyType: "Тип юр лица",
          companyEmail: "Email компании",
          companyPhone: "Телефон компании",
          actions: "Действия"
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: "transaction-history table dataTable",
        filterable: [
          "companyName",
          "binInn",
          "companyType",
          "companyEmail",
          "companyPhone"
        ],
        sortable: [
          "companyName",
          "binInn",
          "companyType",
          "companyEmail",
          "companyPhone"
        ],
        sortIcon: {
          base: "fas float-right mt-1 text-muted",
          up: "fa-caret-up",
          down: "fa-caret-down"
        },
        texts: {
          filterPlaceholder: "Введите текст для поиска",
          limit: "Записей",
          filter: "Поиск",
          noResults: "Нет подходящих записей",
          loading: "Идет загрузка...",
          page: "Стр.:",
          filterBy: "Фильтровать по {column}",
          count:
            "Отображение с {from} по {to} из {count} записей|{count} записей | Запись"
        },
        pagination: {
          edge: true,
          nav: "scroll"
        }
      }
    };
  },
  // Fetches companies when the component is created.
  created() {
    axios
      .get("http://localhost:3000/companies/")
      .then(response => {
        // JSON responses are automatically parsed.
        this.companies = response.data;
      })
      .catch(e => {
        this.pageerrors.push(e);
      });
  },

  watch: {},
  methods: {
    deleteCompany(id) {
      axios
        .delete("http://localhost:3000/companies/" + id)
        .then(response => {
          this.companies.splice(id, 1);
          // console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    // updateCompany(id){
    //   axios.put('http://localhost:3000/companies/' + id, {
    //       companyName: 'Some Company Name',
    //       binInn: '111111111111',
    //   }).then(resp => {
    //       console.log(resp.data);
    //   }).catch(error => {
    //       console.log(error);
    //   });
    // },

    // async fetch () {
    //   CompaniesRepository.get()
    //     .then(response => this.companies = response.data)
    //     .catch(error => console.log(error));
    // },
    // handleActionClick(type, company) {
    //   if (type === 'confirmed') {
    //     this.$store.commit('set_company', company);
    //   }
    // },
    // deleteCompany: function(result, index) {
    //   axios.delete('http://localhost:3000/companies/' + index)
    //   .then(response => {
    //     this.result.splice(index, 1)
    //     console.log(this.result);
    //   });
    // },
    // deleteCompany(index) {
    //   index = index - 1
    //   CompaniesRepository.destroy(this.companies[index].id)
    //     .then(response => this.companies.splice(index, 1))
    //     .catch(error => console.log(error));
    // },
    // showCompany(index) {
    //   index = index - 1
    //   this.$router.push('/companies/' + props.row.id)
    // },
    // async updateCompany(e) {
    //   await axios.put('http://localhost:3000/companies/${id}', this.companies)
    //     .then((response) => {
    //       this.$router.go(-1);
    //     })
    //     .catch((err) => {
    //       alert(err.error);
    //     });
    // },
    // getStatusClass(status) {
    //   const map = {
    //     Pending: 'warning',
    //     Complete: 'success',
    //     Cancelled: 'danger',
    //   };
    //   return `text-${map[status]}`;
    // },
  }
};
</script>
