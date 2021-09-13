<template>
  <div>
    <!-- WORKSITE START -->
    <d-row class="mb-3">
      <d-col cols="12" md="8" lg="8">
        <label>Промплощадка (ПП)</label>
        <p>{{ releaseSource.emission_source.facility_location.facility.worksite.name }}</p>
          <!-- <v-select
            class="mb-2"
            label="name"
            placeholder="Выбрать ПП"
            :options="worksites"
            :value="worksite"
            :reduce="worksite => worksite.id"
            required
          ></v-select> -->
          <!-- <div>
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
            >
              {{ !worksite.name ? "Добавить ПП" : "Редактировать ПП" }}
            </button>
          </div> -->
        <!-- <template v-else>
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
        </template> -->
      </d-col>
      <d-col cols="12" md="4" lg="4">
        <div>
          <label>Категория ПП</label>
          <p>{{ releaseSource.emission_source.facility_location.facility.worksite.category.name }}</p>
          <!-- <v-select
            class="mb-3"
            placeholder="Выбрать категорию ПП"
            label="name"
            :value="worksite.category"
            :options="worksite_categories"
            disabled
          /> -->
        </div>
      </d-col>
    </d-row>
    <!-- WORKSITE END -->

    <d-row>
      <d-col cols="12" md="6" lg="6">
        <!-- FACILITY START -->
        <label>Цех / объект</label>
        <p>{{ releaseSource.emission_source.facility_location.facility.name }}</p>
          <!-- <v-select
            class="mb-2"
            label="name"
            placeholder="Выбрать объект"
            :options="facilities"
            :value="facility.name"
          ></v-select> -->
          <!-- <div> -->
            <!-- <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              @click="toggleEditor('facility', 'facilityVisible')"
            >
              {{
                !facility.facilityName
                  ? "Добавить объект"
                  : "Редактировать объект"
              }}
            </button> -->
          <!-- </div> -->
        <!-- <template v-else>
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
        </template> -->
      </d-col>
      <!-- FACILITY END -->

      <!-- FACILITY LOCATION START -->
      <d-col cols="12" md="6" lg="6">
        <label>Участок</label>
        <p>{{ releaseSource.emission_source.facility_location.name }}</p>
          <!-- <v-select
            class="mb-2"
            label="name"
            placeholder="Выбрать участок"
            :options="facility_locations"
            :value="facility_location.name"
          ></v-select> -->
          <!-- <div>
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
          </div> -->

        <!-- <template v-else>
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
        </template> -->
      </d-col>

      <!-- FACILITY LOCATION END -->
    </d-row>
  </div>
</template>

<script>
import WORKSITES from '@/graphql/queries/WorksitesList'
import WORKSITE_CATEGORIES from '@/graphql/queries/WorksiteCategoriesList'
import FACILITIES from '@/graphql/queries/FacilitiesList'
import FACILITY_LOCATIONS from '@/graphql/queries/FacilityLocationsList'
import { mapState } from 'vuex'

export default {
  name: 'ReleaseSourceHead',
  props: ['releaseSource'],
  apollo: {
    worksites: {
      query: WORKSITES,
      variables: {
        company_id: 'd051b670-ff03-4afe-97a1-382996ff46ea'
      }
    },
    worksite_categories: {
      query: WORKSITE_CATEGORIES
    },
    facilities: {
      query: FACILITIES
    },
    facility_locations: {
      query: FACILITY_LOCATIONS
    }
  },
  data() {
    return {
      worksites: [],
      worksite_categories: [],
      facilities: [],
      facility_locations: []
    }
  },
};
</script>
