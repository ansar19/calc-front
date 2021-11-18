<template>
  <d-container fluid>
    <spinner v-if="loading" />
    <div v-else-if="error">{{ error.message }}</div>
    <d-row v-else>
      <!-- Main Sidebar -->
      <main-sidebar :items="sidebarItems" />

      <d-col
        class="main-content offset-lg-2 offset-md-3 p-0"
        tag="main"
        lg="10"
        md="9"
        sm="12"
      >
        <!-- Main Navbar -->
        <main-navbar />

        <!-- Content -->
        <slot />

        <!-- Main Footer -->
        <main-footer />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import getSidebarItems from "@/data/sidebar-nav-items";

// Main layout components
import MainNavbar from "@/components/layout/MainNavbar/MainNavbar.vue";
import MainSidebar from "@/components/layout/MainSidebar/MainSidebar.vue";
import MainFooter from "@/components/layout/MainFooter/MainFooter.vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { useCompanyState } from "../composables/use/useCompany";
import gql from "graphql-tag";

export default {
  name: "DefaultLayout",
  setup() {
    const companyState = useCompanyState();

    const { result, loading, error, onResult } = useQuery(
      gql`
        query c_o {
          companies_own {
            id
            company {
              id
              company_name
              company_type {
                id
                name
                short_name
              }
            }
          }
        }
      `
    );
    onResult((queryResult) => {
      companyState.value.companyName =
        queryResult.data.companies_own[0].company.company_name;
      companyState.value.companyId =
        queryResult.data.companies_own[0].company.id;
    });

    return { loading, error };
  },
  components: {
    MainNavbar,
    MainSidebar,
    MainFooter,
  },
  data() {
    return {
      sidebarItems: getSidebarItems(),
    };
  },
};
</script>
