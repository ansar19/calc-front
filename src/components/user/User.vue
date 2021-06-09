<template>
  <d-card class="card-small mb-3">
    <d-card-body>
      <d-form class="new-user" @submit.prevent="saveEmployee" validate>
        <d-row>
          <d-col cols="12" md="6" lg="6">
            <div class="form-group">
              <label for="userEmail">Email:</label>
              <input
                name="userEmail"
                class="mb-2 mr-sm-2 mb-sm-0 form-control"
                v-model="users.userEmail"
                v-validate="{ required: true, email: true }"
                data-vv-as="Email Пользователя"
                placeholder="email@example.com"
              />
              <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
              <d-form-invalid-feedback>{{
                errorBags.first("userEmail")
              }}</d-form-invalid-feedback>
              <small class="form-text text-muted"
                >Мы никогда не передадим вашу электронную почту кому-либо
                еще.</small
              >
              <d-checkbox v-model="users.cmsAccess" value="true"
                >Разрешить доступ к системе</d-checkbox
              >
            </div>
          </d-col>
          <d-col cols="12" md="6" lg="6">
            <label>Телефон:</label>
            <d-input-group class="mb-3">
              <d-input
                placeholder="+77777019988"
                id="phoneNumber"
                v-model="users.userPhone"
              />
            </d-input-group>
          </d-col>
        </d-row>

        <d-row>
          <d-col cols="12" md="4" lg="4">
            <div class="form-group">
              <label for="userSurename">Фамилия</label>
              <input
                name="userSurename"
                class="mb-2 mr-sm-2 mb-sm-0 form-control"
                v-model="users.surename"
                v-validate="'required|min:2'"
                data-vv-as="Фамилия Пользователя"
                placeholder="Введите Фамилию"
              />
              <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
              <d-form-invalid-feedback>{{
                errorBags.first("userSurename")
              }}</d-form-invalid-feedback>
              <small class="form-text text-muted"
                >Мы никогда не передадим вашу электронную почту кому-либо
                еще.</small
              >
            </div>
          </d-col>
          <d-col cols="12" md="4" lg="4">
            <label>Имя:</label>
            <input
              class="mb-3 form-control"
              type="text"
              id="user_name"
              v-model="users.first_name"
              v-validate="'required|min:2'"
              data-vv-as="Имя Пользователя"
              name="first_name"
              placeholder="Введите Имя пользователя"
            />
            <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
            <d-form-invalid-feedback
              >{{ errorBags.first("first_name") }}.</d-form-invalid-feedback
            >
          </d-col>
          <d-col cols="12" md="4" lg="4">
            <label>Отчество:</label>
            <input
              class="mb-3 form-control"
              type="text"
              id="user_middle_name"
              v-model="users.middle_name"
              name="user_middle_name"
              placeholder="Введите Отчество пользователя"
            />
          </d-col>
        </d-row>

        <d-row>
          <d-col cols="12" md="6" lg="8">
            <label>Должность:</label>
            <v-select
              class="mb-3"
              label="name"
              v-model="c_position"
              :options="employee_positions"
              :reduce="(empPos) => empPos.id"
              required
            />
            <!-- <input class="mb-3 form-control" type="text" id="position" v-model="users.position"
              placeholder="Введите должность" /> -->
          </d-col>
          <d-col cols="12" md="6" lg="4">
            <div class="form-group">
              <label>Подразделение:</label>
              <v-select
                class="mb-3"
                label="name"
                v-model="c_departments"
                :options="company_departments"
                :reduce="(dep) => dep.id"
                required
              />
              <!-- <input class="mb-3 form-control" type="text" id="department" v-model="users.department"
              placeholder="Введите Подразделение" /> -->
            </div>
          </d-col>
        </d-row>

        <d-row v-if="users.cmsAccess">
          <d-col cols="12" lg="6">
            <label class="d-block">Роль сотрудника в системе</label>
            <v-select
              class="mb-3"
              label="name"
              v-model="c_role"
              :options="roles"
              :reduce="(role) => role.id"
              required
            />
          </d-col>
        </d-row>
      </d-form>
    </d-card-body>
    <d-card-footer class="border-top">
      <div class="d-flex">
        <router-link to="/users">Отменить</router-link>
        <button
          class="btn btn-success ml-auto"
          @click.prevent="saveEmployee"
          type="submit"
        >
          Сохранить
        </button>
      </div>
    </d-card-footer>
  </d-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import ROLES from "../../graphql/RolesList.gql";
import DEPARTMENTS from "../../graphql/DepartmentsList.gql";
import POSITIONS from "../../graphql/PositionsList.gql";
import ADD_EMPLOYEE from "../../graphql/AddEmployee.gql";
import ADD_EMPLOYEE_USER from "../../graphql/AddEmployee.gql";
import ADD_USER from "../../graphql/AddUser.gql";

const usersInitial = () => ({
  first_name: "",
  surename: "",
  middle_name: "",
  userEmail: "",
  userPhone: "",
  position: "",
  department: "",
  role: "",
  cmsAccess: false,
});

export default {
  name: "user-add",
  apollo: {
    roles: {
      query: ROLES,
    },
    company_departments: {
      query: DEPARTMENTS,
    },
    employee_positions: {
      query: POSITIONS,
    },
  },
  props: {
    initialUser: Object,
  },
  data() {
    return {
      payload: {},
      userId: null,
      users: {
        ...usersInitial(),
      },
    };
  },
  computed: {
    c_role: {
      get() {
        return this.name;
      },
      set(val) {
        this.users.role = val;
      },
    },
    c_departments: {
      get() {
        return this.name;
      },
      set(val) {
        this.users.department = val;
      },
    },
    c_position: {
      get() {
        return this.name;
      },
      set(val) {
        this.users.position = val;
      },
    },
  },
  methods: {
    async saveEmployee() {
      if (this.users.cmsAccess) {
        this.userId = await this.addUser();
      }
      await this.addEmployee();
      Object.assign(this.users, usersInitial());
      goBack();
    },

    goBack() {
      this.$router.go(-1);
    },

    addUser() {
      this.$apollo
        .mutate({
          mutation: ADD_USER,
          variables: {
            email: this.users.userEmail.toLowerCase(),
            password:
              "$2a$05$T/6R/a/nduZ7niqLqmcageuszFLc5IVK4Fqxs2GIeWn.0ITrh3FFm",
            roleId: this.users.role,
          },
        })
        .then((res) => res.data.insert_users_one)
        .catch((err) => {
          console.log(err);
          this.error = true;
        });
    },
    addEmployee() {
      const withoutUser = {
        email: this.users.userEmail.toLowerCase(),
        first_name: this.users.first_name,
        last_name: this.users.surename,
        middle_name: this.users.middle_name,
        department_id: this.users.department,
        position_id: this.users.position,
        phone: this.users.userPhone,
      };
      const withUser = {
        ...withoutUser,
        user_id: this.userId,
      };
      this.$apollo
        .mutate({
          mutation: this.users.cmsAccess ? ADD_EMPLOYEE : ADD_EMPLOYEE_USER,
          variables: this.users.cmsAccess ? withUser : withoutUser,
        })
        .then((res) => {
          const { id, first_name, last_name } = res.data.insert_employees_one;
          console.log(
            `added employee: ${first_name} ${last_name} with id: ${id}`
          );
        })
        .catch((err) => {
          console.log(err);
          this.error = true;
        });
    },
  },

  mounted() {
    if (this.initialUser) {
      this.users = Object.assign({}, this.users, this.initialUser);
    }
  },
};
</script>
