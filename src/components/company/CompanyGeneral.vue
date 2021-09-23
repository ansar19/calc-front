<template>
  <div>
    <label for="iin_bin">БИН или ИНН:</label>
    <input
      id="iin_bin"
      type="text"
      name="iin_bin"
      v-validate="'required|digits:12'"
      v-model="company.iin_bin"
      class="mb-3 form-control"
      placeholder="Введите БИН или ИНН"
    />
    <d-form-invalid-feedback
      >{{ errorBags.first("iin_bin") }}.</d-form-invalid-feedback
    >
    <d-row>
      <d-col cols="12" md="6" lg="8">
        <label>Наименование компании:</label>
        <input
          id="company_name"
          type="text"
          v-model="company.company_name"
          v-validate="'required|min:2'"
          class="mb-3 form-control"
          placeholder="Введите наименование компании без указания формы собственности"
        />
        <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
        <d-form-invalid-feedback
          >{{ errorBags.first("company_name") }}.</d-form-invalid-feedback
        >
      </d-col>
      <d-col cols="12" md="6" lg="4">
        <spinner v-if="loading" />
        <div v-else-if="error">Ошибка: error.message</div>
        <div class="form-group" v-else-if="company_types">
          <label>Тип юр лица:</label>
          <v-select
            class="mb-3"
            label="name"
            v-model="company.type"
            :options="company_types"
            :reduce="(company_type) => company_type.id"
            required
          />
        </div>
        <d-form-invalid-feedback>{{
          errorBags.first("CompanyType")
        }}</d-form-invalid-feedback>
      </d-col>
    </d-row>
    <d-row>
      <d-col cols="12" md="6" lg="6">
        <div class="form-group">
          <label for="companyEmail">Email Компании</label>
          <input
            name="companyEmail"
            v-model="c_company_email"
            v-validate="{ required: true, email: true }"
            class="mb-2 mr-sm-2 mb-sm-0 form-control"
            placeholder="email@example.com"
          />
          <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
          <d-form-invalid-feedback>{{
            errorBags.first("companyEmail")
          }}</d-form-invalid-feedback>
          <small class="form-text text-muted">
            Мы никогда не передадим вашу электронную почту кому-либо еще.
          </small>
        </div>
      </d-col>
      <d-col cols="12" md="6" lg="6">
        <label>Телефон компании:</label>
        <d-input-group prepend="+7" class="mb-3">
          <d-input
            placeholder="7777019988"
            name="phoneNumber"
            v-model="c_company_phone"
          />
        </d-input-group>
      </d-col>
    </d-row>
    <d-row>
      <d-col cols="12" md="12" lg="12">
        <label>Описание компании:</label>
        <textarea
          class="form-control"
          v-model="c_company_description"
          placeholder="Введите описание компании"
          :rows="2"
          :max-rows="6"
        ></textarea>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import COMPANY_TYPES from "../../graphql/queries/CompanyTypes";
import { useQuery, useResult } from "@vue/apollo-composable";

export default {
  name: "company-general",
  props: {
    company: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { result, loading, error } = useQuery(COMPANY_TYPES)
    const company_types = useResult(result, null, (data) => data.company_types)

    return { company_types, loading, error }
  },

  computed: {
    ...mapState("company", [
      "company_name",
      "iin_bin",
      "company_type",
      "company_email",
      "company_phone",
      "company_description",
    ]),

    c_iin_bin: {
      get() {
        return this.iin_bin;
      },
      set(val) {
        this.SET_IIN_BIN(val);
      },
    },

    c_company_name: {
      get() {
        return this.company_name;
      },
      set(val) {
        this.SET_COMPANY_NAME(val);
      },
    },

    c_company_name: {
      get() {
        return this.company_name;
      },
      set(val) {
        this.SET_COMPANY_NAME(val);
      },
    },

    c_company_type: {
      get() {
        return this.company_type;
      },
      set(val) {
        this.SET_COMPANY_TYPE(val);
      },
    },

    c_company_phone: {
      get() {
        return this.company_phone;
      },
      set(val) {
        this.SET_COMPANY_PHONE(val);
      },
    },

    c_company_description: {
      get() {
        return this.company_description;
      },
      set(val) {
        this.SET_COMPANY_DESCRIPTION(val);
      },
    },
  },
  methods: {
    ...mapMutations("company", [
      "SET_COMPANY_NAME",
      "SET_IIN_BIN",
      "SET_COMPANY_TYPE",
      "SET_COMPANY_EMAIL",
      "SET_COMPANY_PHONE",
      "SET_COMPANY_DESCRIPTION",
    ]),
  },
};
</script>
