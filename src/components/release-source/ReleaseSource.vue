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
            :value="releaseSource.releaseSourceName"
            @input="setReleaseName"
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
        <d-input type="text" :value="releaseSource.releaseSourceNumber" @input="setReleaseNumber"/>
      </d-col>
    </d-row>
    <d-row class="mb-3">
      <d-col cols="12" md="6" lg="6">
        <label>Инвентарный номер источника выделения</label>
        <d-input type="text" :value="releaseSource.assetNumber" @input="setReleaseAssetNumber"/>
      </d-col>
      <d-col cols="12" md="6" lg="6">
        <label for="releaseSourceType" class="d-block">Источник парниковых газов</label>
        <d-form-radio
          name="releaseSourceType"
          inline
          v-model="releaseSource.ghgSource"
          :checked="releaseSource.ghgSource === true"
          :value="true"
          @change="setReleaseGhgSource"
        >Да</d-form-radio>
        <d-form-radio
          name="releaseSourceType"
          inline
          v-model="releaseSource.ghgSource"
          :checked="releaseSource.ghgSource === false"
          :value="false"
          @change="setReleaseGhgSource"
        >Нет</d-form-radio>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('releaseStore', ['releaseSource']),
  },
  methods: {
    ...mapMutations('releaseStore', ['setReleseSource', 'setReleaseName', 'setReleaseNumber', 'setReleaseAssetNumber', 'setReleaseGhgSource']),
  },
};
</script>
