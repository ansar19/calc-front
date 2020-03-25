<template>
  <div id="app">
    <div class="container mt-4">
      <h5>
        Расчет выбросов ЗВ в атмосферу выполнен согласно "Методике расчета выбросов загрязняющих веществ в атмосферу от
        предприятий по производству строительных материалов", Приложение № 11 к Приказу Министра ООС РК от 18.04.2008 года
        № 100-п
      </h5>

      <form class="mb-3">
        <div class="form-group">
          <label for="specificNOx">
            Удельное выделение i-того загрязняющего вещества при взрыве 1 тонны j-того взрывчатого
            вещества - NOx
          </label>
          <select id="specificNOx" v-model.number="specificNOx" class="custom-select">
            <option value="0.0011">Эмульсионные взрывчатые вещества - Взорванная горная порода</option>
          </select>
        </div>

        <div class="form-group">
          <label for="dustPart">Удельное пылевыделение на 1м3 взорванной горной породы</label>
          <select id="dustPart" v-model.number="dustPart" class="custom-select">
            <option value="0.09">Эмульсионные взрывчатые вещества - Взорванная горная порода</option>
          </select>
        </div>

        <div class="form-group">
          <label for="specificNOx">
            Удельное выделение i-того загрязняющего вещества при взрыве 1 тонны j-того взрывчатого
            вещества - CO
          </label>
          <select id="specificCO" v-model.number="specificCO" class="custom-select">
            <option value="0.004">Эмульсионные взрывчатые вещества - Взорванная горная порода</option>
          </select>
        </div>

        <div class="form-group">
          <label for="blastedmaterial">Количество взорванного j-того взрывчатого вещества, т/год</label>
          <input
            id="blastedmaterial"
            v-model.number="blastedmaterial"
            type="text"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="gasSupression">Эффективность применяемых при взрыве средств газоподавления</label>
          <select id="gasSupression" v-model="gasSupression" class="custom-select">
            <option value="0.35">Гидрозабойка скважин 0.35</option>
            <option value="0.36">Гидрозабойка скважин 0.36</option>
            <option value="0.37">Гидрозабойка скважин 0.37</option>
            <option value="0.38">Гидрозабойка скважин 0.38</option>
            <option value="0.39">Гидрозабойка скважин 0.39</option>
            <option value="0.40">Гидрозабойка скважин 0.40</option>
            <option value="0.41">Гидрозабойка скважин 0.41</option>
            <option value="0.42">Гидрозабойка скважин 0.42</option>
            <option value="0.43">Гидрозабойка скважин 0.43</option>
            <option value="0.44">Гидрозабойка скважин 0.44</option>
            <option value="0.45">Гидрозабойка скважин 0.46</option>
            <option value="0.47">Гидрозабойка скважин 0.48</option>
            <option value="0.49">Гидрозабойка скважин 0.49</option>
            <option value="0.50">Гидрозабойка скважин 0.50</option>
          </select>
          <span id="gasSuppressionHelpBlock" class="form-text text-muted">
            *При применении гидрозабойки эффективность
            подавление оксидов азота составляет =0.35-0.5
          </span>
        </div>

        <div class="form-group">
          <label
            for="noPart"
          >Удельное выделение i-того загрязняющего вещества из взорванной горной породы - NOx</label>
          <select id="noPart" v-model.number="noPart" class="custom-select">
            <option value="0.0006">0.0006</option>
          </select>
        </div>

        <div class="form-group">
          <label
            for="coPart"
          >Удельное выделение i-того загрязняющего вещества из взорванной горной породы - CO</label>
          <div>
            <select id="coPart" v-model.number="coPart" class="custom-select">
              <option value="0.002">Эмульсионные взрывчатые вещества - Взорванная горная порода</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="blastedRock">Объем взорванной горной породы, м3/год</label>
          <input id="blastedRock" v-model.number="blastedRock" type="text" class="form-control" />
        </div>

        <div class="form-group">
          <label for="dustSupression">Эффективность применяемых при взрыве средств пылеподавления</label>
          <select id="dustSupression" v-model="dustSupression" class="custom-select">
            <option value="0.55">Гидрозабойка скважин 0.55</option>
            <option value="0.56">Гидрозабойка скважин 0.56</option>
            <option value="0.57">Гидрозабойка скважин 0.57</option>
            <option value="0.58">Гидрозабойка скважин 0.58</option>
            <option value="0.59">Гидрозабойка скважин 0.59</option>
            <option value="0.6">Гидрозабойка скважин 0.6</option>
          </select>
        </div>

        <div class="form-group">
          <label
            for="sigleBlastQty"
          >Количество взорванного взрывчатого вещества за один массовый взрыв, т/взрыв</label>
          <input
            id="sigleBlastQty"
            v-model.number="singleBlastQty"
            type="text"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label
            for="sigleBlastRock"
          >Максимальный объем взорванной горной породы за один массовый взрыв, м3/взрыв</label>
          <input
            id="sigleBlastRock"
            v-model.number="sigleBlastRock"
            type="text"
            class="form-control"
          />
        </div>

        <div @click.prevent="calculate" class="control">
          <button class="btn btn-primary">Расчитать</button>
        </div>
      </form>

      <div class="table-responsive" v-if="seen">
        <table class="table table-sm table-stripped table-bordered table-hover">
          <tr>
            <th>Код ЗВ</th>
            <th>Наименование ЗВ</th>
            <th>Выбросы, г/сек</th>
            <th>Выбросы, т/год</th>
          </tr>
          <tr>
            <td>0301</td>
            <td>Азота диоксид (Азот (IV) оксид)</td>
            <td>{{ g0301 }}</td>
            <td>{{ m0301 }}</td>
          </tr>
          <tr>
            <td>0304</td>
            <td>Азот (II) оксид (Азота оксид)</td>
            <td>{{ g0304 }}</td>
            <td>{{ m0304 }}</td>
          </tr>
          <tr>
            <td>0337</td>
            <td>Углерод оксид</td>
            <td>{{ g0337 }}</td>
            <td>{{ m0337 }}</td>
          </tr>
          <tr>
            <td>2909</td>
            <td>Пыль неорганическая: до 20% SiO2</td>
            <td>{{ g2909 }}</td>
            <td>{{ m2909 }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>{{ gsecTotal }}</td>
            <td>{{ tyearTotal }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
/* eslint-disable */
export default {
  data() {
    return {
      seen: false,
      specificNOx: '0.0011', // Удельное выделение i-того загрязняющего вещества при взрыве 1 тонны j-того взрывчатого вещества - NOX
      specificCO: '0.004', // Удельное выделение i-того загрязняющего вещества при взрыве 1 тонны j-того взрывчатого вещества - CO
      blastedmaterial: '9288.00', // Количество взорванного j-того взрывчатого вещества, т/год
      gasSupression: '0.50', // Эффективность применяемых при взрыве средств газоподавления
      noPart: '0.0006', // Удельное выделение i-того загрязняющего вещества из взорванной горной породы -NO
      coPart: '0.002', // Удельное выделение i-того загрязняющего вещества из взорванной горной породы - CO
      dustPart: '0.09', // Удельное пылевыделение на 1м3 взорванной горной породы
      blastedRock: '16937938', // Объем взорванной горной породы, м3/год
      dustSupression: '0.6', // Эффективность применяемых при взрыве средств пылеподавления
      singleBlastQty: '37.15', // Количество взорванного взрывчатого вещества за один массовый взрыв, т/взрыв
      sigleBlastRock: '67751.75', // Максимальный объем взорванной горной породы за один массовый взрыв, м3/взрыв
      outputTable: [],
      calc: {},
    };
  },
  computed: {
    g0301() {
      return (this.g0301 =
        ((this.specificNOx *
          this.singleBlastQty *
          (1 - this.gasSupression) *
          1000000) /
          1200) *
        0.8).toFixed(7);
    },
    m0301() {
      return (this.m0301 = (
        (this.specificNOx * this.blastedmaterial * (1 - this.gasSupression) +
          this.noPart * this.blastedmaterial) *
        0.8
      ).toFixed(7));
    },
    g0304() {
      return (this.g0304 =
        ((this.specificNOx *
          this.singleBlastQty *
          (1 - this.gasSupression) *
          1000000) /
          1200) *
        0.13).toFixed(7);
    },
    m0304() {
      return (this.m0304 =
        (this.specificNOx * this.blastedmaterial * (1 - this.gasSupression) +
          this.noPart * this.blastedmaterial) *
        0.13).toFixed(7);
    },
    g0337() {
      return (this.g0337 =
        (this.specificCO *
          this.singleBlastQty *
          (1 - this.gasSupression) *
          1000000) /
        1200).toFixed(7);
    },
    m0337() {
      return (this.m0337 =
        this.specificCO * this.blastedmaterial * (1 - this.gasSupression) +
        this.coPart * this.blastedmaterial).toFixed(7);
    },
    g2909() {
      return (this.g2909 =
        (0.16 *
          this.dustPart *
          this.sigleBlastRock *
          (1 - this.dustSupression) *
          1000) /
        1200).toFixed(7);
    },
    m2909() {
      return (this.m2909 =
        (0.16 * this.dustPart * this.blastedRock * (1 - this.dustSupression)) /
        1000).toFixed(7);
    },
    ...mapState('calcStore', ['gsecTotal', 'tyearTotal'])
  },
  methods: {
    ...mapMutations('calcStore', ['setGsecTotal', 'setTyearTotal', 'setPollutants']),
    calculate() {
      this.seen = true;
      this.setGsecTotal(this.gsecSubTotal());
      this.setTyearTotal(this.tyearSubTotal());
      this.setPollutants([
        {
            "code": "0301",
            "name": "Азота диоксид",
            "gseccoef": this.g0301,
            "tyearcoef": this.m0301
          },
          {
            "code": "0304",
            "name": "Азота оксид",
            "gseccoef": this.g0304,
            "tyearcoef": this.m0304
          },
          {
            "code": "0337",
            "name": "Углерода оксид",
            "gseccoef": this.g0337,
            "tyearcoef": this.m0337
          },
          {
            "code": "2909",
            "name": "Пыль неорганическая: до 20% SiO2",
            "gseccoef": this.g2909,
            "tyearcoef": this.m2909
          }
      ]);
    },
    gsecSubTotal() {
      return (
        Number(this.g0301) +
        Number(this.g0304) +
        Number(this.g0337) +
        Number(this.g2909)
      );
    },
    tyearSubTotal() {
      return (
        Number(this.m0301) +
        Number(this.m0304) +
        Number(this.m0337) +
        Number(this.m2909)
      ).toFixed(7);
    },
    // calculate() {
    //   this.seen = true;
    //   this.calc.g0301 = (
    //     ((this.specificNOx *
    //       this.singleBlastQty *
    //       (1 - this.gasSupression) *
    //       1000000) /
    //       1200) *
    //     0.8
    //   ).toFixed(7);
    //   this.calc.m0301 = (
    //     (((this.specificNOx * this.blastedmaterial) * (1 - this.gasSupression)) +
    //       (this.noPart * this.blastedmaterial)) *
    //     0.8
    //   ).toFixed(7);
    //   this.calc.g0304 = (
    //     ((this.specificNOx *
    //       this.singleBlastQty *
    //       (1 - this.gasSupression) *
    //       1000000) /
    //       1200) *
    //     0.13
    //   ).toFixed(7);
    //   this.calc.m0304 = (
    //     (((this.specificNOx * this.blastedmaterial) * (1 - this.gasSupression)) +
    //       (this.noPart * this.blastedmaterial)) *
    //     0.13
    //   ).toFixed(7);
    //   this.calc.g0337 = (
    //     (this.specificCO *
    //       this.singleBlastQty *
    //       (1 - this.gasSupression) *
    //       1000000) /
    //     1200
    //   ).toFixed(7);
    //   this.calc.m0337 = (
    //     ((this.specificCO * this.blastedmaterial) * (1 - this.gasSupression)) +
    //     (this.coPart * this.blastedmaterial)).toFixed(7);
    //   this.calc.g2909 = (
    //     (0.16 *
    //       this.dustPart *
    //       this.sigleBlastRock *
    //       (1 - this.dustSupression) *
    //       1000) /
    //     1200
    //   ).toFixed(7);
    //   this.calc.m2909 = (((((0.16 * this.dustPart) * this.blastedRock) * (1 - this.dustSupression))) /
    //     1000).toFixed(7);
    // },
  },
};
</script>
