import axiosClient from './axiosClient';

export const getAll = () => {
  const url = '/topic';
  return axiosClient.get(url);
};
