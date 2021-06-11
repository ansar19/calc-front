<template>
<div>
  <div v-if="!loaded">Loading...</div>
  <wrapper v-if="loaded">
    <d-form class="new-emission-source" @submit="saveReleaseSource">
      <d-card-body>
        <release-source
        ></release-source>
        <release-source-emission v-if="releaseSource"></release-source-emission>
        <hr />
        <release-source-head v-if="releaseSource"></release-source-head>
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

    ...mapActions('releaseStore', ['fetchReleaseSourceByPk', 'getWorksite', 'getFacility', 'getFacilityLocation', 'getEmissionSource', 'putReleaseSource', 'clearAll']),

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
      this.fetchReleaseSourceByPk(this.$route.params.id)
      this.loaded = true
    }
  },

  beforeDestroy() {
    this.clearAll();
  },
};
</script>
