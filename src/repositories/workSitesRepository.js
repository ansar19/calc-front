import { securedAxiosInstance } from './Repository';

export default {
  update(payload) {
    return securedAxiosInstance.put(`/companies/${payload.company_id}/work_sites/${payload.id}`, payload);
  },
  get(companyId) {
    return securedAxiosInstance.get(`/companies/${companyId}/work_sites`);
  },
  read(companyId, id) {
    return securedAxiosInstance.get(`/companies/${companyId}/work_sites/${id}`);
  },
  create(payload) {
    return securedAxiosInstance.post(`/companies/${payload.company_id}/work_sites/`, payload);
  },
  destroy(payload) {
    return securedAxiosInstance.delete(`/companies/${payload.company_id}/work_sites/${payload.id}`);
  },
};
