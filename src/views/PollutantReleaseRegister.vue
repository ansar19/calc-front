<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Header - Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Регистр выбросов и переноса загрязнителей</span>
        <h3 class="page-title">{{ componentTitle }}</h3>
      </d-col>
    </d-row>
    <!-- регистр выбросов и переноса загрязнителей -->
    <div class="card card-small mb-3" id="section-to-print">
      <div class="card-header border-bottom">
        <h5> Общие сведения о природопользователе, имеющего объекты I категории (далее - Природопользователь)</h5>
      </div>
      <div class="card-body">
        <!--Table-->
        <div class="table">
          <table class="table meta-table" style="width:100%">
            <tr>
              <th width="5%">1</th>
              <td width="40%">Отчетный период*</td>
              <td width="55%">01.01.2019 - 31.12.2019</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Наименование Природопользователя и его юридический адрес, контактный телефон, адрес электронной почты
              </td>
              <td>
                <textarea class="form-control-plaintext" id="exampleFormControlTextarea1"
                  rows="3">Нур-Султан, Улица Дінмұхамед Конаев, 10, Офис Блок А, 9 Этаж</textarea>
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td>Бизнес-идентификационный номер Природопользователя (БИН)</td>
              <td>
                <input id="number" type="number" class="form-control" value="160540021715">
              </td>
            </tr>
            <tr>
              <th>4</th>
              <td>Основной вид экономической деятельности Природопользователя</td>
              <td>
                <textarea class="form-control-plaintext" id="exampleFormControlTextarea1"
                  rows="3">Консультирование по вопросам коммерческой деятельности и управления</textarea>
              </td>
            </tr>
            <tr>
              <th>5</th>
              <td>Наименование производственной площадки, ее географические координаты (градусы, минуты, секунды)<br> и
                краткая
                характеристика производственного процесса</td>
              <td>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </td>
            </tr>
          </table>
        </div>
        <div class="row justify-content-start">
          <div class="col-md-auto">
            <small>Примечание:
            </small>
            <ul>
              <ol><strong>*</strong> <small>Природопользователь представляет информацию за период с 1 января по 31
                  декабря
                  каждого года;</small></ol>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p>Руководитель</p>
            <p> Природопользователя</p>
          </div>
          <div class="col-lg-6">
            <input class="underlined form-control-plaintext" id="endereco" type="text" tabindex="2" minlength="2"
              value="Досмукаметов Канат Мухаметкаримович" required>
            <label> Ф.И.О. (при наличии)</label>
          </div>
          <div class="col col-lg-2">
            <input class="underlined form-control-plaintext" id="endereco" type="text" tabindex="2" minlength="2">
            <label>подпись</label>
          </div>
          <div class="col col-lg-2">
            <input class="underlined form-control-plaintext" id="endereco" type="text" tabindex="2" minlength="2">
            <label>м.п.</label>
          </div>
        </div>
      </div>
      <!-- collapsable element -->
      <div class="main-content-container ml-2 mb-2">
        <d-btn v-d-toggle.my-collapse variant="primary">Показать</d-btn>
        <d-collapse id="my-collapse">
          <div class="p-3 mt-3 border rounded">
            <div class="card">
              <div class="card-body">
                <div class="card-header mb-4">
                  <h5> Информация по объему фактических эмиссий загрязняющих веществ в атмосферный воздух</h5>
                </div>

                <div class="row mb-2">
                  <div class="col-sm">
                    <label>Наименование Природопользователя</label>
                    <input class="underlined form-control-plaintext" id="nature-user" type="text" tabindex="2"
                      minlength="5" required>
                  </div>
                  <div class="col-sm">
                    <label>Наименование производственной площадки</label>
                    <input class="underlined form-control-plaintext" id="work-site-name" type="text" tabindex="2"
                      minlength="5" required>
                  </div>
                  <div class="col-sm">
                    <label>Отчетный период*</label>
                    <input class="underlined form-control-plaintext" id="reporting-period" type="text" tabindex="2"
                      minlength="5" required>
                  </div>
                </div>
                <!--Table-->
                <table id="tablePreview" class="meta-table">
                  <!--Table head-->
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Номер КАС**</th>
                      <th>Наименование загрязняющего вещества</th>
                      <th>Установленный норматив (тонн в год)</th>
                      <th>Фактический сбросы (тонн в год)</th>
                      <th>Методы определения фактических эмиссии (расчетный метод, инструментальные замеры)</th>
                    </tr>
                  </thead>
                  <!--Table head-->
                  <!--Table body-->
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Mark</td>
                      <td>Otto</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>Mark</td>
                      <td>Otto</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>Mark</td>
                      <td>Otto</td>
                    </tr>
                  </tbody>
                  <!--Table body-->
                </table>
                <!--Table-->

                <div class="row justify-content-start">
                  <div class="col-md-auto">
                    <small>Примечание:
                    </small>
                    <ul>
                      <ol><strong>*</strong> <small>Природопользователь представляет информацию за период с 1 января по
                          31 декабря
                          каждого года;</small></ol>
                      <ol><strong>**</strong> <small>номер КАС - уникальный численный идентификатор химических
                          соединений,
                          заполняется уполномоченным органом;</small></ol>
                      <ol><strong>***</strong><small> необходимо указать наименование загрязняющего вещества..</small>
                      </ol>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <p>Руководитель</p>
                    <p> Природопользователя</p>
                  </div>
                  <div class="col-lg-6">
                    <input class="underlined form-control-plaintext" id="company-head" type="text" tabindex="2"
                      minlength="5" value="Досмукаметов Канат Мухаметкаримович" required>
                    <label>Ф.И.О. (при наличии)</label>
                  </div>
                  <div class="col col-lg-2">
                    <input class="underlined form-control-plaintext" id="signature" type="text" tabindex="2"
                      minlength="5">
                    <label>подпись</label>
                  </div>
                  <div class="col col-lg-2">
                    <input class="underlined form-control-plaintext" id="stamp" type="text" tabindex="2" minlength="5">
                    <label>м.п.</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </d-collapse>
      </div>

      <!-- collapse-1.vue -->
      <div class="card-footer border-top">
        <small class="text-muted">
          <a href="#" class="card-link" onclick="window.print()">Распечатать</a>
        </small>
      </div>
    </div>
  </d-container>
</template>

<style scoped>
input.underlined {
  width: 100%;
  background-image: linear-gradient(to right, #000, #000);
  background-position: 0.5px calc(100% - 1px);
  background-size: calc(100% - 1px) 2px;
  background-repeat: no-repeat;
  background-color: #fcfcfc;
  /*   border: 1px solid; */
  /*   padding: 10px; */
}


@media print {
  @page {
    size: A4 landscape;
    orientation: landscape;
    margin: 0;
  }

  body * {
    visibility: hidden;
    margin: 0;
  }

  #section-to-print,
  #section-to-print * {
    visibility: visible;
  }

  #section-to-print {
    position: absolute;
    left: 0;
    top: 0;
  }

  card {
    margin: 12.5mm;
  }
}
</style>
