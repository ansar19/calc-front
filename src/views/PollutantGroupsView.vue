<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle"
          >Группы загрязняющих веществ</span
        >
        <h3 class="page-title">Список групп загрязняющих веществ</h3>
      </div>
    </div>
    <!-- Default Table -->
    <div v-if="!loading" class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-header class="border-bottom"> </d-card-header>
          <d-card-body>
            <vue-good-table
              :columns="columns"
              :rows="air_pollutant_groups"
              :fixed-header="true"
              compactMode
              :group-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: false,
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
    <spinner v-else />
  </div>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "@/components/Base/Spinner.vue";

export default {
  name: "PollutantGroupsView",
  components: { Spinner },
  apollo: {
    air_pollutant_groups: gql`
      query {
        air_pollutant_groups {
          id
          label
          children: pollutants {
            id
            label
            hazard_class
            solid
            voc
            hydrocarbon
          }
        }
      }
    `,
  },
  data() {
    return {
      loading: 0,
      air_pollutant_groups: [],
      columns: [
        { label: "Наименование", field: "label" },
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
  computed: {
    flatten() {
      const pol_g = this.air_pollutant_groups.map((el) => {
        el.children =
          el.pollutants_grouped && el.pollutants_grouped.length
            ? el.pollutants_grouped.map((ch) => Object.values(ch)[0])
            : [];
        delete el.pollutants_grouped;
        return el;
      });
      return pol_g;
    },
  },
};
</script>
