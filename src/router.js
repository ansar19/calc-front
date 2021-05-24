/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';


import HeaderNavigation from './views/HeaderNavigation.vue';

// auth
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import SignOut from './views/SignOut.vue';
import ForgotPassword from './views/ForgotPassword.vue';
import authRepository from '@/repositories/authRepository';

// dashboard
import MainDashboard from './views/MainDashboard.vue';

// company
import ListCompanies from './views/ListCompanies.vue';
import NewCompany from './components/company/NewCompany.vue';
import ShowCompany from './components/company/ShowCompany.vue';
import EditCompany from './components/company/EditCompany.vue';
// import Company from './views/Company.vue';
import NewCompanyHead from './views/NewCompanyHead.vue';
import NewCompanyAddress from './views/NewCompanyAddress.vue';
import CompanyBankDetails from './components/company/CompanyBankDetails.vue';

// emission source
import Coordinates from './views/Coordinates.vue';
import NewFilter from './views/NewFilter.vue';

// release source
import ReleaseSourceList from './views/ReleaseSourceList.vue';
import ReleaseSourceShow from './views/ReleaseSourceShow.vue';
import ReleaseSourceEdit from './views/ReleaseSourceEdit.vue';
import ReleaseSourceAdd from './views/ReleaseSourceAdd.vue'

// calculation
import CalcAdd from './views/CalcAdd.vue'
import CalculationsList from './views/CalculationsList.vue';
import NewLimitCalc from './views/NewLimitCalc.vue';
import NewDraftCalc from './views/NewDraftCalc.vue';

import CalcExample from './views/CalcExample.vue';
import GhgCalcExample from './views/GhgCalcExample.vue';
import GhgCalcList from './views/GhgCalcList.vue'

// employee
import UsersList from './views/UsersList.vue';
import UserAdd from './views/UserAdd.vue';
import UserEdit from './views/UserEdit.vue';
import UserShow from './components/user/UserShow.vue';
import ImportUsersCsv from './components/user/ImportUsersCsv.vue';
import UserProfileLite from './views/UserProfileLite.vue';

// task
import ListTasks from './views/ListTasks.vue';
import Task from './views/Task.vue';
import ShowTask from './components/tasks/ShowTask.vue';

// limit
import ListLimit from './views/ListLimit.vue';
import NewLimit from './views/NewLimit.vue';

// report - general
import ListEmissions from './views/ListEmissions.vue';
import ListEmissionsPollutants from './views/ListEmissionsPollutants.vue';
import PollutantReleaseRegister from './views/PollutantReleaseRegister.vue';

// report - payments
import EmissionPayments from './views/EmissionPayments.vue';

// report - tax
import ListTax from './views/ListTax.vue';
import NewTaxDeclaration from './views/NewTaxDeclaration.vue';

// report - stat
import ListStatistical from './views/ListStatistical.vue';
import NewStatReport from './views/NewStatReport.vue';

// report - map
import MapKz from './views/MapKz.vue';

// report - pivot
import PivotReport from './views/PivotReport.vue';

// report - graphical

// util
import XlsCsvparser from './views/XlsCsvparser.vue';
import ImportCsv from './views/ImportCsv.vue';

// static
import Offer from './views/Offer.vue';
import Errors from './views/Errors.vue';
import ServicePlan from './views/ServicePlan.vue';

// calc builder
// import JsonEditor from './views/JsonEditor.vue';
import NewCalcMethod from './views/NewCalcMethod.vue';
import NewTree from './views/NewTree.vue';

import NewPollutantGroup from './views/NewPollutantGroup.vue';


// import UserShow from './components/user/Show.vue';

// import ComponentsOverview from './views/ComponentsOverview.vue';
// import EditEmissionSource from './components/emission-source/Edit.vue'


// import CompaniesRepository from '@/repositories/companiesRepository';


// Module routes
// import MainRoutes from '@/modules/main/router'
// import UserRoutes from '@/modules/user/router'
// import CompanyRoutes from './modules/company/routes';


// https://sweetcode.io/vue-performance-optimization/
// before
// import Home from './views/Home.vue'
// import About from './views/About.vue'
// after
// const Home = () => import(/* webpackChunkName: "home" */ './views/Home.vue')
// const About = () => import(/* webpackChunkName: "about" */ './views/About.vue')

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    // ...MainRoutes,
    // ...UserRoutes,
    // ...CompanyRoutes,
    {
      path: '/',
      redirect: '/dashboard',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        layout: 'full-screen',
        guest: true
      }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign-out',
      name: 'sign-out',
      component: SignOut,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: {
        guest: true
      }
    },
    {
      path: '/dashboard',
      name: 'main-overview',
      component: MainDashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user-profile-lite',
      name: 'user-profile-lite',
      component: UserProfileLite,
      meta: {
        requiresAuth: true
      }
    },
    // release source
    {
      path: '/release-source-list',
      name: 'release-source-list',
      component: ReleaseSourceList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/release-source/:id', // show particular emission source
      name: 'release-source-show',
      component: ReleaseSourceShow,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/release-source-edit/:id',
      name: 'release-source-edit',
      component: ReleaseSourceEdit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/release-source-add',
      name: 'release-source-add',
      component: ReleaseSourceAdd,
      meta: {
        requiresAuth: true
      }
    },
    // emission source
    {
      path: '/emission-source-coordinates',
      name: 'emission-source-coordinates',
      component: Coordinates,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/new-company-address',
      name: 'new-company-address',
      component: NewCompanyAddress,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-company-head',
      name: 'new-company-head',
      component: NewCompanyHead,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-company',
      component: NewCompany,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/companies',
      name: 'companies',
      component: ListCompanies,
      meta: {
        requiresAuth: true
      },
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        // {
        //   path: '/new-company',
        //   component: newCompany
        // },
        // {
        //   path: '/company',
        //   name: 'company',
        //   component: Company,
        // },
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        // {
        //   path: '/show-company/:id',
        //   name: 'show-company',
        //   component: ShowCompany
        // },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        // { path: '/edit-company/:id', component: Edit }
      ]
    },
    {
      path: '/show-company/:id', // show particular company
      name: 'show-company',
      component: ShowCompany,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-company/:id', // show particular company
      name: 'edit-company',
      component: EditCompany,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/company',
    //   name: 'company',
    //   component: Company,
    // },
    // { path: '/company/:id',
    //   component: Company,
    //   children: [
    //     // UserHome will be rendered inside User's <router-view>
    //     // when /user/:id is matched
    //     { path: 'edit', component: Edit },

    //     // UserProfile will be rendered inside User's <router-view>
    //     // when /user/:id/profile is matched
    //     { path: 'show', component: Show },

    //     // UserPosts will be rendered inside User's <router-view>
    //     // when /user/:id/posts is matched
    //     { path: 'edit', component: Edit }
    //   ]
    // },
    {
      path: '/calculations',
      name: 'calculations',
      component: CalculationsList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calc-add',
      name: 'calc-add',
      component: CalcAdd,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list-emissions',
      name: 'list-emissions',
      component: ListEmissions,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list-emissions-pollutants',
      name: 'list-emissions-pollutants',
      component: ListEmissionsPollutants,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/pollutant-release-register',
      name: 'pollutant-release-register',
      component: PollutantReleaseRegister,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list-tax',
      name: 'list-tax',
      component: ListTax,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-tax-declaration',
      name: 'new-tax-declaration',
      component: NewTaxDeclaration,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list-statistical',
      name: 'list-statistical',
      component: ListStatistical,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-stat-report',
      name: 'new-stat-report',
      component: NewStatReport,
    },
    {
      path: '/new-limit',
      name: 'new-limit',
      component: NewLimit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list-limit',
      name: 'list-limit',
      component: ListLimit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/pivot-report',
      name: 'pivot-report',
      component: PivotReport,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/emission-payments',
      name: 'emission-payments',
      component: EmissionPayments,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-limit-calc',
      name: 'new-limit-calc',
      component: NewLimitCalc,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-draft-calc',
      name: 'new-draft-calc',
      component: NewDraftCalc,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calc-example',
      name: 'calc-example',
      component: CalcExample,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ghg-calc-example',
      name: 'ghg-calc-example',
      component: GhgCalcExample,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ghg-calc-list',
      name: 'ghg-calc-list',
      component: GhgCalcList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/task',
      name: 'task',
      component: Task,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tasks/:id',
      name: 'tasks',
      component: ShowTask,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/list-tasks',
      name: 'list-tasks',
      component: ListTasks,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/bank-detail',
      name: 'bank-detail',
      component: CompanyBankDetails,
      meta: {
        requiresAuth: true
      }
    },

    // Users

    {
      path: '/users',
      name: 'users-list',
      component: UsersList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/add',
      name: 'user-add',
      component: UserAdd,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/:id/edit',
      name: 'user-edit',
      component: UserEdit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users/:id',
      name: 'user-show',
      component: UserShow,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users-import',
      name: 'users-import',
      component: ImportUsersCsv,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/new-filter',
      name: 'new-filter',
      component: NewFilter,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '/header-navigation',
      name: 'header-navigation',
      component: HeaderNavigation,
      meta: {
        layout: 'header-navigation',
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/errors',
    },
    {
      path: '/new-calc-method',
      name: 'new-calc-method',
      component: NewCalcMethod,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-tree',
      name: 'new-tree',
      component: NewTree,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-pollutant-group',
      name: 'new-pollutant-group',
      component: NewPollutantGroup,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/offer',
      name: 'offer',
      component: Offer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/import-csv',
      name: 'import-csv',
      component: ImportCsv,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/map-kz',
      name: 'map-kz',
      component: MapKz,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/xlscsv-parser',
      name: 'xlscsv-parser',
      component: XlsCsvparser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/service-plan',
      name: 'service-plan',
      component: ServicePlan,
      meta: {
        requiresAuth: true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if(to.matched.some(record => record.meta.is_admin)) {
        if(user.role == 'admin'){
          next()
        }
        else{
          next({ name: 'dashboard'})
        }
      }else {
        next()
      }
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(localStorage.getItem('token') == null){
      next()
    }
    else{
      next({ name: 'dashboard'})
    }
  }else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   console.log({
//     to,
//     from,
//     next
//   });

//   if (to.path !== '/sign-in' && to.path !== '/sign-up' && to.path !== '/companies') {

//     if (localStorage.signedIn) {
//       console.log('signedin');

//       if (store.state.user === null) {
//         authRepository.init();
//         next('/companies');
//       }

//       next();
//     } else {
//       next('sign-in');
//     }
//   } else {
//     console.log('Youre on the login page');
//     next();
//   }
// });

export default router;
