<template>
  <d-card class="card-small">
    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
      <div class="block-handle"></div>
    </d-card-header>
    <d-card-body class="p-0">
      <!-- Task List -->
      <d-list-group flush class="list-group-small">
        <d-list-group-item
          v-for="(item, idx) in taskStatus"
          :key="idx"
          class="list-group-item d-flex"
        >
          <d-col>
            <div class="go-stats__meta">
              <span class="mr-0">
                <strong>{{ item.emissionSourceName }}</strong>
              </span>
            </div>
            <span class="d-block d-sm-inline">
              <strong class="text-success">{{ item.emailResponsible }}</strong>
            </span>
          </d-col>
          <d-col d-flex>
            <div class="text-right ml-auto">
              <span class="ml-auto text-right text-semibold text-reagent-gray">{{ item.deadline }}</span>
            </div>
          </d-col>
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
        <!-- View Total Data Report -->
        <d-col class="text-right view-report">
          <router-link to="list-tasks">Посмотреть полные данные &rarr;</router-link>
        </d-col>
      </d-row>
    </d-card-footer>
  </d-card>
</template>

<script>
const taskStatus = [
  {
    emissionSourceName: 'Буровая установка ZJ-30',
    emailResponsible: 'zhaken_95@mail.ru',
    deadline: '20-12-2018',
  },
  {
    emissionSourceName: 'Передвижная паровая установка (ППУ)',
    emailResponsible: 'marat_ald@mail.ru',
    deadline: '17-12-2018',
  },
  {
    emissionSourceName: 'Смесительная установка СМН-20',
    emailResponsible: 'dg3838@yandex.ru',
    deadline: '14-12-2018',
  },
  {
    emissionSourceName: 'Насосная установка для перекачки дизтоплива',
    emailResponsible: 'hunt43@gmail.com',
    deadline: '11-12-2018',
  },
];

export default {
  name: 'task-status',
  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'Статус задач',
    },
    /**
     * The emissions datasets.
     */
    taskStatus: {
      type: Array,
      default() {
        return taskStatus;
      },
    },
  },
};
</script>
