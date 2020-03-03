<template>
  <div>
    <label>БИН или ИНН:</label>
    <input type="text" class="mb-3 form-control" v-model="company.binInn" v-validate="'required|digits:12'"
      data-vv-as="БИН или ИНН" name="bin_field" placeholder="Введите БИН или ИНН" />
    <d-form-invalid-feedback>{{ errorBags.first("bin_field") }}.</d-form-invalid-feedback>
    <d-row>
      <d-col cols="12" md="6" lg="8">
        <label>Наименование компании:</label>
        <input class="mb-3 form-control" type="text" id="company_name" v-model="company.companyName"
          v-validate="'required|min:2'" data-vv-as="Наименование компании" name="Company_name"
          placeholder="Введите наименование компании без указания формы собственности" />
        <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
        <d-form-invalid-feedback>{{ errorBags.first("company_name") }}.</d-form-invalid-feedback>
      </d-col>
      <d-col cols="12" md="6" lg="4">
        <div class="form-group">
          <label>Тип юр лица:</label>
          <v-select class="mb-3" name="CompanyType" v-model="company.companyType" :options="companyTypeOption"
            :value="companyTypeOption.value" :key="companyTypeOption.value" data-vv-as="Тип юр лица" required>
          </v-select>
        </div>
        <d-form-invalid-feedback>{{ errorBags.first('CompanyType') }}</d-form-invalid-feedback>
      </d-col>
    </d-row>
    <d-row>
      <d-col cols="12" md="6" lg="6">
        <div class="form-group">
          <label for="companyEmail">Email Компании</label>
          <input name="companyEmail" class="mb-2 mr-sm-2 mb-sm-0 form-control" v-model="company.companyEmail"
            v-validate="{ required: true, email: true }" data-vv-as="Email Компании" placeholder="email@example.com" />
          <d-form-valid-feedback>Выглядит хорошо!</d-form-valid-feedback>
          <d-form-invalid-feedback>{{ errorBags.first('companyEmail') }}</d-form-invalid-feedback>
          <small class="form-text text-muted">
            Мы никогда не передадим вашу электронную почту кому-либо
            еще.
          </small>
        </div>
      </d-col>
      <d-col cols="12" md="6" lg="6">
        <label>Телефон компании:</label>
        <d-input-group prepend="+7" class="mb-3">
          <d-input placeholder="7777019988" id="phoneNumber" v-model="company.companyPhone" />
        </d-input-group>
      </d-col>
    </d-row>
    <d-row>
      <d-col cols="12" md="12" lg="12">
        <label>Описание компании:</label>
        <textarea class="form-control" v-model="company.companyDescription" placeholder="Введите описание компании"
          :rows="2" :max-rows="6"></textarea>
      </d-col>
    </d-row>
  </div>
</template>

<script>
export default {
  name: 'company-general',
  props: {
    company: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      companyTypeOption: [
        {
          id: 1,
          value: 'too',
          text: 'Товарищество с ограниченной ответственностью',
          label: 'Товарищество с ограниченной ответственностью',
        },
        {
          id: 2,
          value: 'ip',
          text: 'Индивидуальный предприниматель',
          label: 'Индивидуальный предприниматель',
        },
        {
          id: 3,
          value: 'jsc',
          text: 'Акционерное общество',
          label: 'Акционерное общество',
        },
        {
          id: 4,
          value: 'statecompany',
          text: 'Государственное предприятие',
          label: 'Государственное предприятие',
        },
        {
          id: 5,
          value: 'statecompanybusinessright',
          text: 'Государственное предприятие на праве хозяйственного ведения',
          label: 'Государственное предприятие на праве хозяйственного ведения',
        },
        {
          id: 6,
          value: 'kazennoe',
          text:
            'Государственное предприятие на праве оперативного управления (казенное)',
          label:
            'Государственное предприятие на праве оперативного управления (казенное)',
        },
        {
          id: 7,
          value: 'businesspartnerships',
          text: 'Хозяйственное товарищество',
          label: 'Хозяйственное товарищество',
        },
        {
          id: 8,
          value: 'fullpartnerships',
          text: 'Полное товарищество',
          label: 'Полное товарищество',
        },
        {
          id: 9,
          value: 'limitedpartnership',
          text: 'Коммандитное  товарищество',
          label: 'Коммандитное  товарищество',
        },
        {
          id: 10,
          value: 'additionalliabilitypartnerships',
          text: 'Товарищество с дополнительной ответственностью',
          label: 'Товарищество с дополнительной ответственностью',
        },
        {
          id: 11,
          value: 'productioncooperatives',
          text: 'Производственный кооператив',
          label: 'Производственный кооператив',
        },
        {
          id: 12,
          value: 'institution',
          text: 'Учреждение',
          label: 'Учреждение',
        },
        {
          id: 13,
          value: 'publicassociations',
          text: 'Общественное объединение',
          label: 'Общественное объединение',
        },
        {
          id: 14,
          value: 'consumercooperatives',
          text: 'Потребительский кооператив',
          label: 'Потребительский кооператив',
        },
        {
          id: 15,
          value: 'fund',
          text: 'Фонд',
          label: 'Фонд',
        },
        {
          id: 16,
          value: 'religiousassociation',
          text: 'Религиозное объединение',
          label: 'Религиозное объединение',
        },
        {
          id: 17,
          value: 'legalentitiesassociation',
          text: 'Объединение юридических лиц в форме ассоциации',
          label: 'Объединение юридических лиц в форме ассоциации',
        },
        {
          id: 18,
          value: 'agriculturalpartnership',
          text: 'Сельскохозяйственное товарищество',
          label: 'Сельскохозяйственное товарищество',
        },
        {
          id: 19,
          value: 'personalentrepreneur',
          text: 'Личный предприниматель',
          label: 'Личный предприниматель',
        },
        {
          id: 20,
          value: 'individualentrepreneurshipbasedonjointventures',
          text:
            'Индивидуальное предпринимательство на основе совместного предпринимательства',
          label:
            'Индивидуальное предпринимательство на основе совместного предпринимательства',
        },
        {
          id: 21,
          value: 'simplepartnership',
          text: 'Простое товарищество',
          label: 'Простое товарищество',
        },
      ],
    };
  },
  watch: {
    company() {
      this.$emit('input', this.company);
    },
  },
};
</script>
