<template>
  <d-card class="card-small mb-3">
    <d-form class="new-emission-source" @submit="handleOnSubmit" validate>
      <d-card-body>
        <d-row class="justify-content-center">
          <d-col cols="12">
            <div class="form-group">
              <label>Наименование источника выделения:</label>
              <d-input
                type="text"
                v-model="treatment.emissionSourceName"
                class="form-control"
                name="example-text-input"
                placeholder="Введите наименование или номер источника для поиска.."
              ></d-input>
            </div>
          </d-col>
          <d-col cols="12">
            <div class="form-group">
              <label>Наименование Пылегазоочистного оборудования (ПГО):</label>
              <input
                type="text"
                class="form-control"
                v-model="treatment.filtrationUnitName"
                v-validate="'required'"
                data-vv-as="Наименование Пылегазоочистного оборудования"
                name="FiltrationUnitName"
                id="FiltrationUnitName"
                placeholder="Введите наименование ПГО.."
              >
              <d-form-invalid-feedback>{{ errorBags.first('FiltrationUnitName') }}.</d-form-invalid-feedback>
            </div>
          </d-col>
        </d-row>
        <div class="p-2 mt-2 border rounded" style="background-color:#f9f9fb;">
        <d-row
          class="justify-content-center"
          v-for="(pollutant, index) in treatment.pollutants"
          :key="index"
        >
        <d-col cols="12" md="1" lg="1">
            <label>Код ЗВ по которому происходит очистка:</label>
            <div class="form-group">
              <input
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Введите наименование ЗВ для поиска"
                v-model="pollutant.pollutantName"
                name="pollutants[][pollutantName]"
                required
              >
            </div>
          </d-col>
          <d-col cols="12" md="3" lg="3">
            <label>ЗВ по которому происходит очистка:</label>
            <div class="form-group">
              <input
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Введите наименование ЗВ для поиска"
                v-model="pollutant.pollutantName"
                name="pollutants[][pollutantName]"
                required
              >
            </div>
          </d-col>
          <d-col cols="12" md="3" lg="3">
            <label>Проектный КПД, %:</label>
            <div class="form-group">
              <input
                type="number"
                class="form-control"
                v-model.number="pollutant.inicialTreatment"
                v-validate="'required|numeric|between:0,100'"
                data-vv-as="Проектный КПД"
                name="pollutants[][inicialTreatment]"
              >
              <d-form-invalid-feedback>{{ errorBags.first("pollutants[][inicialTreatment]") }}.</d-form-invalid-feedback>
            </div>
          </d-col>
          <d-col cols="12" md="3" lg="3">
            <label>Фактический КПД, %:</label>
            <div class="form-group">
              <input
                type="number"
                class="form-control"
                v-model.number="pollutant.actualTreatment"
                v-validate="'required|between:0,100'"
                data-vv-as="Фактический КПД"
                name="pollutants[][actualTreatment]"
              >
              <d-form-invalid-feedback>{{ errorBags.first("pollutants[][actualTreatment]") }}.</d-form-invalid-feedback>
            </div>
          </d-col>
          <d-col cols="12" md="2" lg="2" class="text-center">
            <label>Действия:</label>
            <div class="form-group">
              <d-button
                type="button"
                class="btn btn-outline-danger"
                @click.prevent="removePollutant(index)"
              >
                <i class="material-icons">delete</i>
              </d-button>
            </div>
          </d-col>
        </d-row>
        </div>
        <d-row class="mt-2">
          <d-col cols="12">
            <div class="d-flex float-right">
              <!-- Using @click -->
              <d-button
                class="btn-outline-primary"
                @click.prevent="addPollutant"
              >+ ЗВ по которому проводится очистка</d-button>
            </div>
          </d-col>
        </d-row>
        <d-row>
          <d-col cols="12">
            <label class="form-label">Комментарии к ПГО</label>
            <textarea class="form-control"
              v-model="treatment.filtrationUnitComments"
              placeholder="Введите любой комментарии на ваше усмотрение"
              :rows="1"
              :max-rows="6"
            ></textarea>
          </d-col>
        </d-row>
      </d-card-body>
      <d-card-footer>
        <div class="d-flex">
          <d-link @click="goBack">Отменить</d-link>
          <d-button class="btn btn-success ml-auto" @click="handleOnSubmit" type="submit">Сохранить</d-button>
        </div>
      </d-card-footer>
    </d-form>
  </d-card>
</template>

<script>
export default {
  name: 'e-editor',
  data() {
    return {
      treatment: {
        emissionSourceName: '',
        filtrationUnitName: '',
        pollutants: [
          {
            pollutantName: '',
            inicialTreatment: '',
            actualTreatment: '',
          },
        ],
        filtrationUnitComments: '',
      },
    };
  },
  methods: {
    removePollutant(index) {
      this.treatment.pollutants.splice(index, 1);
    },
    addPollutant(event) {
      event.preventDefault();
      this.treatment.pollutants.push({
        pollutantName: '',
        inicialTreatment: '',
        actualTreatment: '',
      });
    },
    handleOnSubmit(e) {
      e.preventDefault();
      // eslint-disable-next-line
      alert(JSON.stringify(this.treatment));
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {},
  mounted() {},
};
</script>
