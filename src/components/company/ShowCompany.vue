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
          <d-card-header class="d-flex border-bottom">
            <h6 class="d-flex m-0">Детали компании</h6>
          </d-card-header>
          <div>
            <div v-if="!loaded">Загружаем данные...</div>
            <div v-else>
              <d-card-body>
                <table
                  class="table table-bordered"
                  style="width:100%"
                  v-for="(c, index) in companies"
                  :key="index"
                >
                  <tr>
                    <th>Название компании:</th>
                    <td>{{ c.companyName }}</td>
                  </tr>
                  <tr>
                    <th>Тип юр лица:</th>
                    <td>{{c.companyType }}</td>
                  </tr>
                  <tr>
                    <th>БИН или ИНН:</th>
                    <td>{{ c.binInn }}</td>
                  </tr>
                  <tr>
                    <th>Телефон компании:</th>
                    <td>{{ c.companyPhone }}</td>
                  </tr>
                  <tr>
                    <th>Email Компании:</th>
                    <td>{{ c.companyEmail }}</td>
                  </tr>
                  <tr>
                    <th>ФИО руководителя:</th>
                    <td>
                      {{ c.companyHead.companyHeadFirstname }}
                      <br />
                      {{c.companyHead.companyHeadSurename}}
                      <br />
                      {{c.companyHead.companyHeadPatronyme}}
                    </td>
                  </tr>
                  <tr>
                    <th>Должность руководителя:</th>
                    <td>{{c.companyHead.companyHeadPosition}}</td>
                  </tr>
                  <tr>
                    <th>Телефон руководителя:</th>
                    <td>{{c.companyHead.companyHeadPhone}}</td>
                  </tr>
                  <tr>
                    <th>Email руководителя:</th>
                    <td>{{c.companyHead.companyHeadEmail}}</td>
                  </tr>
                  <!-- <tr>
          <th>Адрес Компании:</th>
          <td>{{company.address}}</td>
        </tr>
                  -->
                  <tr>
                    <th>Описание компании:</th>
                    <td>{{c.companyDescription}}</td>
                  </tr>
                </table>
              </d-card-body>
            </div>
          </div>

          <d-card-footer class="text-right border-top">
            <div class="d-flex">
              <router-link tag="a" to="/companies">Назад</router-link>
              <d-button class="ml-auto" theme="warning" @click="goEdit()">Редактировать</d-button>
            </div>
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import axios from 'axios';

const CompanyService = {};
// eslint-disable-next-line consistent-return
CompanyService.getCompany = async (id) => {
  try {
    const result = await axios.get(`https://ecoapikz.herokuapp.com/companies/${id}`);
    const companies = {
    //   name: result.data.name,
      companyName: result.data.companyName,
      binInn: result.data.binInn,
      companyPhone: result.data.companyPhone,
      companyEmail: result.data.companyEmail,
      companyHead: result.data.companyHead,
      companyType: result.data.companyType.text,
      companyDescription: result.data.companyDescription,
    };
    return companies;
  } catch (error) {
    //     const errorStatus = error.response.status;
    //     let errorMessage = '';
    //     if (errorStatus === 404) {
    //       errorMessage = 'Пользователь не найден';
    //     } else {
    //       errorMessage = 'Произошла ошибка';
    //     }
    //     throw new Error(errorMessage);
  }
};

export default {
  components: {
  },
  data() {
    return {
      loaded: false,
      companyId: null,
      companies: [],
      error: null,
    };
  },
  mounted() {
    this.companyId = this.$route.params.id;
    this.getCompany();
  },
  methods: {
    async getCompany() {
      this.loaded = false;
      try {
        const company = await CompanyService.getCompany(this.companyId);
        this.companies.push(company); // add to array
        this.loaded = true;
      } catch (error) {
        this.error = error.message;
      }
    },
    goEdit() {
      this.$router.push({ path: `/edit-company/${this.companyId}` });
    },
  },
};
</script>
