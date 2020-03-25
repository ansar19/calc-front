<template>
  <main class="main-content col mt-4">
    <div class="main-content-container container-fluid px-4 my-auto h-100">
      <div class="row no-gutters h-100">
        <div class="col-lg-3 col-md-5 auth-form mx-auto my-auto">
          <div class="card">
            <div class="card-body">
              <img class="auth-form__logo d-table mx-auto mb-3" style="max-width: 45px;"
                src="@/assets/images/ecomarine-rus-1357x889.png" alt="EcoMarine - Register">
              <h5 class="auth-form__title text-center mb-4">Доступ к приложению</h5>
              <form @submit.prevent="handleSubmit">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input type="email" class="form-control" v-model="user.email" v-validate="'required|email'" id="Email"
                    name="userEmail" data-vv-as="Email" :class="{ 'is-invalid': submitted && errors.has('userEmail') }"
                    aria-describedby="emailHelp" placeholder="Введите email">
                     <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
                     <d-form-invalid-feedback> {{ errorBags.first('userEmail') }}</d-form-invalid-feedback>
                </div>

                <div class="form-group">
                  <label for="password">Пароль</label>
                  <input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" id="password"
                    name="password" ref="password" class="form-control" data-vv-as="Пароль" placeholder="Пароль"
                    :class="{ 'is-invalid': submitted && errors.has('password') }" />
                    <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
                     <d-form-invalid-feedback> {{ errorBags.first('password') }}</d-form-invalid-feedback>
                </div>

                <div class="form-group">
                  <label for="password_confirmation">Повторить пароль</label>
                  <input type="password" v-validate="'required|confirmed:password'" name="password_confirmation"
                    id="password_confirmation" class="form-control"
                    :class="{ 'is-invalid': errors.has('password_confirmation') }"
                    placeholder="Повторите пароль" data-vv-as="Повторение пароля" />
                    <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
                    <d-form-invalid-feedback> {{ errorBags.first('password_confirmation') }}</d-form-invalid-feedback>
                </div>

                <div class="form-group mb-3 d-table mx-auto">
                  <d-form-checkbox class="mt-3" id="agree" v-model="tos" value="true">
                    Нажимая
                    кнопку "Сохранить" вы соглашаетесь с условиями
                    <router-link to="offer" target='_blank'>публичной офферты</router-link>
                  </d-form-checkbox>
                </div>
                <button type="submit" :disabled="!tos" class="btn btn-pill btn-accent d-table mx-auto">Создать
                  аккаунт</button>
              </form>
            </div>
          </div>
          <div class="auth-form__meta d-flex mt-4">
            <d-link to="forgot-password">Забыли пароль?</d-link>
            <d-link class="ml-auto" to="sign-in">Вернутся на страницу входа?</d-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
    };
  },
  // created() {
  //   this.checkedSignedIn();
  // },
  // updated() {
  //   this.checkedSignedIn();
  // },
  // methods: {
  //   signup() {
  //     this.$http.plain.post('/api/v1/sign_up', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
  //       .then(response => this.signupSuccessful(response))
  //       .catch(error => this.signupFailed(error));
  //   },
  //   signupSuccessful(response) {
  //     if (!response.data.csrf) {
  //       this.signupFailed(response);
  //       return;
  //     }

  //     localStorage.csrf = response.data.csrf;
  //     localStorage.signedIn = true;
  //     this.error = '';
  //     this.$router.replace('/');
  //   },
  //   signupFailed(error) {
  //     this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong';
  //     delete localStorage.csrf;
  //     delete localStorage.signedIn;
  //   },
  //   checkedSignedIn() {
  //     if (localStorage.signedIn) {
  //       this.$router.replace('/');
  //     }
  //   },
  // },
};
</script>
