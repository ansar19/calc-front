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
            v-model="releaseSource.name"
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
        <d-input type="text" v-model="releaseSource.number"/>
      </d-col>
    </d-row>
    <d-row class="mb-3">
      <d-col cols="12" md="6" lg="6">
        <label>Инвентарный номер источника выделения</label>
        <d-input type="text" v-model="releaseSource.inventory_number"/>
      </d-col>
      <d-col cols="12" md="6" lg="6">
        <label for="releaseSourceType" class="d-block">Источник парниковых газов</label>
        <d-form-radio
          name="releaseSourceType"
          inline
          v-model="releaseSource.ghg_source"
          value="true"
        >Да</d-form-radio>
        <d-form-radio
          name="releaseSourceType"
          inline
          v-model="releaseSource.ghg_source"
          value="false"
        >Нет</d-form-radio>
      </d-col>
    </d-row>
  </div>
</template>

<script>
export default {
  name: 'ReleaseSourceComponent',
  props: ['releaseSource'],
};
</script>
