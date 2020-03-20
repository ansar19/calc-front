<template>
  <d-card class="card-small mb-3">
    <d-card-header class="border-bottom">
      <h6 class="card-title">Укажите данные&nbsp;первого руководителя</h6>
    </d-card-header>
    <d-card-body>
      <d-form class="add-company-head" @submit="addCompanyHead">
        <d-row>
          <d-col cols="12" md="4" lg="4">
            <label>Фамилия Руководителя:</label>
            <input
              class="mb-3 form-control"
              name="CompanyHeadSurename"
              v-model="companyHeadSurename"
              v-validate="'required|min:2'"
              data-vv-as="Фамилия Руководителя"
              placeholder="Введите Фамилию руководителя"
            >
            <d-form-invalid-feedback>{{ errorBags.first('CompanyHeadSurename') }}</d-form-invalid-feedback>
          </d-col>
          <d-col cols="12" md="4" lg="4">
            <label>Имя Руководителя:</label>
            <input
              class="mb-3 form-control"
              name="CompanyHeadFirstname"
              v-model="companyHeadFirstname"
              v-validate="'required|min:2'"
              data-vv-as="Имя Руководителя"
              placeholder="Введите Имя руководителя"
            >
            <d-form-invalid-feedback>{{ errorBags.first('CompanyHeadFirstname') }}</d-form-invalid-feedback>
          </d-col>
          <d-col cols="12" md="4" lg="4">
            <label>Отчество Руководителя:</label>
            <d-input
              class="mb-3"
              v-model="companyHeadPatronyme"
              placeholder="Введите Отчество руководителя"
            />
          </d-col>
        </d-row>
        <d-row>
          <d-col>
            <label>Должность руководителя:</label>
            <d-input
              class="mb-3"
              v-model="companyHeadPosition"
              placeholder="Введите Должность руководителя"
            />
          </d-col>
        </d-row>
        <d-row>
          <d-col cols="12" md="6" lg="4">
            <label>Телефон Руководителя:</label>
            <d-input-group prepend="+7" class="mb-3">
              <d-input
                placeholder="7777019988"
                v-model="companyHeadPhone"
                id="phoneNumber"
              />
            </d-input-group>
          </d-col>
          <d-col cols="12" md="6" lg="8">
            <label>Email Руководителя:</label>
            <input
              id="CompanyHeadEmail"
              class="form-control"
              v-validate="{ required: true, email: true }"
              data-vv-as="Email Руководителя"
              v-model="companyHeadEmail"
              type="email"
              name="CompanyHeadEmail"
            >
            <d-form-valid-feedback>Отлично!</d-form-valid-feedback>
            <d-form-invalid-feedback>{{ errorBags.first('CompanyHeadEmail') }}</d-form-invalid-feedback>
            <small
              class="form-text text-muted"
            >Мы никогда не передадим вашу электронную почту кому-либо еще.</small>
          </d-col>
        </d-row>
      </d-form>
      <d-card-footer>
        <div class="d-flex">
          <d-link @click="goBack">Отменить</d-link>
          <button
          class="btn btn-success ml-auto"
          @click.prevent="addCompanyHead"
          type="submit"
        >Сохранить</button>
        </div>
      </d-card-footer>
    </d-card-body>
  </d-card>
</template>

<script>
import axios from 'axios';

const baseURL = 'https://ecoapikz.herokuapp.com/companyheads';

export default {
  name: 'editor',
  data() {
    return {
      companyheads: [],
      companyHeadFirstname: '',
      companyHeadSurename: '',
      companyHeadPatronyme: '',
      companyHeadPosition: '',
      companyHeadPhone: '',
      companyHeadEmail: '',
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);
      this.companyheads = res.data;
      this.loading = false;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    // handleOnSubmit(e) {
    //   e.preventDefault();
    //   // eslint-disable-next-line
    //   alert(JSON.stringify(this.company));
    // },
    async addCompanyHead() {
      const res = await axios.post(baseURL, {
        companyHeadFirstname: this.companyHeadFirstname,
        companyHeadSurename: this.companyHeadSurename,
        companyHeadPatronyme: this.companyHeadPatronyme,
        companyHeadPosition: this.companyHeadPosition,
        companyHeadPhone: this.companyHeadPhone,
        companyHeadEmail: this.companyHeadEmail,
      });

      this.companyheads = [...this.companyheads, res.data];

      this.companyHeadFirstname = '';
      this.companyHeadSurename = '';
      this.companyHeadPatronyme = '';
      this.companyHeadPosition = '';
      this.companyHeadPhone = '';
      this.companyHeadEmail = '';
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {},
};
</script>
