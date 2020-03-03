<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Источник выделения </span>
        <h3 class="page-title">{{ releaseSourceCard.releaseSource.releaseSourceName }}</h3>
      </div>
    </div>

    <d-card class="card-small mb-3">
      <d-card-header class="d-flex">
        <h6 class="d-flex m-0">Детали</h6>
      </d-card-header>

      <div v-if="!loaded">Загружаем данные...</div>
      <div v-else>
        <d-card-body>
          <table
            class="table"
            style="width:100%"
          >
            <tr>
              <th>Наименование промплощадки:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.worksite.workSiteName }}</td>
            </tr>
            <tr>
              <th>Категория промплощадки:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.worksite.natureUserCategory }}</td>
            </tr>
            <tr>
              <th>Цех / объект:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.facility.facilityName }}</td>
            </tr>
            <tr>
              <th>Участок:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.facilityLocation.facilityLocationName }}</td>
            </tr>
            <tr>
              <th>№ ист.эмиссии:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.emissionSource.emissionSourceNumber }}</td>
            </tr>
            <tr>
              <th>Наименование ист. выбросов:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.emissionSource.emissionSourceName }}</td>
            </tr>
            <tr>
              <th>Тип ист.эмиссии:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.emissionSource.emissionSourceOrganized ? 'организованный' : 'неорганизованный' }}</td>
            </tr>
            <tr>
              <th>Наименование ист.выделения:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.releaseSource.releaseSourceName }}</td>
            </tr>
            <tr>
              <th>Номер ист.выделения:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.releaseSource.releaseSourceNumber }}</td>
            </tr>
            <tr>
              <th>Описание источника:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.emissionSource.description }}</td>
            </tr>
          </table>
        </d-card-body>
      </div>
      <d-card-footer class="text-right border-top">
        <div class="d-flex">
          <d-link @click="goBack">Назад</d-link>
          <router-link class="ml-auto"  :to="{ name: 'release-source-edit', params: { id: releaseSourceCard.releaseSource.id }}">
            <d-button theme="warning">Редактировать</d-button>
          </router-link>
        </div>
      </d-card-footer>
    </d-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      loaded: false,
    };
  },
  created() {
    this.getSource();
  },
  computed: {
    ...mapState('emissions', ['releaseSourceCard']),
  },
  methods: {
    ...mapActions('emissions', ['getReleaseSourceCard', 'resetReleaseSourceCard']),
    getSource() {
      try {
        this.loaded = false;
        this.getReleaseSourceCard(this.$route.params.id);
      } finally {
        this.loaded = true;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
