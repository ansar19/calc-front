<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Компания</span>
        <h3 class="page-title">Карточка компании</h3>
      </d-col>
    </d-row>
    <d-row>
      <!-- Add new company -->
      <d-col lg="12" md="12">
        <d-card class="card-small mb-3">
          <d-card-body>
            <!-- <div v-if="loading">
        данные загружаются...
            </div> v-else-->
            <d-form class="company" @submit="addCompany" validate>
              <!-- Company General Block -->
              <company-general
                :company="companies.companyGeneral"
                @input="(newGeneral) => {companyGeneral = newGeneral}"
              ></company-general>
              <!-- End Company General Block -->
              <!-- Company Head Block -->
              <hr />
              <company-head
                :companyHead="companies.companyHead"
                @input="(newHead) => {companyHead = newHead}"
              ></company-head>
              <!-- End Company Head Block -->
              <!-- bank details -->
              <hr />
              <strong class="text-muted d-block mb-2">Банковские детали</strong>
              <company-bank-details
                :companyBankAccounts="companies.companyAccounts"
                @input="(newBankAccounts) => {companyBankAccounts = newBankAccounts}"
              ></company-bank-details>
              <hr />
              <!-- address -->
              <company-address
                :companyAddress="companies.companyAddress"
                @input="(newAddress) => {companyAddress = newAddress}"
              ></company-address>
              <!-- end of address -->
              <d-row>
                <d-col cols="12" md="12" lg="12">
                  <div class="form-group mt-2">
                    <d-form-checkbox class="mt-3" id="agree" v-model="companies.tos" value="true">
                      Нажимая
                      кнопку "Сохранить" вы соглашаетесь с условиями
                      <router-link to="offer" target="_blank">публичной офферты</router-link>
                    </d-form-checkbox>
                  </div>
                </d-col>
              </d-row>
            </d-form>
          </d-card-body>
          <d-card-footer class="border-top">
            <div class="d-flex">
              <d-link @click="goBack">Отменить</d-link>
              <button
                class="btn btn-success ml-auto"
                :disabled="!companies.tos"
                @click.prevent="addCompany"
                type="submit"
              >Сохранить</button>
            </div>
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import vSelect from 'vue-select';
import axios from 'axios';
import CompanyBankDetails from '@/components/company/CompanyBankDetails.vue';
import CompanyGeneral from '@/components/company/CompanyGeneral.vue';
import CompanyHead from '@/components/company/CompanyHead.vue';
import CompanyAddress from '@/components/company/CompanyAddress.vue';

const baseURL = 'http://localhost:3000/companies';

export default {
  name: 'editor',
  components: {
    CompanyBankDetails,
    CompanyGeneral,
    CompanyHead,
    CompanyAddress,
  },
  data() {
    return {
      payload: {},
      companies: {
        companyGeneral: {
          companyName: '',
          binInn: '',
          companyType: '',
          companyEmail: '',
          companyPhone: '',
          companyDescription: '',
        },
        companyHead: {
          companyHeadFirstname: '',
          companyHeadSurename: '',
          companyHeadPatronyme: '',
          companyHeadPosition: '',
          companyHeadPhone: '',
          companyHeadEmail: '',
        },
        companyAddress: {
          legal: {
            country: '',
            oblast: '',
            settlement: '',
            address: '',
            zip: '',
          },
          actual: {
            country: '',
            oblast: '',
            settlement: '',
            address: '',
            zip: '',
            addressComments: '',
          },
        },
        companyAccounts: [
          {
            iban: '',
            currency: '',
            bank: '',
          },
        ],
        tos: true,
      },
      //
      company: {
        label: {
          type: String,
          default: 'label',
        },

        // account: {},
        // bank_accounts: [
        //   {
        //     iban: "",
        //     currency: "kzt",
        //     bank: []
        //   }
        // ]
      },
      loading: true,
    };
  },
  methods: {
    async addCompany() {
      const {
        companyName,
        binInn,
        companyEmail,
        companyPhone,
        companyDescription,
        companyType,
      } = this.companies.companyGeneral;
      const res = await axios.post(baseURL, {
        companyName,
        binInn,
        companyEmail,
        companyPhone,
        companyDescription,
        companyType,

        companyHead: this.companies.companyHead,
        companyAddress: this.companies.companyAddress,
        companyAccounts: this.companies.companyAccounts,
        tos: this.companies.tos,
      });

      this.companies = res.data;
      this.$router.push({ name: 'companies' });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
/*prevent bootstrap-vue css conflict with v-select*/
.v-select.dropdown .dropdown-toggle::after {
  content: inherit;
}

.v-select.dropdown .form-control {
  height: inherit;
}
</style>
