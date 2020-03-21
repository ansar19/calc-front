<template>
  <!-- Stats Blocks -->
  <d-row>
    <d-col cols="12" md="3" lg="3" class="mb-4">
      <d-card class="p-3">
        <div class="d-flex align-items-center" v-if="!loading">
          <div
            class="bg-warning rounded text-white text-center p-3 mr-2"
            style="box-shadow: inset 0 0 5px rgba(0,0,0,.2);"
          >
            <i class="large material-icons">local_gas_station</i>
          </div>
          <div>
            <h6 class="m-0">
              <router-link to="release-source-list">Источники эмиссии: </router-link>
              <small>{{ emissionSourcesCount }}</small>
            </h6>
            <small class="text-muted">Организованных: {{ emissionSourcesOrganized }}</small>
          </div>
        </div>
      </d-card>
    </d-col>
    <d-col cols="12" md="3" lg="3" class="mb-4">
      <d-card class="p-3">
        <div class="d-flex align-items-center">
          <div
            class="bg-info rounded text-white text-center p-3 mr-2"
            style="box-shadow: inset 0 0 5px rgba(0,0,0,.2);"
          >
            <i class="large material-icons">insert_chart</i>
          </div>
          <div>
            <h6 class="m-0">
              <router-link to="list-limit">Лимиты: </router-link>
              <small>46 т/год</small>
            </h6>
            <small class="text-muted">Использовано: 12 т/год</small>
          </div>
        </div>
      </d-card>
    </d-col>
    <d-col cols="12" md="3" lg="3" class="mb-4">
      <d-card class="p-3">
        <div class="d-flex align-items-center">
          <div
            class="bg-success rounded text-white text-center p-3 mr-2"
            style="box-shadow: inset 0 0 5px rgba(0,0,0,.2);"
          >
            <i class="large material-icons">done_all</i>
          </div>
          <div>
            <h6 class="m-0">
              <router-link to="list-tasks">Задачи: </router-link>
              <small>78</small>
            </h6>
            <small class="text-muted">Задач закрыто: 32</small>
          </div>
        </div>
      </d-card>
    </d-col>
    <d-col cols="12" md="3" lg="3" class="mb-4">
      <d-card class="p-3">
        <div class="d-flex align-items-center">
          <div
            class="bg-primary rounded text-white text-center p-3 mr-2"
            style="box-shadow: inset 0 0 5px rgba(0,0,0,.2);"
          >
            <i class="large material-icons">people_outline</i>
          </div>
          <div>
            <h6 class="m-0">
              <router-link to="users">Пользователи: </router-link>
              <small>{{ usersCount }}</small>
            </h6>
            <small class="text-muted">Были онлайн сегодня: 1</small>
          </div>
        </div>
      </d-card>
    </d-col>
  </d-row>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      loading: true,
      emissionSourcesCount: null,
      emissionSourcesOrganized: null,
      usersCount: null,
    };
  },
  computed: {
    // emissionSourcesCount() {
    //   return this.emissionSources.length;
    // },
    // emissionSourcesOrganized() {
    //   return this.emissionSources.filter(el => el.emissionSourceOrganized === true).length;
    // },
    basicStats() {
      return [
        {
          label: 'Источники',
          value: '190',
          percentage: '4.7%',
        },
        {
          label: 'Лимиты',
          value: '182',
          percentage: '12.4',
        },
        {
          label: 'Задачи',
          value: '8,147',
          percentage: '3.8%',
        },
        {
          label: 'Пользователи',
          value: '29',
          percentage: '2.71%',
        },
        {
          label: 'Подписчики',
          value: '17,281',
          percentage: '2.4%',
        },
      ];
    },
  },

  created() {
    api.getResource('emissionSources').then((res) => {
      this.emissionSourcesCount = res.length;
      this.emissionSourcesOrganized = res
        .filter(el => el.emissionSourceOrganized === true).length;
    });
    api.getResource('users').then((res) => {
      this.usersCount = res.length;
    });
    this.loading = false;
  },
};
</script>
