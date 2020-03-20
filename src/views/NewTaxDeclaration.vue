<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Налоговый отчет</span>
        <h3 class="page-title">Новая налоговая декларация</h3>
      </d-col>
    </d-row>
    <!-- Tax declaration -->
    <d-row>
      <!-- Editor -->
      <d-col lg="12" md="12">
        <d-card>
          <d-card-header class="border-bottom">
            <h6 class="card-title">Декларация по плате за эмиссии в окружающую среду Форма 870.00</h6>
          </d-card-header>
          <d-card-body>
            <div class="row">
              <div class="col-md-12 col-lg-12">
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">ИНН / БИН</label>
                      <input type="text" name="field-name" class="form-control" data-mask="000.000.000.000&quot;"
                        data-mask-clearifnotmatch="true" placeholder="061.240.008.263">
                      <p class="help-block">ИНН / БИН плательщика платы за эмиссии в окружающую среду</p>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">БИН</label>
                      <input type="text" name="field-name" class="form-control" data-mask="000.000.000.000&quot;"
                        data-mask-clearifnotmatch="true" placeholder="000.000.000.000" disabled="">
                      <p class="help-block">юридического лица, структурным подразделением которого является филиал,
                        представительство</p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <div class="form-label">Квартал, за который представляется налоговая отчетность</div>
                      <div class="custom-controls-stacked">
                        <label class="custom-control custom-radio custom-control-inline">
                          <input type="radio" class="custom-control-input" name="example-inline" value="option1"
                            checked="" disabled="">
                          <span class="custom-control-label">I Квартал</span>
                        </label>
                        <label class="custom-control custom-radio custom-control-inline">
                          <input type="radio" class="custom-control-input" name="example-inline" value="option2"
                            disabled="">
                          <span class="custom-control-label">II Квартал</span>
                        </label>
                        <label class="custom-control custom-radio custom-control-inline">
                          <input type="radio" class="custom-control-input" name="example-inline" value="option3"
                            disabled="">
                          <span class="custom-control-label">III Квартал</span>
                        </label>
                        <label class="custom-control custom-radio custom-control-inline">
                          <input type="radio" class="custom-control-input" name="example-inline" value="option4"
                            disabled="">
                          <span class="custom-control-label">IV Квартал</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Налоговый год</label>
                      <select name="beast" id="select-beast" class="form-control custom-select" disabled="disabled">
                        <option value="loc1">2018</option>
                        <option value="loc2">2019</option>
                        <option value="loc3">2020</option>
                        <option value="loc4">2021</option>
                      </select>
                      <p class="help-block">за который представляется налоговая отчетность</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Наименование налогоплательщика</label>
                  <input type="text" class="form-control" name="example-disabled-input" placeholder="Disabled.."
                    value="Eco-Operating" disabled=""> </div>
                <div class="form-group">
                  <div class="form-label">Вид декларации</div>
                  <div class="custom-controls-stacked">
                    <label class="custom-control custom-radio custom-control-inline">
                      <input type="radio" class="custom-control-input" name="example-inline-radios" value="option1"
                        disabled="">
                      <span class="custom-control-label">1 первоначальная</span>
                    </label>
                    <label class="custom-control custom-radio custom-control-inline">
                      <input type="radio" class="custom-control-input" name="example-inline-radios" value="option2"
                        checked="">
                      <span class="custom-control-label">2 очередная</span>
                    </label>
                    <label class="custom-control custom-radio custom-control-inline">
                      <input type="radio" class="custom-control-input" name="example-inline-radios" value="option3"
                        disabled="">
                      <span class="custom-control-label">3 дополнительная</span>
                    </label>
                    <label class="custom-control custom-radio custom-control-inline">
                      <input type="radio" class="custom-control-input" name="example-inline-radios" value="option3"
                        disabled="">
                      <span class="custom-control-label">4 дополнительная по уведомлению</span>
                    </label>
                    <label class="custom-control custom-radio custom-control-inline">
                      <input type="radio" class="custom-control-input" name="example-inline-radios" value="option3"
                        disabled="">
                      <span class="custom-control-label">5 ликвидационная</span>
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Номер уведомления</label>
                      <input type="number" class="form-control" name="field-name" disabled="">
                      <p class="help-block">укажите при наличии</p>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Дата уведомления</label>
                      <input type="text" class="form-control" name="field-name" data-mask="00/00/0000"
                        data-mask-clearifnotmatch="true" placeholder="00/00/0000" disabled="">
                      <p class="help-block">Введите дату уведомления при наличии</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-label">Категория налогоплательщика</div>
                  <div class="custom-controls-stacked">
                    <label class="custom-control custom-radio">
                      <input type="radio" class="custom-control-input" name="example-radios" value="option1" disabled=""
                        checked="">
                      <div class="custom-control-label">А - налогоплательщик, являющийся доверительным управляющим по
                        договору доверительного управления имуществом</div>
                    </label>
                    <label class="custom-control custom-radio">
                      <input type="radio" class="custom-control-input" name="example-radios" value="option2"
                        disabled="">
                      <div class="custom-control-label">В - налогоплательщик, являющийся учредителем доверительного
                        управления по договору доверительного управления имуществом</div>
                    </label>
                    <label class="custom-control custom-radio">
                      <input type="radio" class="custom-control-input" name="example-radios" value="option3"
                        disabled="">
                      <div class="custom-control-label">С - Декларация составляется и представляется плательщиком платы
                        за эмиссии в окружающую среду с объемами платежей до 100 месячных расчетных показателей (МРП) в
                        суммарном годовом объеме</div>
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Код валюты</label>
                      <input type="text" class="form-control" name="example-disabled-input" placeholder="Disabled.."
                        value="KZT" disabled=""> </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Количество приложений</label>
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="16" aria-label="Recipient's username"
                          aria-describedby="basic-addon2" disabled="">
                        <span class="input-group-append" id="basic-addon2">
                          <span class="input-group-text">листов</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Общая сумма исчисленной платы за эмиссии в окружающую среду в пределах
                    установленного норматива за налоговый период</label>
                  <div class="input-group">
                    <span class="input-group-prepend" id="basic-addon3">
                      <span class="input-group-text">870.00.001</span>
                    </span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"> </div>
                  <p class="help-block">определяемая как сумма строк 870.01.012 по всем приложениям 870.01</p>
                </div>
                <div class="form-group">
                  <label class="form-label">Общая сумма исчисленной платы за эмиссии в окружающую среду сверх
                    установленного норматива за налоговый период</label>
                  <div class="input-group">
                    <span class="input-group-prepend" id="basic-addon3">
                      <span class="input-group-text">870.00.002</span>
                    </span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"> </div>
                  <p class="help-block">определяемая как сумма строк 870.01.013 по всем приложениям 870.01 </p>
                </div>
                <div class="form-group">
                  <label class="form-label">Общая сумма исчисленной платы за эмиссии в окружающую среду за налоговый
                    период, подлежащей уплате в бюджет по всем видам специального природопользования</label>
                  <div class="input-group">
                    <span class="input-group-prepend" id="basic-addon3">
                      <span class="input-group-text">870.00.003</span>
                    </span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"> </div>
                  <p class="help-block">определяется как сумма строк 870.00.001 и 870.00.002</p>
                </div>
                <div>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion1>Приложение 1.
                        Окислы серы</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion2>Приложение 2.
                        Окислы азота</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion3>Приложение 3.
                        Пыль и зола</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion4>Приложение 4.
                        Свинец и его соединения</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion5>Приложение 5.
                        Сероводород</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion5" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion6>Приложение 6.
                        Фенолы</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion6" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion7>Приложение 7.
                        Углеводороды</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion7" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion8>Приложение 8.
                        Формальдегид</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion8" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion9>Приложение 9.
                        Окислы углерода</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion9" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion10>Приложение 10.
                        Метан</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion10" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion11>Приложение 11.
                        Сажа</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion11" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion12>Приложение 12.
                        Окислы железа</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion12" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion13>Приложение 13.
                        Аммиак</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion13" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion14>Приложение 14.
                        Хром шестивалентный</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion14" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion15>Приложение 15.
                        Окислы меди</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion15" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                  <d-card class="mb-1">
                    <d-card-header class="px-3 py-2" role="tab">
                      <d-btn block-level size="sm" theme="secondary" href="#" v-d-toggle.accordion16>Приложение 16.
                        Бенз(а)пирен</d-btn>
                    </d-card-header>
                    <d-collapse id="accordion16" accordion="my-accordion" role="tabpanel">
                      <d-card-body>
                        <div class="row">
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий в пределах нормативов,
                                т/период</label>
                              <input type="number" name="field-name" class="form-control"
                                data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                placeholder="000.000.000,000.000.000"> </div>
                          </div>
                          <div class="col-sm-4 col-md-4">
                            <div class="form-group">
                              <label class="form-label">Фактический объем эмиссий сверх установленных нормативов,
                                т/период</label>
                              <div class="form-group align-items-center selectgroup w-100">
                                <label class="selectgroup-item">
                                  <input type="number" name="field-name" class="form-control"
                                    data-mask="099.099.099,099.099.099" data-mask-clearifnotmatch="true"
                                    placeholder="000.000.000,000.000.000"> </label>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы в пределах норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                          <div class="col-sm-2 col-md-2">
                            <div class="form-group">
                              <label class="form-label">Сумма платы сверх норматива, KZT</label>
                              <input type="number" name="field-name" class="form-control" data-mask="099.099.099.099"
                                data-mask-clearifnotmatch="true" placeholder="000.000.000.000"> </div>
                          </div>
                        </div>
                        <div class="card-options">
                          <a href="#" class="btn btn-primary btn-sm">Перейти к полной форме</a>
                        </div>
                      </d-card-body>
                    </d-collapse>
                  </d-card>
                </div>
                <!-- collapse- -->
                <div>
                  <d-button-group block-level>
                    <d-button>Выгрузить XLS</d-button>
                    <d-button>Выгрузить PDF</d-button>
                    <d-button>Распечатать</d-button>
                  </d-button-group>
                </div>
                <!-- button-group -->
              </div>
            </div>
          </d-card-body>
          <d-card-footer>
            <div class="d-flex">
               <router-link to="/list-tax">Назад</router-link>
              <d-button type="submit" class="btn btn-success ml-auto">Сохранить</d-button>
            </div>
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
    };
  },
  created() {
    // console.log('zzzz');
    this.fetch();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

