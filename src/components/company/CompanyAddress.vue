<template>
  <d-row class="mt-2">
    <d-col sm="12" md="6">
      <d-list-group-item class="p-2 mb-2">
        <!-- Legal address -->
        <strong class="text-muted d-block mb-2">Юридический адрес</strong>
        <d-form>
          <div class="form-group">
            <label for="companyCountry">Страна</label>
            <v-select label="name" :options="countries" v-model="legalAddress.country"></v-select>
            <d-form-invalid-feedback>Пожалуйста укажите вашу страну</d-form-invalid-feedback>
          </div>
          <div class="form-group">
            <label for="company.address.legal.legalAddress">Адрес юридический</label>
            <d-input v-model="legalAddress.address" placeholder="пример: пр. Назарбаева 244, офис 4" value />
          </div>
          <d-form-row>
            <d-col md="4" class="form-group">
              <label for="feInputState">Область</label>
              <v-select :options="legalAddress.country.states" label="name" v-model="legalAddress.state"></v-select>
            </d-col>
            <d-col md="6" class="form-group">
              <label>Населенный пункт</label>
              <div>
                <v-select :options="legalAddress.state.cities" label="name" :reduce="city => city.id" v-model="legalAddress.city"></v-select>
              </div>
            </d-col>
            <d-col md="2" class="form-group">
              <label for="feInputZip">Индекс</label>
              <d-input v-model="legalAddress.zip" id="feInputZip" />
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
            <v-select :options="countries" label="name" v-model="actualAddress.country"></v-select>
            <d-form-invalid-feedback>Пожалуйста укажите вашу страну</d-form-invalid-feedback>
          </div>
          <div class="form-group">
            <label for="legalAddress">Адрес фактический</label>
            <d-input v-model="actualAddress.address" placeholder="пример: пр. Назарбаева 244, офис 4" />
          </div>
          <d-form-row>
            <d-col md="4" class="form-group">
              <label for="feInputState">Область</label>
              <v-select :options="actualAddress.country.states" label="name" v-model="actualAddress.state"></v-select>
            </d-col>
            <d-col md="6" class="form-group">
              <label>Населенный пункт</label>
              <div>
                <v-select :options="actualAddress.state.cities" label="name" :reduce="city => city.id" v-model="actualAddress.city"></v-select>
              </div>
            </d-col>
            <d-col md="2" class="form-group">
              <label for="feInputZip">Индекс</label>
              <d-input v-model="actualAddress.zip" id="feInputZip" />
            </d-col>
          </d-form-row>
          <label>Комментарии:</label>
          <textarea class="form-control" v-model="actualAddress.addressComments"
            placeholder="Комментарии к адресу который позволит быстрее обнаружить офис компании" :rows="2"
            :max-rows="6"></textarea>
        </d-form>
      </d-list-group-item>
    </d-col>
  </d-row>
</template>

<script>
import COUNTRIES from '../../graphql/queries/CountriesList'

export default {
  name: 'company-address',
  apollo: {
    countries: {
      query:  COUNTRIES
    }
  },
  // props: {
  //   companyAddress: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  data() {
    return {
      legalAddress: {
        country: {},
        state: {},
        city: '',
        address: '',
        zip: '',
        addressComments: ''
      },
      actualAddress: {
        country: '',
        state: '',
        city: '',
        address: '',
        zip: '',
        addressComments: ''
      },
    };
  },
};
</script>
