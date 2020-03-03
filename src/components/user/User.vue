<template>
  <d-card class="card-small mb-3">
    <d-card-body>
      <d-form class="new-user" @submit="saveEmployee" validate>
        <d-row>
          <d-col cols="12" md="6" lg="6">
            <div class="form-group">
              <label for="userEmail">Email:</label>
              <input name="userEmail" class="mb-2 mr-sm-2 mb-sm-0 form-control" v-model="users.userEmail"
                v-validate="{ required: true, email: true }" data-vv-as="Email Пользователя"
                placeholder="email@example.com">
              <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
              <d-form-invalid-feedback>{{ errorBags.first('userEmail') }}</d-form-invalid-feedback>
              <small class="form-text text-muted">Мы никогда не передадим вашу электронную почту кому-либо еще.</small>
            </div>
          </d-col>
          <d-col cols="12" md="6" lg="6">
            <label>Телефон:</label>
            <d-input-group prepend="+7" class="mb-3">
              <d-input placeholder="7777019988" id="phoneNumber" v-model="users.userPhone" />
            </d-input-group>
          </d-col>
        </d-row>

        <d-row>
          <d-col cols="12" md="4" lg="4">
            <div class="form-group">
              <label for="userSurename">Фамилия</label>
              <input name="userSurename" class="mb-2 mr-sm-2 mb-sm-0 form-control" v-model="users.surename"
                v-validate="'required|min:2'" data-vv-as="Фамилия Пользователя"
                placeholder="Введите Фамилию">
              <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
              <d-form-invalid-feedback>{{ errorBags.first('userSurename') }}</d-form-invalid-feedback>
              <small class="form-text text-muted">Мы никогда не передадим вашу электронную почту кому-либо еще.</small>
            </div>
          </d-col>
          <d-col cols="12" md="4" lg="4">
            <label>Имя:</label>
            <input class="mb-3 form-control" type="text" id="user_name" v-model="users.firstname"
              v-validate="'required|min:2'" data-vv-as="Имя Пользователя" name="firstname"
              placeholder="Введите Имя пользователя" />
            <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
            <d-form-invalid-feedback>{{ errorBags.first("firstname") }}.</d-form-invalid-feedback>
          </d-col>
          <d-col cols="12" md="4" lg="4">
            <label>Отчество:</label>
            <input class="mb-3 form-control" type="text" id="user_patronymic" v-model="users.patronymic"
              name="user_patronymic"
              placeholder="Введите Отчество пользователя">
          </d-col>
        </d-row>

        <d-row>
          <d-col cols="12" md="6" lg="8">
            <label>Должность:</label>
            <input class="mb-3 form-control" type="text" id="position" v-model="users.position"
              placeholder="Введите должность" />
          </d-col>
          <d-col cols="12" md="6" lg="4">
            <div class="form-group">
              <label>Подразделение:</label>
              <input class="mb-3 form-control" type="text" id="department" v-model="users.department"
              placeholder="Введите Подразделение" />
            </div>
          </d-col>
        </d-row>

        <div>
          <label class="d-block">Роли сотрудника в системе</label>
          <d-checkbox inline name="role" v-model="users.roles" value="company_admin">Администратор компании</d-checkbox>
          <d-checkbox inline name="role" v-model="users.roles" value="reporter">Ответственный за предоставление данных</d-checkbox>
          <d-checkbox inline name="role" v-model="users.roles" value="financial">Финансист</d-checkbox>
        </div>

      </d-form>
    </d-card-body>
    <d-card-footer class="border-top">
      <div class="d-flex">
        <d-link @click="goBack">Отменить</d-link>
        <button class="btn btn-success ml-auto" @click.prevent="saveEmployee"
          type="submit">Сохранить</button>
      </div>
    </d-card-footer>
  </d-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import vSelect from 'vue-select';
import api from '@/services/api';

// import EmployeesRepository from '@/repositories/employeesRepository';

export default {
  name: 'user-add',
  props: {
    initialUser: Object,
  },
  data() {
    return {
      payload: {},
      users: {
        firstname: '',
        surename: '',
        patronymic: '',
        userEmail: '',
        userPhone: '',
        position: '',
        department: '',
        roles: [],
      },
    };
  },
  methods: {
    async saveEmployee() {
      const payload = {
        userEmail: this.users.userEmail,
        userPhone: this.users.userPhone,
        surename: this.users.surename,
        firstname: this.users.firstname,
        patronymic: this.users.patronymic,
        position: this.users.position,
        department: this.users.department,
        roles: this.users.roles,
      };
      if (this.users.id) {
        api.putResource('users', { ...payload, id: this.users.id });
      } else {
        api.postResource('users', payload);
      }
      this.goBack();
    },

    goBack() {
      this.$router.go(-1);
    },
  },

  mounted() {
    if (this.initialUser) {
      this.users = Object.assign({}, this.users, this.initialUser);
    }
  },
};
</script>
