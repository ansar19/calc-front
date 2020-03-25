<template>
<d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">
            Companies
          </span>
        <h3 class="page-title">Список компании</h3>
      </d-col>
</d-row>

    <div class="container is-fluid">


        <div class="column has-text-right">
          <router-link
            class="btn btn-sm is-primary"
            to="/companies/new"
          >
            <i class="fa fa-fw fa-plus"></i>
            Новая компания
          </router-link>
        </div>


      <ListView :collection="paginatedItems" />

      <hr>

      <b-pagination
          :total="items.length"
          :current.sync="current"
          :order="order"
          :size="size"
          :simple="isSimple"
          :rounded="isRounded"
          :per-page="perPage"
          icon-pack="fa"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page">
      </b-pagination>

    </div>

  </d-container>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex';
import ListView from '@/modules/company/components/CompanyList.vue';

function paginate(array, page_size, page_number) {
  --page_number; // because pages logically start with 1, but technically with 0
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}

export default {
  name: 'CompanyList',
  data() {
    return {
      total: 200,
      current: 1,
      perPage: 5,
      order: '',
      size: '',
      isSimple: false,
      isRounded: false,
    };
  },
  components: {
    ListView,
  },
  metaInfo: {
    title: 'Companies',
  },
  computed: {
    ...mapGetters({
      items: 'company/collection/items',
    }),
    paginatedItems() {
      return paginate(this.items, this.perPage, this.current);
    },
  },
};
</script>
