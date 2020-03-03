<template>
  <section class="section">
    <div class="container is-fluid">

      <CompanyDetail :model="model" />

      <hr>

      <!-- <d-tabs type='is-toggle'>

        <d-tab-item label="Users">
          <RelatedUsersList :company_id="model.id" />
        </d-tab-item>
      </d-tabs> -->
    </div>
  </section>
</template>

<!-- // // // //  -->

<script>
// TODO - implement reverse relations

import CompanyDetail from '@/modules/company/components/CompanyDetail.vue';

// // TODO - implement reverse relations
// import RelatedUsersList from '@/modules/company/components/RelatedUsersList';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  name: 'company_show',
  metaInfo: {
    title: 'Companys - Show',
  },
  components: {
    // RelatedUsersList,
    CompanyDetail,
  },
  computed: {
    model() {
      return this.$store.getters['company/collection/items'].find(company => company.id === this.id);
    },
  },
};
</script>
