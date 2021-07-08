<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Список</span>
        <h3 class="page-title">Источники выделения</h3>
      </div>
    </div>
    <!-- Default Table -->
    <div v-if="release_sources && release_sources.length" class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-body>
            <vue-good-table
              :columns="columns"
              :rows="release_sources"
              compactMode
              :pagination-options="{
                enabled: true,
                perPageDropdown: [10, 20, 30, 50, 100],
                nextLabel: 'Вперед',
                prevLabel: 'Назад',
                rowsPerPageLabel: 'Строк',
                ofLabel: 'из',
                pageLabel: 'страница', // for 'pages' mode
                allLabel: 'Все',
              }"
              @on-row-click="onRowClick"
            >
              <div slot="table-actions">
                <d-dropdown theme="light" size="sm" class="ml-2" text="Добавить" right>
                  <d-dropdown-item size="sm">
                    <router-link to="release-source-add"
                      >Добавить источник</router-link
                    >
                  </d-dropdown-item>
                  <d-dropdown-divider />
                  <d-dropdown-item size="sm">
                    <router-link to="import-csv"
                      >Добавить источники</router-link
                    >
                  </d-dropdown-item>
                </d-dropdown>
              </div>
            </vue-good-table>
          </d-card-body>
        </div>
      </div>
    </div>
    <div v-else>
      Нет данных
    </div>
  </div>
</template>


<script>
import { useGlobalState } from "@/useStore"
import { fetchReleaseSources } from "@/services/api"
import { asyncComputed } from '@vueuse/core'
import router from "@/router"

export default {
  setup() {
    const state = useGlobalState()
    const release_sources = asyncComputed(
      async() => await fetchReleaseSources(state.value.companyId),
      null
    )

    function onRowClick(params) {
      router.push({
        name: "release-source-show",
        params: { id: params.row.id },
      });
    }
    return { release_sources, onRowClick }
  },
  name: "release-source-list",
  data() {
    return {
      columns: [
        {
          label: "Источник выделения",
          field: "name",
        },
        {
          label: "Номер",
          field: "number",
        },
        {
          label: "Инвентарный номер",
          field: "inventory_number",
        },
        {
          label: "Источник выбросов",
          field: "emission_source.name",
        },
        {
          label: "Участок",
          field: "emission_source.facility_location.name",
        },
        {
          label: "Объект/цех",
          field: "emission_source.facility_location.facility.name",
        },
        {
          label: "Промплощадка",
          field: "emission_source.facility_location.facility.worksite.name",
        },
      ],
    };
  },
};
</script>
