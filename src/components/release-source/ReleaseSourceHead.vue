<template>
  <div>
    <!-- WORKSITE START -->
    <d-row class="mb-3">
      <d-col cols="12" md="8" lg="8">
        <label>Промплощадка (ПП)</label>
        <template v-if="!editor.worksiteVisible">
          <v-select
            class="mb-2"
            label="name"
            placeholder="Выбрать ПП"
            :options="worksites"
            v-model="c_worksite"
            required
          ></v-select>
          <div>
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              @click="toggleEditor('worksite', 'worksiteVisible')"
            >
              {{ !worksite.workSiteName ? "Добавить ПП" : "Редактировать ПП" }}
            </button>
          </div>
        </template>
        <template v-else>
          <d-input
            class="mb-3"
            placeholder="Наименование ПП"
            type="text"
            :value="worksite.name"
            @change="setWorksiteName"
            required
          />
          <div class="d-flex flex-row">
            <button
              class="btn btn-outline-success mr-2"
              @click="saveWorksite"
              type="button"
            >
              Сохранить
            </button>
            <button
              v-if="worksite"
              class="btn btn-outline-danger"
              @click="remove('worksite')"
              type="button"
            >
              Удалить
            </button>
            <button
              type="button"
              class="btn btn-link mr-2"
              @click="cancel('worksite', 'worksiteVisible')"
            >
              Отменить
            </button>
          </div>
        </template>
      </d-col>
      <d-col cols="12" md="4" lg="4">
        <div>
          <label>Категория ПП</label>
          <v-select
            class="mb-3"
            placeholder="Выбрать категорию ПП"
            label="name"
            v-model="c_nature_user_category"
            :reduce="(cat) => cat.id"
            :options="worksite_categories"
            :disabled="!editor.worksiteVisible"
          />
        </div>
      </d-col>
    </d-row>
    <!-- WORKSITE END -->

    <d-row>
      <d-col cols="12" md="6" lg="6">
        <!-- FACILITY START -->
        <label>Цех / объект</label>
        <template v-if="!editor.facilityVisible">
          <v-select
            class="mb-2"
            label="facilityName"
            placeholder="Выбрать объект"
            :options="getAvaibleFacilities"
            v-model="c_facility"
          ></v-select>
          <div>
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              @click="toggleEditor('facility', 'facilityVisible')"
            >
              {{
                !facility.facilityName
                  ? "Добавить объект"
                  : "Редактировать объект"
              }}
            </button>
          </div>
        </template>
        <template v-else>
          <d-input
            class="mb-3"
            placeholder="Наименование"
            type="text"
            :value="facility.facilityName"
            @input="setFacilityName"
            required
          />
          <div class="d-flex flex-row">
            <button
              type="button"
              class="btn btn-outline-success mr-2"
              @click="saveFacility"
            >
              Сохранить
            </button>
            <button
              v-if="facility"
              class="btn btn-outline-danger"
              @click="remove"
              type="button"
            >
              Удалить
            </button>
            <button
              type="button"
              class="btn btn-link mr-2"
              @click="cancel('facility', 'facilityVisible')"
            >
              Отменить
            </button>
          </div>
        </template>
      </d-col>
      <!-- FACILITY END -->

      <!-- FACILITY LOCATION START -->
      <d-col cols="12" md="6" lg="6">
        <label>Участок</label>
        <template v-if="!editor.facilityLocationVisible">
          <v-select
            class="mb-2"
            label="facilityLocationName"
            placeholder="Выбрать участок"
            :options="getAvaibleFacilityLocations"
            v-model="c_facility_location"
          ></v-select>
          <div>
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              @click="
                toggleEditor('facilityLocation', 'facilityLocationVisible')
              "
            >
              {{
                !facilityLocation.facilityLocationName
                  ? "Добавить участок"
                  : "Редактировать участок"
              }}
            </button>
          </div>
        </template>
        <template v-else>
          <d-input
            class="mb-3"
            placeholder="Введите наименование"
            type="text"
            :value="facilityLocation.facilityLocationName"
            @input="setFacilityLocationName"
            required
          />
          <div class="d-flex flex-row">
            <button
              class="btn btn-outline-success mr-2"
              @click="saveFacilityLocation"
              type="button"
            >
              Сохранить
            </button>
            <button
              v-if="facilityLocation"
              class="btn btn-outline-danger"
              @click="remove"
              type="button"
            >
              Удалить
            </button>
            <button
              class="btn btn-link mr-2"
              @click="cancel('facilityLocation', 'facilityLocationVisible')"
            >
              Отменить
            </button>
          </div>
        </template>
      </d-col>

      <!-- FACILITY LOCATION END -->
    </d-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import WORKSITE_CATEGORIES from "../../graphql/WorksiteCategoriesList.gql";

export default {
  apollo: {
    worksite_categories: {
      query: WORKSITE_CATEGORIES,
    },
  },
  data() {
    return {
      validation: this.headValidation,
      worksite_categories: [],
      editor: {
        worksiteVisible: false,
        facilityVisible: false,
        facilityLocationVisible: false,
        worksite: {},
        facility: {},
        facilityLocation: {},
      },
      // natureUserCategoryOptions: [
      //   { text: "Первая", value: 1 },
      //   { text: "Вторая", value: 2 },
      //   { text: "Третья", value: 3 },
      //   { text: "Четвертая", value: 4 },
      // ],
    };
  },
  computed: {
    ...mapState("releaseStore", [
      "releaseSource",
      "worksite",
      "natureUserCategory",
      "worksites",
      "facilities",
      "facilityLocations",
      "worksite",
      "facility",
      "facilityLocation",
    ]),

    ...mapState("company", ["working_company"]),

    ...mapGetters("releaseStore", [
      "getAvaibleFacilities",
      "getAvaibleFacilityLocations",
    ]),

    c_worksite: {
      get() {
        return this.worksite.name;
      },
      set(val) {
        this.setWorksite(val);
      },
    },

    c_nature_user_category: {
      get() {
        return this.natureUserCategory.name;
      },
      set(val) {
        this.setNatureUserCategory(val);
      },
    },
    c_facility: {
      get() {
        return this.facility.name;
      },
      set(val) {
        this.setFacility(val);
      },
    },
    c_facility_location: {
      get() {
        return this.facilityLocation.name;
      },
      set(val) {
        this.setFacilityLocation(val);
      },
    },
  },

  methods: {
    ...mapActions("releaseStore", [
      "fetchWorksites",
      "setWorksiteAction",
      "setFacilityAction",
      "setFacilityLocationAction",
      "postWorksite",
      "postFacility",
      "postFacilityLocation",
    ]),

    ...mapMutations("releaseStore", [
      "setWorksite",
      "setFacility",
      "setFacilityLocation",
      "setNatureUserCategory",
      "setWorksiteName",
      "setFacilityName",
      "setFacilityLocationName",
    ]),

    toggleEditor(source, vis) {
      this.editor[vis] = true;
      this.editor[source] = Object.assign(
        {},
        this.editor[source],
        this[source]
      );
    },

    // saveWorksite() {
    //   apollo: {
    //     insert_worksites_one: {
    //       mutation: ADD_WORKSITE,
    //       variables: { this.worksite }
    //     }
    //   }
    // },

    saveFacility() {
      this.postFacility();
      this.editor.facilityVisible = false;
    },

    saveFacilityLocation() {
      this.postFacilityLocation();
      this.editor.facilityLocationVisible = false;
    },

    remove(source) {
      // eslint-disable-next-line no-alert
      if (!window.confirm("are you sure?")) {
        return;
      }
      if (source === "worksite") this.setWorksite(null);
    },

    cancel(source, vis) {
      this.editor[vis] = false;
      if (source === "worksite") this.setWorksite(this.editor.worksite);
      else if (source === "facility") this.setFacility(this.editor.facility);
      else this.setFacilityLocation(this.editor.facilityLocation);
    },
  },
  created() {
    this.fetchWorksites();
  },
};
</script>
