<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Error -->
    <div class="error">
      <div class="error__content">
        <h2>500</h2>
        <h3>Что-то пошло не так!</h3>
        <p>Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.</p>
        <router-link to="/">
          <d-button pill>&larr; Вернутся на главную</d-button>
        </router-link>

        <d-link @click="goBack">Вернутся назад</d-link>
      </div>
    </div>
  </d-container>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

