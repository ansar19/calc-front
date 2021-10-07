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
    <spinner v-if="loading" />
    <div v-else-if="error">Ошибка: {{ error }}</div>
    <div v-else-if="air_pollutant_groups" class="row">
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
                collapsable: true,
              }"
            >
              <template slot="table-header-row" slot-scope="props">
                <span class="table-group-header">
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
              <template slot="table-header-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                  <button class="btn btn-primary" @click="editGroup">
                    Редактроватьь
                  </button>
                </span>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
            </vue-good-table>
          </d-card-body>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import POLL_GROUPS_LIST from "@/graphql/queries/PollGroupsList";
import { useQuery, useResult } from "@vue/apollo-composable";

export default {
  name: "PollutantGroupsView",
  setup() {
    const { result, loading, error } = useQuery(POLL_GROUPS_LIST);
    const air_pollutant_groups = useResult(
      result,
      null,
      (data) => data.air_pollutant_groups
    );

    function editGroup(id) {
      console.log("action");
      console.log(id);
    }

    return { air_pollutant_groups, loading, error, editGroup };
  },
data() {
    return {
      columns: [
        { label: "Наименование", field: "label" },
        {
          label: "Код",
          field: "code",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Введите код",
            trigger: "enter", //only trigger on enter not on keyup
          },
        },
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
        {
          label: "",
          field: "action",
        },
      ],
    };
  },
  methods: {
    getPolLabelWithCode(row) {
      return `${row.code} - ${row.label}`
    }
  },
};
</script>
<style scoped>
.table-group-header {
  text-transform: uppercase;
}
</style>
