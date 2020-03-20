import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecoapikz.herokuapp.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default {
  getResource(url) {
    return api.get(url)
      .then(res => res.data)
      .catch((err) => {
        this.handleError(err);
      });
  },

  postResource(url, payload) {
    return api.post(url, payload)
      .then(res => res.data)
      .catch((err) => {
        this.handleError(err);
      });
  },

  putResource(url, payload) {
    return api.put(`${url}/${payload.id}`, payload)
      .then(res => res.data)
      .catch(err => this.handleError(err));
  },

  patchResource(url, payload) {
    return api.patch(`${url}/${payload.id}`, payload)
      .then(res => res.data)
      .catch(err => this.handleError(err));
  },

  deleteResource(url, id) {
    return api.delete(`${url}/${id}`)
      .catch((err) => {
        this.handleError(err);
      });
  },

  async getAllReleases() {
    const res = await this.getResource('releaseSources');
    return res;
  },

  async getWorksite(id) {
    const worksite = await this.getResource(`worksites/${id}`);
    return worksite;
  },
  async getFacility(id) {
    const facility = await this.getResource(`facilities/${id}`);
    return facility;
  },
  async getFacilityLocation(id) {
    const facilityLocation = await this.getResource(`facilitylocations/${id}`);
    return facilityLocation;
  },
  async getEmissionSource(id) {
    const emissionSource = await this.getResource(`emissionsources/${id}`);
    return emissionSource;
  },
  async getReleaseSource(id) {
    const releaseSource = await this.getResource(`releasesources/${id}`);
    return releaseSource;
  },

  handleError(error) {
    throw new Error(`API ${error}`);
  },
};
