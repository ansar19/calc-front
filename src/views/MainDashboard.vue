<template>
  <d-container fluid class="main-content-container px-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Панель управления</span>
        <h3 class="page-title">Главная панель</h3>
      </d-col>
    </d-row>
    <!-- Basic Stats Blocks -->
    <basic-stats />
    <d-row>
      <d-col>
        <!-- Card Stats Blocks -->
        <card-stats />
      </d-col>
    </d-row>
    <d-row>
      <!-- Users Overview -->
      <d-col lg="8" md="6" sm="12" class="mb-4">
        <bo-emissions-overview />
      </d-col>
      <!-- Users by Device (lite) -->
      <d-col lg="4" md="6" sm="12" class="mb-4">
        <bo-top-pollutants-pie />
      </d-col>
    </d-row>
    <d-row>
      <!-- Frap Chart Block-->
      <d-col lg="6" md="6" sm="12" class="mb-4">
        <frap-chart />
      </d-col>
      <!-- Frappe Chart Block-->
      <d-col lg="6" md="6" sm="12" class="mb-4">
        <frappe-chart />
      </d-col>
    </d-row>
    <d-row>
      <!-- Top Pollutants -->
      <d-col lg="4" md="4" sm="12" class="mb-4">
        <bo-top-pollutants />
      </d-col>
      <!-- Top Pollutants -->
      <d-col lg="4" md="4" sm="12" class="mb-4">
        <bo-top-emission-sources />
      </d-col>
      <!-- Task Stats Blocks -->
      <d-col lg="4" md="4" sm="12" class="mb-4">
        <task-status />
      </d-col>
    </d-row>

    <!-- Emissions Report -->
    <d-row>
      <d-col lg="6" md="6" sm="6" class="mb-4">
        <os-emissions-report />
      </d-col>
      <d-col lg="6" md="6" sm="6" class="mb-4">
        <pie-frappe />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import BasicStats from '@/components/common/BasicStats.vue';
import TopPollutants from '@/components/common/TopPollutants.vue';
import TopEmissionSources from '@/components/common/TopEmissionSources.vue';
import EmissionsOverview from '@/components/pollutantstat/EmissionsOverview.vue';
import TopPollutantsPie from '@/components/pollutantstat/TopPollutantsPie.vue';
import TaskStatus from '@/components/common/TaskStatus.vue';
import CardStats from '@/components/common/CardStats.vue';
import EmissionsReport from '@/components/common/EmissionsReport.vue';
import FrappeChart from '@/components/common/FrappeChart.vue';
import FrapChart from '@/components/common/FrapChart.vue';
import PieFrappe from '@/components/common/PieFrappe.vue';
// import SummaryBox from '@/components/common/SummaryBox.vue';


export default {
  components: {
    BasicStats,
    boEmissionsOverview: EmissionsOverview,
    boTopPollutantsPie: TopPollutantsPie,
    boTopPollutants: TopPollutants,
    boTopEmissionSources: TopEmissionSources,
    osEmissionsReport: EmissionsReport,
    TaskStatus,
    CardStats,
    FrappeChart,
    FrapChart,
    PieFrappe,
    // SummaryBox,
  },
  data() {
    return {
      dateRange: {
        from: null,
        to: null,
      },
    };
  },
  created() {
  },
  methods: {
    handleApprove(id) {
      alert(`Approving discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleReject(id) {
      alert(`Rejecting discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleEdit(id) {
      alert(`Editing discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleViewAllComments() {
      alert('Viewing all comments!'); // eslint-disable-line no-alert
    },
  },
  computed: {
    smallStats() {
      return [{
        label: 'Источники',
        value: '190',
        percentage: '4.7%',
        increase: true,
        labels: ['Label', 'Label', 'Label', 'Label', 'Label', 'Label'],
        datasets: [{
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(0, 184, 216, 0.1)',
          borderColor: 'rgb(0, 184, 216)',
          data: [1, 2, 1, 3, 5, 4, 7],
        }],
      },
      {
        label: 'Нормативы',
        value: '182',
        percentage: '12.4',
        increase: true,
        labels: ['Label', 'Label', 'Label', 'Label', 'Label', 'Label'],
        datasets: [{
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(23,198,113,0.1)',
          borderColor: 'rgb(23,198,113)',
          data: [1, 2, 3, 3, 3, 4, 4],
        }],
      },
      {
        label: 'Задачи',
        value: '8,147',
        percentage: '3.8%',
        increase: false,
        decrease: true,
        labels: ['Label', 'Label', 'Label', 'Label', 'Label', 'Label'],
        datasets: [{
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(255,180,0,0.1)',
          borderColor: 'rgb(255,180,0)',
          data: [2, 3, 3, 3, 4, 3, 3],
        }],
      },
      {
        label: 'Пользователи',
        value: '29',
        percentage: '2.71%',
        increase: false,
        decrease: true,
        labels: ['Label', 'Label', 'Label', 'Label', 'Label', 'Label'],
        datasets: [{
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(255,65,105,0.1)',
          borderColor: 'rgb(255,65,105)',
          data: [1, 7, 1, 3, 1, 4, 8],
        }],
      },
      {
        label: 'Подписчики',
        value: '17,281',
        percentage: '2.4%',
        increase: false,
        decrease: true,
        labels: ['Label', 'Label', 'Label', 'Label', 'Label', 'Label'],
        datasets: [{
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgb(0,123,255,0.1)',
          borderColor: 'rgb(0,123,255)',
          data: [3, 2, 3, 2, 4, 5, 4],
        }],
      },
      ];
    },
  },
};
</script>
