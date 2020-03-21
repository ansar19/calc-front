<template>
  <d-row class="mt-2">
    <d-col sm="12" md="6">
      <d-list-group-item class="p-2 mb-2">
        <!-- Legal address -->
        <strong class="text-muted d-block mb-2">Юридический адрес</strong>
        <d-form>
          <div class="form-group">
            <label for="companyCountry">Страна</label>
            <v-select label="name" :options="countryOptions" v-model="companyAddress.legal.country"></v-select>
            <d-form-invalid-feedback>Пожалуйста укажите вашу страну</d-form-invalid-feedback>
          </div>
          <div class="form-group">
            <label for="company.address.legal.legalAddress">Адрес юридический</label>
            <d-input v-model="companyAddress.legal.address" placeholder="пример: пр. Назарбаева 244, офис 4" value />
          </div>
          <d-form-row>
            <d-col md="4" class="form-group">
              <label for="feInputState">Область</label>
              <v-select :options="locations" label="name" v-model="companyAddress.legal.oblast"></v-select>
            </d-col>
            <d-col md="6" class="form-group">
              <label>Населенный пункт</label>
              <div v-if="availableCitiesLegal">
                <v-select :options="availableCitiesLegal" v-model="companyAddress.legal.settlement"></v-select>
              </div>
            </d-col>
            <d-col md="2" class="form-group">
              <label for="feInputZip">Индекс</label>
              <d-input v-model="companyAddress.legal.zip" id="feInputZip" />
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
            <v-select :options="countryOptions" label="name" v-model="companyAddress.actual.country"></v-select>
            <d-form-invalid-feedback>Пожалуйста укажите вашу страну</d-form-invalid-feedback>
          </div>
          <div class="form-group">
            <label for="legalAddress">Адрес фактический</label>
            <d-input v-model="companyAddress.actual.address" placeholder="пример: пр. Назарбаева 244, офис 4" />
          </div>
          <d-form-row>
            <d-col md="4" class="form-group">
              <label for="feInputState">Область</label>
              <v-select :options="locations" label="name" v-model="companyAddress.actual.oblast"></v-select>
            </d-col>
            <d-col md="6" class="form-group">
              <label>Населенный пункт</label>
              <div v-if="availableCitiesActual">
                <v-select :options="availableCitiesActual" v-model="companyAddress.actual.settlement"></v-select>
              </div>
            </d-col>
            <d-col md="2" class="form-group">
              <label for="feInputZip">Индекс</label>
              <d-input v-model="companyAddress.actual.zip" id="feInputZip" />
            </d-col>
          </d-form-row>
          <label>Комментарии:</label>
          <textarea class="form-control" v-model="companyAddress.actual.addressComments"
            placeholder="Комментарии к адресу который позволит быстрее обнаружить офис компании" :rows="2"
            :max-rows="6"></textarea>
        </d-form>
      </d-list-group-item>
    </d-col>
  </d-row>
</template>

<script>
export default {
  name: 'company-address',
  props: {
    companyAddress: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      countryOptions: ['Казахстан'],
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
          cities: ['Кентау', 'Сарыагаш', 'Арыс', 'Шардара', 'Жетысай', 'Ленгер'],
        },
      ],
    };
  },
  computed: {
    availableCitiesLegal() {
      return this.companyAddress.legal.oblast
        ? this.companyAddress.legal.oblast.cities
        : false;
    },
    availableCitiesActual() {
      return this.companyAddress.actual.oblast
        ? this.companyAddress.actual.oblast.cities
        : false;
    },
  },
};
</script>
