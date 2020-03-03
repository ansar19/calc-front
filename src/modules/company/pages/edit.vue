<template>
  <section class="section">
    <form class="container is-fluid" @submit="updateModel">

      <h2 class='title'>Company - Edit</h2>

      <hr>

      <CompanyForm :model="model" />

      <hr>

      <div class="buttons is-right">
        <button class="button is-primary" type="submit">
          <i class="fa fa-fw fa-plus"></i>
          Update Company
        </button>

        <button class="button is-light" @click="$router.go(-1)">
          <i class="fa fa-fw fa-times"></i>
          Cancel
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
    title: 'Company - Edit',
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  components: {
    CompanyForm,
  },
  created() {
    this.resetForm();
  },
  data() {
    const selected = this.$store.getters['company/collection/items'].find(m => m.id === this.id);
    const model = Object.assign({}, selected);
    return { model };
  },
  methods: {
    updateModel(e) {
      e.preventDefault();
      this.$store.commit('company/collection/editModel', this.model);
      this.$store.dispatch('company/collection/update');
      this.$router.go(-1);
    },
    resetForm() {
      this.$store.commit('company/collection/resetNewModel');
    },
  },
};
</script>
