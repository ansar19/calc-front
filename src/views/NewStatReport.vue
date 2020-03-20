<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Статистический отчет</span>
        <h3 class="page-title">Отчет об охране атмосферного воздуха</h3>
      </d-col>
    </d-row>
    <!-- Stat report -->
    <d-row>
      <d-col lg="12" md="12">
        <d-card>
          <d-card-header class="border-bottom">
            <h6 class="card-title">2-ТП (воздух)</h6>
          </d-card-header>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-lg-12">
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Код ИНН / БИН</label>
                      <input
                        type="text"
                        name="field-name"
                        class="form-control"
                        data-mask="000.000.000.000&quot;"
                        data-mask-clearifnotmatch="true"
                        placeholder="061.240.008.263"
                      >
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Отчетный период, год</label>
                      <select
                        name="beast"
                        id="select-beast"
                        class="form-control custom-select"
                        disabled="disabled"
                      >
                        <option value="reporting_year">2018</option>
                        <option value="reporting_year">2019</option>
                        <option value="reporting_year">2020</option>
                        <option value="reporting_year">2021</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-12">
                    <div>
                      <label
                        class="d-block"
                      >Время, затраченное на заполнение статистической формы, в часах</label>
                      <d-form-radio inline name="spent_hours" value="lessthanhour">до 1 часа</d-form-radio>
                      <d-form-radio inline name="spent_hours" value="onetwohour">1-2</d-form-radio>
                      <d-form-radio inline name="spent_hours" value="twofourhour">2-4</d-form-radio>
                      <d-form-radio inline name="spent_hours" value="foureighthour">4-8</d-form-radio>
                      <d-form-radio inline name="spent_hours" value="eightfourtyhour">8-40</d-form-radio>
                      <d-form-radio
                        inline
                        name="spent_hours"
                        value="morethanfourtyhour"
                      >более 40 часов</d-form-radio>
                    </div>
                    <!-- radio -->
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-7 col-md-7">
                    <div class="form-group">
                      <label class="form-label">1. Фактическое местонахождение объекта</label>
                      <input
                        type="text"
                        class="form-control"
                        name="example-disabled-input"
                        placeholder="Disabled.."
                        value="область, город, район, населенный пункт"
                        readonly
                      >
                    </div>
                  </div>
                  <div class="col-sm-5 col-md-5">
                    <div>
                      <label
                        class="d-block"
                      >Имелось ли разрешение на осуществление эмиссий в воздух?</label>
                      <d-form-radio inline name="emissinpermitvalid" value="yes">Да</d-form-radio>
                      <d-form-radio inline name="emissinpermitvalid" value="no">Нет</d-form-radio>
                    </div>
                    <!-- radio-->
                  </div>
                </div>
                <hr>
                <div>
                  <label
                    class="d-block"
                  >2. Осуществлялись ли выбросы загрязняющих веществ в атмосферу?</label>
                  <d-form-radio inline name="emissionsperformed" value="yes">Да > 3 раздел</d-form-radio>
                  <d-form-radio inline name="emissionsperformed" value="no">Нет > 5 раздел</d-form-radio>
                </div>
                <hr>
                <div class="form-label">
                  3. Объемы выбросов загрязняющих веществ в атмосферу, их очистка и утилизация, в
                  тоннах с тремя знаками после запятой
                </div>
                <div class="table-responsive">
                  <table class="meta-table table table-hover table-sm table-outline table-vcenter card-table">
                    <thead>
                      <tr>
                        <th class="w-1 text-center">Код строки</th>
                        <th class="text-center">Наименование групп загрязняющих веществ</th>
                        <th class="flex-column justify-content-center text-center">
                          Объем выброшенных без
                          очистки,&nbsp;всего
                        </th>
                        <th class="text-center">
                          Объем выброшенных без очистки,&nbsp;из них от организованных источников
                          загрязнения
                        </th>
                        <th
                          class="text-center"
                          style
                        >Объем поступивших на очистные сооружения загрязняющих веществ</th>
                        <th class="text-center">из них уловленных и обезвреженных, всего</th>
                        <th
                          class="text-center"
                          style
                        >из них уловленных и обезвреженных,&nbsp;из них утилизированных</th>
                        <th
                          class="text-center"
                        >Объем выбросов загрязняющих веществ в атмосферу за отчетный период</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center">
                          <b>1</b>
                        </td>
                        <td>
                          <b>Всего</b>
                        </td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-center">
                          <b>1.1</b>
                        </td>
                        <td>
                          <b>Твердые</b>
                        </td>
                        <td class="text-right"></td>
                        <td class="text-left"></td>
                        <td class="text-right">7879.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-right">1.1.1</td>
                        <td>
                          из них, твердые частицы диаметром 10 мкм
                          (ТЧ10)
                        </td>
                        <td class="text-right"></td>
                        <td class="text-right">3567.00</td>
                        <td class="text-right">3567.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-right">1.1.2</td>
                        <td>
                          из них,&nbsp;твердые частицы диаметром 2,5 мкм
                          (ТЧ2,5)
                        </td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right">2008.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-center">
                          <b>1.2</b>
                        </td>
                        <td>
                          <b>Газообразные и жидкие</b>
                        </td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right">8964.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-right">1.2.1</td>
                        <td>в том числе, сернистый ангидрид (SO2)</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right">5267.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-right">1.2.2</td>
                        <td>сероводород (H2S)</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right">5267.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-right">1.2.3</td>
                        <td>окись углерода (CO)</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right">5267.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-right">1.2.4</td>
                        <td>окислы азота (в пересчете на NО2)</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right">5267.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-right">1.2.5</td>
                        <td>аммиак</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right">5267.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-right">1.2.6</td>
                        <td>
                          углеводороды (без летучих органических соединений
                          и метана (CH4)
                        </td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right">5267.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-right">1.2.7</td>
                        <td>летучие органические соединения (ЛОС)</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right">5267.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-right">1.2.8</td>
                        <td>прочие</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                        <td class="text-right">5267.00</td>
                        <td class="text-right">0.00</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr>
                <div class="form-label">
                  4. Выбросы в атмосферу специфических загрязняющих веществ, их установленный
                  предельно-допустимый выброс, в тоннах с тремя знаками после запятой
                </div>
                <div class="table-responsive" style>
                  <table class="meta-table table table-hover table-sm table-vcenter card-table">
                    <thead>
                      <tr>
                        <th class="w-1 text-center">Наименование загрязняющего вещества</th>
                        <th class="text-center">Код загрязняющего вещества</th>
                        <th class="flex-column justify-content-center text-center">
                          Объем выбросов в атмосферу
                          специфических загрязняющих веществ
                        </th>
                        <th class="text-center">
                          Установленный предельнодопустимый выброс специфических загрязняющих
                          веществ на отчетный год, тонн/год
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center">
                          <b>Всего</b>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td class="text-left">Барий карбонат (в пересчете на барий)</td>
                        <td class="text-center">
                          <b>
                            <span style="font-weight: normal;">006</span>
                          </b>
                        </td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-left">Бериллий и его соединения/в пересчете на бериллий/</td>
                        <td class="text-center">007</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-left">ДиВанадий пентоксид (пыль) (Ванадия пятиокись)</td>
                        <td class="text-center">008</td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-left">Кальций оксид (негашеная известь)</td>
                        <td class="text-center">
                          <b>
                            <span style="font-weight: normal;">010</span>
                          </b>
                        </td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr>
                <div class="form-label">
                  5. Количество стационарных источников выбросов загрязняющих веществ в атмосферу
                  по предприятиям на конец отчетного периода, в единицах
                </div>
                <div class="table-responsive">
                  <table class="meta-table table table-hover table-sm table-outline table-vcenter card-table">
                    <thead>
                      <tr>
                        <th class="w-1 text-center">Код строки</th>
                        <th class="text-center">Наименование показателей</th>
                        <th class="flex-column justify-content-center text-center">Всего</th>
                        <th
                          class="text-center"
                        >Из них,&nbsp;осуществлявшие выбросы в отчетном периоде</th>
                        <th class="text-center" style>
                          Из них,&nbsp;с установленными нормами предельно-допустимых
                          выбросов загрязняющих веществ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center">
                          <b>1</b>
                        </td>
                        <td>
                          <b>Количество стационарных источников выбросов, всего</b>
                        </td>
                        <td class="text-right">12</td>
                        <td class="text-right">12</td>
                        <td class="text-right">12</td>
                      </tr>
                      <tr>
                        <td class="text-right">
                          <b>1.1</b>
                        </td>
                        <td>
                          <b>из них,&nbsp;организованных</b>
                        </td>
                        <td class="text-right">3</td>
                        <td class="text-right">3</td>
                        <td class="text-right">3</td>
                      </tr>
                      <tr>
                        <td class="text-right">1.1.1</td>
                        <td>
                          из них,&nbsp;оборудованных очистными
                          сооружениями
                        </td>
                        <td style class="text-right">0</td>
                        <td class="text-right">0</td>
                        <td class="text-right">0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr>
                <div
                  class="form-label"
                >6. Объемы парниковых газов, в тоннах с двумя знаками после запятой</div>
                <div class="table-responsive" style>
                  <table class="meta-table table table-hover table-sm table-outline table-vcenter card-table">
                    <thead>
                      <tr>
                        <th class="w-1 text-center">Код строки</th>
                        <th class="text-center">Наименование показателей</th>
                        <th class="flex-column justify-content-center text-center">
                          Объем парниковых газов в отчетном
                          году,&nbsp;всего
                        </th>
                        <th class="text-center">
                          Объем парниковых газов в отчетном году,&nbsp;в пересчете в эквиваленте
                          СО2
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center">
                          <b>1</b>
                        </td>
                        <td>
                          <b>Парниковые газы, всего</b>
                        </td>
                        <td class="text-right"></td>
                        <td class="text-right"></td>
                      </tr>
                      <tr>
                        <td class="text-right">
                          <b>
                            <span style="font-weight: normal;">1.1</span>
                          </b>
                        </td>
                        <td>
                          <b>
                            <span style="font-weight: normal;">двуокись углерода (CO2)</span>
                          </b>
                        </td>
                        <td class="text-right"></td>
                        <td class="text-right">7879.00</td>
                      </tr>
                      <tr>
                        <td class="text-right">1.2</td>
                        <td>метан (CH4)</td>
                        <td class="text-right"></td>
                        <td class="text-right">3567.00</td>
                      </tr>
                      <tr>
                        <td class="text-right">1.3</td>
                        <td>закись азота (N2O)</td>
                        <td class="text-right"></td>
                        <td class="text-right">3567.00</td>
                      </tr>
                      <tr>
                        <td class="text-right">1.4</td>
                        <td>гидрофторуглероды (ГФУ)</td>
                        <td class="text-right"></td>
                        <td class="text-right">3567.00</td>
                      </tr>
                      <tr>
                        <td class="text-right">1.5</td>
                        <td>перфторуглероды (ПФУ)</td>
                        <td class="text-right"></td>
                        <td class="text-right">3567.00</td>
                      </tr>
                      <tr>
                        <td class="text-right">1.6</td>
                        <td>гексафторид серы (SF6)</td>
                        <td class="text-right"></td>
                        <td class="text-right">3567.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr>
                <div class="form-group">
                  <label class="form-label">Наименование организации</label>
                  <div class="input-group">
                    <span class="input-group-prepend" id="basic-addon3">
                      <span class="input-group-text">ТОО</span>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      id="companyname"
                      aria-describedby="basic-addon3"
                      value="Eco-Operating"
                      disabled
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Адрес организации</label>
                      <input
                        type="text"
                        class="form-control"
                        name="example-disabled-input"
                        placeholder="Disabled.."
                        value="г. Атырау, М. Отемисулы 145"
                        disabled
                      >
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Телефон организации</label>
                      <input
                        type="text"
                        class="form-control"
                        name="example-disabled-input"
                        placeholder="Disabled.."
                        value="+77778889900"
                        disabled
                      >
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Адрес электронной почты (респондента)</label>
                      <input type="email" class="form-control" placeholder="Email">
                    </div>
                  </div>
                </div>
                <div>
                  <label class="d-block">Согласны на распространение первичных статистических данных</label>
                  <d-form-radio inline name="statdatadistribution" value="yes">Да</d-form-radio>
                  <d-form-radio inline name="statdatadistribution" value="no">Нет</d-form-radio>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Исполнитель</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Disabled.."
                        name="example-disabled-input"
                        disabled
                        value="Ебелепкажиев Есболган Тулегенович"
                      >
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Подпись</label>
                      <input
                        type="text"
                        class="form-control"
                        name="example-text-input"
                        placeholder="Подпись.."
                      >
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Телефон</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="8777-555-33-11"
                        data-mask="0000-0000"
                        data-mask-clearifnotmatch="true"
                        name="field-name"
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Главный бухгалтер</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Disabled.."
                        name="example-disabled-input"
                        disabled
                        value="Ебелепкажиев Есболган Тулегенович"
                      >
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Подпись</label>
                      <input
                        type="text"
                        class="form-control"
                        name="example-text-input"
                        placeholder="Подпись.."
                      >
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Телефон</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="8777-555-33-11"
                        data-mask="0000-0000"
                        data-mask-clearifnotmatch="true"
                        name="field-name"
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Руководитель или лицо, исполняющее его обязанности</label>
                      <input
                        type="text"
                        class="form-control"
                        name="example-disabled-input"
                        placeholder="Disabled.."
                        disabled
                        value="Ебелепкажиев Есболган Тулегенович"
                      >
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Подпись</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Подпись.."
                        name="example-text-input"
                      >
                    </div>
                  </div>
                </div>
              </div>
              <!-- form end after this line-->
            </div>
          </div>
          <d-card-footer class="border-top">
            <div class="d-flex">
              <router-link to="/list-statistical">Отменить</router-link>
              <d-button type="submit" class="btn btn-success ml-auto">Сохранить</d-button>
            </div>
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

