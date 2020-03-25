<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Карта</span>
        <h3 class="page-title">Казахстан</h3>
      </d-col>
    </d-row>
    <d-row>
      <!-- Map -->
      <d-col lg="12" md="12">
        <notifications group="map"/>
        <map-kazakhstan v-on:map-clicked="onMapClick"></map-kazakhstan>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import MapKazakhstan from '@/components/map/MapKazakhstan.vue';

export default {
  name: 'map-kz',
  components: {
    MapKazakhstan,
  },
  props: {
    msg: String,
  },
  methods: {
    onMapClick(attr) {
      this.$notify({
        group: 'map',
        title: 'Область',
        text: `Выбрана: ${
          attr.title
        } <br> Выбросы в атмосферу ${attr.airemissionstperiod} т/период <br> Платежи за эмиссию ${attr.airemissionspayments} <br> Объем отходов ${attr.wastetotal} тонн`,
      });
    },
  },
};
</script>
