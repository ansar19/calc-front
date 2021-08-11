<template>
  <div id="app">
  <h5>{{calcMethodName}}</h5>
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
      <button class="btn btn-primary">Рассчитать</button>
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
    <button v-if="calcResult && calcResult.length" class="btn mr-2 btn-outline-primary" @click.prevent="tableToExcel('table', 'Calc Table')">.XLS </button>
    <button v-if="calcResult && calcResult.length" class="btn btn-outline-primary" @click.prevent="csvExport(calcResult)">.CSV </button>
    <div title=".docx">
      <button class="btn btn-sm btn-outline-primary mt-2" @click.prevent="exportWord">
        <span class="material-icons">cloud_download</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
/* eslint-disable */

import JSZip from "jszip";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      calcMethodName: "Методические указания по определению выбросов загрязняющих веществ в атмосферу из резервуаров РНД 211.2.02.09-2004. Астана, 2005 Расчеты по п. 6-8",
      showResult: false,
      options: [
        {
          productName: 'crudeOilNoSulfur',
          label: 'Сырая нефть (безсернистая)',
          polCoefficents: [
            {
              polName: 'Смесь углеводородов предельных С1-С5',
              polCode: '415',
              coef: 72.46,
            },
            {
              polName: 'Смесь углеводородов предельных С6-С10',
              polCode: '416',
              coef: 26.8,
            },
            { polName: 'Бензол', polCode: '602', coef: 0.35 },
            { polName: 'Метилбензол (толуол)', polCode: '621', coef: 0.22 },
            {
              polName: 'Диметилбензол (смесь о- м- п- изомеров)',
              polCode: '616',
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
              polCode: '415',
              coef: 72.46,
            },
            {
              polName: 'Смесь углеводородов предельных С6-С10',
              polCode: '416',
              coef: 26.8,
            },
            { polName: 'Бензол', polCode: '602', coef: '0.35' },
            { polName: 'Метилбензол (толуол)', polCode: '621', coef: '0.22' },
            {
              polName: 'Диметилбензол (смесь о- м- п- изомеров)',
              polCode: '616',
              coef: 0.11,
            },
            {
              polName: 'Сероводород',
              polCode: '333',
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
              polCode: '415',
              coef: 67.67,
            },
            {
              polName: 'Смесь углеводородов предельных С6-С10',
              polCode: '416',
              coef: 25.01,
            },
            {
              polName: 'Углеводороды Непредельные (по амиленам)',
              polCode: '501',
              coef: 2.5,
            },
            { polName: 'Бензол', polCode: '602', coef: 2.3 },
            { polName: 'Метилбензол (толуол)', polCode: '621', coef: 2.17 },
            {
              polName: 'Диметилбензол (смесь о- м- п- изомеров)',
              polCode: '616',
              coef: 0.29,
            },
            { polName: 'Этилбензол', polCode: '620', coef: 0.06 },
          ],
        },
        {
          productName: 'petrolOctanBelow90',
          label: 'Низкооктановый бензин (до 90)',
          polCoefficents: [
            {
              polName: 'Смесь углеводородов предельных С1-С5',
              polCode: '415',
              coef: 75.47,
            },
            {
              polName: 'Смесь углеводородов предельных С6-С10',
              polCode: '416',
              coef: 18.38,
            },
            {
              polName: 'Углеводороды Непредельные (по амиленам)',
              polCode: '501',
              coef: 2.5,
            },
            { polName: 'Бензол', polCode: '602', coef: 2 },
            { polName: 'Метилбензол (толуол)', polCode: '621', coef: 1.45 },
            {
              polName: 'Диметилбензол (смесь о- м- п- изомеров)',
              polCode: '616',
              coef: 0.15,
            },
            { polName: 'Этилбензол', polCode: '620', coef: 0.05 },
          ],
        },
        {
          productName: 'whiteSpirit',
          label: 'Уайт-спирит',
          polCoefficents: [
            {
              polName: 'Смесь углеводородов предельных С1-С5 (1531*, 1539*)',
              polCode: '415',
              coef: 11.88,
            },
            {
              polName: 'Смесь углеводородов предельных С6-С10 (1532*, 1540*)',
              polCode: '416',
              coef: 81.86,
            },
            { polName: 'Бензол', polCode: '602', coef: 2.15 },
            { polName: 'Метилбензол (толуол)', polCode: '621', coef: 3.2 },
            {
              polName: 'Диметилбензол (смесь о- м- п- изомеров)',
              polCode: '616',
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
    // Click export word
    exportWord() {
      let _this = this;
      // Read and get the binary content of the template file
      // Note: The
      // template file is recommended to be placed under the static directory file.
      // When using vue-cli2, put it in the static directory. When using vue-cli3, put it in the public directory.
      // Because when I use it, I put it in the same directory of the .vue file, and I can't read the template.

      JSZipUtils.getBinaryContent("./templates/reports/pump.docx", function(
        error,
        content
      ) {
        // input.docx Is a template. When we export, we will export the corresponding data according to this template
        // Throw an exception
        if (error) {
          throw error;
        }

        // Create a JSZip instance with the content of the template
        let zip = new JSZip(content);
        // Create and load docxtemplater instance object
        let doc = new window.docxtemplater().loadZip(zip);
        // Set the value of the template variable
        doc.setData({
          ..._this.input,
          calcMethodName: _this.calcMethodName,
          specificEmissionKgh: _this.specificEmissionKgh.value,
          specificEmissionKghName: _this.specificEmissionKgh.label,
          pumpsTotalAmount: _this.pumpsTotalAmount,
          sameTimeOperatingPumpsQty: _this.sameTimeOperatingPumpsQty,
          hourWorked: _this.hourWorked,
          maxOneTimeEmissionGsec: _this.maxOneTimeEmissionGsec,
          grossEmissionTyear: _this.grossEmissionTyear,
          selectedCoefficientName: _this.selectedCoefficients.label,
          polCoefficents: _this.selectedCoefficients.polCoefficents,
          calcRez: _this.calcRez // calculation result from store
        });

        try {
          // Replace all template variables with the values of template variables
          doc.render();
        } catch (error) {
          // Throw an exception
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          console.log(JSON.stringify({ error: e }));
          throw error;
        }

        // Generate a zip file representing the docxtemplater object (not a real file, but a representation in memory)
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // Save the target file object as a file of the target type and name it
        saveAs(out, "pump.docx");
      });
    }
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
    // calculation results taken from store for exporting to docx file
    calcRez() {
      return this.$store.state.calcStore.pollutants;
    }
  },
};
</script>
