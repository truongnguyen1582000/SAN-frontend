import axiosClient from './axiosClient';

export const userApi = {
  login(data) {
    const url = '/auth/signin';
    return axiosClient.post(url, data);
  },
};
