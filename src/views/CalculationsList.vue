<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Расчеты</span>
        <h3 class="page-title">{{componentTitle}}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-body v-if="!loading">
            <!-- tabs -->
            <d-tabs>
              <d-tab title="Лимиты" active>
                <limit-calc-list :releaseSourceList="releaseSourceList"></limit-calc-list>
              </d-tab>
              <d-tab title="Фактические">
                <actual-calc-list></actual-calc-list>
              </d-tab>
              <d-tab title="Черновики">
                <draft-calc-list></draft-calc-list>
              </d-tab>
            </d-tabs>
            <!-- tabs -->
          </d-card-body>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LimitCalcList from '@/components/calculations/LimitCalcList.vue';
import ActualCalcList from '@/components/calculations/ActualCalcList.vue';
import DraftCalcList from '@/components/calculations/DraftCalcList.vue';

/* eslint-disable no-alert */
export default {
  components: {
    // ClientTable,
    LimitCalcList,
    ActualCalcList,
    DraftCalcList,
  },
  data() {
    return {
      loading: true,
      componentTitle: 'Список расчетов',
    };
  },
  computed: {
    ...mapState('releaseStore', ['releaseSourceList']),
  },
  methods: {
    ...mapActions('releaseStore', ['getReleaseSourceList']),
  },
  created() {
    this.loading = true;
    this.getReleaseSourceList().then(() => {
      this.loading = false;
    });
  },
};
</script>
