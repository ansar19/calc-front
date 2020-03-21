<template>
  <main class="main-content col mt-4">
    <div class="main-content-container container-fluid px-4 my-auto h-100">
      <div class="row no-gutters h-100">
        <div class="col-lg-3 col-md-5 auth-form mx-auto my-auto">
          <div class="card">
            <div class="card-body">
              <img class="auth-form__logo d-table mx-auto mb-3" style="max-width: 45px;"
                src="@/assets/images/ecomarine-rus-1357x889.png" alt="EcoMarine - Sign In">
              <h5 class="auth-form__title text-center mb-4">Доступ к приложению</h5>
              <form @submit.prevent="signin">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input type="email" class="form-control" v-model="email" v-validate="'required|email'" id="Email"
                    name="userEmail" data-vv-as="Email" :class="{ 'is-invalid': submitted && errors.has('userEmail') }"
                    aria-describedby="emailHelp" placeholder="Enter email">
                  <div v-if="submitted && errors.has('userEmail')" class="invalid-feedback">
                    {{ errorBags.first('userEmail') }}</div>
                </div>
                <div class="form-group">
                  <label for="password">Пароль</label>
                  <input type="password" v-model="password" id="password"
                    name="password" class="form-control" />
                </div>
                <button type="submit" class="btn btn-pill btn-accent d-table mx-auto">Войти</button>
              </form>
            </div>
          </div>
          <div class="auth-form__meta d-flex mt-4">
            <d-link to="forgot-password">Забыли пароль?</d-link>
            <d-link class="ml-auto" to="sign-up">Создать новый аккаунт?</d-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import authRepository from '@/repositories/authRepository';

export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      submitted: false,
    };
  },
  methods: {
    signin() {
      console.log('siginin');
      if (authRepository.signIn({ email: this.email, password: this.password })) {
        this.$router.replace('/companies');
      }
    },
  },
};
</script>
