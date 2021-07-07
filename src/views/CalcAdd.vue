<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Расчеты</span>
        <h3 class="page-title">Новый расчет выбросов</h3>
      </div>
    </div>
    <!-- Default Card -->
    <div class="row">
      <d-col class="col-md-5">
        <d-card class="mb-2">
          <d-form>
            <d-card-header class="border-bottom">
              <h6 class="card-title">Данные для чернового расчета</h6>
            </d-card-header>
            <d-card-body>
              <div class="form-group">
                <label class="d-block">Тип расчета</label>
                <d-form-radio
                  inline
                  name="calcType"
                  value="draft"
                  v-model="calcData.calcType"
                >Черновик</d-form-radio>
                <d-form-radio inline name="calcType" value="limit" v-model="calcData.calcType">Лимит</d-form-radio>
                <d-form-radio
                  inline
                  name="calcType"
                  value="actual"
                  v-model="calcData.calcType"
                >Фактический</d-form-radio>
              </div>
              <div class="form-group">
                <label class="form-label">Источник выделения:</label>
                <v-select
                  label="releaseSourceName"
                  :reduce="rel => rel.id"
                  :value="releaseSourceId"
                  :options="releaseSources"
                  @input="setReleaseSourceId"
                ></v-select>
              </div>
              <div class="form-group">
                <label class="form-label">Методика расчета:</label>
                <v-select
                  label="calcMethodName"
                  :options="calcMethods"
                  :reduce="cal => cal.id"
                  v-model="calcMethod"
                ></v-select>
              </div>
              <div class="form-group" v-if="calcData.calcType !== 'draft'">
                <div class="custom-controls-stacked">
                  <label class="d-block">Год на который устанавливается лимит:</label>
                  <date-range-picker
                    :from="from"
                    :to="to"
                    :panel="panel"
                    :panels="panels"
                    :theme="theme"
                    :presets="presets"
                    locale="ru"
                    @update="update"
                  />
                </div>
              </div>
            </d-card-body>
            <d-card-footer class="text-right border-top">
              <div class="d-flex">
                <router-link to="/calculations">Назад</router-link>
                <d-button class="btn btn-success ml-auto" @click.prevent="saveCalc">Сохранить</d-button>
              </div>
            </d-card-footer>
          </d-form>
        </d-card>
      </d-col>
      <d-col class="col-md-7">
        <div v-if="calcMethod">
          <d-card class="card-small mb-3" id="calcResult">
            <d-card-header class="border-bottom">
              <h6 class="card-title">Методика расчета выбросов</h6>
            </d-card-header>
            <d-card-body>
              <diesel-method v-if="calcMethod === 2"></diesel-method>
              <blast-method v-if="calcMethod === 3"></blast-method>
              <pump-method v-if="calcMethod === 4"></pump-method>
            </d-card-body>
          </d-card>
        </div>
      </d-col>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import api from '@/services/api';
import DieselMethod from '@/components/calc-methods/DieselMethod.vue';
import BlastMethod from '@/components/calc-methods/BlastMethod.vue';
import PumpMethod from '@/components/calc-methods/PumpMethod.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    DieselMethod,
    BlastMethod,
    PumpMethod,
  },
  apollo: {
    release_sources: gql`query{

    }`
  },
  data() {
    return {
      release_sources: [],
      releaseSources: [],
      calcMethods: [
        {
          id: 2,
          calcMethodName: 'Дизель',
        },
        {
          id: 3,
          calcMethodName: 'Взрыв',
        },
        {
          id: 4,
          calcMethodName: 'Насос',
        },
      ],
      calcMethod: null,
      calcData: {
        calcType: 'draft',
      },
      period: {
        to: null,
        from: null,
      },
      // vue-mj-daterangepicker related
      to: '',
      from: '2019-12-23T10:26:00.996Z',
      panel: 'range',
      panels: ['range', 'year'],
      presets: [
        'custom',
        'next7days',
        'next30days',
        'next90days',
        'next365days',
      ],
      // vue-mj-daterangepicker theme
      theme: {
        primary: '#17c671',
        secondary: '#2D3E50',
        ternary: '#93A0BD',
        light: '#ffffff',
        border: '#e6e6e6',
        dark: '#000000',
        hovers: {
          day: '#CCC',
          range: '#e6e6e6',
        },
      },
    };
  },

  methods: {
    ...mapMutations('calcStore', ['setReleaseSourceId']),
    update(values) {
      this.period.to = values.to;
      this.period.from = values.from;
    },

    saveCalc() {
      api.postResource('releaseSourceCalculations', {
        releaseSourceId: this.releaseSourceId,
        calcMethodId: this.calcMethod,
        calcType: this.calcData.calcType,
        pollutants: this.pollutants,
        gsecTotal: this.gsecTotal,
        tyearTotal: this.tyearTotal,
        period: this.period,
      })
        .then(() => this.goBack());
    },

    goBack() {
      this.$router.push('/calculations');
    },
  },

  computed: {
    ...mapState('calcStore', ['releaseSourceId', 'calcMethodId', 'gsecTotal', 'tyearTotal', 'pollutants']),
  },

  created() {
    api.getResource('releaseSources').then((res) => {
      this.releaseSources = res;
    });
  },
};
</script>
<style scoped>
/* vee-validate custom css rules applies only for d-select invalid message */
.invalid-feedback {
  display: block;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #c4183c;
  width: 100%;
}
</style>
