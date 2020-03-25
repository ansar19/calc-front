import { securedAxiosInstance } from './Repository';

export default {
  update(payload) {
    return securedAxiosInstance.put(`/companies/${payload.company_id}/facility_locations/${payload.id}`, payload);
  },
  get(company_id) {
    return securedAxiosInstance.get(`/companies/${company_id}/facility_locations`);
  },
  read(company_id, id) {
    return securedAxiosInstance.get(`/companies/${company_id}/facility_locations/${id}`);
  },
  create(payload) {
    return securedAxiosInstance.post(`/companies/${payload.company_id}/facility_locations/`, payload);
  },
  destroy(payload) {
    return securedAxiosInstance.delete(`/companies/${payload.company_id}/facility_locations/${payload.id}`);
  }
};
