import axiosClient from './axiosClient';

export const userApi = {
  login(data) {
    const url = '/auth/signin';
    return axiosClient.post(url, data);
  },
};

export const createUser = (data) => {
  const url = '/auth/create-user';
  return axiosClient.post(url, data);
};

export const deleteUser = (id) => {
  const url = `/auth/${id}`;
  return axiosClient.delete(url);
};

export const getAll = () => {
  const url = '/auth';
  return axiosClient.get(url);
};
