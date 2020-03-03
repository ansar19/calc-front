import { securedAxiosInstance } from './Repository';

export default {
  update(payload) {
    return securedAxiosInstance.put(`/companies/${payload.company_id}/emission_sources/${payload.id}`, payload);
  },
  get(company_id) {
    return securedAxiosInstance.get(`/companies/${company_id}/emission_sources`);
  },
  read(company_id, id) {
    return securedAxiosInstance.get(`/companies/${company_id}/emission_sources/${id}`);
  },
  create(payload) {
    return securedAxiosInstance.post(`/companies/${payload.company_id}/emission_sources/`, payload);
  },
  destroy(payload) {
    return securedAxiosInstance.delete(`/companies/${payload.company_id}/emission_sources/${payload.id}`);
  },
};
