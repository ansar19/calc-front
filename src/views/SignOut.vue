<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Сотрудники</span>
        <h3 class="page-title">Добавление нового сотрудника</h3>
      </d-col>
    </d-row>
    <!-- Stat report -->
    <d-row>
      <d-col lg="12" md="12">
        <d-card>
          <d-card-header class="border-bottom">
            <h6 class="card-title">Карточка сотрудника</h6>
          </d-card-header>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-lg-12">
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Email</label>
                      <input class="form-control" placeholder="email@domain.com">
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Телефон</label>
                      <input
                        class="form-control"
                        placeholder="0-000-000-0000"
                        data-mask="0-000-000-0000"
                        data-mask-clearifnotmatch="true"
                        name="field-name"
                        type="text"
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Фамилия</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                        value="Махамбетов"
                      >
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Имя</label>
                      <input type="text" class="form-control" placeholder="Company" value="Иван">
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4">
                    <div class="form-group">
                      <label class="form-label">Отчество</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Зatronymic"
                        value="Есетович"
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Должность</label>
                      <input
                        class="form-control"
                        placeholder="Укажите должность.."
                        name="example-text-input"
                        type="text"
                      >
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                      <label class="form-label">Подразделение</label>
                      <input
                        class="form-control"
                        placeholder="Укажите подразделение.."
                        name="example-text-input"
                        type="text"
                      >
                    </div>
                  </div>
                </div>
                <div>
                  <label class="d-block">Роли сотрудника в системе</label>
                  <d-checkbox inline name="role" value="company_admin">Администратор компании</d-checkbox>
                  <d-checkbox
                    inline
                    name="role"
                    value="reporter"
                  >Ответственный за предоставление данных</d-checkbox>
                  <d-checkbox inline name="role" value="financial">Финансист</d-checkbox>
                </div>
                <!-- checkbox -->
              </div>
            </div>
          </div>
          <d-card-footer>
            <div class="d-flex">
              <d-link href="#cancel">Отменить</d-link>
              <d-button type="submit" class="btn btn-success ml-auto">Сохранить</d-button>
            </div>
          </d-card-footer>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>
