// Company Pages
import CompanyList from './pages/list.vue';
import CompanyNew from './pages/new.vue';
import CompanyShow from './pages/show.vue';
import CompanyEdit from './pages/edit.vue';

const CompanyListRoute = {
  path: '/companies',
  component: CompanyList,
};

const CompanyNewRoute = {
  path: '/companies/new',
  component: CompanyNew,
};

const CompanyShowRoute = {
  path: '/companies/:id',
  component: CompanyShow,
  props: true,
};

const CompanyEditRoute = {
  path: '/companies/:id/edit',
  component: CompanyEdit,
  props: true,
};

export default [
  CompanyListRoute,
  CompanyNewRoute,
  CompanyShowRoute,
  CompanyEditRoute,
];
