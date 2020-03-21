<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">Data Tables</h3>
      </div>
    </div>
    <!-- Default Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">Active Users</h6>
          </div>
          <div class="card-body p-0 pb-3 text-center">
            <table class="meta-table mb-0">
              <thead class="bg-light">
                <tr>
                  <th scope="col" class="border-0">#</th>
                  <th scope="col" class="border-0">First Name</th>
                  <th scope="col" class="border-0">Last Name</th>
                  <th scope="col" class="border-0">Country</th>
                  <th scope="col" class="border-0">City</th>
                  <th scope="col" class="border-0">Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ali</td>
                  <td>Kerry</td>
                  <td>Russian Federation</td>
                  <td>Gdańsk</td>
                  <td>107-0339</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Clark</td>
                  <td>Angela</td>
                  <td>Estonia</td>
                  <td>Borghetto di Vara</td>
                  <td>1-660-850-1647</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jerry</td>
                  <td>Nathan</td>
                  <td>Cyprus</td>
                  <td>Braunau am Inn</td>
                  <td>214-4225</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Colt</td>
                  <td>Angela</td>
                  <td>Liberia</td>
                  <td>Bad Hersfeld</td>
                  <td>1-848-473-7416</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- Default Dark Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small overflow-hidden mb-4 meta">
          <div class="card-header">
            <h6 class="m-0">Inactive Users - vertical table</h6>
          </div>
          <div class="card-body pb-3 text-center component-props">
            <table class="meta-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Промплощадка</th>
                  <th>Цех(объект)</th>
                  <th>Участок</th>
                  <th>Источник</th>
                  <th>Наименование ЗВ</th>
                  <th>Выбросы, г/сек</th>
                  <th>Выбросы, т/год ЗВ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="#">1</td>
                  <td data-label="Промплощадка">Graham</td>
                  <td data-label="Цех(объект)">Brent</td>
                  <td data-label="Участок">Benin</td>
                  <td data-label="Источник">Ripabottoni</td>
                  <td data-label="Наименование ЗВ">1-512-760-9094</td>
                  <td data-label="Выбросы, г/сек">1-512-760-9094</td>
                  <td data-label="Выбросы, т/год">1-512-760-9094</td>
                </tr>
                <tr>
                  <td data-label="#">2</td>
                  <td data-label="Промплощадка">Clark</td>
                  <td data-label="Цех(объект)">Angela</td>
                  <td data-label="Участок">Estonia</td>
                  <td data-label="Источник">Borghetto di Vara</td>
                  <td data-label="Наименование ЗВ">1-660-850-1647</td>
                  <td data-label="Выбросы, г/сек">1-512-760-9094</td>
                  <td data-label="Выбросы, т/год">1-512-760-9094</td>
                </tr>
                <tr>
                  <td data-label="#">3</td>
                  <td data-label="Промплощадка">Wylie</td>
                  <td data-label="Цех(объект)">Joseph</td>
                  <td data-label="Участок">Korea, North</td>
                  <td data-label="Источник">Guelph</td>
                  <td data-label="Наименование ЗВ">325-4351</td>
                  <td data-label="Выбросы, г/сек">1-512-760-9094</td>
                  <td data-label="Выбросы, т/год ЗВ">1-512-760-9094</td>
                </tr>
                <tr>
                  <td data-label="#">4</td>
                  <td data-label="Промплощадка">Garth</td>
                  <td data-label="Цех(объект)">Clementine</td>
                  <td data-label="Участок">Indonesia</td>
                  <td data-label="Источник">Narcao</td>
                  <td data-label="Наименование ЗВ">722-8264</td>
                  <td data-label="Выбросы, г/сек">1-512-760-9094</td>
                  <td data-label="Выбросы, т/год ЗВ">1-512-760-9094</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
