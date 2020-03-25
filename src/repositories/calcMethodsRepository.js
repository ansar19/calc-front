import { securedAxiosInstance } from './Repository';

export default {
  update(payload) {
    return securedAxiosInstance.put(`/companies/${payload.company_id}/calc_methods/${payload.id}`, payload);
  },
  get(company_id) {
    return securedAxiosInstance.get(`/companies/${company_id}/calc_methods`);
  },
  read(company_id, id) {
    return securedAxiosInstance.get(`/companies/${company_id}/calc_methods/${id}`);
  },
  create(payload) {
    return securedAxiosInstance.post(`/companies/${payload.company_id}/calc_methods/`, payload);
  },
  destroy(payload) {
    return securedAxiosInstance.delete(`/companies/${payload.company_id}/calc_methods/${payload.id}`);
  }
};
