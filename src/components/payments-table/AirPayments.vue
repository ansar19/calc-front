<template>
  <d-card class="card-small mb-3" id="calcResult">
    <d-card-header class="border-bottom">
      <div class="block-handle" align="right">
        <d-button size="sm" class="btn-info btn-sm ml-2" v-d-tooltip.hover="'Выгрузить Excel'">
          <download-excel :data="items" title="Выбросы в разрезе ЗВ" :exportFields="json_fields"
            name="pollutantsemissions.xls">
            <font-awesome-icon icon="download" />
          </download-excel>
        </d-button>
      </div>
      <!-- <h6 class="card-title">Сумма платежей</h6> -->
    </d-card-header>
    <d-card-body>
      <d-form>
        <div class="form-group">
          <label class="form-label">Платежи за загрязнение окружающей среды II кв 2018 г: Производственная база г.
            Экибастуз</label>
        </div>
        <div class="mb-2">
          <label>Таблица выбранных значений ЗВ</label>
          <table class="meta-table">
            <thead>
              <tr>
                <th>Наименование ЗВ или группы ЗВ</th>
                <th>Выбросы в пределах лимитов</th>
                <th>Выбросы сверх лимитов</th>
                <th>Ставка платы в пределах лимитов, ₸</th>
                <th>Ставка платы сверх лимитов, ₸</th>
                <th>Подитог в пределах лимитов, ₸</th>
                <th>Подитог сверх лимитов, ₸</th>
                <th>Подитог, ₸</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" v-bind:key="index">
                <td data-label="ЗВ или группа ЗВ:">
                  <d-input v-model.number="item.pollutantName" size="35%" />
                </td>
                <td data-label="Выбросы в пределах лимитов, т/период:">
                  <d-input type="number" v-model.number="item.emissionsTonPeriod" size="" />
                </td>
                <td data-label="Выбросы сверх лимитов, т/период:">
                  <d-input type="number" v-model.number="item.emissionsTonPeriod" size="" />
                </td>
                <td data-label="Ставка платы в пределах лимитов, ₸:">
                  <d-input type="number" v-model.number="item.emissionPaymentRate" size="" />
                </td>
                <td data-label="Ставка платы сверх лимитов, ₸:">
                  <d-input type="number" v-model.number="item.emissionPaymentRate" size="" />
                </td>
                <td data-label="Подитог в пределах лимитов, ₸:">
                  <d-input type="number" v-model.number="subtotalRow[index]" readonly disabled size="" />
                </td>
                <td data-label="Подитог сверх лимитов, ₸:">
                  <d-input type="number" v-model.number="subtotalRow[index]" readonly disabled size="" />
                </td>
                <td data-label="Подитог в пределах лимитов + сверхлимиты, ₸:">
                  <d-input type="number" v-model.number="subtotalRow[index]" readonly disabled size="" />
                </td>
                <!-- <td data-label="Код ЗВ:"><button @click="addRow(index)">+</button></td> -->
                <!-- <td data-label="Код ЗВ:"><button @click="removeRow(index)">-</button></td> -->
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td><strong>Итого, ₸:</strong></td>
                <td>{{total}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </d-form>
    </d-card-body>
    <d-card-footer class="border-top">
      <div class="d-flex">
        <d-link href="#cancel">Отменить</d-link>
        <d-button class="btn btn-success ml-auto">Сохранить</d-button>
      </div>
    </d-card-footer>
  </d-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { pollutantName: 'Группа: Окислы серы', emissionsTonPeriod: 1.50003, emissionPaymentRate: 50500 },
        { pollutantName: 'Группа: Окислы азота', emissionsTonPeriod: 15.0232, emissionPaymentRate: 50500 },
        { pollutantName: 'Группа: Пыль и зола', emissionsTonPeriod: 37.0034, emissionPaymentRate: 25250 },
        { pollutantName: 'Группа: Свинец и его соединения', emissionsTonPeriod: 0.0004, emissionPaymentRate: 10064650 },
        { pollutantName: 'Сероводород', emissionsTonPeriod: 4, emissionPaymentRate: 313100 },
        { pollutantName: 'Группа: Фенолы', emissionsTonPeriod: 0.0002, emissionPaymentRate: 838300 },
        { pollutantName: 'Группа: Углеводороды', emissionsTonPeriod: 23.1, emissionPaymentRate: 808 },
        { pollutantName: 'Формальдегид', emissionsTonPeriod: 0.0043, emissionPaymentRate: 838300 },
        { pollutantName: 'Группа: Окислы углерода', emissionsTonPeriod: 11.65, emissionPaymentRate: 808 },
        { pollutantName: 'Метан', emissionsTonPeriod: 345, emissionPaymentRate: 50.5 },
        { pollutantName: 'Сажа (Углерод)', emissionsTonPeriod: 1.2, emissionPaymentRate: 60600 },
        { pollutantName: 'Группа: Окислы железа', emissionsTonPeriod: 0.003, emissionPaymentRate: 75750 },
        { pollutantName: 'Аммиак', emissionsTonPeriod: 0.3, emissionPaymentRate: 60600 },
        { pollutantName: 'Хром шестивалентный', emissionsTonPeriod: 0, emissionPaymentRate: 2014950 },
        { pollutantName: 'Группа: Окислы меди', emissionsTonPeriod: 3, emissionPaymentRate: 1509950 },
        { pollutantName: 'Бенз(а)пирен', emissionsTonPeriod: 0.0000093, emissionPaymentRate: 2516415000 },
      ],
      // this part related to excel export
      json_fields: {
        'ЗВ или группа ЗВ': 'pollutantName',
        Выбросы: 'emissionsTonPeriod',
        'Ставка платы, тенге': 'emissionPaymentRate',
        'Подитог, тенге': 'emissionPaymentRate',
      },
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
    };
  },
  computed: {
    subtotalRow() {
      return this.items.map(item => Number(item.emissionsTonPeriod * item.emissionPaymentRate).toFixed(2));
    },
    total() {
      // eslint-disable-next-line no-mixed-operators
      return this.items.reduce((total, item) => total + item.emissionsTonPeriod * item.emissionPaymentRate, 0).toFixed(4);
    },
  },
  methods: {
    addRow(index) {
      this.items.splice(index + 1, 0, {
        emissionsTonPeriod: 0, emissionPaymentRate: 0,
      });
    },
    removeRow(index) {
      this.items.splice(index, 1);
    },
  },
};
</script>
