<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Источник</span>
        <h3 class="page-title">{{ componentTitle }}</h3>
      </div>
    </div>
    <!-- Default Table -->
    <div v-if="!loading" class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-header class="border-bottom">
            <div class="block-handle" align="right">
              <d-button
                size="sm"
                class="btn-info btn-sm ml-2"
                v-d-tooltip.hover="'Выгрузить Excel'"
              >
                <download-excel
                  :data="releaseSourceList"
                  title="Список источников"
                  :exportFields="json_fields"
                  name="ReleaseSources.xls"
                >
                  <font-awesome-icon icon="download" />
                </download-excel>
              </d-button>
                <router-link to="release-source-add" class="ml-2">
              <d-button size="sm">+ источник</d-button>
                </router-link>
              <!-- <d-dropdown size="sm" class="ml-2" text="Добавить" right>
                <d-dropdown-item size="sm">
                  <router-link to="release-source-add">Добавить источник</router-link>
                </d-dropdown-item>
                <d-dropdown-divider />
                <d-dropdown-item size="sm">
                  <router-link to="import-csv">Добавить источники</router-link>
                </d-dropdown-item>
              </d-dropdown> -->
            </div>
          </d-card-header>

          <d-card-body>
            <div class="meta-table">
              <!-- List Manager -->
              <v-client-table
                class="dataTables_wrapper"
                :data="releaseSourceList"
                :columns="columns"
                :options="tableOptions"
              >
                <d-button-group
                  slot="actions"
                  slot-scope="props"
                  size="small"
                  class="d-flex justify-content-left"
                >
                  <router-link
                    :to="{ name: 'release-source-show',
                      params: { id: props.row.releaseSource.id }}"
                  >
                    <d-button class="btn-white" v-d-tooltip.hover="'Посмотреть'">
                      <i class="material-icons">&#xe417;</i>
                    </d-button>
                  </router-link>

                  <router-link :to="{ name: 'release-source-edit', params: { id: props.row.releaseSource.id }}">
                    <d-button class="btn-white" v-d-tooltip.hover="'Редактировать'">
                      <i class="material-icons">&#xE254;</i>
                    </d-button>
                  </router-link>

                  <d-button
                    class="btn-white"
                    @click="deleteItem(props.row.releaseSource.id)"
                    v-d-tooltip.hover="'Удалить'"
                  >
                    <i class="material-icons">&#xE872;</i>
                  </d-button>
                </d-button-group>

                <span
                  slot="emissionSourceOrganized"
                  slot-scope="props"
                  :class="[getStatusClass(props.row.emissionSourceOrganized)]"
                >{{ props.row.emissionSourceOrganized ? 'Неорг' : 'Орг' }}</span>

                <span slot="total" slot-scope="props" class="text-success">{{ props.row.total }}</span>
              </v-client-table>
            </div>
          </d-card-body>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-alert */
import { ClientTable } from 'vue-tables-2';
import '@/assets/scss/vue-tables.scss';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    ClientTable,
  },
  data() {
    return {
      loading: true,
      sources: [],
      worksites: null,
      facilities: null,
      facilityLocations: null,
      emissionSources: null,
      componentTitle: 'Список источников выбросов',
      pageerrors: [],
      columns: [
        'worksite.workSiteName',
        'facility.facilityName',
        'facilityLocation.facilityLocationName',
        'emissionSource.emissionSourceName',
        'releaseSource.releaseSourceName',
        'actions',
      ],
      // this part related to excel export
      json_fields: {
        Промплощадка: 'workSiteName',
        'Цех / объект': 'facilityName',
        Участок: 'facilityLocationName',
        'Источник выбросов': 'emissionSourceName',
        'Источник выделения': 'releaseSourceName',
      },
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
      tableOptions: {
        headings: {
          'worksite.workSiteName': 'Промплощадка',
          'facility.facilityName': 'Цех / объект',
          'facilityLocation.facilityLocationName': 'Участок',
          'emissionSource.emissionSourceName': 'Источник выбросов',
          'releaseSource.releaseSourceName': 'Источник выделения',
          actions: 'Действия',
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: 'transaction-history table dataTable',
        filterable: [
          'worksite.workSiteName',
          'facility.facilityName',
          'facilityLocation.facilityLocationName',
          'emissionSource.emissionSourceNumber',
          'emissionSource.emissionSourceName',
          'releaseSource.releaseSourceName',
        ],
        sortable: [
          'worksite.workSiteName',
          'facility.facilityName',
          'facilityLocation.facilityLocationName',
          'emissionSource.emissionSourceName',
          'releaseSource.releaseSourceName',
        ],
        sortIcon: {
          base: 'fas float-right mt-1 text-muted',
          up: 'fa-caret-up',
          down: 'fa-caret-down',
        },
        texts: {
          filterPlaceholder: 'Введите текст для поиска',
          limit: 'Записей',
          filter: 'Поиск',
          noResults: 'Нет подходящих записей',
          loading: 'Идет загрузка...',
          page: 'Стр.:',
          filterBy: 'Фильтровать по {column}',
          count:
            'Отображение с {from} по {to} из {count} записей|{count} записей | Запись',
        },
        pagination: {
          edge: true,
          nav: 'scroll',
        },
      },
    };
  },
  computed: {
    ...mapState('releaseStore', ['releaseSourceList']),
  },
  created() {
    this.loading = true;
    this.getReleaseSourceList().then(() => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('releaseStore', ['getReleaseSourceList']),
    ...mapMutations('releaseStore', ['setReleaseSourceList']),

    deleteItem(id) {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm('Вы уверены что хотите удалить? Это действие невозможно отменить!')
      ) {
        return;
      }
      const newList = Object.assign([], this.newList, this.releaseSourceList);
      const idx = this.releaseSourceList.findIndex(el => el.releaseSource.id === id);
      newList.splice(idx, 1);
      this.setReleaseSourceList(newList); // TODO SERVICE DELETE
    },
    getStatusClass(sourceType) {
      return sourceType ? 'warning' : 'success';
    },
  },
};
</script>
