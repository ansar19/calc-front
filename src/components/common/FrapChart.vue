<template>
  <d-card class="card-small h-80">
    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">Выбросы сравнение с лимитами</h6>
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
        id="demo"
        :labels="['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август','Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']"
        title="Выбросы за год"
        :height="300"
        :colors="['purple', 'light-blue', '#ffa3ef']"
        :lineOptions="{regionFill: 1}"
        :dataSets="this.data"
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
  name: 'frap-chart',
  data() {
    return {
      data: [
        {
          name: 'фактические',
          chartType: 'bar',
          color: 'purple',
          values: [480, 485, 491, 489, 485, 490, 497, 510, 512, 521, 530, 545],
        },
        {
          name: 'лимиты',
          chartType: 'line',
          color: 'light-blue',
          values: [540, 575, 570, 555, 572, 580, 585, 587, 588, 590, 592, 590],
        },
      ],
    };
  },
  methods: {

  },
};
</script>
