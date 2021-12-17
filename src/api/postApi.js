import axiosClient from './axiosClient';

export const createPost = (data) => {
  const url = '/post';
  return axiosClient.post(url, data);
};

export const getPostList = () => {
  const url = '/post';
  return axiosClient.get(url);
};
