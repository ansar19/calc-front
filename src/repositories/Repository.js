/* eslint-disable */
import axios from 'axios';

var baseDomain = "http://localhost:3000/";

if(process.env.NODE_ENV === 'production') {
  baseDomain = 'http://localhost:3000/';
}

const baseURL = `${baseDomain}`;

const securedAxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const plainAxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

securedAxiosInstance.interceptors.request.use((config) => {
  const method = config.method.toUpperCase();
  if (method !== 'OPTIONS' && method !== 'GET') {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf,
    };
  }
  return config;
});


securedAxiosInstance.interceptors.response.use(null, (error) => {
  if (error.response && error.response.config && error.response.status === 401) {
    // If 401 by expired access cookie, we do a refresh request
    return plainAxiosInstance.post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': localStorage.csrf } })
      .then((response) => {
        localStorage.csrf = response.data.csrf;
        localStorage.signedIn = true;
        // After another successfull refresh - repeat original request
        const retryConfig = error.response.config;
        retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf;
        return plainAxiosInstance.request(retryConfig);
      }).catch((e) => {
        delete localStorage.csrf;
        delete localStorage.signedIn;
        // redirect to signin if refresh fails
        // eslint-disable-next-line no-restricted-globals
        location.replace('/');
        return Promise.reject(e);
      });
  }
  return Promise.reject(error);
});

export { securedAxiosInstance, plainAxiosInstance };
