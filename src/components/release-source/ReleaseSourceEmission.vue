<template>
  <div v-if="emissionSource">
    <d-row>
      <d-col cols="12" md="6" lg="6">
        <div class="form-group">
          <label>Источник выбросов</label>
          <!-- <ul>
          <li v-for="es in emission_sources" :key="es.id">{{es.name}}</li>
        </ul> -->
          <v-select
            placeholder="Выбрать источник эмиссии"
            :options="emission_sources"
            v-model="emissionSource"
            label="name"
            required
          />
          <d-form-invalid-feedback>
            Необходимо указать наименование источника!
          </d-form-invalid-feedback>
        </div>
      </d-col>
      <d-col cols="12" md="6" lg="6">
        <label>Номер источника выбросов</label>
        <d-input disabled :value="emissionSource.number" />
      </d-col>
    </d-row>
    <d-row class="mb-3">
      <d-col cols="12" md="6" lg="4">
        <label>Инвентарный номер источника выбросов</label>
        <d-input disabled :value="emissionSource.inventory_number" />
      </d-col>
      <d-col cols="12" md="6" lg="4">
        <label>Тип источника выбросов</label>
        <d-input
          disabled
          :value="
            emissionSource.organized ? 'Организованый' : 'Неорганизованый'
          "
        />
      </d-col>
      <d-col cols="12" md="6" lg="4">
        <label>Выпускаемая продукция</label>
        <d-input disabled :value="emissionSource.product" />
      </d-col>
    </d-row>

    <d-row class="mb-3">
      <d-col cols="12" md="6" lg="4">
        <label>Промплощадка (ПП)</label>
        <d-input disabled :value="emissionSource.facility_location.facility.worksite.name" />
      </d-col>
      <d-col cols="12" md="6" lg="4">
        <label>Цех / объект</label>
        <d-input disabled :value="emissionSource.facility_location.facility.name" />
      </d-col>
      <d-col cols="12" md="6" lg="4">
        <label>Участок</label>
        <d-input disabled :value="emissionSource.facility_location.name" />
      </d-col>
    </d-row>

    <label>Описание источника выбросов</label>
    <textarea
      class="form-control mb-3"
      v-model="emissionSource.description"
      placeholder="Коментарии отстутствуют"
      readonly
    ></textarea>
  </div>
</template>

<script>
// import EmissionEdit from '@/components/release-source/ReleaseEmissionEdit.vue';
// import FilterEdit from '@/components/release-source/ReleaseFilterEdit.vue';
// import PollutantAdd from '@/components/release-source/ReleasePollutantAdd.vue';
// import SlideOut from '@hyjiacan/vue-slideout';
// import '@hyjiacan/vue-slideout/lib/slideout.css';
import EMISSION_SOURCES_LIST from "@/graphql/EmissionSourcesList.gql";

export default {
  apollo: {
    emission_sources: {
      query: EMISSION_SOURCES_LIST,
    },
  },
  // props: ["releaseSource", "setEmissionSource"],
  props: {
    releaseSource: Object,
    setEmissionSource: Function,
  },
  data() {
    return {
      emission_sources: [],
    };
  },
  computed: {
    emissionSource: {
      get() {
        return this.releaseSource.emission_source;
      },
      set(val) {
        this.setEmissionSource(val);
      },
    },
  },
};
</script>
