import axiosClient from './axiosClient';

export const getAll = () => {
  const url = '/topic';
  return axiosClient.get(url);
};

export const createTopic = (data) => {
  const url = '/topic';
  return axiosClient.post(url, data);
};

export const deleteTopic = (id) => {
  const url = `/topic/${id}`;
  return axiosClient.delete(url);
};
