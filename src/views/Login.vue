<script>
import LOGIN from "@/graphql/mutations/Login";
import { useMutation } from "@vue/apollo-composable";
import { ref } from "@vue/composition-api";
import { useUserState } from "../composables/useUser"

export default {
  name: "Login",
  setup(_, ctx) {
    const router = ctx.root.$router
    const userState = useUserState();


    const email = ref("");
    const password = ref("");
    const {
      loading,
      error,
      mutate: sendLogin,
    } = useMutation(LOGIN, () => ({
      variables: { email: email.value, password: password.value },
    }));

    async function login() {
      const loginData = await sendLogin();
      const { token, email, role } =  loginData.data.login
      userState.value.email = email
      userState.value.role = role
      localStorage.setItem("token", token)
      router.push('/dashboard')
    }

    return { email, password, loading, error, login };
  },
};
</script>
<template>
  <form class="form-signin" @submit.prevent="login">
    <img
      class="my-5"
      src="@/assets/images/ecomarine-logo.svg"
      alt=""
      height="22"
    />
    <h1 class="h4 mb-3 font-weight-normal">Вход</h1>
    <label for="inputEmail" class="sr-only">Email</label>
    <input
      v-model="email"
      type="email"
      id="inputEmail"
      class="form-control"
      placeholder="Email"
      required
      autofocus
    />
    <label for="inputPassword" class="sr-only">Пароль</label>
    <input
      v-model="password"
      type="password"
      id="inputPassword"
      class="form-control mb-3"
      placeholder="Пароль"
      required
    />
    <p style="color: red" v-if="error">Некорректный email или пароль. {{ error.message}}</p>
    <button class="btn btn-lg btn-primary btn-block" type="submit">
      <spinner v-if="loading"/>
      <span v-else>Войти</span>
    </button>
  </form>
</template>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
