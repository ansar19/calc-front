<template>
  <div>
    <d-row class="mt-2">
      <d-col cols="12" md="6" lg="6">
        <div class="form-group">
          <label>Наименование источника выделения</label>
          <d-form-input
            type="text"
            class="mb-3"
            placeholder="Введите наименование источника выделения"
            v-model="c_rs_name"
            required
          ></d-form-input>
          <d-form-invalid-feedback>
            Необходимо указать наименование
            источника выделения!
          </d-form-invalid-feedback>
        </div>
      </d-col>
      <d-col cols="12" md="6" lg="6">
        <label>Номер источника выделения</label>
        <d-input type="text" v-model="c_rs_number"/>
      </d-col>
    </d-row>
    <d-row class="mb-3">
      <d-col cols="12" md="6" lg="6">
        <label>Инвентарный номер источника выделения</label>
        <d-input type="text" v-model="c_rs_inventory_number"/>
      </d-col>
      <d-col cols="12" md="6" lg="6">
        <label for="releaseSourceType" class="d-block">Источник парниковых газов</label>
        <d-form-radio
          name="releaseSourceType"
          inline
          v-model="c_rs_ghg_source"
          value="true"
        >Да</d-form-radio>
        <d-form-radio
          name="releaseSourceType"
          inline
          v-model="c_rs_ghg_source"
          value="false"
        >Нет</d-form-radio>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    c_rs_name: {
      get() {
        return this.releaseSource.name
      },
      set(val) {
        this.setReleaseName(val);
      },
    },
    c_rs_number: {
      get() {
        return this.releaseSource.number
      },
      set(val) {
        this.setReleaseNumber(val);
      },
    },
    c_rs_inventory_number: {
      get() {
        return this.releaseSource.inventory_number
      },
      set(val) {
        this.setReleaseAssetNumber(val);
      },
    },
    c_rs_ghg_source: {
      get() {
        return this.releaseSource.ghg_source
      },
      set(val) {
        this.setReleaseGhgSource(val);
      },
    },

    ...mapState('releaseStore', ['releaseSource']),
  },
  methods: {
    ...mapMutations('releaseStore', ['setReleseSource', 'setReleaseName', 'setReleaseNumber', 'setReleaseAssetNumber', 'setReleaseGhgSource']),
  },
};
</script>
