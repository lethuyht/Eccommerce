import axiosClient from './axiosClient';

const customerApi = {
  getAll(params) {
    const url = '/customers';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/customers/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/customers';
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return axiosClient.post(url, data, token);
  },

  update(data) {
    const url = `/customers/${data.id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return axiosClient.put(url, data, token);
  },

  remove(id) {
    const url = `/customers/${id}`;
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return axiosClient.delete(url, token);
  },
};

export default customerApi;
