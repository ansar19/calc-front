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
