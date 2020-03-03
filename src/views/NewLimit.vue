<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Лимит</span>
        <h3 class="page-title">Создание лимита компании</h3>
      </d-col>
    </d-row>
    <!-- Tax declaration -->
    <d-row>
      <!-- Editor -->
      <d-col lg="12" md="12">
        <d-card>
          <d-card-header class="d-flex border-bottom">
            <h6 class="d-flex m-0">Новый лимит</h6>
            <div class="card-options ml-auto"></div>
          </d-card-header>
          <d-card-body>
            <div class="row">
              <div class="col-md-12 col-lg-12">
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label" style>Наименование заключения ГЭЭ:</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Введите название заключения ГЭЭ.."
                        name="example-text-input"
                      >
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">№ и дата выдачи заключения ГЭЭ:</label>
                      <input
                        class="form-control"
                        placeholder="Введите номер и дату заключния ГЭЭ.."
                        name="example-text-input"
                        type="text"
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Срок действия, с:</label>
                      <d-datepicker
                        v-model="start_date"
                        @opened="handleOpened"
                        @closed="handleClosed"
                        :language="ru"
                        typeable />
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Срок действия, по:</label>
                      <d-datepicker
                        v-model="end_date"
                        @opened="handleOpened"
                        @closed="handleClosed"
                        :language="ru"
                        typeable />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect2" class="form-label">
                    Отметьте промплощадки на которые применимо
                    данное разрешение
                  </label>
                  <v-select multiple v-model="selectedWorkSites" :options="workSitesList" label="workSiteName" />
                </div>
                <hr>
                <legend>
                  <h6 class="card-title">Таблица лимитов</h6>
                </legend>
                <div class="table-responsive">
                  <table class="meta-table">
                    <thead>
                      <tr>
                        <th>Наименование ЗВ или группы ЗВ</th>
                        <th>Лимит, г/сек</th>
                        <th>Лимит, т/год</th>
                        <th>Действия</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Группа: Окислы серы"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Группа: Окислы азота"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Группа: Пыль и зола"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Группа: Свинец и его соединения"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Сероводород"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Группа: Фенолы"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Группа: Углеводороды"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Формальдегид"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Группа: Окислы углерода"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Метан"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Сажа (Углерод)"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Группа: Окислы железа"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Аммиак"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Хром шестивалентный"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Группа: Окислы меди"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                      <tr>
                        <td class="pl-0">
                          <input
                            type="text"
                            class="form-control"
                            name="example-text-input"
                            value="Бенз(а)пирен"
                          >
                        </td>
                        <td data-label="Лимит, г/сек">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td data-label="Лимит, т/год">
                          <input type="number" class="form-control" placeholder>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-warning">
                            <font-awesome-icon icon="edit"/>
                          </d-button>
                        </td>
                        <td>
                          <d-button size="sm" class="btn-danger">
                            <font-awesome-icon icon="trash"/>
                          </d-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </d-card-body>
          <d-card-footer class="border-top">
            <div class="d-flex">
              <d-link @click="goBack">Назад</d-link>
              <d-button type="submit" class="btn btn-success ml-auto">Сохранить</d-button>
            </div>
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { en, ru } from 'vuejs-datepicker/dist/locale';

export default {
  data() {
    return {
      en,
      ru,
      selectedWorkSites: [],
      start_date: new Date(2019, 0, 1),
      end_date: new Date(2020, 11, 31),
      opened: false,
      workSitesList: [
        { value: 'morkuduk', workSiteName: 'Месторождение нефти Моркудук' },
        { value: 'zavod', workSiteName: 'Завод металлоизделий' },
        { value: 'baza', workSiteName: 'Производственная база' },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
/*prevent bootstrap-vue css conflict with v-select*/
  .v-select.dropdown .dropdown-toggle::after {
    content: inherit;
  }

  .v-select.dropdown .form-control {
    height: inherit;
  }
</style>
