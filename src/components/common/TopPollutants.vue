<template>
  <d-card class="card-small">
    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
      <div class="block-handle"></div>
    </d-card-header>
    <d-card-body class="p-0">
      <!-- Top Pollutants List Group -->
      <d-list-group flush class="list-group-small">
        <d-list-group-item v-for="(item, idx) in pollutantData" :key="idx" class="d-flex px-3">
          <span class="text-semibold text-fiord-blue">{{ item.title }}</span>
          <span class="ml-auto text-right text-semibold text-reagent-gray">{{ item.value }}</span>
        </d-list-group-item>
      </d-list-group>
    </d-card-body>
    <d-card-footer class="border-top">
      <d-row>
        <!-- Time Frame -->
        <d-col>
          <d-select size="sm" value="last-week" style="max-width: 130px;">
            <option value="last-week">Текущая неделя</option>
            <option value="today">Сегодня</option>
            <option value="last-month">Последний месяц</option>
            <option value="last-year">Последний год</option>
          </d-select>
        </d-col>
        <!-- View Total Emissons Data Report -->
        <d-col class="text-right view-report">
          <router-link to="list-emissions">Посмотреть полные данные &rarr;</router-link>
        </d-col>
      </d-row>
    </d-card-footer>
  </d-card>
</template>

<script>
const defaultTopPollutants = [
  {
    title: 'Пыль неорганическая 20-70%',
    value: '19,291',
  },
  {
    title: 'Пыль неорганическая >70%',
    value: '11,201',
  },
  {
    title: 'Азота (II) диоксид',
    value: '9,291',
  },
  {
    title: 'Серы диоксид',
    value: '8,281',
  },
  {
    title: 'Углерода оксид',
    value: '7,128',
  },
  {
    title: 'Азота оксид',
    value: '6,218',
  },
  {
    title: 'Марганца оксид',
    value: '1,218',
  },
  {
    title: 'Железо (II) оксид',
    value: '1,171',
  },
];
export default {
  name: 'ao-top-pollutants',
  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'ТОП Загрязняющих веществ',
    },
    /**
     * The emissions datasets.
     */
    pollutantData: {
      type: Array,
      default() {
        return defaultTopPollutants;
      },
    },
  },
};
</script>
