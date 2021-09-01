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
          <d-card-header class="border-bottom"> </d-card-header>
          <d-card-body>
            <spinner v-if="loading" />
            <vue-good-table
              v-else
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
          </d-card-body>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "@/components/Base/Spinner.vue";

export default {
  name: "Pollutants",
  components: { Spinner },
  apollo: {
    air_pollutant_groups: gql`
      query {
        air_pollutant_groups {
          id
          label
          name
        }
      }
    `,
    air_pollutants: gql`
      query {
        air_pollutants {
          id
          label
          code
          hazard_class
          solid
          voc
          hydrocarbon
          pollutant_group {
            pollutant_group {
              id
              label
            }
          }
        }
      }
    `,
  },
  data() {
    return {
      loading: 0,
      air_pollutant_groups: [],
      air_pollutants: [],
      columns: [
        { label: "Наименование", field: "label" },
        { label: "Код", field: "code" },
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
};
</script>
