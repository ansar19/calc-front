/* eslint-disable camelcase */
import { securedAxiosInstance } from './Repository';

export default {
  update(payload) {
    return securedAxiosInstance.put(`/companies/${payload.company_id}/employees/${payload.id}`, payload);
  },
  get(company_id) {
    return securedAxiosInstance.get(`/companies/${company_id}/employees`);
  },
  invite(employee, permissions) {
    // eslint-disable-next-line no-undef
    return securedAxiosInstance.get(`/companies/${company_id}/employees/invite`, { user: employee, permissions });
  },
  read(company_id, id) {
    return securedAxiosInstance.get(`/companies/${company_id}/employees/${id}`);
  },
  create(payload) {
    return securedAxiosInstance.post(`/companies/${payload.company_id}/employees/`, payload);
  },
  destroy(payload) {
    return securedAxiosInstance.delete(`/companies/${payload.company_id}/employees/${payload.id}`);
  },
};
