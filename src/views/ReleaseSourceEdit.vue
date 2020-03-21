<template>
<div>
  <div v-if="!loaded">Loading...</div>
  <wrapper v-if="loaded">
    <d-form class="new-emission-source" @submit="saveReleaseSource">
      <d-card-body>
        <release-source
        ></release-source>
        <release-source-head v-if="releaseSource"></release-source-head>
        <hr />
        <release-source-emission v-if="releaseSource"></release-source-emission>
      </d-card-body>
      <d-card-footer class="border-top">
        <div v-if="errorMsg"><d-alert theme="danger" show="errorMsg" dismissible>{{errorMsg}}</d-alert></div>
        <div class="d-flex">
          <router-link tag="a" to="/release-source-list">Отменить</router-link>
          <button id="saveRelease" type="submit" class="btn btn-success ml-auto">Сохранить</button>
        </div>
      </d-card-footer>
    </d-form>
  </wrapper>
</div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import Wrapper from '@/components/release-source/ReleaseSourceWrapper.vue';
import ReleaseSourceHead from '@/components/release-source/ReleaseSourceHead.vue';
import ReleaseSourceEmission from '@/components/release-source/ReleaseSourceEmission.vue';
import ReleaseSource from '@/components/release-source/ReleaseSource.vue';
import releaseSourceService from '@/services/releaseSourceService';

export default {
  components: {
    Wrapper, ReleaseSourceHead, ReleaseSourceEmission, ReleaseSource,
  },
  name: 'release-source-edit',
  data() {
    return {
      loaded: false,
      errorMsg: '',
    };
  },

  computed: {
    ...mapState('releaseStore', ['errorMessage', 'releaseSource', 'worksite', 'facility', 'facilityLocation', 'emissionSource']),
    saveReleaseValidation() {
      let valid = true;
      if (!this.worksite.id
          || !this.facility.id
          || !this.facilityLocation.id
          || !this.emissionSource.id
      ) valid = false;
      return valid;
    },
  },

  methods: {
    ...mapMutations('releaseStore', ['setReleseSource', 'setWorksites', 'setFacilities', 'setFacilityLocations', 'setEmissionSources', 'setPollutantFilters', 'setFilteredPollutants']),

    ...mapActions('releaseStore', ['getWorksite', 'getFacility', 'getFacilityLocation', 'getEmissionSource', 'putReleaseSource', 'clearAll']),

    saveReleaseSource(e) {
      e.preventDefault();
      if (this.saveReleaseValidation) {
        this.putReleaseSource();
        this.$router.go(-1);
      } else {
        throw new Error('Заполните все данные');
      }
    },
  },

  created() {
    if (this.$route.params.id) {
      releaseSourceService
        .getResource(`releaseSources/${this.$route.params.id}`)
        .then((res) => {
          this.setReleseSource(res);
          this.getWorksite(res.worksiteId);
          this.getFacility(res.facilityId);
          this.getFacilityLocation(res.facilityLocationId);
          this.getEmissionSource(res.emissionSourceId);
          this.loaded = true;
        });
    }
    releaseSourceService.getResource('worksites').then(res => this.setWorksites(res));
    releaseSourceService.getResource('facilities').then(res => this.setFacilities(res));
    releaseSourceService.getResource('facilityLocations').then(res => this.setFacilityLocations(res));
    releaseSourceService.getResource('emissionSources').then(res => this.setEmissionSources(res));
    releaseSourceService.getResource('pollutantFilters').then(res => this.setPollutantFilters(res));
    releaseSourceService.getResource('filteredPollutants').then(res => this.setFilteredPollutants(res));
  },

  beforeDestroy() {
    this.clearAll();
  },
};
</script>

