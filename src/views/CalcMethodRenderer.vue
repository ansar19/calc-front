<template>
  <d-card class="card-small mb-3" id="calcResult">
    <d-card-header class="border-bottom">
      <h6 class="card-title">Методика расчета</h6>
    </d-card-header>
    <d-card-body>
      <div class="json_wrapper" style="display:flex; width: 90%; margin: 0 auto;">
        <div style="flex: 0 0 50%;">
          <label>Enter your form definition json here:</label><br />
          <textarea style="width: 80%;" v-model="form"></textarea>
        </div>
        <div style="flex: 1;">
          <label>Enter your prefill json here:</label><br />
          <textarea style="width: 80%;" v-model="prefill_text"></textarea>
        </div>
      </div>
      <form-renderer :prefill="prefill" :form_json="form_json" v-on:form_answers="saveForm" ref="form"
        :settings="{validate:true}"> </form-renderer>
      <button type="button" class="btn btn-outline-success mt-2 mb-2" v-on:click="submit()">SUBMIT</button>
    </d-card-body>
    <d-card-footer class="border-top">
      <div class="d-flex">
        <d-link href="#cancel">Отменить</d-link>
        <d-button class="btn btn-success ml-auto">Сохранить</d-button>
      </div>
    </d-card-footer>
  </d-card>
</template>

<script>
/* eslint-disable */
import FormRenderer from '@/components/renderer/FormRenderer.vue';
export default {
  name: 'App',
  components: {
    FormRenderer
  },
  data() {
    return {
      form: `[
          {"id":"id-1","attributes":{"id":{"name":"id","invalid_message":null,"value":"liter-ton-1"},"name":{"name":"name","invalid_message":null,"value":"liter_ton"},"class":{"name":"class","invalid_message":null,"value":""},"value":{"name":"value","invalid_message":null,"value":null},"required":{"name":"required","invalid_message":null,"value":null},"hidden":{"name":"hidden","invalid_message":null,"value":null},"type":{"name":"type","invalid_message":null,"value":"header"},"size":{"name":"size","invalid_message":null,"value":"h5","options":["h1","h2","h3","h4","h5"]},"placeholder":{"name":"placeholder","invalid_message":null,"value":""},"min":{"name":"min","invalid_message":null,"value":""},"max":{"name":"max","invalid_message":null,"value":""},"step":{"name":"step","invalid_message":null,"value":""}},"label":"Перевод бензина и дизтоплива из литров в тонны","options":[]},{"id":"id-2","attributes":{"id":{"name":"id","invalid_message":null,"value":"fuel-consumption-liter-2"},"name":{"name":"name","invalid_message":null,"value":"fuel_consumption_liter"},"class":{"name":"class","invalid_message":null,"value":null},"value":{"name":"value","invalid_message":null,"value":null},"placeholder":{"name":"placeholder","invalid_message":null,"value":"Укажите расход топлива"},"min":{"name":"min","invalid_message":null,"value":""},"max":{"name":"max","invalid_message":null,"value":""},"step":{"name":"step","invalid_message":null,"value":""},"required":{"name":"required","invalid_message":null,"value":false},"hidden":{"name":"hidden","invalid_message":null,"value":null},"type":{"name":"type","invalid_message":null,"value":"number"}},"label":"Расход топлива в литрах","options":[]},{"id":"id-3","attributes":{"id":{"name":"id","invalid_message":null,"value":"fuel-type-3"},"name":{"name":"name","invalid_message":null,"value":"fuel_type"},"class":{"name":"class","invalid_message":null,"value":null},"value":{"name":"value","invalid_message":null,"value":null},"required":{"name":"required","invalid_message":null,"value":null},"hidden":{"name":"hidden","invalid_message":null,"value":null},"type":{"name":"type","invalid_message":null,"value":"select"},"placeholder":{"name":"placeholder","invalid_message":null,"value":""},"min":{"name":"min","invalid_message":null,"value":""},"max":{"name":"max","invalid_message":null,"value":""},"step":{"name":"step","invalid_message":null,"value":""}},"label":"Выберите тип топлива","options":[{"text":"Дизель","value":"0.769"},{"text":"Бензин","value":"0.73"}]},{"id":"id-4","attributes":{"id":{"name":"id","invalid_message":null,"value":"choose-equipment-5"},"name":{"name":"name","invalid_message":null,"value":"choose_equipment"},"class":{"name":"class","invalid_message":null,"value":null},"value":{"name":"value","invalid_message":null,"value":null},"placeholder":{"name":"placeholder","invalid_message":null,"value":""},"multiple":{"name":"multiple","invalid_message":null,"value":false},"required":{"name":"required","invalid_message":null,"value":null},"hidden":{"name":"hidden","invalid_message":null,"value":null},"type":{"name":"type","invalid_message":null,"value":"tree"},"min":{"name":"min","invalid_message":null,"value":""},"max":{"name":"max","invalid_message":null,"value":""},"step":{"name":"step","invalid_message":null,"value":""}},"label":"Выберите тип оборудования","options":[{"id":"diesel","label":"Дизель","children":[{"id":"dieselBeforeRepair","label":"До капремонта","finalvalues":[{"pollutantCode":"0301","pollutantName":"Азота диоксид","gSecCoef":0.004,"tYearCoef":0.00043},{"pollutantCode":"0304","pollutantName":"Азота оксид","gSecCoef":2,"tYearCoef":0.4},{"pollutantCode":"0328","pollutantName":"Углерод черный (Сажа)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0330","pollutantName":"Серы диоксид (Ангидрид сернистый)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0337","pollutantName":"Углерода оксид","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0703","pollutantName":"Бенз/а/пирен (3-4-бензпирен)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"1325","pollutantName":"Формальдегид","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"2754","pollutantName":"Углеводороды предельные С12-С19 (в пересчете на С)","gSecCoef":3,"tYearCoef":0.32}]},{"id":"dieselAfterRepair","label":"После капремонта","finalvalues":[{"pollutantCode":"0301","pollutantName":"Азота диоксид","gSecCoef":0.004,"tYearCoef":0.00043},{"pollutantCode":"0304","pollutantName":"Азота оксид","gSecCoef":2,"tYearCoef":0.4},{"pollutantCode":"0328","pollutantName":"Углерод черный (Сажа)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0330","pollutantName":"Серы диоксид (Ангидрид сернистый)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0337","pollutantName":"Углерода оксид","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0703","pollutantName":"Бенз/а/пирен (3-4-бензпирен)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"1325","pollutantName":"Формальдегид","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"2754","pollutantName":"Углеводороды предельные С12-С19 (в пересчете на С)","gSecCoef":3,"tYearCoef":0.32}]}]},{"id":"gasdiesel","label":"Газодизель","children":[{"id":"gasdieselBeforeRepair","label":"До капремонта","finalvalues":[{"pollutantCode":"0301","pollutantName":"Азота диоксид","gSecCoef":0.004,"tYearCoef":0.00043},{"pollutantCode":"0304","pollutantName":"Азота оксид","gSecCoef":2,"tYearCoef":0.4},{"pollutantCode":"0328","pollutantName":"Углерод черный (Сажа)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0330","pollutantName":"Серы диоксид (Ангидрид сернистый)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0337","pollutantName":"Углерода оксид","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0703","pollutantName":"Бенз/а/пирен (3-4-бензпирен)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"1325","pollutantName":"Формальдегид","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"2754","pollutantName":"Углеводороды предельные С12-С19 (в пересчете на С)","gSecCoef":3,"tYearCoef":0.32}]},{"id":"gasdieselAfterRepair","label":"После капремонта","finalvalues":[{"pollutantCode":"0301","pollutantName":"Азота диоксид","gSecCoef":0.004,"tYearCoef":0.00043},{"pollutantCode":"0304","pollutantName":"Азота оксид","gSecCoef":2.34,"tYearCoef":0.4},{"pollutantCode":"0328","pollutantName":"Углерод черный (Сажа)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0330","pollutantName":"Серы диоксид (Ангидрид сернистый)","gSecCoef":3,"tYearCoef":0.2323},{"pollutantCode":"0337","pollutantName":"Углерода оксид","gSecCoef":3,"tYearCoef":0.0543},{"pollutantCode":"0703","pollutantName":"Бенз/а/пирен (3-4-бензпирен)","gSecCoef":2,"tYearCoef":0.945845},{"pollutantCode":"1325","pollutantName":"Формальдегид","gSecCoef":1.2,"tYearCoef":0.32},{"pollutantCode":"2754","pollutantName":"Углеводороды предельные С12-С19 (в пересчете на С)","gSecCoef":4.5,"tYearCoef":0.90835}]}]},{"id":"gas","label":"Газ","children":[{"id":"gasBeforeRepair","label":"До капремонта","finalvalues":[{"pollutantCode":"0301","pollutantName":"Азота диоксид","gSecCoef":0.004,"tYearCoef":0.00043},{"pollutantCode":"0304","pollutantName":"Азота оксид","gSecCoef":2,"tYearCoef":0.4},{"pollutantCode":"0328","pollutantName":"Углерод черный (Сажа)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0330","pollutantName":"Серы диоксид (Ангидрид сернистый)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0337","pollutantName":"Углерода оксид","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0703","pollutantName":"Бенз/а/пирен (3-4-бензпирен)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"1325","pollutantName":"Формальдегид","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"2754","pollutantName":"Углеводороды предельные С12-С19 (в пересчете на С)","gSecCoef":3,"tYearCoef":0.32}]},{"id":"gasAfterRepair","label":"После капремонта","finalvalues":[{"pollutantCode":"0301","pollutantName":"Азота диоксид","gSecCoef":0.004,"tYearCoef":0.00043},{"pollutantCode":"0304","pollutantName":"Азота оксид","gSecCoef":2,"tYearCoef":0.4},{"pollutantCode":"0328","pollutantName":"Углерод черный (Сажа)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0330","pollutantName":"Серы диоксид (Ангидрид сернистый)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0337","pollutantName":"Углерода оксид","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"0703","pollutantName":"Бенз/а/пирен (3-4-бензпирен)","gSecCoef":3,"tYearCoef":0.32},{"pollutantCode":"1325","pollutantName":"Формальдегид","gSecCoef":5,"tYearCoef":0.55},{"pollutantCode":"2754","pollutantName":"Углеводороды предельные С12-С19 (в пересчете на С)","gSecCoef":5,"tYearCoef":0.55}]}]}]}]               
        `,
      form_answers: null,
      // prefill_text: `{"autofield": [{ "text":"Дизель", "value":"diesel"}] }`
      prefill_text: `{"autofield": "v2v" }`
    }
  },
  computed: {
    form_json() {
      try {
        return JSON.parse(this.form);
      } catch (e) {
        return {};
      }
    },
    prefill() {
      try {
        return JSON.parse(this.prefill_text);
      } catch (e) {
        return {};
      }
    }
  },
  methods: {
    saveForm: function (form_answers) {
      this.form_answers = form_answers;
    },
    submit: function () {
      //check form validity
      console.log(this.$refs.form.isValid());
      console.log('is Form Valid? ');
      console.log(this.$refs.form.isValid() ? 'yes' : 'no');
    }
  }
}
</script>
