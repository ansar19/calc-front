<template>
  <div>
    <strong class="text-muted d-block mb-2">Руководитель компании</strong>
    <d-row>
      <d-col cols="12" md="4" lg="4">
        <label>Фамилия Руководителя:</label>
        <input
          class="mb-3 form-control"
          name="chief_last_name"
          v-model="companyHead.companyHeadSurename"
          v-validate="'required|min:2'"
          data-vv-as="Фамилия Руководителя"
          placeholder="Введите Фамилию руководителя"
        />
        <d-form-invalid-feedback>{{ errorBags.first('chief_last_name') }}</d-form-invalid-feedback>
      </d-col>
      <d-col cols="12" md="4" lg="4">
        <label>Имя Руководителя:</label>
        <input
          class="mb-3 form-control"
          name="chief_first_name"
          v-model="companyHead.companyHeadFirstname"
          v-validate="'required|min:2'"
          data-vv-as="Имя Руководителя"
          placeholder="Введите Имя руководителя"
        />
        <d-form-invalid-feedback>{{ errorBags.first('chief_first_name') }}</d-form-invalid-feedback>
      </d-col>
      <d-col cols="12" md="4" lg="4">
        <label>Отчество Руководителя:</label>
        <d-input
          class="mb-3"
          v-model="companyHead.companyHeadPatronyme"
          placeholder="Введите Отчество руководителя"
        />
      </d-col>
    </d-row>
    <d-row>
      <d-col>
        <label>Должность руководителя:</label>
        <d-input
          class="mb-3"
          v-model="companyHead.companyHeadPosition"
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
            v-model="companyHead.companyHeadPhone"
            id="phoneNumber"
          />
        </d-input-group>
      </d-col>
      <d-col cols="12" md="6" lg="8">
        <label>Email Руководителя:</label>
        <input
          id="chief_email"
          class="form-control"
          v-validate="{ required: true, email: true }"
          data-vv-as="Email Руководителя"
          v-model="companyHead.companyHeadEmail"
          type="email"
          name="chief_email"
        />
        <d-form-valid-feedback>Отлично!</d-form-valid-feedback>
        <d-form-invalid-feedback>{{ errorBags.first('chief_email') }}</d-form-invalid-feedback>
        <small class="form-text text-muted">
          Мы никогда не передадим вашу электронную почту кому-либо
          еще.
        </small>
      </d-col>
    </d-row>
  </div>
</template>

<script>
export default {
  name: 'company-head',
  props: {
    companyHead: {
      type: Object,
      required: true,
    },
  },
};
</script>
