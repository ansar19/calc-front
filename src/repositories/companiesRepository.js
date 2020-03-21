import { securedAxiosInstance } from './Repository';

export default {
  update(payload) {
    return securedAxiosInstance.put(`/companies/${payload.id}`, payload);
  },
  get() {
    return securedAxiosInstance.get('/companies');
  },
  read(id) {
    return securedAxiosInstance.get(`/companies/${id}`);
  },
  create(payload) {
    return securedAxiosInstance.post('/companies', payload);
  },
  destroy(id) {
    return securedAxiosInstance.delete(`/companies/${id}`);
  },
};
