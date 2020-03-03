<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Сотрудники</span>
      </d-col>
    </d-row>
    <d-card class="card-small mb-3">
      <d-card-header class="d-flex border-bottom">
        <h6 class="d-flex m-0">Детали пользователя</h6>
      </d-card-header>
      <div>
        <div v-if="!loaded">
          Загружаем данные...
        </div>
        <div v-else>
          <d-card-body>
            <table class="table table-bordered" style="width:100%" v-for="(u, index) in users" :key="index">
              <tr>
                <th>Имя:</th>
                <td>{{u.firstname}}</td>
              </tr>
              <tr>
                <th>Фамилия:</th>
                <td>{{u.surename}}</td>
              </tr>
              <tr>
                <th>Отчество:</th>
                <td>{{u.patronymic}}</td>
              </tr>
              <tr>
                <th>Телефон:</th>
                <td>{{u.userPhone}}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{{u.userEmail}}</td>
              </tr>
              <tr>
                <th>Должность:</th>
                <td>{{u.position}}</td>
              </tr>
              <tr>
                <th>Подразделение:</th>
                <td>{{u.department}}</td>
              </tr>
            </table>
          </d-card-body>
        </div>
      </div>
      <d-card-footer class="border-top">
        <div class="d-flex">
          <router-link :to="{ name: 'users-list' }">Отменить</router-link>
          <d-button class="ml-auto" theme="warning">Редактировать</d-button>
        </div>
      </d-card-footer>
    </d-card>
  </d-container>
</template>

<script>
import axios from 'axios';

const UserService = {};
// eslint-disable-next-line consistent-return
UserService.getUser = async (id) => {
  try {
    const result = await axios.get(`http://localhost:3000/users/${id}`);
    const users = {
    //   name: result.data.name,
      firstname: result.data.firstname,
      surename: result.data.surename,
      patronymic: result.data.patronymic,
      userPhone: result.data.userPhone,
      userEmail: result.data.userEmail,
      position: result.data.position,
      department: result.data.department,
    };
    return users;
  } catch (error) {
    //     const errorStatus = error.response.status;
    //     let errorMessage = '';
    //     if (errorStatus === 404) {
    //       errorMessage = 'Пользователь не найден';
    //     } else {
    //       errorMessage = 'Произошла ошибка';
    //     }
    //     throw new Error(errorMessage);
  }
};
export default {
  data() {
    return {
      loaded: false,
      userId: null,
      users: [],
      error: null,
    };
  },
  mounted() {
    this.userId = this.$route.params.id;
    this.getUser();
  },
  methods: {
    async getUser() {
      this.loaded = false;
      try {
        const person = await UserService.getUser(this.userId);
        this.users.push(person); // add to array
        this.loaded = true;
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
