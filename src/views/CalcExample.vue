<template>
  <d-container fluid class="main-content-container px-4 pb-4">

    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Расчеты</span>
        <h3 class="page-title">Расчет выброса</h3>
      </d-col>
    </d-row>

    <d-row>
      <!-- Editor -->
      <d-col lg="12" md="12">
        <calculator1 v-for="(part, index) in parts" @boxes-changed="part.boxes = $event" :key="index"></calculator1>
        <!-- Calc Table result -->
      </d-col>
    </d-row>

    <!-- Calc Table result end-->
  </d-container>
</template>
<script>
import Calculator1 from '@/components/new-calc-example/Calculator1.vue';

export default {
  components: {
    Calculator1,
  },
  methods: {
    // addPart() {
    //  this.parts.push({
    //    boxes: 0,
    //  });
    // },
  },
  computed: {
    // totalBoxCount() {
    // return this.parts
    //   .filter(p => p.boxes && !Number.isNaN(p.boxes))
    //    .map(p => p.boxes)
    //     .reduce((p, c) => p + c, 0);
    // },
  },
  data() {
    return {
      parts: [{
        boxes: 0,
      }],
    };
  },
};
</script>
