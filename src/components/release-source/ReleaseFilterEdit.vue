<template>
<div>
  <d-list-group flush>
    <d-list-group-item class="px-3">
      <h6>Пылегазоочистное оборудование (ПГО)</h6>
      <hr />
      <d-form @submit.prevent="save">
        <label for="treatmentUnitName">Наименование ПГО</label>
        <d-input
          id="treatmentUnitName"
          class="mb-3"
          type="text"
          placeholder="Введите наименование источника выбросов"
          :value="pollutantFilter.pollutanFilterName"
          @input="setPollutantFilterName"
        />
        <label for="treatmentUnitComment">Описание</label>
        <textarea
          class="form-control mb-3"
          id="treatmentUnitComment"
          rows="3"
          placeholder="Введите описание"
          v-model="pollutantFilterComment"
        ></textarea>
        <div class="d-flex flex-row">
          <button
            type="submit"
            class="btn btn-outline-success mr-2"
            @click="save"
          >Сохранить
          </button>
          <button class="btn btn-link mr-2" @click.prevent="cancel">Отменить</button>
        </div>
      </d-form>
    </d-list-group-item>
  </d-list-group>
</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  props: {
    closeFilterEdit: Function,
  },
  computed: {
    ...mapState('releaseStore', ['pollutantFilter', 'emissionSource']),

    pollutantFilterComment: {
      get() {
        return this.pollutantFilter.pollutantFilterComment;
      },
      set(value) {
        this.setPollutantFilterComment(value);
      },
    },
  },
  methods: {
    ...mapMutations('releaseStore', ['setPollutantFilterName', 'setPollutantFilterComment', 'setPollutantFilter']),
    ...mapActions('releaseStore', ['postPollutantFilter', 'putPollutantFilter']),

    save() {
      if (this.pollutantFilter.id) {
        this.putPollutantFilter();
      } else {
        this.postPollutantFilter();
      }
      this.closeFilterEdit('filterEdit');
    },

    cancel() {
      this.setPollutantFilter({});
      this.closeFilterEdit('filterEdit');
    },
  },
};
</script>
