<template>
  <main class="main-content col mt-4">
    <div class="main-content-container container-fluid px-4 my-auto h-100">
      <div class="row no-gutters h-100">
        <div class="col-lg-3 col-md-5 auth-form mx-auto my-auto">
          <div class="card">
            <div class="card-body">
              <img class="auth-form__logo d-table mx-auto mb-3" style="max-width: 45px;"
                src="@/assets/images/ecomarine-rus-1357x889.png" alt="EcoMarine - Forgot Password">
              <h5 class="auth-form__title text-center mb-4">Сброс пароля</h5>
              <form @submit.prevent="handleSubmit">
                <div class="form-group mb-4">
                  <label for="exampleInputEmail1">Email</label>

                    <input type="email" class="form-control" v-model="user.email" v-validate="'required|email'" id="Email"
                    name="userEmail" data-vv-as="Email" :class="{ 'is-invalid': submitted && errors.has('userEmail') }"
                    aria-describedby="emailHelp" placeholder="Введите email">
                     <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
                     <d-form-invalid-feedback> {{ errorBags.first('userEmail') }}</d-form-invalid-feedback>

                  <small id="emailHelp" class="form-text text-muted text-center">Вы получите письмо с уникальным
                    токеном.</small>
                </div>
                <button type="submit" class="btn btn-pill btn-accent d-table mx-auto">Сбросить пароль</button>
              </form>
            </div>
          </div>
          <div class="auth-form__meta d-flex mt-4">
              <d-link to="sign-in">Вернутся на страницу входа.</d-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'forgot-password',
  data() {
    return {
      user: {
        email: '',
      },
      submitted: false,
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          // eslint-disable-next-line no-alert
          alert(`SUCCESS!! :-)\n\n${JSON.stringify(this.user)}`);
        }
      });
    },
  },
};
</script>
