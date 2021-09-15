<script>
import Spinner from "@/components/Base/Spinner.vue";
import COMPANIES from "../graphql/queries/CompanyList";
import { useGlobalState } from "@/useStore";
import { useQuery, useResult } from "@vue/apollo-composable";

export default {
  setup(_, ctx) {
    const router = ctx.root.$router;

    const state = useGlobalState();
    const { result, loading, error } = useQuery(COMPANIES);
    const companies = useResult(result, null, (data) => data.companies);
    function setCompany(props) {
      state.value.companyId = props.id;
      state.value.companyName = props.company_name;
    }
    function viewCompany({ id }) {
      router.push({ name: "show-company", params: { id } });
    }

    function editCompany({ id }) {
      router.push({ name: "edit-company", params: { id } });
    }
    return { viewCompany, setCompany, editCompany, companies, loading, error };
  },
  components: { Spinner },

  data() {
    return {
      componentTitle: "Список компаний",
      columns: [
        { label: "Название компании", field: "company_name" },
        { label: "БИН / ИНН", field: "iin_bin" },
        { label: "Тип юр лица", field: "company_type.short_name" },
        { label: "Email компании", field: "company_email" },
        { label: "Телефон компании", field: "company_phone" },
        { label: "", field: "action" },
      ],

      // this part related to excel export
      json_fields: {
        "Название компании": "companyName",
        "Тип юридического лица": {
          field: "companyType.label",
          callback: (value) => `Тип: ${value}`,
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
        "Почтовый индекс юридический": "companyAddress.legal.zip",
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
};
</script>

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
          <d-button
            size="sm"
            class="btn-info btn-sm ml-2"
            v-d-tooltip.hover="'Выгрузить Excel'"
          >
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
        <spinner v-if="loading" />
        <div v-else-if="error">Ошибка: {{ error.message }}</div>
        <template v-else-if="companies">
          <vue-good-table
            :columns="columns"
            :rows="companies"
            :fixed-header="true"
            compactMode
            :pagination-options="{
              enabled: true,
              mode: 'pages',
              perPageDropdown: [10, 50, 100],
              rowsPerPageLabel: 'Строк',
              nextLabel: 'Вперед',
              prevLabel: 'Назад',
              allLabel: 'Все',
            }"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'action'">
                <div
                  class="btn-group d-flex"
                  role="group"
                  aria-label="Comapny actions"
                >
                  <button
                    type="button"
                    class="btn btn-white"
                    @click="setCompany(props.row)"
                  >
                    <i class="material-icons">&#xE5CA;</i> Войти
                  </button>
                  <button
                    type="button"
                    class="btn btn-white"
                    @click="viewCompany(props.row)"
                  >
                    <i class="material-icons">&#xe417;</i> Открыть
                  </button>
                  <button type="button" class="btn btn-white" @click="editCompany(props.row)">
                    <i class="material-icons">&#xE254;</i> Редактировать
                  </button>
                </div>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </template>
      </d-card-body>
    </d-card>
  </d-container>
</template>
