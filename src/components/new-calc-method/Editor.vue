<template>
  <d-card class="card-small mb-3">
    <d-card-header class="border-bottom">
      <div class="block-handle" align="right">
        <d-checkbox inline checked name="fav_sports" value="ProductionReady">Production ready</d-checkbox>
        <span class="custom-switch-indicator"></span>
        <d-btn v-d-toggle.my-collapse variant="primary">Раскрыть/Скрыть</d-btn>
      </div>
    </d-card-header>
    <div class="card-header">
      <div class="card-options">
        <d-collapse id="my-collapse">
          <div class="card-body">
            <div class="form-group">
              <div class="row gutters-xs">
                <div class="col">
                  <textarea
                    v-model="title"
                    class="form-control"
                    placeholder="Введите название методики"
                    rows="1"
                  ></textarea>
                </div>
                <span class="col-auto">
                  <d-button class="btn btn-success ml-auto">
                    <i class="material-icons">save</i>
                  </d-button>
                </span>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutters-xs">
                <div class="col">
                  <textarea class="form-control" placeholder="Введите описание методики" rows="1"></textarea>
                </div>
                <span class="col-auto">
                  <d-button class="btn btn-success ml-auto">
                    <i class="material-icons">save</i>
                  </d-button>
                </span>
              </div>
            </div>
          </div>
        </d-collapse>
      </div>
    </div>
    <div class="row row-cards">
      <div class="col-md-4">
        <div class="card scrollable">
          <d-card-header class="d-flex border-bottom">
            <h6 class="d-flex m-0">Form builder</h6>
            <div class="card-options ml-auto">
              <d-button class="btn-sm btn-success">
                <i class="material-icons">save</i>
              </d-button>
              <a href="#" class="card-options-fullscreen btn ml-1" data-toggle="card-fullscreen">
                <i class="material-icons">zoom_out_map</i>
              </a>
            </div>
          </d-card-header>
          <div class="card-body o-auto" style="height: auto">
            <div>
              <d-card class="mb-1">
                <d-card-header class="px-3 py-2" role="tab">
                  <d-btn
                    block-level
                    size="small"
                    theme="secondary"
                    href="#"
                    v-d-toggle.accordion1
                  >Поле: HourWorked</d-btn>
                </d-card-header>
                <d-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                  <d-card-body>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label class="form-label">Введите название поля на кириллице</label>
                          <input
                            type="text"
                            name="field-name"
                            class="form-control"
                            data-mask-clearifnotmatch="true"
                            placeholder="Название поля"
                            value="Часы работы, час/период"
                            data-mask="099.099.099,099.099.099"
                          >
                        </div>
                        <div class="form-group">
                          <label class="form-label">Тип поля</label>
                          <select name="beast" id="select-beast" class="form-control custom-select">
                            <option value="loc1">число</option>
                            <option value="loc2">короткий текст</option>
                            <option value="loc3">текстовое поле</option>
                            <option value="loc4">радио</option>
                            <option value="loc5">чекбокс</option>
                            <option value="loc6">словарь</option>
                          </select>
                          <p class="help-block">выберите тип поля</p>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Key</label>
                          <input
                            type="text"
                            class="form-control is-invalid"
                            name="example-text-input-invalid"
                            placeholder="Key (unique identifier)"
                            value="HourWorked"
                          >
                          <div class="invalid-feedback">Введите уникальное название на латинице</div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Описание</label>
                          <textarea class="form-control" rows="1"></textarea>
                        </div>
                        <div class="form-group">
                          <div class="form-label">Видим для ответственного за предоставление данных?</div>
                          <div class="custom-controls-stacked">
                            <label class="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                class="custom-control-input"
                                name="example-inline-radios"
                                value="option1"
                                checked
                              >
                              <span class="custom-control-label">Видим</span>
                            </label>
                            <label class="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                class="custom-control-input"
                                name="example-inline-radios"
                                value="option2"
                              >
                              <span class="custom-control-label">Невидим</span>
                            </label>
                          </div>
                        </div>
                        <div class="form-group">
                          <div>
                            <label class="custom-control custom-checkbox custom-control-inline">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                name="example-inline-checkbox2"
                                value="option1"
                                checked
                              >
                              <span class="custom-control-label">Обязательно для заполнения</span>
                            </label>
                          </div>
                        </div>
                        <div class="form-group">
                          <div>
                            <label class="custom-control custom-checkbox custom-control-inline">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                name="example-inline-checkbox1"
                                value="option1"
                              >
                              <span class="custom-control-label">Показать дополнительные опции</span>
                            </label>
                          </div>
                        </div>
                        <hr>
                        <div class="form-group">
                          <label class="form-label">Текст сообщения при ошибке</label>
                          <textarea class="form-control" rows="1"></textarea>
                        </div>
                      </div>
                    </div>
                  </d-card-body>
                </d-collapse>
              </d-card>
              <d-card class="mb-1">
                <d-card-header class="px-3 py-2" role="tab">
                  <d-btn block-level size="small" theme="secondary" href="#" v-d-toggle.accordion2>
                    Поле:
                    FuelConsumption
                  </d-btn>
                </d-card-header>
                <d-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                  <d-card-body>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label class="form-label">Введите название поля на кириллице</label>
                          <input
                            type="text"
                            name="field-name"
                            class="form-control"
                            data-mask-clearifnotmatch="true"
                            placeholder="Название поля"
                            value="Расход топлива, т/период"
                            data-mask="099.099.099,099.099.099"
                          >
                        </div>
                        <div class="form-group">
                          <label class="form-label">Тип поля</label>
                          <select name="beast" id="select-beast" class="form-control custom-select">
                            <option value="loc1">число</option>
                            <option value="loc2">короткий текст</option>
                            <option value="loc3">текстовое поле</option>
                            <option value="loc4">радио</option>
                            <option value="loc5">чекбокс</option>
                            <option value="loc6">словарь</option>
                          </select>
                          <p class="help-block">выберите тип поля</p>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Key</label>
                          <input
                            type="text"
                            class="form-control is-invalid"
                            name="example-text-input-invalid"
                            placeholder="Key (unique identifier)"
                            value="FuelConsumption"
                          >
                          <div class="invalid-feedback">Введите уникальное название на латинице</div>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Описание</label>
                          <textarea class="form-control" rows="1"></textarea>
                        </div>
                        <div class="form-group">
                          <div class="form-label">Видим для ответственного за предоставление данных?</div>
                          <div class="custom-controls-stacked">
                            <label class="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                class="custom-control-input"
                                name="example-inline-radios"
                                value="option1"
                                checked
                              >
                              <span class="custom-control-label">Видим</span>
                            </label>
                            <label class="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                class="custom-control-input"
                                name="example-inline-radios"
                                value="option2"
                              >
                              <span class="custom-control-label">Невидим</span>
                            </label>
                          </div>
                        </div>
                        <div class="form-group">
                          <div>
                            <label class="custom-control custom-checkbox custom-control-inline">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                name="example-inline-checkbox2"
                                value="option1"
                                checked
                              >
                              <span class="custom-control-label">Обязательно для заполнения</span>
                            </label>
                          </div>
                        </div>
                        <div class="form-group">
                          <div>
                            <label class="custom-control custom-checkbox custom-control-inline">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                name="example-inline-checkbox1"
                                value="option1"
                              >
                              <span class="custom-control-label">Показать дополнительные опции</span>
                            </label>
                          </div>
                        </div>
                        <hr>
                        <div class="form-group">
                          <label class="form-label">Текст сообщения при ошибке</label>
                          <textarea class="form-control" rows="1">Данное поле обязательно для заполнения</textarea>
                        </div>
                      </div>
                    </div>
                  </d-card-body>
                </d-collapse>
              </d-card>
              <d-card class="mb-1">
                <d-card-header class="px-3 py-2" role="tab">
                  <d-btn block-level size="small" theme="secondary" href="#" v-d-toggle.accordion3>
                    Поле:
                    DictionaryName
                  </d-btn>
                </d-card-header>
                <d-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                  <d-card-body>
                    <div class="row">
                      <div class="col">
                        <div class="form-group">
                          <label class="form-label">Выберите словарь</label>
                          <select name="beast" id="select-beast" class="form-control custom-select">
                            <option value="1">Выбросы ДЭС</option>
                            <option value="2">Выбрсы от покрасочных работ</option>
                            <option value="3">Выбросы от сжигания твердого топлива</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <div class="form-label">Видим для ответственного за предоставление данных?</div>
                          <div class="custom-controls-stacked">
                            <label class="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                class="custom-control-input"
                                name="example-inline-radios"
                                value="option1"
                                checked
                              >
                              <span class="custom-control-label">Видим</span>
                            </label>
                            <label class="custom-control custom-radio custom-control-inline">
                              <input
                                type="radio"
                                class="custom-control-input"
                                name="example-inline-radios"
                                value="option2"
                              >
                              <span class="custom-control-label">Невидим</span>
                            </label>
                          </div>
                        </div>
                        <div class="form-group">
                          <div>
                            <label class="custom-control custom-checkbox custom-control-inline">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                name="example-inline-checkbox2"
                                value="option1"
                                checked
                              >
                              <span class="custom-control-label">Обязательно для заполнения</span>
                            </label>
                          </div>
                        </div>
                        <div class="form-group">
                          <div>
                            <label class="custom-control custom-checkbox custom-control-inline">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                name="example-inline-checkbox1"
                                value="option1"
                              >
                              <span class="custom-control-label">Показать дополнительные опции</span>
                            </label>
                          </div>
                        </div>
                        <hr>
                        <div class="form-group">
                          <label class="form-label">Текст сообщения при ощибке</label>
                          <textarea class="form-control" rows="1">Пожалуйста выберите все до конечного элемента</textarea>
                        </div>
                      </div>
                    </div>
                  </d-card-body>
                </d-collapse>
              </d-card>
              <d-dropdown text="Добавить новое поле">
                <d-dropdown-item>Число</d-dropdown-item>
                <d-dropdown-item>Выбор</d-dropdown-item>
                <d-dropdown-divider/>
                <d-dropdown-item>Словарь</d-dropdown-item>
              </d-dropdown>
            </div>
            <!-- collapse-3.vue -->
          </div>
          <div class="card-footer text-right">
            <button type="submit" class="btn btn-primary">Сохранить форму</button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <d-card>
          <d-card-header class="d-flex border-bottom">
            <h6 class="d-flex m-0">Preview</h6>
            <div class="card-options ml-auto">
              <a href="#" class="card-options-fullscreen btn ml-1" data-toggle="card-fullscreen">
                <i class="material-icons">zoom_out_map</i>
              </a>
            </div>
          </d-card-header>
          <d-card-body>
            <form>
              <div class="form-group">
                <div class="form-label">Часы работы, час/период</div>
                <input type="number" class="form-control is-invalid">
                <div class="invalid-feedback">Укажите часы работы оборудования.</div>
              </div>
              <div class="form-group">
                <div class="form-label">Расход топлива, т/период</div>
                <input type="number" class="form-control" value="2">
              </div>
              <div class="form-group">
                <label class="form-label">Выберите тип оборудования (dropdown tree select)</label>
                <div>
                  <treeselect
                    v-model="value"
                    :multiple="false"
                    :options="options"
                    :disable-branch-nodes="true"
                    search-nested
                  ></treeselect>
                  <pre class="result">{{ value }}</pre>
                </div>
              </div>
            </form>
            <div class="table-responsive">
              <label class="form-label">Таблица выбросов</label>
              <table
                class="rg-table table-hover table-outline table-vcenter card-table"
                cellpadding="0"
                cellspacing="0"
                id="emission-table"
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Код ЗВ</th>
                    <th>Наименование ЗВ</th>
                    <th>Выбросы, г/сек</th>
                    <th>Выбросы, т/год</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td data-title="Код ЗВ:">304</td>
                    <td data-title="Наименование ЗВ:">Азот (II) оксид</td>
                    <td class="text-right" data-title="Выбросы, г/сек:">0.038926919</td>
                    <td class="text-right" data-title="Выбросы, т/год:">0.012297985</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td data-title="Код ЗВ:">301</td>
                    <td data-title="Наименование ЗВ:">Азота (IV) диоксид</td>
                    <td class="text-right" data-title="Выбросы, г/сек:">0.239550272</td>
                    <td class="text-right" data-title="Выбросы, т/год:">0.239550272</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td data-title="Код ЗВ:">330</td>
                    <td data-title="Наименование ЗВ:">Сера диоксид</td>
                    <td class="text-right" data-title="Выбросы, г/сек:">0.012689922</td>
                    <td class="text-right" data-title="Выбросы, т/год:">0.004009063</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td data-title="Код ЗВ:">337</td>
                    <td data-title="Наименование ЗВ:">Углерода оксид</td>
                    <td class="text-right" data-title="Выбросы, г/сек:">0.743390865</td>
                    <td class="text-right" data-title="Выбросы, т/год:">0.23485572</td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td
                      style="background: #d3d3d3"
                      class="totalPollutantEmissiongsec text-right"
                      data-title="Под итог, г/сек:"
                    >1.034557978</td>
                    <td
                      style="background: #d3d3d3"
                      class="totalPollutantEmissiongsec text-right"
                      data-title="Под итог, т/год:"
                    >0.33</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </d-card-body>
          <d-card-footer class="text-right">
            <d-button class="btn-primary" type="submit">Рассчитать</d-button>
          </d-card-footer>
        </d-card>
      </div>
      <div class="col-md-4">
        <d-card>
          <d-card-header class="d-flex border-bottom">
            <h6 class="d-flex m-0">Code</h6>
            <div class="card-options ml-auto">
              <d-button class="btn-sm btn-success">
                <i class="material-icons">save</i>
              </d-button>
              <a href="#" class="card-options-fullscreen btn ml-1" data-toggle="card-fullscreen">
                <i class="material-icons">zoom_out_map</i>
              </a>
            </div>
          </d-card-header>
          <d-card-body>
            <div>
              <section>
                <label>Code Editor:</label>
                <!-- <monaco-editor
                  class="editor"
                  v-model="code"
                  theme="vs-dark"
                  wordWrap="on"
                  language="javascript"
                  :editorOptions="options"
                  @mounted="onMounted"
                  @codeChange="onCodeChange"
                ></monaco-editor> -->
              </section>
            </div>
            <!-- end of the code editor -->
          </d-card-body>
          <d-card-footer class="text-right">
            <button type="submit" class="btn btn-primary">Сохранить скрипт</button>
          </d-card-footer>
        </d-card>
      </div>
    </div>
    <d-card-body>
      <d-form class="new-emission-source">
        <d-row>
          <d-col sm-12>
            <p></p>
          </d-col>
        </d-row>
      </d-form>
    </d-card-body>
    <d-card-footer>
      <div class="d-flex">
        <d-link @click="goBack">Отменить</d-link>
        <d-button class="btn btn-success ml-auto" type="submit">Сохранить</d-button>
      </div>
    </d-card-footer>
  </d-card>
</template>
<script>
// import MonacoEditor from 'vue-monaco';

// import the component
import Treeselect from '@riophae/vue-treeselect';
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  components: {
    // MonacoEditor,
    Treeselect,
  },
  name: 'e-editor',
  data() {
    return {
      value: [],
      options: [{
        id: 'diesel',
        label: 'Дизель',
        children: [{
          id: 'dieselBeforeRepair',
          label: 'До капремонта',
        },
        {
          id: 'dieselAfterRepair',
          label: 'После капремонта',
        },
        ],
      },
      {
        id: 'gasdiesel',
        label: 'Газодизель',
        children: [{
          id: 'gasdieselBeforeRepair',
          label: 'До капремонта',
        },
        {
          id: 'gasdieselAfterRepair',
          label: 'После капремонта',
        },
        ],
      },
      {
        id: 'gas',
        label: 'Газ',
        children: [{
          id: 'gasBeforeRepair',
          label: 'До капремонта',
        },
        {
          id: 'gasAfterRepair',
          label: 'После капремонта',
        },
        ],
      },
      {
        selectOnLineNumbers: true,
        automaticLayout: true,
        wordWrap: true,
      },
      ],
      code: 'HoursWorked * FuelConsumption / Dictoinary',
      items: [{
        content: 'Branch',
        somenumber: 0,
        edit: false,
      }],
      title: 'Обновите название методики...',
      isPollutant: false,
      isLastVisible: true,
    };
  },
  methods: {
    handleOnSubmit(e) {
      e.preventDefault();
      // eslint-disable-next-line
      alert(JSON.stringify(this.form));
    },
    onMounted(editor) {
      this.editor = editor;
    }, // eslint-disable-next-line
    onCodeChange(editor) {
      console.log(this.editor.getValue());
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {},
};
</script>

<style>
.editor {
  width: 90%;
  height: 100%;
  /* full height of the content box */
  min-height: 40em;
  /* Will be AT LEAST 40em tall */
  border: 1px solid grey;
}
</style>
