<template>
  <d-list-group flush>
    <d-list-group-item class="px-3">
      <h6>Загрязняющее вещество</h6>
      <hr />
      <d-form>
        <label>Наименование загрязняющего вещества</label>
        <d-input class="mb-3" type="text" disabled :value="editPol.label" />
        <label>Выбрать группы ЗВ</label>
        <v-select
          :options="air_pollutant_groups"
          name="label"
          :id="id"
          :placeholder="placeholder"
          v-model="editPol.group"
          label="label"
        >
        </v-select>
      </d-form>
      <input
        type="submit"
        value="Сохранить"
        class="btn btn-success mt-3"
        @click="savePol"
      />
    </d-list-group-item>
  </d-list-group>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {

  },
})
</script>
