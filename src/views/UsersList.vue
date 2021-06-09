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
              <d-button
                size="sm"
                class="btn-info btn-sm ml-2"
                v-d-tooltip.hover="'Выгрузить Excel'"
              >
                <download-excel
                  :data="users"
                  title="Список пользоваталей"
                  :exportFields="json_fields"
                  name="users.xls"
                >
                  <font-awesome-icon icon="download" />
                </download-excel>
              </d-button>

              <d-dropdown size="sm" class="ml-2" text="Добавить" right>
                <d-dropdown-item size="sm">
                  <router-link to="/user/add">Добавить сотрудника</router-link>
                </d-dropdown-item>
                <d-dropdown-divider />
                <d-dropdown-item size="sm">
                  <router-link to="users-import"
                    >Добавить сотрудников</router-link
                  >
                </d-dropdown-item>
              </d-dropdown>
            </div>
          </d-card-header>
          <div class="card-body pb-3 text-center component-props">
            <!-- user table -->
            <div class="meta-table">
              <v-client-table
                class="dataTables_wrapper"
                :data="employees"
                :columns="columns"
                :options="userTableOptions"
              >
                <div slot="child_row" slot-scope="props">
                  <!-- Position and Roles slot -->
                  <table class="meta-table">
                    <thead>
                      <tr>
                        <th style="width: 30%">Должность</th>
                        <th style="width: 30%">Подразделение</th>
                        <th style="width: 40%">Роли</th>
                      </tr>
                    </thead>
                    <tr>
                      <td data-label="Должность:">{{ props.row.position.name }}</td>
                      <td data-label="Подразделение:">
                        {{ props.row.department.name }}
                      </td>
                      <td data-label="Роли:">{{ props.row.user ? props.row.user.role.name : 'Пользователь не создан' }}</td>
                    </tr>
                  </table>
                </div>
                <!-- Actions Column Slot -->
                <d-button-group
                  slot="actions"
                  slot-scope="props"
                  size="small"
                  class="d-flex justify-content-center"
                >
                  <router-link
                    :to="{ name: 'user-show', params: { id: props.row.id } }"
                  >
                    <d-button
                      class="btn-white"
                      v-d-tooltip.hover="'Посмотреть'"
                    >
                      <i class="material-icons">&#xe417;</i>
                    </d-button>
                  </router-link>
                  <router-link
                    :to="{ name: 'user-edit', params: { id: props.row.id } }"
                  >
                    <d-button
                      class="btn-white"
                      v-d-tooltip.hover="'Редактировать'"
                    >
                      <i class="material-icons">&#xE254;</i>
                    </d-button>
                  </router-link>
                  <d-button
                    class="btn-white"
                    @click="deleteUser(props.row.id)"
                    v-d-tooltip.hover="'Удалить'"
                  >
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
import Vue from "vue";
import { ClientTable } from "vue-tables-2";
import "@/assets/scss/vue-tables.scss";
// eslint-disable-next-line no-unused-vars
import EMPLOYEES from "../graphql/EmployeesList.gql";

Vue.use(ClientTable);

export default {
  components: {
    ClientTable,
  },
  apollo: {
    employees: {
      query:  EMPLOYEES
    }
  },
  data() {
    return {
      loaded: false,
      userId: null,
      employees: [],
      error: null,
      componentTitle: "Список пользователей",
      users: [],
      pageerrors: [],

      columns: [
        "first_name",
        "last_name",
        "middle_name",
        "email",
        "phone",
        "position.name",
        "actions",
      ],

      // this part related to excel export
      json_fields: {
        Имя: "first_name",
        Фамилия: "last_name",
        Отчество: "middle_name",
        email: "email",
        Телефон: "phone",
        Роль: "roles",
        Должность: "position.name",
        Подразделение: "department",
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      userTableOptions: {
        headings: {
          first_name: "Имя",
          last_name: "Фамилия",
          middle_name: "Отчество",
          email: "email",
          phone: "Телефон",
          // "roles.reporter": "Отвественный за предоставление данных",
          "position.name": "Должность",
          department: "Подразделение",
          actions: "Действия",
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: "transaction-history table dataTable",
        filterable: [
          "first_name",
          "last_name",
          "middle_name",
          "position.name",
          "department",
          "email",
          "phone",
        ],
        sortable: ["first_name", "last_name", "middle_name"],
        sortIcon: {
          base: "fas float-right mt-1 text-muted",
          up: "fa-caret-up",
          down: "fa-caret-down",
        },
        texts: {
          filterPlaceholder: "Введите текст для поиска",
          limit: "Записей",
          filter: "Поиск",
          noResults: "Нет подходящих записей",
          loading: "Идет загрузка...",
          page: "Стр.:",
          filterBy: "Фильтровать по {column}",
          count:
            "Отображение с {from} по {to} из {count} записей|{count} записей | Запись",
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
          nav: "scroll",
        },
      },
      /**
       * Vue Tables Configuration Options
       * @see https://github.com/matfish2/vue-tables-2
       */
    };
  },
  methods: {
    // deleteUser(id) {
    //   api.deleteResource("users", id).then(() => {
    //     this.users.splice(
    //       this.users.findIndex((el) => el.id === id),
    //       1
    //     );
    //   });
    // },
  },
};
</script>
