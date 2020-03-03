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
          <router-link to="release-source-list">Посмотреть полные данные &rarr;</router-link>
        </d-col>
      </d-row>
    </d-card-footer>
  </d-card>
</template>

<script>
const defaultTopPollutants = [
  {
    title: 'Буровая установка ZJ-30',
    value: '10,10428',
  },
  {
    title: 'Передвижнаяпароваяустановка (ППУ)',
    value: '5,94816',
  },
  {
    title: 'Смесительная установка СМН-20',
    value: '1,6419455',
  },
  {
    title: 'Насосная установка для перекачки дизтоплива',
    value: '0,9294',
  },
  {
    title: 'ДЭС – для выработки электроэнергии (TAD1241GE VOLVO)',
    value: '0,81504',
  },
  {
    title: 'Емкость для топлива',
    value: '0,566944',
  },
  {
    title: 'Цементировочныйагрегат',
    value: '0,38336',
  },
  {
    title: 'Сварочный пост',
    value: '0,218',
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
      default: 'ТОП источников выбросов',
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
