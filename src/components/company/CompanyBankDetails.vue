<template>
  <div>
    <d-form class="new-bank-details">
      <d-row v-for="(account, index) in companyBankAccounts" :key="index">
        <d-col cols="12" md="4" lg="4">
          <label>IBAN:</label>
          <div class="form-group">
            <d-input
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="KZCC БББХ ХХХХ ХХХХ ХХХХ"
              v-model="account.iban"
              name="accounts[][iban]"
              required
            />
          </div>
        </d-col>
        <d-col cols="12" md="2" lg="2">
          <label>Валюта:</label>
          <div class="form-group">
            <v-select
              label="short_name"
              v-model="account.currency"
              :options="currencies"
              required
            ></v-select>
          </div>
        </d-col>
        <d-col cols="12" md="4" lg="4">
          <label>Банк:</label>
          <div class="form-group">
            <v-select
              label="name"
              v-model="account.bank"
              :options="banks"
              required
            ></v-select>
          </div>
        </d-col>
        <d-col cols="12" md="2" lg="2" class="text-center">
          <label>Действия:</label>
          <div class="form-group">
            <d-button
              size="sm"
              class="btn-danger mb-2"
              @click.prevent="removeAccount(index)"
            >
              <i class="material-icons">delete</i>
            </d-button>
          </div>
        </d-col>
      </d-row>
      <d-row>
        <d-col cols="12" md="6" lg="8"></d-col>
        <d-col cols="12" md="6" lg="4">
          <!-- Using @click -->
          <button class="btn btn-primary" @click.prevent="addAccount">
            Добавить Счет
          </button>
        </d-col>
      </d-row>
    </d-form>
  </div>
</template>

<script>
import CURRENCIES from '../../graphql/CurrencyList.gql'
import BANKS from '../../graphql/BankList.gql'

export default {
  name: "company-bank-details",
  apollo: {
    currencies: {
      query: CURRENCIES
    },
    banks: {
      query: BANKS
    }
  },
  props: {
    companyBankAccounts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currencyOptions: [
        {
          value: null,
          text: "Пожалуйста выберите валюту",
        },
        {
          value: "kzt",
          text: "KZT",
        },
        {
          value: "usd",
          text: "USD",
        },
        {
          value: "eur",
          text: "EUR",
        },
      ],
      bankOptions: [
        {
          value: "halyk",
          text: "Народный банк Казахстана",
          label: "Народный банк Казахстана",
        },
        {
          value: "nurbank",
          text: "Нурбанк",
          label: "Нурбанк",
        },
        {
          value: "sberbank",
          text: "Сбербанк России",
          label: "Сбербанк России",
        },
        {
          value: "homecredit",
          text: "Хоум Кредит энд Финанс Банк",
          label: "Хоум Кредит энд Финанс Банк",
        },
        {
          value: "eurasian",
          text: "Евразийский",
          label: "Евразийский",
        },
        {
          value: "altyn",
          text: "Altyn Bank («Народный банк Казахстана»)",
          label: "Altyn Bank («Народный банк Казахстана»)",
        },
        {
          value: "capital",
          text: "Capital Bank Kazakhstan",
          label: "Capital Bank Kazakhstan",
        },
        {
          value: "jysan",
          text: "First Heartland Jýsan Bank",
          label: "First Heartland Jýsan Bank",
        },
        {
          value: "forte",
          text: "ForteBank",
          label: "ForteBank",
        },
        {
          value: "kzi",
          text: "KZI Bank (Казахстан Зират Интернешнл)",
          label: "KZI Bank (Казахстан Зират Интернешнл)",
        },
        {
          value: "tengri",
          text: "Tengri Bank (Punjab National Bank)",
          label: "Tengri Bank (Punjab National Bank)",
        },
        {
          value: "asia",
          text: "Азия Кредит Банк",
          label: "Азия Кредит Банк",
        },
        {
          value: "alfa",
          text: "Альфа-Банк",
          label: "Альфа-Банк",
        },
        {
          value: "atf",
          text: "АТФБанк",
          label: "АТФБанк",
        },
        {
          value: "rbk",
          text: 'Банк "Bank RBK"',
          label: 'Банк "Bank RBK"',
        },
        {
          value: "kassanova",
          text: "Банк Kassa Nova",
          label: "Банк Kassa Nova",
        },
        {
          value: "vtb",
          text: "Банк ВТБ",
          label: "Банк ВТБ",
        },
        {
          value: "bcc",
          text: "Банк ЦентрКредит",
          label: "Банк ЦентрКредит",
        },
        {
          value: "eurasian",
          text: "Евразийский банк",
          label: "Евразийский банк",
        },
        {
          value: "zssb",
          text: "Жилстройсбербанк Казахстана",
          label: "Жилстройсбербанк Казахстана",
        },
        {
          value: "zaman",
          text: "Заман-Банк",
          label: "Заман-Банк",
        },
        {
          value: "alhilal",
          text: 'Исламский Банк "Al-Hilal"',
          label: 'Исламский Банк "Al-Hilal"',
        },
      ],
      accounts: [
        {
          iban: "",
          currency: "kzt",
          bank: [],
        },
      ],
    };
  },
  computed: {},
  methods: {
    removeAccount(index) {
      this.companyBankAccounts.splice(index, 1);
    },
    addAccount(event) {
      event.preventDefault();
      this.companyBankAccounts.push({
        iban: "",
        currency: null,
        bank: [],
      });
    },
  },
  mounted() {},
};
</script>
