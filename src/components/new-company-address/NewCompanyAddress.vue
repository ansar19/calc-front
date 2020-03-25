<template>
  <d-card class="card-small mb-3">
    <d-card-body>
      <d-form class="new-company-address" @submit="addCompanyAddresses" validate>
        <div class="form-group">
          <d-form-checkbox
            class="mt-3"
            v-model="sameAddres"
            value="sameaddress"
            uncheckedcountry-value="not_sameaddress"
          >
            Фактический
            адрес совпадает с юридическим
          </d-form-checkbox>
        </div>
        <d-row>
          <d-col sm="12" md="6">
            <d-list-group-item class="p-2 mb-2">
              <!-- Legal address -->
              <strong class="text-muted d-block mb-2">Юридический адрес</strong>
              <d-form>
                <div class="form-group">
                  <label for="companyCountry">Страна</label>
                  <v-select :options="legal.countryOptions" label="name" v-model="legal.country"></v-select>
                  <d-form-invalid-feedback>Пожалуйста укажите вашу страну</d-form-invalid-feedback>
                </div>
                <div class="form-group">
                  <label for="legalAddress">Адрес юридический</label>
                  <d-input v-model="legal.address" placeholder="пример: пр. Назарбаева 244, офис 4" value/>
                </div>
                <d-form-row>
                  <d-col md="4" class="form-group">
                    <label for="feInputState">Область</label>
                    <v-select :options="legal.locations" label="name" v-model="legal.oblast"></v-select>
                  </d-col>
                  <d-col md="6" class="form-group">
                    <label>Населенный пункт</label>
                    <div v-if="availableCitiesLegal">
                      <v-select :options="availableCitiesLegal" v-model="legal.settlement"></v-select>
                    </div>
                  </d-col>
                  <d-col md="2" class="form-group">
                    <label for="feInputZip">Индекс</label>
                    <d-input v-model="legal.zip" id="feInputZip"/>
                  </d-col>
                </d-form-row>
              </d-form>
            </d-list-group-item>
          </d-col>
          <!-- Actual address -->
          <d-col sm="12" md="6">
            <d-list-group-item class="p-2">
              <strong class="text-muted d-block mb-2">Фактический адрес</strong>
              <d-form>
                <div class="form-group">
                  <label for="companyCountry">Страна</label>
                  <v-select :options="actual.countryOptions" label="name" v-model="actual.country"></v-select>
                  <d-form-invalid-feedback>Пожалуйста укажите вашу страну</d-form-invalid-feedback>
                </div>
                <div class="form-group">
                  <label for="legalAddress">Адрес фактический</label>
                  <d-input
                    v-model="actual.address"
                    placeholder="пример: пр. Назарбаева 244, офис 4"
                  />
                </div>
                <d-form-row>
                  <d-col md="4" class="form-group">
                    <label for="feInputState">Область</label>
                    <v-select :options="actual.locations" label="name" v-model="actual.oblast"></v-select>
                  </d-col>
                  <d-col md="6" class="form-group">
                    <label>Населенный пункт</label>
                    <div v-if="availableCitiesActual">
                      <v-select :options="availableCitiesActual" v-model="actual.settlement"></v-select>
                    </div>
                  </d-col>
                  <d-col md="2" class="form-group">
                    <label for="feInputZip">Индекс</label>
                    <d-input v-model="actual.zip" id="feInputZip"/>
                  </d-col>
                </d-form-row>
                <label>Комментарии:</label>
                <textarea class="form-control"
                  v-model="actual.addressComments"
                  placeholder="Комментарии к адресу который позволит быстрее обнаружить офис компании"
                  :rows="2"
                  :max-rows="6"
                ></textarea>
              </d-form>
            </d-list-group-item>
          </d-col>
        </d-row>
      </d-form>
    </d-card-body>
    <d-card-footer>
      <div class="d-flex">
        <d-link href="#cancel">Отменить</d-link>
        <d-button class="btn-success ml-auto" @click.prevent="addCompanyAddresses" type="submit">Сохранить</d-button>
      </div>
    </d-card-footer>
  </d-card>
</template>

<script>
// import vSelect from 'vue-select';
import axios from 'axios';

const baseURL = 'https://ecoapikz.herokuapp.com/companyaddresses';

export default {
  name: 'company-address',
  data() {
    return {
      companyaddresses: [],
      loading: true,
      sameAddres: 'sameaddress',
      legal: {
        country: 'Казахстан',
        countryOptions: ['Казахстан'],
        oblast: '',
        settlement: null,
        locations: [
          {
            name: 'г. Алматы',
            cities: ['Алматы'],
          },
          {
            name: 'г. Нур-Султан',
            cities: ['Нур-Султан'],
          },
          {
            name: 'г. Шымкент',
            cities: ['Шымкент'],
          },
          {
            name: 'Акмолинская',
            cities: [
              'Кокшетау',
              'Степногорск',
              'Щучинск',
              'Атбасар',
              'Макинск',
              'Акколь',
              'Есиль',
              'Ерейментау',
              'Державинск',
              'Степняк',
            ],
          },
          {
            name: 'Актюбинская',
            cities: [
              'Актобе',
              'Кандагач',
              'Шалкар',
              'Хромтау',
              'Алга',
              'Эмба',
              'Темир',
              'Жем',
            ],
          },
          {
            name: 'Алматинская',
            cities: [
              'Каскелен',
              'Талгар',
              'Капшагай',
              'Жаркент',
              'Есик',
              'Текели',
              'Уштобе',
              'Ушарал',
              'Сарканд',
            ],
          },
          {
            name: 'Атырауская',
            cities: ['Атырау', 'Кульсары '],
          },
          {
            name: 'Восточно-Казахстанская',
            cities: [
              'Усть-Каменогорск',
              'Риддер',
              'Аягоз',
              'Зыряновск',
              'Шемонаиха',
              'Зайсан',
              'Курчатов',
              'Серебрянск',
              'Чарск',
            ],
          },
          {
            name: 'Жамбылская',
            cities: ['Тараз', 'Шу', 'Каратау', 'Жанатас'],
          },
          {
            name: 'Западно-Казахстанская',
            cities: ['Уральск', 'Аксай'],
          },
          {
            name: 'Карагандинская',
            cities: [
              'Караганда',
              'Жезказган',
              'Балхаш',
              'Сатпаев',
              'Сарань',
              'Шахтинск',
              'Абай',
              'Приозёрск',
              'Каражал',
              'Каркаралинск',
            ],
          },
          {
            name: 'Костанайская',
            cities: ['Костанай', 'Лисаковск', 'Житикара', 'Аркалык'],
          },
          {
            name: 'Кызылординская',
            cities: ['Кызылорда', 'Байконур', 'Аральск', 'Казалинск'],
          },
          {
            name: 'Мангистауская',
            cities: ['Актау', 'Жанаозен', 'Форт-Шевченко'],
          },
          {
            name: 'Павлодарская',
            cities: ['Павлодар', 'Аксу'],
          },
          {
            name: 'Северо-Казахстанская',
            cities: [
              'Петропавловск',
              'Тайынша',
              'Булаево',
              'Сергеевка',
              'Мамлютка',
            ],
          },
          {
            name: 'Туркестанская',
            cities: [
              'Кентау',
              'Сарыагаш',
              'Арыс',
              'Шардара',
              'Жетысай',
              'Ленгер',
            ],
          },
        ],
        address: '',
        zip: '',
      },
      actual: {
        country: 'Казахстан',
        countryOptions: ['Казахстан'],
        oblast: '',
        settlement: null,
        locations: [
          {
            name: 'г. Алматы',
            cities: ['Алматы'],
          },
          {
            name: 'г. Нур-Султан',
            cities: ['Нур-Султан'],
          },
          {
            name: 'г. Шымкент',
            cities: ['Шымкент'],
          },
          {
            name: 'Акмолинская',
            cities: [
              'Кокшетау',
              'Степногорск',
              'Щучинск',
              'Атбасар',
              'Макинск',
              'Акколь',
              'Есиль',
              'Ерейментау',
              'Державинск',
              'Степняк',
            ],
          },
          {
            name: 'Актюбинская',
            cities: [
              'Актобе',
              'Кандагач',
              'Шалкар',
              'Хромтау',
              'Алга',
              'Эмба',
              'Темир',
              'Жем',
            ],
          },
          {
            name: 'Алматинская',
            cities: [
              'Каскелен',
              'Талгар',
              'Капшагай',
              'Жаркент',
              'Есик',
              'Текели',
              'Уштобе',
              'Ушарал',
              'Сарканд',
            ],
          },
          {
            name: 'Атырауская',
            cities: ['Атырау', 'Кульсары '],
          },
          {
            name: 'Восточно-Казахстанская',
            cities: [
              'Усть-Каменогорск',
              'Риддер',
              'Аягоз',
              'Зыряновск',
              'Шемонаиха',
              'Зайсан',
              'Курчатов',
              'Серебрянск',
              'Чарск',
            ],
          },
          {
            name: 'Жамбылская',
            cities: ['Тараз', 'Шу', 'Каратау', 'Жанатас'],
          },
          {
            name: 'Западно-Казахстанская',
            cities: ['Уральск', 'Аксай'],
          },
          {
            name: 'Карагандинская',
            cities: [
              'Караганда',
              'Жезказган',
              'Балхаш',
              'Сатпаев',
              'Сарань',
              'Шахтинск',
              'Абай',
              'Приозёрск',
              'Каражал',
              'Каркаралинск',
            ],
          },
          {
            name: 'Костанайская',
            cities: ['Костанай', 'Лисаковск', 'Житикара', 'Аркалык'],
          },
          {
            name: 'Кызылординская',
            cities: ['Кызылорда', 'Байконур', 'Аральск', 'Казалинск'],
          },
          {
            name: 'Мангистауская',
            cities: ['Актау', 'Жанаозен', 'Форт-Шевченко'],
          },
          {
            name: 'Павлодарская',
            cities: ['Павлодар', 'Аксу'],
          },
          {
            name: 'Северо-Казахстанская',
            cities: [
              'Петропавловск',
              'Тайынша',
              'Булаево',
              'Сергеевка',
              'Мамлютка',
            ],
          },
          {
            name: 'Туркестанская',
            cities: [
              'Кентау',
              'Сарыагаш',
              'Арыс',
              'Шардара',
              'Жетысай',
              'Ленгер',
            ],
          },
        ],
        address: '',
        zip: '',
        addressComments: '',
      },
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);
      this.companyaddresses = res.data;
      this.loading = false;
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    availableCitiesLegal() {
      return this.legal.oblast ? this.legal.oblast.cities : false;
    },
    availableCitiesActual() {
      return this.actual.oblast ? this.actual.oblast.cities : false;
    },
  },
  methods: {
    async addCompanyAddresses() {
      const res = await axios.post(baseURL, {
        'legal.country': this.legal.country,
        'legal.oblast': this.legal.oblast,
        'legal.settlement': this.legal.settlement,
        'legal.address': this.legal.address,
        'legal.zip': this.legal.zip,
        'actual.country': this.actual.country,
        'actual.oblast': this.actual.oblast,
        'actual.settlement': this.actual.settlement,
        'actual.address': this.actual.address,
        'actual.zip': this.actual.zip,
        'actual.addressComments': this.actual.addressComments,
      });

      this.companyaddresses = [...this.companyaddresses, res.data];

      this.legal.country = '';
      this.legal.oblast = '';
      this.legal.settlement = '';
      this.legal.address = '';
      this.legal.zip = '';
      this.actual.country = '';
      this.actual.oblast = '';
      this.actual.settlement = '';
      this.actual.address = '';
      this.actual.zip = '';
      this.addressComments = '';
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {},
};
</script>

<style>
/*prevent bootstrap-vue css conflict with v-select*/
.v-select.dropdown .dropdown-toggle::after {
  content: inherit;
}

.v-select.dropdown .form-control {
  height: inherit;
}
</style>
