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
            <div v-else-if="error">Ошибка: {{ error.message }}</div>
            <template v-else-if="air_pollutants">
              <vue-good-table
                mode="remote"
                @on-row-click="editPollutant"
                @on-per-page-change="onPerPageChange"
                @on-page-change="onPageChange"
                @on-sort-change="onSortChange"
                :isLoading.sync="loading"
                :columns="columns"
                :rows="air_pollutants"
                :fixed-header="true"
                compactMode
                :pagination-options="{
                  enabled: true,
                  mode: 'pages',
                  setCurrentPage: currentPage,
                  perPageDropdown: [10, 50, 100],
                  rowsPerPageLabel: 'Строк',
                  nextLabel: 'Вперед',
                  prevLabel: 'Назад',
                  allLabel: 'Все',
                }"
                :totalRows="air_pollutants_count"
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
      :visible.sync="slide"
    >
      <pollutant-edit
        v-if="slide"
        :pollId="pollId"
        :slideToggle="slideToggle"
      ></pollutant-edit>
    </slide-out>
  </div>
</template>

<script>
import SlideOut from "@hyjiacan/vue-slideout";
import "@hyjiacan/vue-slideout/lib/slideout.css";
import { useQuery, useResult } from "@vue/apollo-composable";
import POLLS_LIST from "@/graphql/queries/PollutantsList";
import PollutantEdit from "@/components/pollutant-edit/pollutant-edit.vue";
import { reactive, ref } from "@vue/composition-api";

export default {
  setup() {
    const variables = reactive({
      offset: 0,
      limit: 10,
      sort: { code: "asc" },
    });
    const currentPage = ref(1);
    const { result, loading, error } = useQuery(POLLS_LIST, variables);
    const air_pollutants = useResult(
      result,
      null,
      (data) => data.air_pollutants
    );

    const air_pollutants_count = useResult(
      result,
      null,
      (data) => data.air_pollutants_aggregate.aggregate.count
    );

    function onPageChange(params) {
      if (params.prevPage > params.currentPage) {
        variables.offset -= variables.limit;
      } else {
        variables.offset += variables.limit;
      }
      currentPage.value = params.currentPage;
      console.log(params);
    }

    function onPerPageChange(params) {
      variables.limit = params.currentPerPage;
    }

    function onSortChange(params) {
      console.log(params);
      const { field, type } = params[0];
      variables.sort = { [field]: type !== "none" ? type : "asc" };
    }

    const pollId = ref("");
    const slide = ref(false);

    function slideToggle() {
      slide.value = !slide.value;
    }

    function editPollutant(params) {
      pollId.value = params.row.id;
      slide.value = true;
    }

    function getGroupLabel(rowObj) {
      return rowObj.group ? rowObj.group.label : "-";
    }

    const columns = [
      { label: "Наименование", field: "label" },
      { label: "Код", field: "code" },
      { label: "Группа", field: getGroupLabel },
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
    ];

    return {
      air_pollutants,
      loading,
      error,
      pollId,
      editPollutant,
      slide,
      slideToggle,
      air_pollutants_count,
      onPageChange,
      onPerPageChange,
      onSortChange,
      columns,
      getGroupLabel,
      currentPage,
    };
  },
  name: "Pollutants",
  components: { SlideOut, PollutantEdit },
};
</script>
