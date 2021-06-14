<template>
  <div>
    <!-- WORKSITE START -->
    <worksite ></worksite>
    <!-- <d-row class="mb-3">
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
            :options="worksite_categories"
            :disabled="!editor.worksiteVisible"
          />
        </div>
      </d-col>
    </d-row> -->
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
import Worksite from './EditWorksite.vue'

export default {
  components: { Worksite },
  data() {
    return {
      validation: this.headValidation,
      editor: {
        facilityVisible: false,
        facilityLocationVisible: false,
        facility: {},
        facilityLocation: {},
      },
    };
  },
  computed: {
    ...mapState("releaseStore", [
      "releaseSource",
      "facilities",
      "facilityLocations",
      "worksite",
      "facility",
      "facilityLocation",
    ]),
    ...mapGetters("releaseStore", [
      "getAvaibleFacilities",
      "getAvaibleFacilityLocations",
    ]),
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
      "setFacilityLocationAction",
      "postFacility",
      "postFacilityLocation",
    ]),

    ...mapMutations("releaseStore", [
      "setFacility",
      "setFacilityLocation",
      "setNatureUserCategory",
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
      if (source === "facility") this.setFacility(this.editor.facility);
      else this.setFacilityLocation(this.editor.facilityLocation);
    },
  },
};
</script>
