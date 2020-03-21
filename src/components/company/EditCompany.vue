<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Компания</span>
        <h3 class="page-title">Редактирование компании</h3>
      </d-col>
    </d-row>
    <d-row>
      <!-- Edit company -->
      <d-col lg="12" md="12">
        <d-card class="card-small mb-3">
          <d-card-body>
            <div v-if="!loaded">Загружаем данные...</div>
            <div v-else>
              <!-- @submit="updateCompany"  -->
              <d-form class="company" validate>
                <!--- Start Company General Block -->
                <company-general
                  :company="companies.companyGeneral"
                  @input="(newGeneral) => {companyGeneral = newGeneral}"
                ></company-general>
                <!--- End Company General Block -->
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

                <!-- end bank details -->
                <hr />
                <!-- address -->
                <company-address
                  :companyAddress="companies.companyAddress"
                  @input="(newAddress) => {companyAddress = newAddress}"
                ></company-address>
                <!-- end of address -->
                <!-- <d-row>
                  <d-col cols="12" md="12" lg="12">
                    <div class="form-group mt-2">
                      <d-form-checkbox class="mt-3" id="agree" v-model="companies.tos" value="true">
                        Нажимая
                        кнопку "Сохранить" вы соглашаетесь с условиями
                        <router-link to="offer" target='_blank'>публичной офферты</router-link>
                      </d-form-checkbox>
                    </div>
                  </d-col>
                </d-row>-->
              </d-form>
            </div>
          </d-card-body>
          <d-card-footer class="border-top">
            <div class="d-flex">
              <d-link @click="goBack">Отменить</d-link>
              <button
                class="btn btn-success ml-auto"
                @click.prevent="updateCompany"
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
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import vSelect from 'vue-select';
import CompanyGeneral from '@/components/company/CompanyGeneral.vue';
import CompanyHead from '@/components/company/CompanyHead.vue';
import CompanyBankDetails from '@/components/company/CompanyBankDetails.vue';
import CompanyAddress from '@/components/company/CompanyAddress.vue';

const baseURL = 'https://ecoapikz.herokuapp.com/companies';
const CompanyService = {};
// eslint-disable-next-line consistent-return
CompanyService.getCompany = async (id) => {
  try {
    const result = await axios.get(`${baseURL}/${id}`);
    const companies = {
    //   name: result.data.name,
      companyGeneral: {
        binInn: result.data.binInn,
        companyName: result.data.companyName,
        companyType: result.data.companyType,
        companyPhone: result.data.companyPhone,
        companyEmail: result.data.companyEmail,
        companyDescription: result.data.companyDescription,
      },
      companyHead: result.data.companyHead,
      companyAccounts: result.data.companyAccounts,
      companyAddress: result.data.companyAddress,
    };
    return companies;
  } catch (error) {
    //     const errorStatus = error.response.status;
    //     let errorMessage = '';
    //     if (errorStatus === 404) {
    //       errorMessage = 'Компания не найдена';
    //     } else {
    //       errorMessage = 'Произошла ошибка';
    //     }
    //     throw new Error(errorMessage);
  }
};

export default {
  name: 'edit-company',
  components: {
    CompanyGeneral, CompanyHead, CompanyBankDetails, CompanyAddress,
  },
  data() {
    return {
      loaded: false,
      companyId: null,
      companies: {},
      error: null,
      countryOptions: ['Казахстан'],
      locations: [
        {
          name: 'г. Алматы',
          cities: ['Алматы'],
        },
        {
          name: 'г. Нур-Султан',
          cities: ['Нур-Султан'],
        },
        {
          name: 'г. Шымкент',
          cities: ['Шымкент'],
        },
        {
          name: 'Акмолинская',
          cities: [
            'Кокшетау',
            'Степногорск',
            'Щучинск',
            'Атбасар',
            'Макинск',
            'Акколь',
            'Есиль',
            'Ерейментау',
            'Державинск',
            'Степняк',
          ],
        },
        {
          name: 'Актюбинская',
          cities: [
            'Актобе',
            'Кандагач',
            'Шалкар',
            'Хромтау',
            'Алга',
            'Эмба',
            'Темир',
            'Жем',
          ],
        },
        {
          name: 'Алматинская',
          cities: [
            'Каскелен',
            'Талгар',
            'Капшагай',
            'Жаркент',
            'Есик',
            'Текели',
            'Уштобе',
            'Ушарал',
            'Сарканд',
          ],
        },
        {
          name: 'Атырауская',
          cities: ['Атырау', 'Кульсары '],
        },
        {
          name: 'Восточно-Казахстанская',
          cities: [
            'Усть-Каменогорск',
            'Риддер',
            'Аягоз',
            'Зыряновск',
            'Шемонаиха',
            'Зайсан',
            'Курчатов',
            'Серебрянск',
            'Чарск',
          ],
        },
        {
          name: 'Жамбылская',
          cities: ['Тараз', 'Шу', 'Каратау', 'Жанатас'],
        },
        {
          name: 'Западно-Казахстанская',
          cities: ['Уральск', 'Аксай'],
        },
        {
          name: 'Карагандинская',
          cities: [
            'Караганда',
            'Жезказган',
            'Балхаш',
            'Сатпаев',
            'Сарань',
            'Шахтинск',
            'Абай',
            'Приозёрск',
            'Каражал',
            'Каркаралинск',
          ],
        },
        {
          name: 'Костанайская',
          cities: ['Костанай', 'Лисаковск', 'Житикара', 'Аркалык'],
        },
        {
          name: 'Кызылординская',
          cities: ['Кызылорда', 'Байконур', 'Аральск', 'Казалинск'],
        },
        {
          name: 'Мангистауская',
          cities: ['Актау', 'Жанаозен', 'Форт-Шевченко'],
        },
        {
          name: 'Павлодарская',
          cities: ['Павлодар', 'Аксу'],
        },
        {
          name: 'Северо-Казахстанская',
          cities: [
            'Петропавловск',
            'Тайынша',
            'Булаево',
            'Сергеевка',
            'Мамлютка',
          ],
        },
        {
          name: 'Туркестанская',
          cities: [
            'Кентау',
            'Сарыагаш',
            'Арыс',
            'Шардара',
            'Жетысай',
            'Ленгер',
          ],
        },
      ],
      companyTypeOption: [
        {
          id: 1,
          value: 'too',
          text: 'Товарищество с ограниченной ответственностью',
          label: 'Товарищество с ограниченной ответственностью',
        },
        {
          id: 2,
          value: 'ip',
          text: 'Индивидуальный предприниматель',
          label: 'Индивидуальный предприниматель',
        },
        {
          id: 3,
          value: 'jsc',
          text: 'Акционерное общество',
          label: 'Акционерное общество',
        },
        {
          id: 4,
          value: 'statecompany',
          text: 'Государственное предприятие',
          label: 'Государственное предприятие',
        },
        {
          id: 5,
          value: 'statecompanybusinessright',
          text: 'Государственное предприятие на праве хозяйственного ведения',
          label: 'Государственное предприятие на праве хозяйственного ведения',
        },
        {
          id: 6,
          value: 'kazennoe',
          text: 'Государственное предприятие на праве оперативного управления (казенное)',
          label: 'Государственное предприятие на праве оперативного управления (казенное)',
        },
        {
          id: 7,
          value: 'businesspartnerships',
          text: 'Хозяйственное товарищество',
          label: 'Хозяйственное товарищество',
        },
        {
          id: 8,
          value: 'fullpartnerships',
          text: 'Полное товарищество',
          label: 'Полное товарищество',
        },
        {
          id: 9,
          value: 'limitedpartnership',
          text: 'Коммандитное  товарищество',
          label: 'Коммандитное  товарищество',
        },
        {
          id: 10,
          value: 'additionalliabilitypartnerships',
          text: 'Товарищество с дополнительной ответственностью',
          label: 'Товарищество с дополнительной ответственностью',
        },
        {
          id: 11,
          value: 'productioncooperatives',
          text: 'Производственный кооператив',
          label: 'Производственный кооператив',
        },
        {
          id: 12,
          value: 'institution',
          text: 'Учреждение',
          label: 'Учреждение',
        },
        {
          id: 13,
          value: 'publicassociations',
          text: 'Общественное объединение',
          label: 'Общественное объединение',
        },
        {
          id: 14,
          value: 'consumercooperatives',
          text: 'Потребительский кооператив',
          label: 'Потребительский кооператив',
        },
        {
          id: 15,
          value: 'fund',
          text: 'Фонд',
          label: 'Фонд',
        },
        {
          id: 16,
          value: 'religiousassociation',
          text: 'Религиозное объединение',
          label: 'Религиозное объединение',
        },
        {
          id: 17,
          value: 'legalentitiesassociation',
          text: 'Объединение юридических лиц в форме ассоциации',
          label: 'Объединение юридических лиц в форме ассоциации',
        },
        {
          id: 18,
          value: 'agriculturalpartnership',
          text: 'Сельскохозяйственное товарищество',
          label: 'Сельскохозяйственное товарищество',
        },
        {
          id: 19,
          value: 'personalentrepreneur',
          text: 'Личный предприниматель',
          label: 'Личный предприниматель',
        },
        {
          id: 20,
          value: 'individualentrepreneurshipbasedonjointventures',
          text: 'Индивидуальное предпринимательство на основе совместного предпринимательства',
          label: 'Индивидуальное предпринимательство на основе совместного предпринимательства',
        },
        {
          id: 21,
          value: 'simplepartnership',
          text: 'Простое товарищество',
          label: 'Простое товарищество',
        },
      ],
      bankOptions: [
        {
          value: 'halyk',
          text: 'Народный банк Казахстана',
          label: 'Народный банк Казахстана',
        },
        {
          value: 'nurbank',
          text: 'Нурбанк',
          label: 'Нурбанк',
        },
        {
          value: 'sberbank',
          text: 'Сбербанк России',
          label: 'Сбербанк России',
        },
        {
          value: 'homecredit',
          text: 'Хоум Кредит энд Финанс Банк',
          label: 'Хоум Кредит энд Финанс Банк',
        },
        {
          value: 'eurasian',
          text: 'Евразийский',
          label: 'Евразийский',
        },
        {
          value: 'altyn',
          text: 'Altyn Bank («Народный банк Казахстана»)',
          label: 'Altyn Bank («Народный банк Казахстана»)',
        },
        {
          value: 'capital',
          text: 'Capital Bank Kazakhstan',
          label: 'Capital Bank Kazakhstan',
        },
        {
          value: 'jysan',
          text: 'First Heartland Jýsan Bank',
          label: 'First Heartland Jýsan Bank',
        },
        {
          value: 'forte',
          text: 'ForteBank',
          label: 'ForteBank',
        },
        {
          value: 'kzi',
          text: 'KZI Bank (Казахстан Зират Интернешнл)',
          label: 'KZI Bank (Казахстан Зират Интернешнл)',
        },
        {
          value: 'tengri',
          text: 'Tengri Bank (Punjab National Bank)',
          label: 'Tengri Bank (Punjab National Bank)',
        },
        {
          value: 'asia',
          text: 'Азия Кредит Банк',
          label: 'Азия Кредит Банк',
        },
        {
          value: 'alfa',
          text: 'Альфа-Банк',
          label: 'Альфа-Банк',
        },
        {
          value: 'atf',
          text: 'АТФБанк',
          label: 'АТФБанк',
        },
        {
          value: 'rbk',
          text: 'Банк "Bank RBK"',
          label: 'Банк "Bank RBK"',
        },
        {
          value: 'kassanova',
          text: 'Банк Kassa Nova',
          label: 'Банк Kassa Nova',
        },
        {
          value: 'vtb',
          text: 'Банк ВТБ',
          label: 'Банк ВТБ',
        },
        {
          value: 'bcc',
          text: 'Банк ЦентрКредит',
          label: 'Банк ЦентрКредит',
        },
        {
          value: 'eurasian',
          text: 'Евразийский банк',
          label: 'Евразийский банк',
        },
        {
          value: 'zssb',
          text: 'Жилстройсбербанк Казахстана',
          label: 'Жилстройсбербанк Казахстана',
        },
        {
          value: 'zaman',
          text: 'Заман-Банк',
          label: 'Заман-Банк',
        },
        {
          value: 'alhilal',
          text: 'Исламский Банк "Al-Hilal"',
          label: 'Исламский Банк "Al-Hilal"',
        },
      ],
      currencyOptions: [
        {
          value: null,
          text: 'Пожалуйста выберите валюту',
        },
        {
          value: 'kzt',
          text: 'KZT',
        },
        {
          value: 'usd',
          text: 'USD',
        },
        {
          value: 'eur',
          text: 'EUR',
        },
      ],
    };
  },
  mounted() {
    this.companyId = this.$route.params.id;
    this.getCompany();
  },
  computed: {
    // availableCitiesLegal() {
    //   return this.companyAddress.legal.oblast ? this.companyAddress.legal.oblast.cities : false;
    // },
    // availableCitiesActual() {
    //   return this.c.companyAddress.actual.oblast ? this.c.companyAddress.actual.oblast.cities : false;
    // },
  },
  methods: {
    async getCompany() {
      this.loaded = false;
      try {
        const company = await CompanyService.getCompany(this.companyId);
        this.companies = company; // add to array
        this.loaded = true;
      } catch (error) {
        this.error = error.message;
      }
    },
    async updateCompany() {
      const {
        companyName,
        binInn,
        companyEmail,
        companyPhone,
        companyDescription,
        companyType,
      } = this.companies.companyGeneral;
      const res = await axios.put(`${baseURL}/${this.companyId}`, {
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
    removeAccount(index) {
      this.companies.companyAccounts.splice(index, 1);
    },
    addAccount(event) {
      event.preventDefault();
      this.company.bank_accounts.push({
        iban: '',
        currency: '',
        bank: '',
      });
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
