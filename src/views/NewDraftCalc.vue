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
          <d-form >
            <d-card-header class="border-bottom">
              <h6 class="card-title">Данные для чернового расчета</h6>
            </d-card-header>
            <d-card-body>
              <div class="form-group">
                <label class="form-label">Источник выделения:</label>
                <v-select :options="releaseSource.releaseSourceOptions" v-model="releaseSource.releaseSourceName"
                  ></v-select>
              </div>
              <div class="form-group">
                <label class="form-label">Методика расчета:</label>
                <v-select :options="calcMethod.calcMethodOptions" v-model="calcMethod.calcMethodName">
                </v-select>
              </div>
              <div class="form-group">
                <div class="custom-controls-stacked">
                  <label class="d-block">Год на который устанавливается лимит:</label>
                  <date-range-picker :from="from" :to="to" :panel="panel" :panels="panels" :theme="theme"
                    :presets="presets" locale="ru" @update="update" />
                </div>
              </div>
              <div class="form-group">
                <label class="d-block">Тип расчета</label>
                <d-form-radio inline name="calcType" value="draft" v-model="calcData.calcType" disabled>Черновик
                </d-form-radio>
                <d-form-radio inline name="calcType" value="limit" v-model="calcData.calcType" disabled>Лимит
                </d-form-radio>
              </div>
            </d-card-body>
            <d-card-footer class="text-right border-top">
              <div class="d-flex">
                <d-link @click="goBack">Назад</d-link>
                <d-button type="submit" class="ml-auto">Рассчитать</d-button>
              </div>
            </d-card-footer>
          </d-form>
        </d-card>
      </d-col>
      <div class="col-md-7">
        <calculator1></calculator1>
      </div>
    </div>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

import Calculator1 from '@/components/new-calc-example/Calculator1.vue';

export default {
  components: {
    Treeselect,
    Calculator1,
  },
  data() {
    return {
      calcMethod: {
        calcMethodName: 'calcMethod 0',
        calcMethodOptions: ['calcMethod 1', 'calcMethod 2'],
      },
      releaseSource: {
        id: '',
        releaseSourceName: 'calcMethod 0',
        releaseSourceOptions: ['release source name 1', 'release source name 2'],
      },
      calcData: {
        calcType: 'draft',
      },
      // vue-mj-daterangepicker related
      to: '',
      from: '2019-12-23T10:26:00.996Z',
      panel: 'range',
      panels: ['range', 'year'],
      presets: [
        'custom', 'next7days', 'next30days', 'next90days', 'next365days',
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
  // created() {
  //   this.fetch();
  // },
  methods: {
    // fetch() {
    //   ReleaseSourcesRepository.read(store.state.company.id, this.$route.params.id)
    //     .then((response) => {
    //       this.releaseSource = response.data;
    //       CalcsRepository.read(this.releaseSource.calc_id)
    //         .then((r) => { this.calc = r.data; })
    //         .catch((error) => { alert(error); });
    //       this.calcData.calc_id = this.releaseSource.calc_id;
    //     })
    //     .catch((error) => { console.log(error); });
    // },
    // handleOnSubmit(e) {
    //   e.preventDefault();
    //   CalcDatasRepository.perform(this.calcData)
    //     .then((response) => {
    //       this.calcData = response.data;
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    update(values) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          to: values.to,
          from: values.from,
          panel: values.panel,
        }),
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {},
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
