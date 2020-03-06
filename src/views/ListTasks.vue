<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Задачи</span>
        <h3 class="page-title">Статус задач</h3>
      </div>
    </div>
    <!-- Default Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <d-card-header class="border-bottom">
            <div class="block-handle" align="right">
              <d-button size="sm" class="btn-info btn-sm ml-2" v-d-tooltip.hover="'Выгрузить Excel'">
                <download-excel :data="tasks" title="Статус задач" :exportFields="json_fields" name="taskstatus.xls">
                  <font-awesome-icon icon="download" />
                </download-excel>
              </d-button>
              <d-button size="sm" v-d-tooltip.hover="'Распечатать данные'" class="btn-info btn-sm ml-2">
                <font-awesome-icon icon="print" />
              </d-button>
            </div>
          </d-card-header>

          <d-card-body>
            <!-- data table -->
            <div class="meta-table">

              <div>
                <d-alert
                  dismissible
                  :show="timeUntilDismissed"
                  theme="success"
                  @alert-dismissed="timeUntilDismissed = 0"
                  @alert-dismiss-countdown="handleTimeChange"
                >
                  <b>Успешно!</b>
                  Напоминание отправляется и займет {{ timeUntilDismissed }} секунд!
                </d-alert>
              </div>
              <v-client-table class="dataTables_wrapper" :data="tasks" :columns="columns" :options="tableOptions">
                  <!-- Emission Source data slot -->
                <div slot="child_row" slot-scope="props">
                  <table class="meta-table">
                    <thead>
                      <tr>
                        <th style="width:70%">
                          Наименование источника выбросов
                        </th>
                        <th style="width:30%">
                          Номер источника выбросов
                        </th>
                      </tr>
                    </thead>
                    <tr>
                      <td data-label="Наименование источника выбросов:"> {{ props.row.emissionSourceName }} </td>
                      <td data-label="№ источника выбросов:">{{ props.row.emissionSourceNumber }} </td>
                    </tr>
                  </table>
                </div>

                <d-button-group slot="actions" slot-scope="props" size="small" class="d-flex justify-content-center">
                  <d-button class="btn-white" @click="sendReminderResponsible('confirmed', props.row)"
                    v-d-tooltip.hover="'Отправить напоминание ответственному'">
                    <i class="material-icons">send</i>
                  </d-button>

                  <d-button class="btn-white" @click="sendReminderResponsible('confirmed', props.row)"
                    v-d-tooltip.hover="'Отправить напоминание линейному руководителю'">
                    <i class="material-icons">warning</i>
                  </d-button>

                    <router-link :to="{ name: 'tasks', params: { id: props.row.id }}">
                    <d-button class="btn-white" v-d-tooltip.hover="'Посмотреть'">
                      <i class="material-icons">&#xe417;</i>
                    </d-button>
                  </router-link>

                  <router-link :to="{ name: 'task' }">
                    <d-button class="btn-white" v-d-tooltip.hover="'Редактировать'">
                      <i class="material-icons">&#xE254;</i>
                    </d-button>
                  </router-link>

                  <!-- <d-button class="btn-white" @click="updateCompany(props.row.id)" v-d-tooltip.hover="'Редактировать'">
                    <i class="material-icons">&#xE254;</i>
                  </d-button> -->

                  <d-button class="btn-white" @click="deleteCompany(props.index)" v-d-tooltip.hover="'Удалить'">
                    <i class="material-icons">&#xE872;</i>
                  </d-button>
                </d-button-group>

                <span slot="status" slot-scope="props" :class="[getStatusClass(props.row.status)]">
                  {{ props.row.status }}
                </span>

                <span slot="total" slot-scope="props" class="text-success">
                  {{ props.row.total }}
                </span>
              </v-client-table>
            </div>
          </d-card-body>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ClientTable } from 'vue-tables-2';
import '@/assets/scss/vue-tables.scss';
import axios from 'axios';

export default {
  components: {
    ClientTable,
  },
  data() {
    return {
      // html to pdf
      output: null,
      tasks: [],
      columns: ['releaseSourceName', 'reporter.userFullName', 'linemanager.userFullName', 'taskDueDate', 'taskOverDue', 'status', 'up_date', 'actions'],
      tableOptions: {
        headings: {
          emissionSourceName: 'Наименование ист. выбросов',
          emissionSourceNumber: '№ ист. выбросов',
          releaseSourceName: 'Наименование ист. выделения',
          'reporter.userFullName': 'Ответственный',
          'linemanager.userFullName': 'Линейный руководитель',
          up_date: 'Дата послед. обновления',
          taskDueDate: 'Планируемая дата предоставления',
          taskOverDue: 'Задача просрочена?',
          status: 'Статус',
          actions: 'Действия',
        },
        columnsClasses: {
          emissionSourceNumber: 'text-center',
          up_date: 'text-center',
          status: 'text-center',
        },
        headingsTooltips: {
          releaseSourceName: 'Наименование истчника выделения',
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: 'transaction-history table dataTable meta-table',
        filterable: ['emissionSourceName', 'emissionSourceNumber', 'releaseSourceName', 'reporter.userFullName', 'linemanager.userFullName', 'status'],
        sortable: ['emissionSourceName', 'emissionSourceNumber', 'releaseSourceName', 'reporter.userFullName', 'linemanager.userFullName', 'status'],
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
          count: 'Отображение с {from} по {to} из {count} записей|{count} записей | Запись',
        },
        pagination: {
          edge: true,
          nav: 'scroll',
        },
        templates: {
          taskOverDue(h, row) {
            return row.taskOverDue ? 'True' : 'False';
          },
        },
      },
      // this part related to excel export
      json_fields: {
        'Наименование ист. выбросов': 'emissionSourceName',
        '№ ист. выбросов': 'emissionSourceNumber',
        'Наименование ист. выделения': 'releaseSourceName',
        'ФИО Ответственного': 'reporter.userFullName',
        'ФИО Линейного руководителя': 'linemanager.userFullName',
        'Дата послед. обновления': 'up_date',
        Статус: 'status',
      },
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
      //  related to d-alert
      duration: 5,
      timeUntilDismissed: 0,
    };
  },
  // Fetches users when the component is created.
  created() {
    axios.get('http://localhost:3000/tasks/')
      .then((response) => {
      // JSON responses are automatically parsed.
        this.tasks = response.data;
      })
      .catch((e) => {
        this.pageerrors.push(e);
      });
  },
  computed: {
  },
  methods: {
    getStatusClass(status) {
      const map = {
        предоставлено: 'success',
        задержка: 'warning',
        'не предоставлено': 'danger',
      };
      return `text-${map[status]}`;
    },
    // printData() {
    //   let newWindow;
    //   const divToPrint = this.$refs.printTable;
    //   newWindow = window.open('');
    //   newWindow.document.write(divToPrint.outerHTML);
    //   newWindow.print();
    //   newWindow.close();
    // },
    handleTimeChange(time) {
      this.timeUntilDismissed = time;
    },
    sendReminderResponsible() {
      this.timeUntilDismissed = this.duration;
    },
  },
};
</script>
