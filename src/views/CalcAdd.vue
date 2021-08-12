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
                  label="name"
                  :reduce="rel => rel.id"
                  :value="releaseSourceId"
                  :options="release_sources"
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
              <div class="form-group">
                <div class="custom-controls-stacked">
                  <label class="d-block">Год на который устанавливается лимит:</label>
                  <date-range-picker
                    :from="period.from"
                    :to="period.to"
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
import { fetchReleaseSourcesByCompanyId } from '@/services/api'
import RELEASE_SOURCES_LIST_CALC from '@/graphql/ReleaseSourcesCalcList.gql'
import ADD_AIR_CALC from '@/graphql/AddAirCalc.gql'
import DieselMethod from '@/components/calc-methods/DieselMethod.vue';
import BlastMethod from '@/components/calc-methods/BlastMethod.vue';
import PumpMethod from '@/components/calc-methods/PumpMethod.vue';
import { mapState, mapMutations } from 'vuex';

// const companyId = JSON.parse(localStorage.getItem("vue-use-local-storage")).companyId

export default {
  // apollo: {
  //   release_sources: {
  //     query : RELEASE_SOURCES_LIST_CALC,
  //     variables: {
  //       company_id: this.companyId
  //     }
  //   }
  // },
  components: {
    DieselMethod,
    BlastMethod,
    PumpMethod,
  },
  data() {
    return {
      companyId: '',
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
      panel: 'range',
      panels: ['range', 'year'],
      presets: [
        'next365days',
        'custom',
        'next7days',
        'next30days',
        'next90days',
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
      const polls = this.pollutants.map(({code, gseccoef, tyearcoef}) => ({code, gseccoef, tyearcoef}))
      console.log(polls);
      this.$apollo.mutate({
        mutation: ADD_AIR_CALC,
        variables: {
          release_source_id: this.releaseSourceId,
          calc_method: this.calcMethod,
          type: this.calcData.calcType,
          start_date: this.period.from,
          end_date: this.period.to,
          calc_pollutants: polls
        }
      })
      .then((data) => {
      // Result
      console.log(data)
      }).catch((error) => {
        console.error(error)
      })
    },

    goBack() {
      this.$router.push('/calculations');
    },
  },

  computed: {
    ...mapState('calcStore', ['releaseSourceId', 'calcMethodId', 'gsecTotal', 'tyearTotal', 'pollutants']),
  },
  async created() {
    const companyId = JSON.parse(localStorage.getItem("vue-use-local-storage")).companyId
    if (companyId) {
      this.release_sources = await fetchReleaseSourcesByCompanyId(companyId)
    }
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
