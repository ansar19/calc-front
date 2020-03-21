<template>
  <div id="app">
  <h5>Методические указания по определению выбросов загрязняющих
    веществ в атмосферу из резервуаров РНД 211.2.02.09-2004. Астана, 2005
    Расчеты по п. 6-8</h5>
  <!--   <pre>{{selectedCoefficients.polCoefficents}}</pre> -->
  <form>
    <div class="form-group">
      <div>
        <v-select :options="options" :value="option => options.polCoefficents" v-model="selectedCoefficients" />
      </div>

      <div id="example-1" class="table-responsive" v-if="selectedCoefficients.polCoefficents && selectedCoefficients.polCoefficents.length">
        <table class="table table-bordered table-hover table-stripped">
          <caption style="caption-side: top;">Таблица выбранных коэф-ов</caption>
          <thead>
            <tr class="bg-success text-white">
              <th>Код ЗВ</th>
              <th>Наименование ЗВ</th>
              <th>Коэф</th>
            </tr>
          </thead>
          <tr v-for="item in selectedCoefficients.polCoefficents" :key="item.index">
            <td data-title="Код ЗВ:">{{ item.polCode }}</td>
            <td data-title="Наименование ЗВ:">{{ item.polName }}</td>
            <td data-title="Коэф:">{{ item.coef }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="form-group">
      <label for="specific-emission-kg-h">Теплообменный аппарат или средство перекачки в зависимости от вида нефтепродукта и средней температуры кипения жидкости
      </label>
      <div>
        <v-select :options="specificEmissionOptions" label="label" v-model.number="specificEmissionKgh" />
        <span>Удельный выброс, кг/час(табл. 8.1)</span>
      </div>
      <!--       {{specificEmissionKgh}} -->
    </div>
    <div class="form-group">
      <label for="total-amount-of-pumps">Общее количество аппаратуры или средств перекачки, шт.</label>
      <input id="total-amount-of-pumps" v-model.number="pumpsTotalAmount" name="total-amount-of-pumps" type="text" class="form-control" aria-describedby="total-amount-of-pumpsHelpBlock">
      <span id="total-amount-of-pumpsHelpBlock" class="form-text text-muted">N1 = 1</span>
    </div>
    <div class="form-group">
      <label for="same-time-operating-pumps-number">Одновременно работающее количество аппаратуры или средств перекачки, шт.</label>
      <input id="same-time-operating-pumps-number" v-model.number="sameTimeOperatingPumpsQty" name="same-time-operating-pumps-number" type="text" class="form-control" aria-describedby="same-time-operating-pumps-numberHelpBlock">
      <span id="same-time-operating-pumps-numberHelpBlock" class="form-text text-muted">NN1 = 1</span>
    </div>
    <div class="form-group">
      <label for="hour-worked">Время работы одной единицы оборудования, час/год</label>
      <input id="hour-worked" v-model.number="hourWorked" name="hour-worked" type="text" class="form-control" aria-describedby="hour-workedHelpBlock">
      <span id="hour-workedHelpBlock" class="form-text text-muted">_T_ = 4380</span>
    </div>
    <div class="form-group" v-if="selectedCoefficients.polCoefficents && selectedCoefficients.polCoefficents.length && specificEmissionKgh">
      <p class="lead font-weight-normal">
        Максимальный из разовых выбросов, г/с (8.1): G = {{maxOneTimeEmissionGsec}}
      </p>

    </div>
    <div class="form-group" v-if="selectedCoefficients.polCoefficents && selectedCoefficients.polCoefficents.length && specificEmissionKgh">
      <p class="lead font-weight-normal">
        Валовый выброс, т/год (8.2): M = {{grossEmissionTyear}}
      </p>
    </div>
    <div v-if="selectedCoefficients.polCoefficents && selectedCoefficients.polCoefficents.length" @click.prevent="calculate" class="control">
      <button class="btn btn-primary">Расчитать</button>
    </div>
  </form>

  <div v-if="showResult">
    <!--     {{calcResult}} -->
    <table class="table table-bordered table-hover table-stripped rg-table" ref="table" id="loremTable" rules="groups" frame="hsides" border="2">
      <caption style="caption-side: top;">Таблица выбросов</caption>
      <thead>
        <tr class="bg-success text-white">
          <th>Код ЗВ</th>
          <th>Наименование ЗВ</th>
          <th>Выбросы, г/сек</th>
          <th>Выбросы, т/период</th>
        </tr>
      </thead>
      <tr v-for="(item) in calcResult" :key="item.index">
        <td data-title="Код ЗВ:">{{item.polCode}}</td>
        <td data-title="Наименование ЗВ:">{{item.polName}}</td>
        <td data-title="Выбросы, г/сек:">{{item.gseccoef}}</td>
        <td data-title="Выбросы, т/период:">{{item.tyearcoef}}</td>
      </tr>
    </table>
    <button v-if="calcResult && calcResult.length" class="btn btn-outline-primary" @click.prevent="tableToExcel('table', 'Calc Table')">.XLS </button>
    <button v-if="calcResult && calcResult.length" class="btn btn-outline-primary" @click.prevent="csvExport(calcResult)">.CSV </button>
  </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
/* eslint-disable */

export default {
  data() {
    return {
      showResult: false,
      options: [
        {
          productName: 'crudeOilNoSulfur',
          label: 'Сырая нефть (безсернистая)',
          polCoefficents: [
            {
              polName: 'Смесь углеводородов предельных С1-С5',
              polCode: '0415',
              coef: 72.46,
            },
            {
              polName: 'Смесь углеводородов предельных С6-С10',
              polCode: '0416',
              coef: 26.8,
            },
            { polName: 'Бензол', polCode: '0602', coef: 0.35 },
            { polName: 'Метилбензол (толуол)', polCode: '0621', coef: 0.22 },
            {
              polName: 'Диметилбензол (смесь о- м- п- изомеров)',
              polCode: '0616',
              coef: 0.11,
            },
          ],
        },
        {
          productName: 'crudeOilSulfur',
          label: 'Сырая нефть (сернистая)',
          polCoefficents: [
            {
              polName: 'Смесь углеводородов предельных С1-С5',
              polCode: '0415',
              coef: 72.46,
            },
            {
              polName: 'Смесь углеводородов предельных С6-С10',
              polCode: '0416',
              coef: 26.8,
            },
            { polName: 'Бензол', polCode: '0602', coef: '0.35' },
            { polName: 'Метилбензол (толуол)', polCode: '0621', coef: '0.22' },
            {
              polName: 'Диметилбензол (смесь о- м- п- изомеров)',
              polCode: '0616',
              coef: 0.11,
            },
            {
              polName: 'Сероводород',
              polCode: '0333',
              coef: 0.06,
            },
          ],
        },
        {
          productName: 'petrolOctanAbove90',
          label: 'Высокооктановый бензин (90 и выше)',
          polCoefficents: [
            {
              polName: 'Смесь углеводородов предельных С1-С5',
              polCode: '0415',
              coef: 67.67,
            },
            {
              polName: 'Смесь углеводородов предельных С6-С10',
              polCode: '0416',
              coef: 25.01,
            },
            {
              polName: 'Углеводороды Непредельные (по амиленам)',
              polCode: '0501',
              coef: 2.5,
            },
            { polName: 'Бензол', polCode: '0602', coef: 2.3 },
            { polName: 'Метилбензол (толуол)', polCode: '0621', coef: 2.17 },
            {
              polName: 'Диметилбензол (смесь о- м- п- изомеров)',
              polCode: '0616',
              coef: 0.29,
            },
            { polName: 'Этилбензол', polCode: '0620', coef: 0.06 },
          ],
        },
        {
          productName: 'petrolOctanBelow90',
          label: 'Низкооктановый бензин (до 90)',
          polCoefficents: [
            {
              polName: 'Смесь углеводородов предельных С1-С5',
              polCode: '0415',
              coef: 75.47,
            },
            {
              polName: 'Смесь углеводородов предельных С6-С10',
              polCode: '0416',
              coef: 18.38,
            },
            {
              polName: 'Углеводороды Непредельные (по амиленам)',
              polCode: '0501',
              coef: 2.5,
            },
            { polName: 'Бензол', polCode: '0602', coef: 2 },
            { polName: 'Метилбензол (толуол)', polCode: '0621', coef: 1.45 },
            {
              polName: 'Диметилбензол (смесь о- м- п- изомеров)',
              polCode: '0616',
              coef: 0.15,
            },
            { polName: 'Этилбензол', polCode: '0620', coef: 0.05 },
          ],
        },
        {
          productName: 'whiteSpirit',
          label: 'Уайт-спирит',
          polCoefficents: [
            {
              polName: 'Смесь углеводородов предельных С1-С5 (1531*, 1539*)',
              polCode: '0415',
              coef: 11.88,
            },
            {
              polName: 'Смесь углеводородов предельных С6-С10 (1532*, 1540*)',
              polCode: '0416',
              coef: 81.86,
            },
            { polName: 'Бензол', polCode: '0602', coef: 2.15 },
            { polName: 'Метилбензол (толуол)', polCode: '0621', coef: 3.2 },
            {
              polName: 'Диметилбензол (смесь о- м- п- изомеров)',
              polCode: '0616',
              coef: 0.91,
            },
          ],
        },
      ],
      selectedCoefficients: [],
      specificEmissionKgh: '', // Q = 0.03
      specificEmissionOptions: [
        {
          label:
          'Газ, бензин и жидкости с tк<120°C — Кожухотрубный теплообменник: трубное пространство',
          value: 0.2,
        },
        {
          label:
          'Газ, бензин и жидкости с tк<120°C — Кожухотрубный теплообменник: межтрубное пространство',
          value: 0.2,
        },
        {
          label: 'Газ, бензин и жидкости с tк<120°C — Кожухотрубный холодильник',
          value: 0.2,
        },
        {
          label: 'Газ, бензин и жидкости с tк<120°C — Кожухотрубный кипятильник',
          value: 0.2,
        },
        {
          label: 'Газ, бензин и жидкости с tк<120°C — Погружной холодильник',
          value: 1,
        },
        {
          label:
          'Газ, бензин и жидкости с tк<120°C — Аппарат воздушного охлаждения',
          value: 0.1,
        },
        {
          label:
          'Газ, бензин и жидкости с tк<120°C — Насосы центробежные с одним уплотнением вала: торцевым',
          value: 0.08,
        },
        {
          label:
          'Газ, бензин и жидкости с tк<120°C — Насосы центробежные с одним уплотнением вала: сальниковым',
          value: 0.14,
        },
        {
          label:
          'Газ, бензин и жидкости с tк<120°C — Насосы центробежные с двумя уплотнениями вала: торцевым',
          value: 0.14,
        },
        {
          label:
          'Газ, бензин и жидкости с tк<120°C — Насосы центробежные с двумя уплотнениями вала: сальниковым',
          value: 0.26,
        },
        {
          label:
          'Газ, бензин и жидкости с tк<120°C — Насосы центробежные с двойными торцевыми уплотнениями или бессальниковые типа ЦНГ',
          value: 0.02,
        },
        {
          label: 'Газ, бензин и жидкости с tк<120°C — Компрессоры центробежные',
          value: 0.12,
        },
        {
          label: 'Газ, бензин и жидкости с tк<120°C — Компрессоры поршневые',
          value: 0.75,
        },
        {
          label:
          'Керосин, дизельное топливо и жидкости с tк=120-300°C - Кожухотрубный теплообменник: трубное пространство',
          value: 0.1,
        },
        {
          label:
          'Керосин, дизельное топливо и жидкости с tк=120-300°C — Кожухотрубный теплообменник: межтрубное пространство',
          value: 0.1,
        },
        {
          label:
          'Керосин, дизельное топливо и жидкости с tк=120-300°C — Кожухотрубный холодильник',
          value: 0.1,
        },
        {
          label:
          'Керосин, дизельное топливо и жидкости с tк=120-300°C — Кожухотрубный кипятильник',
          value: 0.1,
        },
        {
          label:
          'Керосин, дизельное топливо и жидкости с tк=120-300°C — Погружной холодильник',
          value: 0.5,
        },
        {
          label:
          'Керосин, дизельное топливо и жидкости с tк=120-300°C — Аппарат воздушного охлаждения',
          value: 0.07,
        },
        {
          label:
          'Керосин, дизельное топливо и жидкости с tк=120-300°C — Насосы центробежные с одним уплотнением вала: торцевым',
          value: 0.04,
        },
        {
          label:
          'Керосин, дизельное топливо и жидкости с tк=120-300°C — Насосы центробежные с одним уплотнением вала: сальниковым',
          value: 0.07,
        },
        {
          label:
          'Керосин, дизельное топливо и жидкости с tк=120-300°C — Насосы центробежные с двумя уплотнениями вала: торцевым',
          value: 0.07,
        },
        {
          label:
          'Керосин, дизельное топливо и жидкости с tк=120-300°C — Насосы центробежные с двумя уплотнениями вала: сальниковым',
          value: 0.13,
        },
        {
          label:
          'Керосин, дизельное топливо и жидкости с tк=120-300°C — Насосы центробежные с двойными торцевыми уплотнениями или бессальниковые типа ЦНГ',
          value: 0.01,
        },
        {
          label:
          'Нефть, мазут и жидкости с tк>300°C — Кожухотрубный теплообменник: трубное пространство',
          value: 0.05,
        },
        {
          label:
          'Нефть, мазут и жидкости с tк>300°C — Кожухотрубный теплообменник: межтрубное пространство',
          value: 0.05,
        },
        {
          label: 'Нефть, мазут и жидкости с tк>300°C — Кожухотрубный холодильник',
          value: 0.05,
        },
        {
          label: 'Нефть, мазут и жидкости с tк>300°C — Кожухотрубный кипятильник',
          value: 0.05,
        },
        {
          label: 'Нефть, мазут и жидкости с tк>300°C — Погружной холодильник',
          value: 0.01,
        },
        {
          label:
          'Нефть, мазут и жидкости с tк>300°C — Аппарат воздушного охлаждения',
          value: 0.04,
        },
        {
          label:
          'Нефть, мазут и жидкости с tк>300°C — Насосы центробежные с одним уплотнением вала: торцевым',
          value: 0.02,
        },
        {
          label:
          'Нефть, мазут и жидкости с tк>300°C — Насосы центробежные с одним уплотнением вала: сальниковым',
          value: 0.03,
        },
        {
          label:
          'Нефть, мазут и жидкости с tк>300°C — Насосы центробежные с двумя уплотнениями вала: торцевым',
          value: 0.03,
        },
        {
          label:
          'Нефть, мазут и жидкости с tк>300°C — Насосы центробежные с двумя уплотнениями вала: сальниковым',
          value: 0.05,
        },
        {
          label:
          'Нефть, мазут и жидкости с tк>300°C — Насосы центробежные с двойными торцевыми уплотнениями или бессальниковые типа ЦНГ',
          value: 0.01,
        },
      ],
      pumpsTotalAmount: 1, // N1 = 1
      sameTimeOperatingPumpsQty: 1, // NN1 = 1
      hourWorked: 4380, // _T_ = 4380
      seen: false,
      outputTable: [],
      uri: 'data:application/vnd.ms-excel;base64,',
      template:
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format(s, c) {
        return s.replace(/{(\w+)}/g, (m, p) => c[p]);
      },
    };
  },
  methods: {
    ...mapMutations('calcStore', ['setGsecTotal', 'setTyearTotal', 'setPollutants']),
    calculate() {
      this.showResult = true;
      this.setGsecTotal(+this.maxOneTimeEmissionGsec);
      this.setTyearTotal(+this.grossEmissionTyear);
      this.setPollutants(this.calcResult);
    },
    tableToExcel(table, name) {
      if (!table.nodeType) table = this.$refs.table;
      const ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
      window.location.href =
        this.uri + this.base64(this.format(this.template, ctx));
    },
    csvExport(arrData) {
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += [
        Object.keys(arrData[0]).join(','),
        ...arrData.map(item => Object.values(item).join(',')),
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '');

      const data = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', 'export.csv');
      link.click();
    },
  },
  computed: {
    maxOneTimeEmissionGsec() {
      return (this.maxOneTimeEmissionGsec = (
        (this.specificEmissionKgh.value * this.sameTimeOperatingPumpsQty) /
        3.6
      ).toFixed(5));
      // G = Q * NN1 / 3.6 = 0.03 * 1 / 3.6 = 0.00833
    },
    grossEmissionTyear() {
      return (this.grossEmissionTyear = (
        (this.specificEmissionKgh.value *
          this.pumpsTotalAmount *
          this.hourWorked) /
        1000
      ).toFixed(4));
      // Валовый выброс, т/год (8.2) , M = (Q * N1 * _T_) / 1000 = (0.03 * 1 * 4380) / 1000 = 0.1314
    },
    // calcs start
    calcResult() {
      const result = this.selectedCoefficients.polCoefficents.map(el => ({
        ...el,
        code: el.polCode,
        name: el.polName,
        gseccoef: (
          (el.coef * this.maxOneTimeEmissionGsec) /
            100
        ).toPrecision(5),
        tyearcoef: (
          (el.coef * this.grossEmissionTyear) /
            100
        ).toPrecision(4),
      }));
      return result;
    },
  },
};
</script>
