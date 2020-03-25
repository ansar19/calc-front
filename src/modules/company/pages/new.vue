<template>
  <section class="section">
    <form class="container is-fluid"  @submit="createModel">

      <h2 class="title">Company - New</h2>

      <hr>

      <CompanyForm :model="model" />

      <hr>

      <div class="buttons is-right">
        <button class="button is-primary" type="submit">
          <i class="fa fa-fw fa-plus"></i>
          Создать компанию
        </button>

        <button class="button is-light" @click="$router.go(-1)">
          <i class="fa fa-fw fa-times"></i>
          Отменить
        </button>
      </div>

    </form>
  </section>
</template>

<!-- // // // //  -->

<script>
import CompanyForm from '@/modules/company/components/CompanyForm.vue';

export default {
  name: 'CompanyNewPage',
  metaInfo: {
    title: 'Company - New',
  },
  components: {
    CompanyForm,
  },
  created() {
    this.resetForm();
  },
  data() {
    const model = this.$store.getters['company/collection/newModel'];
    return { model };
  },
  methods: {
    createModel(e) {
      e.preventDefault();
      this.$store.commit('company/collection/newModel', this.model);
      this.$store.dispatch('company/collection/create');
      this.$router.go(-1);
    },
    resetForm() {
      this.$store.commit('company/collection/resetNewModel');
    },
  },
};
</script>
