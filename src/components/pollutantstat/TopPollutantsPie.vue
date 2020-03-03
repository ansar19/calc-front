<template>
  <div class="card card-small h-100">
    <!-- Card Header -->
    <div class="card-header border-bottom">
      <h6 class="m-0">{{title}}</h6>
    </div>
    <!-- Chart -->
    <div class="card-body d-flex py-0">
      <canvas height="220" ref="canvas" class="blog-top-pollutants-pie m-auto"></canvas>
    </div>
    <d-card-footer class="border-top">
      <d-row>
        <!-- Time Frame -->
        <d-col>
          <d-select size="sm" value="last-week" style="max-width: 130px;">
            <option value="last-week">За неделю</option>
            <option value="last-month">За месяц</option>
            <option value="today">За квартал</option>
            <option value="last-year">За год</option>
          </d-select>
        </d-col>
        <!-- View Full Report -->
        <d-col class="text-right view-report">
          <router-link to="list-emissions-pollutants">Смотреть полный отчет &rarr;</router-link>
        </d-col>
      </d-row>
    </d-card-footer>
  </div>
</template>

<script>
import Chart from '../../utils/chart';

const defaultChartData = {
  datasets: [
    {
      hoverBorderColor: '#ffffff',
      data: [19.291, 11.201, 9.291, 8.281, 7.128],
      backgroundColor: [
        'rgba(0,123,255,0.9)',
        'rgba(0,123,255,0.7)',
        'rgba(0,123,255,0.5)',
        'rgba(0,123,255,0.3)',
        'rgba(0,123,255,0.1)',
      ],
    },
  ],
  labels: [
    'Пыль неорганическая 20-70%',
    'Пыль неорганическая >70%',
    'Азота (II) диоксид',
    'Серы диоксид',
    'Углерода оксид',
  ],
};

export default {
  name: 'top-pollutants-pie',
  /* 'users-by-device',  */
  props: {
    /**
     * The chart config.
     */
    chartConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * The chart options.
     */
    chartOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * The chart data.
     */
    chartData: {
      type: Object,
      default() {
        return defaultChartData;
      },
    },
    /**
     * The chart title.
     */
    title: {
      type: String,
      default: 'ТОП 5 ЗВ по массе',
    },
  },
  mounted() {
    const chartConfig = {
      type: 'pie',
      data: this.chartData,
      options: {
        ...{
          legend: {
            position: 'bottom',
            labels: {
              padding: 25,
              boxWidth: 20,
            },
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: 'index',
            position: 'nearest',
          },
        },
        ...this.chartOptions,
      },
    };
    new Chart(this.$refs.canvas, chartConfig);
  },
};
</script>

