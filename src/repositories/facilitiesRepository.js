import { securedAxiosInstance } from './Repository';

export default {
  update(payload) {
    return securedAxiosInstance.put(`/companies/${payload.company_id}/facilities/${payload.id}`, payload);
  },
  get(company_id) {
    return securedAxiosInstance.get(`/companies/${company_id}/facilities`);
  },
  read(company_id, id) {
    return securedAxiosInstance.get(`/companies/${company_id}/facilities/${id}`);
  },
  create(payload) {
    return securedAxiosInstance.post(`/companies/${payload.company_id}/facilities/`, payload);
  },
  destroy(payload) {
    return securedAxiosInstance.delete(`/companies/${payload.company_id}/facilities/${payload.id}`);
  }
};
