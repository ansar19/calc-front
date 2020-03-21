import store from '@/store';
import router from '@/router';
import { securedAxiosInstance, plainAxiosInstance } from './Repository';

export default {
  signIn(payload) {
    plainAxiosInstance.post('/sign_in', payload)
      .then((response) => {
        console.log('signIn:response');
        store.commit('sign_in', response.data.csrf, response.data.user);
        router.replace('/companies');
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
  init() {
    securedAxiosInstance.get('/')
      .then((response) => {
        store.commit('sign_in', localStorage.csrf, response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  signOut() {
    console.log('signOut');
    securedAxiosInstance.delete('/sign_in')
      .then(() => {
        delete localStorage.csrf;
        delete localStorage.signedIn;
        router.replace('/sign-in');
      })
      .catch((error) => { this.setError(error, 'Cannot sign out'); });
    store.commit('sign_out');
  },
  signedIn() {
    return store.state.signedIn;
  },
};
