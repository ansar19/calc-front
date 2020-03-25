<template>

  <table class="meta-table">

    <!-- Table Header -->
    <thead>
      <th>Company Name</th>
      <th>Bin Inn</th>
      <th>Entity Type</th>
      <th>Company Description</th>
      <th></th>
    </thead>

    <!-- Table Body -->
    <tbody>

      <!-- Empty Table Row -->
      <tr class='table-warning' v-if="!collection[0]">
        <td>No Companies Available</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>

      <CompanyListItem v-for="m in collection" :key="m.id" :model="m" />
    </tbody>

  </table>

</template>

<!-- // // // //  -->

<script>
import CompanyListItem from './CompanyListItem.vue';

export default {
  props: {
    collection: {
      required: true,
    },
  },
  components: {
    CompanyListItem,
  },
};
</script>
