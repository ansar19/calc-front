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
        <d-card>
          <!-- <div class="card card-small overflow-hidden mb-4 meta"> -->
          <d-card-header>
            <div class="block-handle mt-2" align="right">
              <router-link to="calc-add">
                <d-button size="sm" class="ml-2" text="Добавить">+ расчет</d-button>
              </router-link>
            </div>
          </d-card-header>
          <d-card-body v-if="!loading">
            <calc-list-table></calc-list-table>
          </d-card-body>
          <!-- </div> -->
        </d-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-alert */
import api from '@/services/api';
import { mapState, mapMutations } from 'vuex';
import CalcListTable from '@/components/calculations/CalcListTable.vue';

export default {
  components: {
    CalcListTable,
  },
  data() {
    return {
      loading: true,
      componentTitle: 'Список расчетов',
    };
  },
  computed: {
    ...mapState('calcStore', ['calcsFromDb', 'calcList', 'releaseSources']),
  },
  methods: {
    ...mapMutations('calcStore', [
      'setCalcsFromDb',
      'setCalcList',
      'setReleaseSources',
    ]),
  },
  created() {
    this.loading = true;
    api.getResource('releaseSourceCalculations').then((res) => {
      this.setCalcsFromDb(res);
      this.loading = false;
    });
    api
      .getResource('releaseSources')
      .then((res) => {
        this.setReleaseSources(res);
      })
      .then(() => {
        const source = [];
        for (let i = 0; i < this.calcsFromDb.length; i += 1) {
          const cfd = this.calcsFromDb[i];
          const rsn = this.releaseSources.find(el => el.id === cfd.releaseSourceId);
          source.push({ ...cfd, releaseSourceName: rsn.releaseSourceName });
        }
        this.setCalcList(source);
      });
  },
};
</script>
