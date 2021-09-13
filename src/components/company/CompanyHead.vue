<template>
  <div>
    <strong class="text-muted d-block mb-2">Руководитель компании</strong>
    <d-row>
      <d-col cols="12" md="4" lg="4">
        <label>Выбрать руководителя</label>
        <v-select
          class="mb-3"
          label="fullName"
          v-model="employee"
          :options="c_employees"
          :reduce="(el) => el"
          required
        />
      </d-col>
    </d-row>
    <template v-if="employee">
      <d-row>
        <d-col>
          <label>Должность руководителя:</label>
          <p>{{ employee.position.name }}</p>
        </d-col>
      </d-row>
      <d-row>
        <d-col cols="12" md="6" lg="4">
          <label>Телефон Руководителя:</label>
          <p>{{ employee.phone }}</p>
        </d-col>
        <d-col cols="12" md="6" lg="8">
          <label>Email Руководителя:</label>
          <p>{{ employee.email }}</p>
        </d-col>
      </d-row>
    </template>
  </div>
</template>

<script>
import EMPLOYEES from "../../graphql/queries/EmployeesList";

export default {
  name: "company-head",
  apollo: {
    employees: {
      query: EMPLOYEES,
    },
  },
  data() {
    return {
      employees: [],
      employee: null,
      companyHead: {},
    };
  },
  computed: {
    c_employees: function () {
      return this.employees.map(
        (el) =>
          ({ ...el, fullName: `${el.last_name} ${el.first_name} ${el.middle_name}`})
      );
    },
  },
};
</script>
