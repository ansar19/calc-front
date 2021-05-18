<template>
  <d-container fluid>
    <d-row>
      <d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">
        <!-- Content -->
        <slot/>
        <!-- Main Footer -->
        <main-footer/>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import MainFooter from '@/components/layout/MainFooter/MainFooter.vue';

export default {
  name: 'full-screen',
  components: {
    MainFooter,
  },
};
</script>
