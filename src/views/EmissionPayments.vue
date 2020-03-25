<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Платежи</span>
        <h3 class="page-title">Плата за загрязнение атмосферного воздуха</h3>
      </d-col>
    </d-row>

    <d-row>
      <!-- Air emission payments -->
      <d-col lg="12" md="12">
        <air-payments/>
      </d-col>

    </d-row>
  </d-container>
</template>

<script>
import AirPayments from '@/components/payments-table/AirPayments.vue';

export default {
  components: {
    AirPayments,
  },
};
</script>
