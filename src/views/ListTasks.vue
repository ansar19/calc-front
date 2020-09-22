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
                <download-excel :data="taskList" title="Статус задач" :exportFields="json_fields" name="taskstatus.xls">
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

              <!-- <v-client-table class="dataTables_wrapper" :data="tasks" :columns="columns" :options="tableOptions">
                 Emission Source data slot
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

                  <d-button class="btn-white" @click="updateCompany(props.row.id)" v-d-tooltip.hover="'Редактировать'">
                    <i class="material-icons">&#xE254;</i>
                  </d-button> 

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
              </v-client-table>-->

              <table class="table-options meta-table" style="width:100%">
                <thead>
                  <tr>
                    <th style="width: 20%;">{{ label.releaseSource }}</th>
                    <th style="width: 20%;">{{ label.responsible }}</th>
                    <th style="width: 20%;">{{ label.lineManager }}</th>
                    <th style="width: 30%;">{{ label.cron }}</th>
                    <th style="width: 10%;"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(task,id) in taskList" :key="id">
                    <td :data-label="label.releaseSource">
                      <p class="word-break">{{ task.releaseSourceName }}</p>
                    </td>
                    <td :data-label="label.responsible">
                      <span class="word-break">
                        <template>
                          <v-select :options="responsiblePeopleList" label="fullName"
                            :value="task.responsiblePersonName" @input="val => setResponsiblePerson(val, task)">
                          </v-select>
                        </template>
                      </span>
                    </td>
                    <td :data-label="label.lineManager">
                      <span class="word-break">
                        <template>
                          <v-select :options="lineManagerList" label="fullName"
                            @input="val => setLineManager(val, task)"></v-select>
                        </template>
                      </span>
                    </td>
                    <td :data-label="label.cron">
                      <span class="word-break">
                        <template>
                          <v-select :options="cronListOptions" label="titleRu"
                            @input="val => setCronExpression(val, task)"></v-select>
                        </template>
                      </span>
                    </td>
                    <td>
                      <d-button-group size="small" class="d-flex justify-content-center">

                        <d-button class="btn-white" v-d-tooltip.hover="'Сохранить'">
                          <i class="material-icons">save</i>
                        </d-button>

                        <d-button class="btn-white" v-d-tooltip.hover="'Редактировать'">
                          <i class="material-icons">&#xE254;</i>
                        </d-button>

                      </d-button-group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </d-card-body>

          <div class="card-footer text-muted border-top py-3">
            <span class="d-inline-block">
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ClientTable } from "vue-tables-2";
import "@/assets/scss/vue-tables.scss";
import axios from "axios";

export default {
  components: {
    ClientTable,
  },
  data() {
    return {
      responsiblePeopleList: [
        {
          id: "01",
          fullName: "Mary Sidorova",
          responsiblePersonEmail: "mary.sidorova@bk.ru",
        },
        {
          id: "02",
          fullName: "Lily Tren",
          responsiblePersonEmail: "lily777@gmail.com",
        },
      ],
      lineManagerList: [
        {
          id: "01",
          fullName: "Ivan Ivanov",
          lineManagerEmail: "ivan.i@mail.ru",
        },
        {
          id: "02",
          fullName: "Petr Sidorov",
          lineManagerEmail: "petro777@mail.ru",
        },
      ],
      cronListOptions: [
        {
          id: "1111",
          value: "0 5 3 */1 *",
          titleEn: "At 05:00 AM, on day 3 of the month",
          titleRu: "В 05:00 третьего числа месяца",
        },
        {
          id: "2222",
          value: "0 0 5 L * ? *",
          titleEn: "At 05:00 AM, on the last day of the month",
          titleRu: "В 05:00 последнего дня месяца",
        },
        {
          id: "3333",
          value: "0 0 5 2 * ? *",
          titleEn: "At 05:00:00am, on the 2nd day, every month",
          titleRu: "В 05:00:00, 2-го числа, каждый месяц",
        },
        {
          id: "4444",
          value: "30 03 01 */3 *",
          titleEn: "At 03:30 AM, on day 01 of the month, every 3 months",
          titleRu: "В 03:30 первого числа каждого месяца каждые 3 месяца.",
        },
      ],
      taskList: [
        {
          releaseSourceName: "Disel",
          assignedResponsible: "",
          assignedLineManager: "",
          cronExpression: "",
        },
        {
          releaseSourceName: "Oven",
          assignedResponsible: "",
          assignedLineManager: "",
          cronExpression: "",
        },
        {
          releaseSourceName: "Grinding machine",
          assignedResponsible: "",
          assignedLineManager: "",
          cronExpression: "",
        },
      ],
      // html to pdf
      output: null,
      tasks: [],
      columns: [
        "releaseSourceName",
        "reporter.userFullName",
        "linemanager.userFullName",
        "taskDueDate",
        "taskOverDue",
        "status",
        "up_date",
        "actions",
      ],
      tableOptions: {
        headings: {
          emissionSourceName: "Наименование ист. выбросов",
          emissionSourceNumber: "№ ист. выбросов",
          releaseSourceName: "Наименование ист. выделения",
          "reporter.userFullName": "Ответственный",
          "linemanager.userFullName": "Линейный руководитель",
          up_date: "Дата послед. обновления",
          taskDueDate: "Планируемая дата предоставления",
          taskOverDue: "Задача просрочена?",
          status: "Статус",
          actions: "Действия",
        },
        columnsClasses: {
          emissionSourceNumber: "text-center",
          up_date: "text-center",
          status: "text-center",
        },
        headingsTooltips: {
          releaseSourceName: "Наименование истчника выделения",
        },
        perPage: 10,
        recordsPerPage: [10, 25, 50, 100],
        skin: "transaction-history table dataTable meta-table",
        filterable: [
          "emissionSourceName",
          "emissionSourceNumber",
          "releaseSourceName",
          "reporter.userFullName",
          "linemanager.userFullName",
          "status",
        ],
        sortable: [
          "emissionSourceName",
          "emissionSourceNumber",
          "releaseSourceName",
          "reporter.userFullName",
          "linemanager.userFullName",
          "status",
        ],
        sortIcon: {
          base: "fas float-right mt-1 text-muted",
          up: "fa-caret-up",
          down: "fa-caret-down",
        },
        texts: {
          filterPlaceholder: "Введите текст для поиска",
          limit: "Записей",
          filter: "Поиск",
          noResults: "Нет подходящих записей",
          loading: "Идет загрузка...",
          page: "Стр.:",
          filterBy: "Фильтровать по {column}",
          count:
            "Отображение с {from} по {to} из {count} записей|{count} записей | Запись",
        },
        pagination: {
          edge: true,
          nav: "scroll",
        },
        templates: {
          taskOverDue(h, row) {
            return row.taskOverDue ? "True" : "False";
          },
        },
      },
      // this part related to excel export
      json_fields: {
        "Наименование ист.": "releaseSource",
        "ФИО Ответственного": "responsible",
        "ФИО Линейного руководителя": "lineManager",
        "Периодичность": "cron"
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      // first attept to dynamically change data-label
      label: {
        releaseSource: "Источник ",
        responsible: "Ответственный сотрудник ",
        lineManager: "Линейный руководитель ",
        cron: "Напоминание "
        }
    };
  },
  // Fetches users when the component is created.
  created() {
    axios
      .get("https://ecoapikz.herokuapp.com/tasks/")
      .then((response) => {
        // JSON responses are automatically parsed.
        this.tasks = response.data;
      })
      .catch((e) => {
        this.pageerrors.push(e);
      });
  },
  methods: {
    setResponsiblePerson(assignedResponsible, task) {
      if (assignedResponsible) {
        return (task.assignedResponsible = assignedResponsible);
      }
      return (task.assignedResponsible = "");
    },
    setLineManager(assignedLineManager, task) {
      if (assignedLineManager) {
        return (task.assignedLineManager = assignedLineManager);
      }
      return (task.assignedLineManager = "");
    },
    setCronExpression(cronExpression, task) {
      if (cronExpression) {
        return (task.cronExpression = cronExpression);
      }
      return (task.cronExpression = "");
    },

    getStatusClass(status) {
      const map = {
        предоставлено: "success",
        задержка: "warning",
        "не предоставлено": "danger",
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

<style scoped>
/* for better display data-label on mobile devices */
.word-break {
  word-wrap: break-word;
  padding-left: 0.5rem;
}
</style>
