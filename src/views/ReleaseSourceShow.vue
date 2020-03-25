<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Источник выделения </span>
        <h3 class="page-title">{{ releaseSourceCard.releaseSourceName }}</h3>
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
              <td class="font-weight-normal">{{ releaseSourceCard.workSiteName }}</td>
            </tr>
            <tr>
              <th>Категория промплощадки:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.natureUserCategory }}</td>
            </tr>
            <tr>
              <th>Цех / объект:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.facilityName }}</td>
            </tr>
            <tr>
              <th>Участок:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.facilityLocationName }}</td>
            </tr>
            <tr>
              <th>№ ист.эмиссии:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.emissionSourceNumber }}</td>
            </tr>
            <tr>
              <th>Наименование ист. выбросов:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.emissionSourceName }}</td>
            </tr>
            <tr>
              <th>Тип ист.эмиссии:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.emissionSourceOrganized ? 'организованный' : 'неорганизованный' }}</td>
            </tr>
            <tr>
              <th>Наименование ист.выделения:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.releaseSourceName }}</td>
            </tr>
            <tr>
              <th>Номер ист.выделения:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.releaseSourceNumber }}</td>
            </tr>
            <!-- <tr>
              <th>Описание источника:</th>
              <td class="font-weight-normal">{{ releaseSourceCard.emissionSource.description }}</td>
            </tr> -->
          </table>
        </d-card-body>
      </div>
      <d-card-footer class="text-right border-top">
        <div class="d-flex">
          <router-link to="/release-source-list">Назад</router-link>
          <router-link class="ml-auto"  :to="{ name: 'release-source-edit', params: { id: releaseSourceCard.id }}">
            <d-button theme="warning">Редактировать</d-button>
          </router-link>
        </div>
      </d-card-footer>
    </d-card>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      loaded: false,
      releaseSourceCard: {},
    };
  },
  created() {
    this.getSource();
  },
  computed: {
  },
  methods: {
    async getSource() {
      this.loaded = false;
      const releaseSource = await api.getResource(`releaseSources/${this.$route.params.id}`);
      const worksite = await api.getResource(`worksites/${releaseSource.worksiteId}`);
      const facility = await api.getResource(`facilities/${releaseSource.facilityId}`);
      const facilityLocation = await api.getResource(`facilityLocations/${releaseSource.facilityLocationId}`);
      const emissionSource = await api.getResource(`emissionSources/${releaseSource.emissionSourceId}`);
      this.releaseSourceCard = {
        id: releaseSource.id,
        workSiteName: worksite.workSiteName,
        natureUserCategory: worksite.natureUserCategory,
        facilityName: facility.facilityName,
        facilityLocationName: facilityLocation.facilityLocationName,
        emissionSourceNumber: emissionSource.emissionSourceNumber,
        emissionSourceName: emissionSource.emissionSourceName,
        emissionSourceOrganized: emissionSource.emissionSourceOrganized,
        releaseSourceName: releaseSource.releaseSourceName,
        releaseSourceNumber: releaseSource.releaseSourceNumber,
      };
      this.loaded = true;
    },
  },
};
</script>
