<template>
<div>
  <d-row>
    <d-col cols="12" md="6" lg="6">
      <div class="form-group">
        <label>Источник выбросов</label>
        <v-select
          label="emissionSourceName"
          placeholder="Выбрать источник эмиссии"
          @input="setEmissionAction"
          :options="getAvaibleEmissions"
          :value="emissionSource"
          required
        />
        <d-form-invalid-feedback>
          Необходимо указать наименование
          источника!
        </d-form-invalid-feedback>
      </div>
      <div>
      <button type="button" class="btn btn-sm btn-outline-primary mb-3" @click.prevent="editEmissionSlideout">
        {{
        !emissionSource.id
        ? "Добавить источник"
        : "Редактировать источник"
        }}
      </button>
    </div>
    </d-col>
    <d-col cols="12" md="6" lg="6">
      <label>Номер источника выбросов</label>
      <d-input type="text" :value="emissionSource.emissionSourceNumber" readonly />
    </d-col>
  </d-row>
  <template v-if="emissionSource">
  <d-row class="mb-3">
    <d-col cols="12" md="6" lg="6">
      <label>Инвентарный номер источника</label>
      <d-input
        type="text"
        :value="emissionSource.emissionSourceInventoryNumber"
        readonly
      />
    </d-col>
    <d-col cols="12" md="6" lg="6">
      <label>Тип источника</label>
      <d-input
        type="text"
        readonly
        :value="emissionSource.emissionSourceOrganized
                  ? `Организованный`
                  : `Неорганизованный`"
      />
    </d-col>
  </d-row>

  <d-row class="mb-3">
    <d-col cols="12" md="6" lg="6">
      <label>Выпускаемая продукция</label>
      <d-input type="text" :value="emissionSource.emissionSourceProductName" readonly />
    </d-col>
    <!-- <d-col  cols="12" md="6" lg="6">
      <label>Методика расчета</label>
      <d-input type="text" :value="calcMethodName" readonly />
    </d-col> -->
  </d-row>

  <label>Комментарии к источнику</label>
  <textarea
    class="form-control mb-3"
    v-model="emissionSource.emissionSourceComments"
    placeholder="Коментарии отстутствуют"
    readonly
  ></textarea>

  <h6>Пылегазоочистное оборудование (ПГО)</h6>
    <template v-if="emissionSource.pollutantFilter">
    <button
      type="button"
      class="btn btn-primary mb-3"
      @click.prevent="toggleFilterVisible"
    >{{!filtersVisible ? 'Показать' : 'Cкрыть'}} ПГО
    </button>
      <template v-if="filtersVisible">
      <div
        class="p-2 mt-2 mb-3 border rounded"
        v-for="(unit, index) in getPollutantFilters"
        :key="unit.id"
      >
        <div class="d-flex justify-content-between">
          <h6 class="text-primary">{{ unit.pollutanFilterName }}</h6>
          <div>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm mr-2"
              title="Редактировать"
              @click.prevent="editFilterSlideout(index)"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              type="button"
              title="Удалить"
              class="btn btn-outline-danger btn-sm"
              @click.prevent="removeTreatmentUnit(index)"
            >
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
        <h6>Загрязняющие вещества:</h6>
            <div class="d-flex flex-row mb-2">
              <button
                type="button"
                class="btn btn-outline-success btn-sm mr-2"
                title="Добавить ЗВ"
                @click.prevent="addPollutant(unit.id)"
              >+ ЗВ</button>
            </div>
        <d-row>
          <d-col>
            <table class="table table-sm meta-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Код ЗВ</th>
                  <th>Наименование ЗВ</th>
                  <th>Проектный КПД, %</th>
                  <th>Фактический КПД, %</th>
                  <th>Удалить ЗВ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pol, index) in getFilteredPollutants(unit.id)" :key="pol.id">
                  <td scope="row">{{ index + 1 }}</td>
                  <td>{{ pol.pollutantCode }}</td>
                  <td>{{ pol.pollutantName }}</td>
                  <td>{{ pol.initialTreatmentLevel }}</td>
                  <td>{{ pol.actualTreatmentLevel }}</td>
                  <td>
                    <d-button
                      class="btn-white"
                      @click.prevent="removePollutant(pol.id)"
                      v-d-tooltip.hover="'Удалить'"
                    >
                    <i class="material-icons">&#xE872;</i>
                  </d-button></td>
                </tr>
              </tbody>
            </table>
          </d-col>
        </d-row>
        <label for="treatmentUnitCommment">Описание</label>
        <textarea
          class="form-control mb-3"
          id="treatmentUnitCommment"
          rows="3"
          v-model="unit.pollutantFilterComment"
          disabled
        ></textarea>
      </div>
      </template>
    </template>

    <template v-else>
      <div
        class="p-2 mt-2 mb-3 border rounded"
        style="background-color:#f9f9fb;"
      >
        <h6 class="text-muted">ПГО отсутствует</h6>
      </div>
    </template>

    <div v-if="emissionSource.id">
      <button
        type="button"
        class="btn btn-sm btn-outline-primary"
        @click.prevent="editFilterSlideout"
      >Добавить ПГО</button>
    </div>
  </template>
  <slide-out
      size="50%"
      allow-resize
      append-to="body"
      show-fullscreen
      fixed
      disable-animation
      :visible.sync="slideOut.visible"
    >
    <emission-edit
      v-if="emissionSourceEdit.visible"
      :emissionSourceBefore="emissionSourceBefore"
      :closeEmissionEdit="closeSlideOut"
      :restoreEmissionState="restoreEmissionState"
    ></emission-edit>

    <filter-edit
      v-if="filterEdit.visible"
      :getFilteredPollutants="getFilteredPollutants"
      :closeFilterEdit="closeSlideOut"
    ></filter-edit>

    <pollutant-add
      v-if="pollutantAdd.visible"
      :closePollutantAdd="closeSlideOut"
      :filterId="pollutantAdd.filterId"
    ></pollutant-add>
  </slide-out>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import EmissionEdit from '@/components/release-source/ReleaseEmissionEdit.vue';
import FilterEdit from '@/components/release-source/ReleaseFilterEdit.vue';
import PollutantAdd from '@/components/release-source/ReleasePollutantAdd.vue';
import SlideOut from '@hyjiacan/vue-slideout';
import '@hyjiacan/vue-slideout/lib/slideout.css';


export default {
  components: {
    EmissionEdit, FilterEdit, PollutantAdd, SlideOut,
  },
  data() {
    return {
      emissionSourceBefore: {},
      filtersBefore: [],
      filteredPollutantsBefore: [],
      emissionSourceEdit: {
        visible: false,
      },
      filterEdit: {
        visible: false,
        idx: null,
      },
      pollutantAdd: {
        visible: false,
        filterId: null,
      },
      slideOut: {
        visible: false,
      },
      // calcMethods: [
      //   {
      //     id: 1,
      //     calcMethodName: 'some method 1',
      //   },
      //   {
      //     id: 2,
      //     calcMethodName: 'some method 2',
      //   },
      //   {
      //     id: 3,
      //     calcMethodName: 'some method 3',
      //   },
      // ],
      filtersVisible: false,
    };
  },

  computed: {
    ...mapState('releaseStore', ['emissionSource', 'filteredPollutants', 'pollutantFilters', 'pollutantFilter', 'editFilteredPollutants']),
    ...mapGetters('releaseStore', ['getAvaibleEmissions', 'getPollutantFilters']),

  //   calcMethodName() {
  //     let name;
  //     if (this.emissionSource.id) {
  //       name = this.calcMethods.find(el => el.id === this.emissionSource.calcMethodId).calcMethodName;
  //     }
  //     return name;
  //   },
  },

  methods: {
    ...mapActions('releaseStore', ['setEmissionAction', 'deletePollutant']),
    ...mapMutations('releaseStore', ['setPollutantFilter', 'setEditFilteredPollutants', 'setFilteredPollutant']),

    getFilteredPollutants(id) {
      return id ? this.filteredPollutants.filter(el => el.pollutantFilterId === id) : [];
    },

    editEmissionSlideout() {
      if (this.emissionSource.id) {
        this.emissionSourceBefore = Object.assign({}, this.emissionSourceBefore, this.emissionSource);
      }
      this.emissionSourceEdit.visible = true;
      this.slideOut.visible = true;
    },

    editFilterSlideout(idx) {
      this.setPollutantFilter(this.pollutantFilters[idx] || { pollutanFilterName: '', pollutantFilterComment: '' });
      this.filterEdit.visible = true;
      this.slideOut.visible = true;
    },

    addPollutant(id) {
      this.pollutantAdd.visible = true;
      this.slideOut.visible = true;
      this.pollutantAdd.filterId = id;
    },

    closeSlideOut(source) {
      this.slideOut.visible = false;
      this[source].visible = false;
    },

    restoreEmissionState() {
      this.setEmissionAction(this.emissionSourceBefore);
    },

    toggleFilterVisible() {
      this.filtersVisible = !this.filtersVisible;
    },

    removePollutant(id) {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Данные будут безвозратно удалены. Вы уверены?')) {
        return;
      }
      // this.deletePollutant(id);
      console.log('delete polutant id:', id);
    },
  },
};
</script>
