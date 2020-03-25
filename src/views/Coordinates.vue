<template>
  <d-container fluid class="main-content-container px-4 pb-4">

    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Карта</span>
        <h3 class="page-title">Данные на карте</h3>
      </d-col>
    </d-row>

    <d-row>
      <!-- Editor -->
      <d-col lg="12" md="12">
        <emission-source-coordinates></emission-source-coordinates>
        <!-- v-for="(part, index) in parts" @boxes-changed="part.boxes = $event" :key="index" -->
      </d-col>
    </d-row>

    <!-- Calc Table result end-->
  </d-container>
</template>
<script>
import EmissionSourceCoordinates from '@/components/emission-source/EmissionSourceCoordinates.vue';


export default {
  components: {
    EmissionSourceCoordinates,
  },
  methods: {

  },
  computed: {

  },
  data() {
    return {
      // parts: [{
      //   boxes: 0,
      // }],
    };
  },
};
</script>

