/* eslint-disable */
import store from '@/store';
import { securedAxiosInstance } from './Repository';

export default {
  update(payload) {
    return securedAxiosInstance.put(`/companies/${payload.company_id}/release_sources/${payload.id}`, payload);
  },
  get(companyId) {
    if (companyId === undefined) {
      companyId = store.stage.company.id;
    }
    return securedAxiosInstance.get(`/companies/${companyId}/release_sources`);
  },
  read(company_id, id) {
    return securedAxiosInstance.get(`/companies/${company_id}/release_sources/${id}`);
  },
  create(payload) {
    return securedAxiosInstance.post(`/companies/${payload.company_id}/release_sources/`, payload);
  },
  destroy(payload) {
    return securedAxiosInstance.delete(`/companies/${payload.company_id}/release_sources/${payload.id}`);
  },
};
