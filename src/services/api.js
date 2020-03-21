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

  patchResource(url, id, payload) {
    return api.patch(`${url}/${id}`, payload)
      .then(res => res.data)
      .catch(err => this.handleError(err));
  },

  deleteResource(url, id) {
    return api.delete(`${url}/${id}`)
      .catch((err) => {
        this.handleError(err);
      });
  },

  handleError(error) {
    throw new Error(`API ${error}`);
  },
};
