/* eslint-disable */
import Vue from 'vue';

import FrappeChart from 'vue2-frappe';
import FrapChart from 'vue2-frappe';
import ShardsVue from 'shards-vue';
// import MonacoEditor from 'vue-monaco';
import svgJs from './plugin/vueSvgPlugin';
import Notifications from 'vue-notification';
import VueQriously from 'vue-qriously';
import JsonExcel from 'vue-json-excel';


import _ from 'lodash';
import wysiwyg from 'vue-wysiwyg';
import tinymce from 'vue-tinymce-editor';
import Vuelidate from 'vuelidate';



import vueNumeralFilterInstaller from 'vue-numeral-filter';
// import VueI18n from "vue-i18n";
// import lang from "./lang.js";

import DateRangePicker from 'vue-mj-daterangepicker'
import 'vue-mj-daterangepicker/dist/vue-mj-daterangepicker.css'

Vue.use(DateRangePicker)

Vue.use(wysiwyg);
Vue.use(Vuelidate);
Vue.component('tinymce', tinymce);



// import createPersistedState from 'vuex-persistedstate';
// import company from '@/modules/company/store';
import store from '@/store';

import { ClientTable } from 'vue-tables-2';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';
import '@/assets/scss/meta-table.scss';
import 'vue-select/dist/vue-select.css';
import 'vue-wysiwyg/dist/vueWysiwyg.css';

// leaflet part
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet.icon.glyph";
// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// Fontawesome
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faTrash,
  faEdit,
  faSearch,
  faDownload,
  faEye,
  faPlus,
  faPrint
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(faTrash, faEdit, faSearch, faDownload, faEye, faPlus, faPrint);

// html to pdf
import VueHtmlToPaper from 'vue-html-to-paper';

// import { Pivot } from 'vue-pivot-table-plus';
// Vue.use(Pivot);

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes',
    'landscape=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}
Vue.use(VueHtmlToPaper, options);

// vue-tables
Vue.use(ClientTable);
// Vue.use(VueI18n);
// const i18n = new VueI18n(lang);

Vue.use(svgJs);
Vue.use(Notifications);
Vue.use(VueQriously)

Vue.component('downloadExcel', JsonExcel)

Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });

// Core
import App from './App.vue';
import router from './router';
import VeeValidate, {
  Validator
} from 'vee-validate';
const config = {
  errorBagName: 'errorBags', // change if property conflicts.
  fieldsBagName: 'fieldBags',
  locale: 'ru',
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid"
  }
};

Vue.use(VeeValidate, config);

import ruLocale from 'vee-validate/dist/locale/ru';
import vSelect from 'vue-select';

Vue.use(FrappeChart, FrapChart);

import VueMask from 'v-mask'
Vue.use(VueMask);


Vue.component('v-select', vSelect);

// Vue.component('vue-monaco', MonacoEditor);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Validator.localize('ru', ruLocale);




// Layouts
import Default from '@/layouts/Default.vue';


ShardsVue.install(Vue);

Vue.component('default-layout', Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
console.log(process.env);
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
