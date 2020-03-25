<template>
  <div>
    <d-list-group flush>
      <d-list-group-item class="px-3">
        <h6>Источник выбросов</h6>
        <hr />
        <d-form>
          <label>Наименование источника выбросов</label>
          <d-input
            class="mb-3"
            type="text"
            placeholder="Введите наименование источника выбросов"
            :value="emissionSource.emissionSourceName"
            @input="setEmissionName"
          />

          <label>Номер источника выбросов</label>
          <d-input
            class="mb-3"
            type="text"
            placeholder="Введите номер источника выбросов"
            :value="emissionSource.emissionSourceNumber"
            @input="setEmissionNumber"
          />

          <label>Инвентарный номер</label>
          <d-input
            class="mb-3"
            type="text"
            placeholder="Введите  инвентарный номер источника выбросов"
            :value="emissionSource.emissionSourceInventoryNumber"
            @input="setEmissionInventoryNumber"
          />

          <div class="mb-3">
            <label class="d-block">Тип источника</label>
            <d-form-radio
              name="emissionSourceType"
              v-model="emissionSource.emissionSourceOrganized"
              :value="true"
              @change="setEmissionType"
            >Организованный</d-form-radio>
            <d-form-radio
              name="emissionSourceType"
              v-model="emissionSource.emissionSourceOrganized"
              :value="false"
              @change="setEmissionType"
            >Неорганизованный</d-form-radio>
          </div>

          <label>Выпускаемая продукция</label>
          <d-input
            class="mb-3"
            type="text"
            placeholder="Введите выпускаемую продукцию"
            :value="emissionSource.emissionSourceProductName"
            @input="setEmissionProduct"
          />

          <!-- <label>Методика расчета</label>
          <v-select
            class="mb-3"
            label="calcMethodName"
            placeholder="Выберите методику расчета"
            :options="calcMethods"
            :value="calcMethodName"
            :reduce="calc => calc.id"
            @input="setEmissionCalcId"
          ></v-select> -->

          <label for="emissionSourceComment">Описание</label>
          <textarea
            class="form-control mb-3"
            id="emissionSourceComment"
            rows="3"
            placeholder="Введите описание"
            v-model="emissionSourceComments"
          ></textarea>

          <!--TREATMENT UNITS -->
          <div class="mb-3">
            <label class="d-block">Пылегазоочистное оборудование (ПГО)</label>
            <d-form-radio
              name="pollutantFilter"
              v-model="emissionSource.pollutantFilter"
              :value="true"
              @change="setEmissionFilterBool"
            >Имеетя</d-form-radio>
            <d-form-radio
              name="pollutantFilter"
              v-model="emissionSource.pollutantFilter"
              :value="false"
              @change="setEmissionFilterBool"
            >Не имеется</d-form-radio>
          </div>
          <div class="d-flex flex-row">
            <button class="btn btn-outline-success mr-2" @click.prevent="saveEmissionSource" type="submit">Сохранить</button>
            <button class="btn btn-outline-danger" @click.prevent="removeEmissionSource" type="submit">Удалить</button>
            <button class="btn btn-link mr-2" @click.prevent="cancel">Отменить</button>
          </div>
        </d-form>
      </d-list-group-item>
    </d-list-group>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  props: {
    // calcMethodName: String,
    // calcMethods: Array,
    emissionSourceBefore: Object,
    closeEmissionEdit: Function,
    restoreEmissionState: Function,
  },

  computed: {
    ...mapState('releaseStore', ['emissionSource']),
    emissionSourceComments: {
      get() {
        return this.emissionSource.emissionSourceComments;
      },
      set(value) {
        this.setEmissionComment(value);
      },
    },
  },

  methods: {
    ...mapMutations(
      'releaseStore',
      [
        'setEmissionSource', 'setEmissionName', 'setEmissionType', 'setEmissionNumber', 'setEmissionInventoryNumber', 'setEmissionProduct', 'setEmissionCalcId', 'setEmissionComment', 'setEmissionFilterBool'],
    ),
    ...mapActions('releaseStore', ['postEmissionSource']),

    saveEmissionSource() {
      this.postEmissionSource();
      this.closeEmissionEdit('emissionSourceEdit');
    },

    removeEmissionSource() {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Данные будут безвозратно удалены. Вы уверены?')) {
        return;
      }
      this.setEmissionSource({});
      this.closeEmissionEdit('emissionSourceEdit');
    },

    cancel() {
      this.restoreEmissionState();
      this.closeEmissionEdit('emissionSourceEdit');
    },
  },
};
</script>
