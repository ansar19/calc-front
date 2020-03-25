<template>
<div>
  <d-list-group flush>
    <d-list-item>
      <h6>Добавить загрязняющее вещество(ЗВ)</h6>
      <hr />
      <d-form>
        <v-select
            class="mb-2"
            label="label"
            placeholder="Поиск ЗВ"
            :options="pollutantslist"
            v-model="selectedPollutant"
        ></v-select>
        <label for="initialTreatment">Проектный КПД, %</label>
        <d-input
          type="text"
          id="initialTreatment"
          class="mb-3"
          placeholder="Введите проектный КПД в процентах"
          v-model="initialTreatmentLevel"
        />
        <label for="actualTreatment">Фактический КПД, %</label>
        <d-input
          type="text"
          id="actualTreatment"
          class="mb-3"
          placeholder="Введите фактический КПД в процентах"
          v-model="actualTreatmentLevel"
        />
        <div class="d-flex flex-row">
          <button
            type="submit"
            class="btn btn-outline-success mr-2"
            @click.prevent="save"
          >Сохранить</button>
          <button
            type="button"
            class="btn btn-link mr-2"
            @click.prevent="closePollutantAdd('pollutantAdd')"
          >Отменить</button>
        </div>
      </d-form>
    </d-list-item>
  </d-list-group>
</div>
</template>

<script>
import { pollutantslist } from '@/components/new-tree/all_pollutants.json';
import { mapActions } from 'vuex';

export default {
  props: {
    closePollutantAdd: Function,
    filterId: Number,
  },
  data() {
    return {
      pollutantslist,
      selectedPollutant: {},
      initialTreatmentLevel: 0,
      actualTreatmentLevel: 0,
    };
  },

  methods: {
    ...mapActions('releaseStore', ['postPollutant']),

    save() {
      this.postPollutant({
        initialTreatmentLevel: +this.initialTreatmentLevel,
        actualTreatmentLevel: +this.actualTreatmentLevel,
        pollutantName: this.selectedPollutant.label,
        pollutantCode: this.selectedPollutant.code,
        pollutantFilterId: this.filterId,
      });
      this.closePollutantAdd();
    },
  },
};
</script>
