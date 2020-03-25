import { securedAxiosInstance } from './Repository';

export default {
  get() {
    return securedAxiosInstance.get('/calcs');
  },
  read(id) {
    return securedAxiosInstance.get(`/calcs/${id}`);
  },
};
