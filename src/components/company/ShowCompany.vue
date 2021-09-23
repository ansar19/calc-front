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
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <p class="mb-1">Наименование компании</p>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{ company.company_name }}</h5>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <p class="mb-1">Тип юридического лица</p>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{ company.company_type.name }}</h5>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <p class="mb-1">БИН или ИНН</p>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{ company.iin_bin }}</h5>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <p class="mb-1">Телефон компании</p>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{ company.company_phone }}</h5>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <p class="mb-1">Email Компании</p>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{ company.company_email }}</h5>
                    </div>
                  </li>
                  <template v-if="company.company_head">
                    <li class="list-group-item">
                      <p class="mb-1">ФИО руководителя</p>
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                          {{ company.company_head.last_name }}
                          {{ company.company_head.first_name }}
                          {{ company.company_head.middle_name }}
                        </h5>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <p class="mb-1">Должность руководителя</p>
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                          {{ company.company_head.position.name }}
                        </h5>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <p class="mb-1">Телефон руководителя</p>
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ company.company_head.phone }}</h5>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <p class="mb-1">Email руководителя</p>
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ company.company_head.email }}</h5>
                      </div>
                    </li>
                  </template>
                  <template v-if="company.company_actual_address">
                    <li class="list-group-item">
                      <p class="mb-1">Физический адрес компании</p>
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                          {{ company.company_actual_address.address }},
                          {{ company.company_actual_address.city.name }},
                          {{
                            company.company_actual_address.city.state.country
                              .name
                          }}
                        </h5>
                      </div>
                    </li>
                  </template>
                  <template v-if="company.company_legal_address">
                    <li class="list-group-item">
                      <p class="mb-1">Юридический адрес компании</p>
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                          {{ company.company_legal_address.address }},
                          {{ company.company_legal_address.city.name }},
                          {{
                            company.company_legal_address.city.state.country
                              .name
                          }}
                        </h5>
                      </div>
                    </li>
                  </template>
                  <li
                    class="list-group-item"
                    v-if="company.company_description"
                  >
                    <p class="mb-1">Описание компании</p>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{ company.company_description }}</h5>
                    </div>
                  </li>
                  <template v-if="company.bank_accounts">
                    <li class="list-group-item">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Банковские детали</h5>
                      </div>
                      <ul
                        class="list-group list-group-flush"
                        v-for="b in company.bank_accounts"
                        :key="b.id"
                      >
                        <li class="list-group-item">
                          <p class="mb-1">Наименование банка</p>
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ b.bank.name }}</h5>
                          </div>
                          <p class="mb-1">
                            <strong>IBAN</strong> {{ b.iban }}
                            {{ b.currency.short_name }}
                          </p>
                        </li>
                      </ul>
                    </li>
                  </template>
                </ul>
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
    const router = ctx.root.$router
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
