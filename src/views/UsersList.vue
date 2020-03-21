<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Сотрудники</span>
        <h3 class="page-title">{{ componentTitle }}</h3>
      </d-col>
    </d-row>
    <!-- Default Table -->
    <div class="row">
      <div class="col">
        <d-card class="card-small mb-3">
          <d-card-header class="border-bottom">

            <div class="block-handle" align="right">
              <!-- download buttons part -->
              <d-button size="sm" class="btn-info btn-sm ml-2" v-d-tooltip.hover="'Выгрузить Excel'">
                <download-excel :data="users" title="Список пользоваталей" :exportFields="json_fields" name="users.xls">
                  <font-awesome-icon icon="download" />
                </download-excel>
              </d-button>

              <d-dropdown size="sm" class="ml-2" text="Добавить" right>
                <d-dropdown-item size="sm">
                  <router-link to="/user/add">Добавить сотрудника</router-link>
                </d-dropdown-item>
                <d-dropdown-divider />
                <d-dropdown-item size="sm">
                  <router-link to="users-import">Добавить сотрудников</router-link>
                </d-dropdown-item>
              </d-dropdown>
            </div>
          </d-card-header>
          <div class="card-body pb-3 text-center component-props">
            <!-- user table -->
            <div class="meta-table">
              <v-client-table class="dataTables_wrapper" :data="users" :columns="columns" :options="userTableOptions">
                <div slot="child_row" slot-scope="props">
                  <!-- Position and Roles slot -->
                  <table class="meta-table">
                    <thead>
                      <tr>
                        <th style="width:30%">
                          Должность
                        </th>
                        <th style="width:30%">
                          Подразделение
                        </th>
                        <th style="width:40%">
                          Роли
                        </th>
                      </tr>
                    </thead>
                    <tr>
                      <td data-label="Должность:"> {{ props.row.position }} </td>
                      <td data-label="Подразделение:">{{ props.row.department }} </td>
                      <td data-label="Роли:"> {{ props.row.roles }} </td>
                    </tr>
                  </table>
                </div>
                <!-- Actions Column Slot -->
                <d-button-group slot="actions" slot-scope="props" size="small" class="d-flex justify-content-center">
                  <router-link :to="{ name: 'user-show', params: { id: props.row.id }}">
                    <d-button class="btn-white" v-d-tooltip.hover="'Посмотреть'">
                      <i class="material-icons">&#xe417;</i>
                    </d-button>
                  </router-link>
                  <router-link :to="{ name: 'user-edit', params: { id: props.row.id }}">
                    <d-button class="btn-white"
                      v-d-tooltip.hover="'Редактировать'">
                      <i class="material-icons">&#xE254;</i>
                    </d-button>
                  </router-link>
                  <d-button class="btn-white" @click="deleteUser(props.row.id)"
                    v-d-tooltip.hover="'Удалить'">
                    <i class="material-icons">&#xE872;</i>
                  </d-button>
                </d-button-group>
                <!-- Product Column Slot -->
                <!-- <span slot="product" slot-scope="props" :class="[getStatusClass(props.row.product)]">
                  {{ props.row.product }}
                </span> -->
                <!-- Total Column Slot -->
                <!-- <span slot="total" slot-scope="props" class="text-success">
                  {{ props.row.total }}
                </span> -->
              </v-client-table>
            </div>
          </div>
        </d-card>
      </div>
    </div>
  </d-container>
</template>

<script>
/* eslint-disable */
// import EmployeesRepository from '@/repositories/usersRepository';
import Vue from 'vue';
import { ClientTable } from 'vue-tables-2';
import '@/assets/scss/vue-tables.scss';
// eslint-disable-next-line no-unused-vars
import api from '@/services/api';

Vue.use(ClientTable);

export default {
  components: {
    ClientTable,
  },
  data() {
    return {
      loaded: false,
      userId: null,
      // users: [],
      error: null,
      componentTitle: 'Список пользователей',
      users: [],
      pageerrors: [],

      columns: ['firstname', 'surename', 'patronymic', 'userEmail', 'userPhone', 'position', 'actions'],

      // this part related to excel export
      json_fields: {
        Имя: 'firstname',
        // 'Тип юридического лица': {
        //   field: 'company_type.label',
        //   callback: value => `Тип: ${value}`,
        // },
        Фамилия: 'surename',
        Отчество: 'patronymic',
        email: 'userEmail',
        Телефон: 'userPhone',
        Роль: 'roles',
        Должность: 'position',
        Подразделение: 'department',
      },
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
      userTableOptions: {
        headings: {
          firstname: 'Имя',
          surename: 'Фамилия',
          patronymic: 'Отчество',
          userEmail: 'email',
          userPhone: 'Телефон',
          'roles.reporter': 'Отвественный за предоставление данных',
          position: 'Должность',
          department: 'Подразделение',
          actions: 'Действия',
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: 'transaction-history table dataTable',
        filterable: ['firstname', 'surename', 'patronymic', 'position', 'department', 'userEmail', 'userPhone'],
        sortable: ['firstname', 'surename', 'patronymic'],
        sortIcon: {
          base: 'fas float-right mt-1 text-muted',
          up: 'fa-caret-up',
          down: 'fa-caret-down',
        },
        texts: {
          filterPlaceholder: 'Введите текст для поиска',
          limit: 'Записей',
          filter: 'Поиск',
          noResults: 'Нет подходящих записей',
          loading: 'Идет загрузка...',
          page: 'Стр.:',
          filterBy: 'Фильтровать по {column}',
          count: 'Отображение с {from} по {to} из {count} записей|{count} записей | Запись',
        },
        templates: {
          // position(h, row) {
          //   return row.users.position;
          // },
          // department(h, row) {
          //   return row.users.department;
          // },
          // roles(h, row) {
          //   // "massage" your data and return a string
          //   return row.users.roles;
          // },
        },
        pagination: {
          edge: true,
          nav: 'scroll',
        },
      },
    /**
       * Vue Tables Configuration Options
       * @see https://github.com/matfish2/vue-tables-2
       */

    };
  },

  

  // Fetches users when the component is created.
  created() {
    api.getResource('users')
      .then(response => {
        this.users = response;
        // JSON responses are automatically parsed.
      })
  },
  watch: {
  },
  // mounted() {
  //   this.userId = this.$route.params.id;
  // },
  // created() {
  //   this.fetch();
  // },
  methods: {


    // async fetch() {
    //   EmployeesRepository.get(this.$store.state.users.id)
    //     .then((response) => {
    //       this.users = response.data;
    //     })
    //     // eslint-disable-next-line no-alert
    //     .catch((error) => { alert(error); });
    // },
    // handleActionClick(type, id) {
    //   alert(`You have ${type} item ${id}`); // eslint-disable-line no-alert
    // },
    // childRow(h, row) {
    //   return <div>My custom content for row {row.id}</div>;
    // },
    deleteUser(id) {
      api.deleteResource('users', id)
        .then(() => {
          this.users.splice(this.users.findIndex(el => el.id === id), 1);
        })
    },
  },
};
</script>
