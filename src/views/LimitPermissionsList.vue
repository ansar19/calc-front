<script>
import LIMIT_PERMISSIONS from "../graphql/queries/LimitPermissionsList";
import { useGlobalState } from "@/useStore";
import { useQuery, useResult, useMutation } from "@vue/apollo-composable";
import { ref } from "@vue/composition-api";
import SlideOut from "@hyjiacan/vue-slideout";
import LimitPermissionEdit from "@/components/limit-permission-edit/limit-permission-edit.vue";
import gql from "graphql-tag";

export default {
  components: { SlideOut, LimitPermissionEdit },
  setup(props, ctx) {
    const router = ctx.root.$router;
    const state = useGlobalState();
    const { result, loading, error } = useQuery(LIMIT_PERMISSIONS, {
      company_id: state.value.companyId,
    });
    const limit_permissions = useResult(
      result,
      null,
      (data) => data.limit_permissions
    );

    const { mutate: permissionMutate } = useMutation(
      gql`
        mutation deletePermission($id: uuid!) {
          delete_limit_permissions_by_pk(id: $id) {
            id
          }
        }
      `,
      () => ({
        update: (cache, permissionMutate) => {
          const deletePermission =
            permissionMutate.data.delete_limit_permissions_by_pk;
          cache.evict({
            id: "ROOT_QUERY",
            field: "limit_permissions",
            args: { id: deletePermission.id },
          });
        },
      })
    );

    function deletePermission({ id }) {
      permissionMutate({ id: id });
    }

    const slide = ref(false);
    function slideToggle() {
      slide.value = !slide.value;
    }
    return {
      slide,
      slideToggle,
      deletePermission,
      limit_permissions,
      loading,
      error,
      state,
    };
  },

  data() {
    return {
      columns: [
        { label: "Наименование", field: "name" },
        { label: "Номер", field: "number" },
        { label: "Источник эмиссии", field: "emission_source.name" },
        { label: "Номер источника эмиссии", field: "emission_source.number" },
        { label: "Дата начала", field: "start_date" },
        { label: "Дата конца", field: "end_date" },
        { label: "Лимит", field: "t_year_limit" },
        { label: "Описание", field: "description" },
        { label: "", field: "action", sortable: false },
      ],
    };
  },
};
</script>

<template>
  <div>
    <d-container fluid class="main-content-container px-4 pb-4">
      <!-- Page Header -->
      <d-row no-gutters class="page-header py-4">
        <!-- Page Header - Page Title -->
        <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Разрешения</span>
          <h3 class="page-title">Список разрешений на эмиссию</h3>
        </d-col>
      </d-row>
      <!-- Default Table -->
      <d-card class="card-small mb-3">
        <d-card-header class="border-bottom">
          <div class="block-handle" align="right">
            <button
              class="btn btn-outline-primary btn-sm ml-2"
              @click="slideToggle"
            >
              <font-awesome-icon icon="plus" /> Добавить разрешение
            </button>
          </div>
        </d-card-header>
        <d-card-body>
          <template v-if="!state.companyId">
            <d-row>
              <h3>
                Для начала работы войдите в
                <router-link to="/companies">компанию</router-link>
              </h3>
            </d-row>
          </template>
          <spinner v-else-if="loading" />
          <div v-else-if="error">Ошибка: {{ error.message }}</div>
          <template v-else-if="limit_permissions">
            <vue-good-table
              :columns="columns"
              :rows="limit_permissions"
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
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                  <div
                    class="btn-group d-flex"
                    role="group"
                    aria-label="Comapny actions"
                  >
                    <button
                      type="button"
                      class="btn btn-white"
                      @click="deletePermission(props.row)"
                    >
                      <i class="material-icons">&#XE872;</i> Удалить
                    </button>
                  </div>
                </span>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
            </vue-good-table>
          </template>
        </d-card-body>
      </d-card>
    </d-container>
    <slide-out
      size="50%"
      allow-resize
      append-to="body"
      show-fullscreen
      fixed
      disable-animation
      :visible.sync="slide"
    >
      <limit-permission-edit
        v-if="slide"
        :slideToggle="slideToggle"
      ></limit-permission-edit>
    </slide-out>
  </div>
</template>
