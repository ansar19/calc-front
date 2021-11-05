<template>
  <div>
    <strong class="text-muted d-block mb-2">Руководитель компании</strong>
    <d-row>
      <d-col>
        <label for="name">ФИО руководителя</label>
        <input
          id="name"
          type="text"
          name="name"
          v-validate="'required|digits:12'"
          v-model="companyHead.company_head"
          class="mb-3 form-control"
          placeholder="Введите полное имя руководителя компании"
        />
      </d-col>
      <d-col>
        <label for="position">Должность руководителя:</label>
        <input
          id="position"
          type="text"
          name="position"
          v-model="companyHead.company_head_position"
          class="mb-3 form-control"
          placeholder="Введите должность руководителя компании"
        />
      </d-col>
    </d-row>
    <d-row>
      <d-col>
        <label for="phone">Телефон руководителя:</label>
        <input
          id="phone"
          type="text"
          name="phone"
          v-model="companyHead.company_head_phone"
          class="mb-3 form-control"
          placeholder="Введите номер телефона руководителя компании"
        />
      </d-col>
      <d-col>
        <label for="email">Email Руководителя:</label>
        <input
          id="email"
          type="text"
          name="email"
          v-model="companyHead.company_head_email"
          class="mb-3 form-control"
          placeholder="Введите email руководителя компании"
        />
      </d-col>
    </d-row>
  </div>
</template>

<script>
import EMPLOYEES from "../../graphql/queries/EmployeesList";

export default {
  name: "company-head",
  props: {
    companyHead: {
      type: Object,
      required: true,
    },
  },
};
</script>
