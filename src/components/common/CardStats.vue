<template>
  <d-row>
    <d-col cols="12" md="4" lg="4" class="mb-4">
      <d-card class="card-small">
        <!-- Card Header -->
        <d-card-header class="border-bottom">
          <h6 class="m-0">{{title}}</h6>
          <div class="block-handle"></div>
        </d-card-header>
        <div class="d-flex" v-for="(item, idx) in cardStats" :key="idx">
          <div class="w-50 border-right p-2 px-3">
            <div class="d-flex justify-content-between align-items-center">
              <h6>{{ item.value }}</h6>
            </div>
            <p class="text-muted mb-0 mr">
              <small>т/период</small>
            </p>
          </div>
          <div class="w-50 p-2 px-3">
            <div class="d-flex justify-content-between align-items-center">
              <h6>{{item.percentage}}</h6>
            </div>
            <p class="text-muted mb-0 mr">
              <small>Рост</small>
            </p>
          </div>
        </div>
      </d-card>
    </d-col>
    <d-col cols="12" md="4" lg="4" class="mb-4">
      <d-card class="card-small">
        <!-- Card Header -->
        <d-card-header class="border-bottom">
          <h6 class="m-0">{{titleSources}}</h6>
          <div class="block-handle"></div>
        </d-card-header>
        <div class="d-flex" v-for="(item, idx) in cardStatsSources" :key="idx">
          <div class="w-50 border-right p-2 px-3">
            <div class="d-flex justify-content-between align-items-center">
              <h6>{{ item.value }}</h6>
            </div>
            <p class="text-muted mb-0 mr">
              <small>Новых методик</small>
            </p>
          </div>
          <div class="w-50 p-2 px-3">
            <div class="d-flex justify-content-between align-items-center">
              <h6>{{item.percentage}}</h6>
            </div>
            <p class="text-muted mb-0 mr">
              <small>Рост</small>
            </p>
          </div>
        </div>
      </d-card>
    </d-col>
    <d-col cols="12" md="4" lg="4" class="mb-4">
      <d-card class="card-small">
        <!-- Card Header -->
        <d-card-header class="border-bottom">
          <h6 class="m-0">{{titleCalcs}}</h6>
          <div class="block-handle"></div>
        </d-card-header>
        <div class="d-flex" v-for="(item, idx) in cardStatsCalcs" :key="idx">
          <div class="w-50 border-right p-2 px-3">
            <div class="d-flex justify-content-between align-items-center">
              <h6>{{ item.value }}</h6>
            </div>
            <p class="text-muted mb-0 mr">
              <small>Новых справочников</small>
            </p>
          </div>
          <div class="w-50 p-2 px-3">
            <div class="d-flex justify-content-between align-items-center">
              <h6>{{item.percentage}}</h6>
            </div>
            <p class="text-muted mb-0 mr">
              <small>Рост</small>
            </p>
          </div>
        </div>
      </d-card>
    </d-col>
  </d-row>
</template>

<script>
const cardStats = [
  {
    label: 'Выбросы',
    value: '1.9',
    percentage: '4.7%',
  },
];

const cardStatsSources = [
  {
    label: 'Методики',
    value: '10',
    percentage: '1.2%',
  },
];

const cardStatsCalcs = [
  {
    label: 'Справочники',
    value: '56',
    percentage: '8.2%',
  },
];
export default {
  name: 'card-stats',
  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'Выбросы',
    },
    titleSources: {
      type: String,
      default: 'Методики',
    },
    titleCalcs: {
      type: String,
      default: 'Справочники',
    },
    /**
     * The emissions datasets.
     */
    cardStats: {
      type: Array,
      default() {
        return cardStats;
      },
    },
    cardStatsSources: {
      type: Array,
      default() {
        return cardStatsSources;
      },
    },
    cardStatsCalcs: {
      type: Array,
      default() {
        return cardStatsCalcs;
      },
    },
  },
};
</script>
