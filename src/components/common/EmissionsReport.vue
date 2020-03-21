<template>
  <d-card class="card-small h-80">
    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
      <div class="block-handle"></div>
    </d-card-header>

    <d-card-body class="pt-0">
      <d-row class="border-bottom py-2 bg-light">
        <!-- Time Frame -->
        <d-col col sm="6" class="d-flex mb-2 mb-sm-0">
          <d-button-group>
            <d-btn class="btn-white" active>Год</d-btn>
            <d-btn class="btn-white">Месяц</d-btn>
            <d-btn class="btn-white">Квартал</d-btn>
          </d-button-group>
        </d-col>

        <!-- Date Range -->
        <d-col col sm="6">
          <d-input-group size="sm" class="date-range d-flex justify-content-end">
            <d-datepicker
              v-model="dateRange.from"
              :highlighted="{ from: dateRange.from, to: dateRange.to || new Date() }"
              placeholder="Начальная дата"
              small
              typeable
            />
            <d-datepicker
              v-model="dateRange.to"
              :highlighted="{ from: dateRange.from, to: dateRange.to || new Date() }"
              placeholder="Конечная дата"
              small
              typeable
            />
            <d-input-group-text slot="append">
              <i class="material-icons">&#xE916;</i>
            </d-input-group-text>
          </d-input-group>
        </d-col>
      </d-row>

      <!-- Legend & Chart -->
      <div></div>
      <!-- <div ref="legend"></div> -->
      <canvas
        height="120"
        ref="canvas"
        style="max-width: 100% !important;"
        class="analytics-overview-sessions"
      ></canvas>
    </d-card-body>
  </d-card>
</template>

<script>
import Chart from '../../utils/chart';

const defaultEmissionsData = {
  labels: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сент',
    'Ноя',
    'Дек',
  ],
  datasets: [
    {
      label: 'Выбросы',
      fill: 'start',
      data: [8, 9, 10, 12, 17, 19, 21, 22, 28, 29, 30, 32],
      backgroundColor: 'rgba(0, 123, 255, 1)',
      borderColor: 'rgba(0, 123, 255, 1)',
      pointBackgroundColor: '#FFFFFF',
      pointHoverBackgroundColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 1.5,
    },
    {
      label: 'Остаток лимита',
      fill: 'start',
      data: [3.8, 2.9, 2.75, 1.89, 1.6, 1.4, 0.8, 0.68, 0.5, 0.45, 0.4, 0.3],
      backgroundColor: 'rgba(153, 202, 255, 1)',
      borderColor: 'rgba(153, 202, 255, 1)',
      pointBackgroundColor: '#FFFFFF',
      pointHoverBackgroundColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 1.5,
    },
  ],
};

export default {
  name: 'emissions-report',
  props: {
    /**
     * The component title.
     */
    title: {
      type: String,
      default: 'Отчет по выбросам за 2018 год',
    },
    /**
     * The chart data.
     */
    chartData: {
      type: Object,
      default() {
        return defaultEmissionsData;
      },
    },
  },
  data() {
    return {
      dateRange: {
        from: null,
        to: null,
      },
    };
  },
  mounted() {
    const chartOptions = {
      ...{
        legend: false,
        // Uncomment the following line in order to disable the animations.
        // animation: false,
        tooltips: {
          enabled: false,
          mode: 'index',
          position: 'nearest',
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: false,
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                userCallback(label) {
                  return label > 999 ? `${(label / 1000).toFixed(0)}k` : label;
                },
              },
            },
          ],
        },
      },
      ...this.chartOptions,
    };

    const EmissionsReportChart = new Chart(this.$refs.canvas, {
      type: 'bar',
      data: this.chartData,
      options: chartOptions,
    });

    // Generate the chart labels.
    // this.$refs.legend.innerHTML = EmissionsReportChart.generateLegend();

    // Hide initially the first and last chart points.
    // They can still be triggered on hover.
    const meta = EmissionsReportChart.getDatasetMeta(0);
    meta.data[0]._model.radius = 0;
    meta.data[this.chartData.datasets[0].data.length - 1]._model.radius = 0;

    // Render the chart.
    EmissionsReportChart.render();
  },
};
</script>

