<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Задача</span>
      </d-col>
    </d-row>
    <d-card class="card-small mb-3">
      <d-card-header class="d-flex border-bottom">
        <h6 class="d-flex m-0">Детали задачи</h6>
      </d-card-header>
      <div>
        <div v-if="!loaded">
          Загружаем данные...
        </div>
        <div v-else>
          <d-card-body>
            <table class="table table-bordered" style="width:100%" v-for="(t, index) in tasks" :key="index">
              <tr>
                <th>Наименование источника выделения:</th>
                <td>{{t.releaseSourceName}}</td>
              </tr>
              <tr>
                <th>Наименование методики расчета:</th>
                <td>{{t.calcMethodName}}</td>
              </tr>
              <tr>
                <th>Периодичность:</th>
                <td>{{t.reportingPeriodicity}}</td>
              </tr>
              <tr>
                <th>rfc2445:</th>
                <td>{{t.rfc2445}}</td>
              </tr>
             <tr>
                <th>Ответственный за предоставление данных:</th>
                <td>{{t.reporter.userFullName}}<br>{{t.reporter.value}}</td>
              </tr>
               <tr>
                <th>Линейный руководитель:</th>
                <td>{{t.linemanager.userFullName}}<br>{{t.linemanager.value}}</td>
              </tr>
              <tr>
                <th>Комментарии к задаче:</th>
                <td>{{t.taskComments}}</td>
              </tr>
              <!-- <tr>
                <th>Подразделение:</th>
                <td>{{u.department}}</td>
              </tr> -->
            </table>
          </d-card-body>
        </div>
      </div>
      <d-card-footer class="border-top">
        <div class="d-flex">
          <router-link :to="{ name: 'list-tasks' }">Отменить</router-link>
          <d-button class="ml-auto" theme="warning">Редактировать</d-button>
        </div>
      </d-card-footer>

    </d-card>
  </d-container>
</template>

<script>
import axios from 'axios';

const TaskService = {};
// eslint-disable-next-line consistent-return
TaskService.getTask = async (id) => {
  try {
    const result = await axios.get(`https://ecoapikz.herokuapp.com/tasks/${id}`);
    const tasks = {
    //   name: result.data.name,
      releaseSourceName: result.data.releaseSourceName,
      reportingPeriodicity: result.data.reportingPeriodicity,
      reporter: result.data.reporter,
      linemanager: result.data.linemanager,
      calcMethodName: result.data.calcMethodName,
      taskComments: result.data.taskComments,
      rfc2445: result.data.rfc2445,
    };
    return tasks;
  } catch (error) {
    //     const errorStatus = error.response.status;
    //     let errorMessage = '';
    //     if (errorStatus === 404) {
    //       errorMessage = 'Пользователь не найден';
    //     } else {
    //       errorMessage = 'Произошла ошибка';
    //     }
    //     throw new Error(errorMessage);
  }
};
export default {
  data() {
    return {
      loaded: false,
      taskId: null,
      tasks: [],
      error: null,
    };
  },
  mounted() {
    this.taskId = this.$route.params.id;
    this.getTask();
  },
  methods: {
    async getTask() {
      this.loaded = false;
      try {
        const task = await TaskService.getTask(this.taskId);
        this.tasks.push(task); // add to array
        this.loaded = true;
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
