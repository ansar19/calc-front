<template>
  <d-card class="card-small h-80">
    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">Выбросы TOP-4</h6>
      <div class="block-handle"></div>
    </d-card-header>
    <d-card-body class="p-0">
      <!-- id - Every chart must have an id. -->
      <!-- title - The title displayed on the chart -->
      <!-- type - The type of chart: line, bar, percent, pie, or axis-mixed. -->
      <!-- labels - Names for each value on the x-axis. -->
      <!-- height- Optional: How tall the chart should be. -->
      <!-- colors - Separate colors for each dataset. -->
      <!-- lineOptions - Additional options for how to display line charts. See docs. -->
      <!-- datasets - An array of objects containing names and values for each data set. -->
      <!-- just change the vue-frappe tag’s key everytime you change the data and it should work fine. -->
      <vue-frappe
        id="pie"
        :labels="['Пыль неорг. 20-70%', 'Пыль неорг. >70%', 'NO2', 'SO2']"
        title="Projects per Phase"
        type="pie"
        :colors="['#6BD1FF', '#00C86F', '#FFBA05', '#DC6EBE']"
        :dataSets="this.data"
      ></vue-frappe>
    </d-card-body>
    <d-card-footer>
      <div class="d-flex">
        <!-- <d-button class="btn btn-action btn-sm btn-outline-secondary mr-3 mb-3 ml-auto">Экспортировать</d-button> -->
      </div>
    </d-card-footer>
  </d-card>
</template>

<script>
export default {
  name: 'pie-frappe',
  data() {
    return {
      data: [
        {
          values: [12, 3, 78, 23],
        },
      ],
    };
  },
  methods: {

  },
};
</script>
