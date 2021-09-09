<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Загрязняющие вещества</span>
        <h3 class="page-title">Список загрязняющих веществ</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-header class="border-bottom">
            <i>Для добавления ЗВ в группу кликните на строку</i>
          </d-card-header>
          <d-card-body>
            <spinner v-if="loading" />
            <template v-else>
              <vue-good-table
                @on-row-click="editPolFn"
                :columns="columns"
                :rows="air_pollutants"
                :fixed-header="true"
                compactMode
                :pagination-options="{
                  enabled: true,
                  mode: 'pages',
                  perPageDropdown: [10, 50, 100],
                  rowsPerPageLabel: 'Строк',
                  nextLabel: 'Вперед',
                  prevLabel: 'Назад',
                  allLabel: 'Все',
                }"
              >
              </vue-good-table>
            </template>
          </d-card-body>
        </div>
      </div>
    </div>
    <slide-out
      size="50%"
      allow-resize
      append-to="body"
      show-fullscreen
      fixed
      disable-animation
      :visible.sync="slideOut.visible"
    >
      <div v-if="slideOut.visible">
        <d-list-group flush>
          <d-list-group-item class="px-3">
            <h6>Загрязняющее вещество</h6>
            <hr />
            <d-form>
              <label>Наименование загрязняющего вещества</label>
              <d-input
                class="mb-3"
                type="text"
                disabled
                :value="editPol.label"
              />
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
      </div>
    </slide-out>
  </div>
</template>

<script>
import {
  fetchPollutants,
  fetchPollsGroups,
  fetchPolById,
  addPolToGroup,
} from "@/services/api";
import Spinner from "@/components/Base/Spinner.vue";
import SlideOut from "@hyjiacan/vue-slideout";
import "@hyjiacan/vue-slideout/lib/slideout.css";

export default {
  name: "Pollutants",
  components: { Spinner, SlideOut },
  data() {
    return {
      loading: true,
      air_pollutant_groups: [],
      air_pollutants: [],
      editGroup: "",
      slideOut: {
        visible: false,
      },
      editPol: {
        id: "",
        label: "",
      },
      columns: [
        { label: "Наименование", field: "label" },
        { label: "Код", field: "code" },
        { label: "Группа", field: this.getPolGroup },
        {
          label: "Класс опасности",
          field: "hazard_class",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "все", // placeholder for filter input
            filterDropdownItems: [0, 1, 2, 3, 4], // dropdown (with selected values) instead of text input
            trigger: "enter", //only trigger on enter not on keyup
          },
        },
        {
          label: "Твёрдый",
          field: "solid",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "все", // placeholder for filter input
            filterDropdownItems: [0, 1], // dropdown (with selected values) instead of text input
            trigger: "enter", //only trigger on enter not on keyup
          },
        },
        {
          label: "ЛОС",
          field: "voc",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "все", // placeholder for filter input
            filterDropdownItems: [0, 1], // dropdown (with selected values) instead of text input
            trigger: "enter", //only trigger on enter not on keyup
          },
        },
        {
          label: "Углеводороды",
          field: "hydrocarbon",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "все", // placeholder for filter input
            filterDropdownItems: [0, 1], // dropdown (with selected values) instead of text input
            trigger: "enter", //only trigger on enter not on keyup
          },
        },
      ],
    };
  },
  created() {
    this.fetchPolls();
    this.fetchGroups();
  },
  methods: {
    async fetchPolls() {
      this.loading = true;
      const { data, loading } = await fetchPollutants();
      this.air_pollutants = data.air_pollutants;
      this.loading = loading;
    },
    async fetchGroups() {
      this.air_pollutant_groups = await fetchPollsGroups();
    },
    async savePol() {
      this.loading = true;
      addPolToGroup(this.editPol.id, this.editPol.group.id).then((res) => {
        this.fetchPolls();
        this.slideOut.visible = false;
      });
    },

    async editPolFn(params) {
      this.slideOut.visible = true;
      const data = await fetchPolById(params.row.id);
      this.editPol = Object.assign({}, data);
    },

    getPolGroup(rowObj) {
      return rowObj.group ? rowObj.group.label : "-";
    },
  },
};
</script>
