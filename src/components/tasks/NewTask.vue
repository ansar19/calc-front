<template>
  <d-card class="card-small mb-3" @submit="addTask" validate>
    <d-card-header class="border-bottom">
      <h6 class="card-title">Новая задача</h6>
    </d-card-header>
    <d-form class="new-task">
      <d-card-body>
        <d-row>
          <div class="col-md-6 col-lg-6">
            <div class="tasks-group">
              <label class="tasks-label">Источник</label>
              <div class="input-icon mb-3">
                <v-select class="mb-3" v-model="tasks.releaseSourceName" :options="releaseSourceNameOptions"
                  label="tasks.releaseSourceName" v-bind:key="index"
                  placeholder="Введите Наименование источника для поиска" data-vv-as="Источник выделения" disabled
                  required></v-select>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-6">
            <div class="tasks-group">
              <label class="tasks-label">Методика расчета выбросов</label>
              <div class="input-icon mb-3">
                <v-select class="mb-3" v-model="tasks.calcMethodName" :options="calcMethodNameOptions"
                  label="tasks.calcMethodName" v-bind:key="index" placeholder="Введите Наименование методики для поиска"
                  data-vv-as="Методика расчета" disabled required></v-select>
              </div>
            </div>
          </div>
        </d-row>
        <fieldset class="tasks-fieldset">
          <d-row>
            <div class="col-sm-6 col-md-6">
              <h6>Данные сотрудника</h6>
              <div class="tasks-group">
                <label class="tasks-label">Поиск ответственного за предоставление данных (ФИО)</label>
                <div class="input-icon mb-3">
                  <v-select class="mb-3" name="User" v-model="tasks.reporter" :options="usersOptions"
                    label="userFullName" v-bind:key="index" placeholder="Введите ФИО для поиска"
                    data-vv-as="ФИО пользователя" required></v-select>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
              <div class="tasks-group">
                <h6>Данные линейного руководителя</h6>
                <label class="tasks-label">Поиск линейного руководителя (ФИО)</label>
                <div class="input-icon mb-3">
                  <v-select class="mb-3" name="LineManager" v-model="tasks.linemanager" :options="linemanagersOptions"
                    label="userFullName" v-bind:key="index" placeholder="Введите ФИО для поиска"
                    data-vv-as="ФИО руководителя" required></v-select>
                </div>
              </div>
            </div>
          </d-row>
        </fieldset>

        <div class="row">
          <div class="col-sm-6">
            <h6>Дни начала напоминания ответственному</h6>
            <recurrence :rfc2445.sync="tasks.rfc2445" @input="(newRfc2445) => {rfc2445 = newRfc2445}"></recurrence>
          </div>
          <div class="col-sm-6">
            <h6>Уведомлять о просроченных задачах линейного руководителя</h6>
            <fieldset class="tasks-fieldset">
              <!-- Using Slots -->
              <div>
                <label class="tasks-label">Через</label>
                <d-input-group class="mb-2">
                  <d-input type="number" v-model.number="tasks.reminder" placeholder="После даты просрочки." disabled />
                  <d-input-group-text slot="append">дня</d-input-group-text>
                </d-input-group>
                <small id="reminderlHelp" class="tasks-text text-muted">После даты просрочки.</small>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="tasks-group mt-2">
          <label class="tasks-label">Комментарии к задаче</label>
          <textarea class="form-control" v-model="tasks.taskComments" rows="1" placeholder="Описание.."></textarea>
        </div>
      </d-card-body>
      <d-card-footer class="border-top">
        <div class="d-flex">
          <router-link to="/list-tasks">Отменить</router-link>
          <d-button class="btn btn-success ml-auto" @click.prevent="addTask" type="submit">Сохранить</d-button>
        </div>
      </d-card-footer>
    </d-form>
  </d-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import Recurrence from '@/components/tasks/Recurrence.vue';

const baseURL = 'https://ecoapikz.herokuapp.com/tasks';
export default {
  name: 'e-editor',
  components: {
    Recurrence,
  },
  data() {
    return {
      payload: {},
      tasks: {
        releaseSourceName: 'ДЭС САТ 336',
        reporter: '',
        linemanager: '',
        calcMethodName: 'Расчет выбросов от ДЭС',
        reminder: '2', // to-do rfc2445 + reminding date update
        rfc2445: '',
        taskComments: 'Пожалуйста заполните необходиме данные',
      },
      releaseSourceNameOptions: [{
        index: 0,
        value: 'DES-1',
        releaseSourceName: 'ДЭС САТ 336',
      },
      {
        index: 1,
        value: 'Welding apparatus Miller 453',
        releaseSourceName: 'Сварочный аппарат Miller 453',
      },
      ],
      calcMethodNameOptions: [{
        index: 0,
        value: 'diesel_calc_method',
        text: 'Расчет выбросов от ДЭС',
      }],
      usersOptions: [{
        index: 0,
        value: 'afinance@yandex.ru',
        userFullName: 'Ануар  Ахметов',
      },
      {
        index: 1,
        value: 'dg3838@yandex.ru',
        userFullName: 'Сергей Жугунисов',
      },
      {
        index: 2,
        value: 'death.dr@bk.ru',
        userFullName: 'Темирлан Оспанов',
      },
      {
        index: 3,
        value: 'marat_ald@mail.ru',
        userFullName: 'Марат Алиев',
      },
      {
        index: 4,
        value: 'karbaeva_aidana@mail.ru',
        userFullName: 'Aidana Karbaeva',
      },
      {
        index: 5,
        value: 'zhaken_95@mail.ru',
        userFullName: 'Жакен Сулейменов',
      },
      ],
      linemanagersOptions: [{
        index: 0,
        value: 'afinance@yandex.ru',
        userFullName: 'Ануар  Ахметов',
      },
      {
        index: 1,
        value: 'dg3838@yandex.ru',
        userFullName: 'Сергей Жугунисов',
      },
      {
        index: 2,
        value: 'death.dr@bk.ru',
        userFullName: 'Темирлан Оспанов',
      },
      {
        index: 3,
        value: 'marat_ald@mail.ru',
        userFullName: 'Марат Алиев',
      },
      {
        index: 4,
        value: 'karbaeva_aidana@mail.ru',
        userFullName: 'Aidana Karbaeva',
      },
      {
        index: 5,
        value: 'zhaken_95@mail.ru',
        userFullName: 'Жакен Сулейменов',
      },
      ],
      loading: true,
    };
  },
  props: {
    // rfc2445: {
    //   type: String,
    //   required: true,
    // },
    // index: {
    //   type: String,
    //   required: true,
    // },
    // id: {
    //   type: String,
    //   required: true,
    // },
  },
  methods: {
    async addTask() {
      const {
        releaseSourceName,
        reporter,
        linemanager,
        calcMethodName,
        reportingType,
        reminder,
        taskComments,
        rfc2445,
      } = this.tasks;
      const res = await axios.post(baseURL, {
        releaseSourceName,
        reporter,
        linemanager,
        calcMethodName,
        reportingType,
        reminder,
        taskComments,
        rfc2445,
      });
      this.tasks = res.data;
      this.$router.push({
        name: 'list-tasks',
      });
    },
    // async addTask() {
    //   const res = await axios.post(baseURL, {
    //     releaseSourceName: this.tasks.releaseSourceName,
    //     reportingPeriodicity: this.tasks.reportingPeriodicity,
    //     reporter: this.tasks.reporter,
    //     linemanager: this.tasks.linemanager,
    //     calcMethodName: this.tasks.calcMethodName,
    //     reportingType: this.tasks.reportingType,
    //     reminder: this.tasks.reminder,
    //     taskComments: this.tasks.taskComments,
    //   });
    //   this.tasks = [...this.tasks, res.data];
    //   this.releaseSourceName = '';
    //   this.reportingPeriodicity = '';
    //   this.tasks.reporter = '';
    //   this.tasks.linemanager = '';
    //   this.calcMethodName = '';
    //   this.reportingType = '';
    //   this.taskComments = '';
    //   this.reminder = '';
    // },
    // handleOnSubmit(e) {
    //   e.preventDefault();
    //   // eslint-disable-next-line no-alert
    //   alert(JSON.stringify(this.tasks));
    // },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {},
};
</script>
