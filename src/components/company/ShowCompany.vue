<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Компании</span>
        <h3 class="page-title">Профиль компании</h3>
      </d-col>
    </d-row>
    <!-- Content -->
    <d-row>
      <d-col lg="12">
        <d-card class="card-small mb-3">
          <div>
            <spinner v-if="loading" />
            <div v-else-if="error">Ошибка: {{ error.message }}</div>
            <div v-else-if="company">
              <d-card-body>
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <td>Наименование компании</td>
                      <td>{{ company.company_name }}</td>
                    </tr>
                    <tr>
                      <td>Тип юридического лица</td>
                      <td>{{ company.company_type.name }}</td>
                    </tr>
                    <tr>
                      <td>БИН или ИНН</td>
                      <td>{{ company.iin_bin }}</td>
                    </tr>
                    <tr>
                      <td>Телефон компании</td>
                      <td>{{ company.company_phone }}</td>
                    </tr>
                    <tr>
                      <td>Email компании</td>
                      <td>{{ company.company_email }}</td>
                    </tr>
                    <tr>
                      <td>ФИО руководителя</td>
                      <td>{{ company.company_head }}</td>
                    </tr>
                    <tr>
                      <td>Должность руководителя</td>
                      <td>{{ company.company_head_position }}</td>
                    </tr>
                    <tr>
                      <td>Телефон руководителя</td>
                      <td>{{ company.company_head_phone }}</td>
                    </tr>
                    <template v-if="company.company_actual_address">
                      <tr>
                        <td>Физический адрес компании</td>
                        <td>
                          {{ company.company_actual_address.address }},
                          {{ company.company_actual_address.city.name }},
                          {{
                            company.company_actual_address.city.state.country
                              .name
                          }}
                        </td>
                      </tr>
                    </template>
                    <template v-if="company.company_legal_address">
                      <tr>
                        <td>Юридический адрес компании</td>
                        <td>
                          {{ company.company_legal_address.address }},
                          {{ company.company_legal_address.city.name }},
                          {{
                            company.company_legal_address.city.state.country
                              .name
                          }}
                        </td>
                      </tr>
                    </template>
                    <tr>
                      <td>Описание компании</td>
                      <td>{{ company.company_description }}</td>
                    </tr>
                    <tr>
                      <td><h5>Банковские детали</h5></td>
                      <td></td>
                    </tr>
                    <template v-if="company.bank_accounts">
                      <tr v-for="b in company.bank_accounts" :key="b.id">
                        <td>{{ b.bank.name }}</td>
                        <td>
                          <strong>IBAN</strong> {{ b.iban }}
                          {{ b.currency.short_name }}
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </d-card-body>
            </div>
          </div>

          <d-card-footer class="text-right border-top">
            <div class="d-flex">
              <router-link tag="a" to="/companies">Назад</router-link>
              <d-button class="ml-auto" theme="warning" @click="editCompany"
                >Редактировать</d-button
              >
            </div>
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import { useQuery, useResult } from "@vue/apollo-composable";
import COMPANY_BY_PK from "@/graphql/queries/CompanyViewQuery";
import Spinner from "@/components/Base/Spinner.vue";

export default {
  setup(_, ctx) {
    const id = ctx.root.$route.params.id;
    const router = ctx.root.$router;
    const { result, loading, error } = useQuery(COMPANY_BY_PK, { id: id });
    const company = useResult(result, null, (data) => data.companies_by_pk);
    function editCompany() {
      router.push({ path: `/edit-company/${id}` });
    }
    return { company, loading, error, editCompany };
  },
  components: {
    Spinner,
  },
};
</script>
