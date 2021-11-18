<template>
  <d-form class="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
    <div class="container">
      <div class="ml-3">
        <h5>{{ state.companyName }}</h5>
      </div>
    </div>
    <!--
        <d-input-group class="ml-3" seamless>
            <d-input-group-text slot="prepend">
                <i class="material-icons">search</i>
            </d-input-group-text>
            <d-input class="navbar-search" placeholder="Введите текст для поиска..." />
        </d-input-group>
    -->
  </d-form>
</template>

<script>
import { useCompanyState } from "@/composables/use/useCompany";

export default {
  setup() {
    const state = useCompanyState();

    return { state };
  },
};
</script>
