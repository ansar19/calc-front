<template>
  <div class="card">
    <div class="card-content">

      <div class="columns">

        <div class="col-9">
          <h1 class="title">
            <i class="fa fa-cube"></i>
            Детали компании
          </h1>
        </div>

        <div class="column">
          <div class="buttons is-right">
            <router-link class="button is-warning" :to="`/companies/${model.id}/edit`">
              <i class="far fa-fw fa-edit"></i>
              Редактировать
            </router-link>

            <button class="button is-danger" @click="confirmDestroy()">
              <i class="far fa-fw fa-trash-alt"></i>
              Удалить
            </button>

          </div>
        </div>

      </div>

      <table class="table is-fullwidth is-bordered is-striped">

        <!-- Table Header -->
        <tbody>
          <tr>
            <td>Company Name</td>
            <td>{{model.company_name}}</td>
          </tr>
          <tr>
            <td>Bin Inn</td>
            <td>{{model.bin_inn}}</td>
          </tr>
          <tr>
            <td>Entity Type</td>
            <td>{{model.entity_type}}</td>
          </tr>
          <tr>
            <td>Company Description</td>
            <td>{{model.company_description}}</td>
          </tr>
        </tbody>

      </table>

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>

export default {
  name: 'CompanyDetail',
  props: {
    model: {
      required: true,
    },
  },
  computed: {
  },
  methods: {
    confirmDestroy() {
      this.$dialog.confirm({
        title: 'Deleting Company',
        message: 'Are you sure you want to <b>delete</b> this Company? This action cannot be undone.',
        confirmText: 'Delete Company',
        type: 'is-danger',
        onConfirm: () => {
          this.$router.go(-1);
          this.$store.dispatch('company/collection/destroy', this.model.id);
          this.$toast.open('Company deleted!');
        },
      });
    },
  },
};
</script>
