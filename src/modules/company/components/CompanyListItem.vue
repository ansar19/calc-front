<template>
  <tr>
    <td>{{model.company_name}}</td>
    <td>{{model.bin_inn}}</td>
    <td>{{model.entity_type}}</td>
    <td>{{model.company_description}}</td>

    <td class="has-text-right">

      <d-dropdown aria-role="list" position="is-bottom-left">
        <d-button class="button is-dark is-small" slot="trigger">
          <i class="fa fa-caret-down"></i>
        </d-button>

        <d-dropdown-item has-link aria-role="menuitem">
          <router-link :to="`/companies/${model.id}`">
            <i class="fa fa-fw fa-eye"></i>
            Посмотреть
          </router-link>
        </d-dropdown-item>

        <d-dropdown-item has-link aria-role="menuitem">
          <router-link :to="`/companies/${model.id}/edit`">
            <i class="far fa-fw fa-edit"></i>
            Редактировать
          </router-link>
        </d-dropdown-item>

        <d-dropdown-item aria-role="menuitem" @click="confirmDestroy()">
          <i class="far fa-fw fa-trash-alt"></i>
          Удалить
        </d-dropdown-item>
      </d-dropdown>

    </td>

  </tr>
</template>

<!-- // // // //  -->

<script>
export default {
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
          this.$store.dispatch('company/collection/destroy', this.model.id);
          this.$toast.open('Company deleted!');
        },
      });
    },
  },
};
</script>
