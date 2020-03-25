import { securedAxiosInstance } from './Repository';

export default {
  perform(payload) {
    return securedAxiosInstance.post('/calc_datas/perform', payload);
  },
  read(id) {
    return securedAxiosInstance.get(`/calcs/${id}`);
  },
};
