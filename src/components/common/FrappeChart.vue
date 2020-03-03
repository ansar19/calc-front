<template>
  <d-card class="card-small h-80">
    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">Выбросы суммарные по годам</h6>
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
      <vue-frappe
        id="test"
        :labels="['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август','Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']"
        title="Годовые выбросы с месячной разбивкой"
        type="axis-mixed"
        :height="300"
        :colors="['purple', '#ffa3ef', 'light-blue']"
        :dataSets="this.data"
        :valuesOverPoints="true"
        :tooltipOptions="{ formatTooltipY: d => d + ' тонн'}"
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
  data() {
    return {
      data: [
        {
          name: 'текущий',
          chartType: 'bar',
          title: 'Общие выбросы',
          color: 'purple',
          values: [25, 40, 30, 35, 8, 52, 17, 4, 6, 8, 23, 32],
        },
        {
          name: 'предыдущий',
          chartType: 'bar',
          values: [15, 20, 3, 15, 58, 12, 17, 37, 23, 43, 19, 12],
        },
      ],
    };
  },
  methods: {
    /* exportChart() {
        chart.export();
      }, */
  },
};
</script>
