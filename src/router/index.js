/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './routes'
import jwtDecode from 'jwt-decode'

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
  routes,
});



const isAuthenticated = () => {
  const token = localStorage.getItem("token")
  if (token) {
    const { exp } = jwtDecode(token)
    return exp * 1000 > Date.now()
  }
  return false
}

router.beforeEach((to, from, next) => {
  const auth = isAuthenticated()
  if (to.name !== 'Login' && !auth) next({ name: 'Login' })
  else next()
})

export default router;
