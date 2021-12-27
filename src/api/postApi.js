import axiosClient from './axiosClient';

export const createPost = (data) => {
  const url = '/post';
  return axiosClient.post(url, data);
};

export const getPostList = () => {
  const url = '/post';
  return axiosClient.get(url);
};

export const getPostItem = (id) => {
  const url = `/post/${id}`;
  return axiosClient.get(url);
};

export const voteUpPost = (id) => {
  const url = `/post/${id}/vote-up`;
  return axiosClient.post(url);
};

export const voteDownPost = (id) => {
  const url = `/post/${id}/vote-down`;
  return axiosClient.post(url);
};

export const createComment = (id, comment) => {
  const url = `/post/${id}/comment`;
  return axiosClient.post(url, comment);
};

export const voteUpComment = (postId, commentId) => {
  const url = `/post/${postId}/comment/${commentId}/vote-up`;
  return axiosClient.post(url);
};

export const voteDownComment = (postId, commentId) => {
  const url = `/post/${postId}/comment/${commentId}/vote-down`;
  return axiosClient.post(url);
};

export const deleteComment = (postId, commentId) => {
  const url = `/post/${postId}/comment/${commentId}`;
  return axiosClient.delete(url);
};

export const searchPost = (searchKey) => {
  const url = `/post/search${searchKey}`;
  return axiosClient.get(url);
};

export const getTrainingPoint = (id) => {
  const url = `/post/training-point/${id}`;
  return axiosClient.get(url);
};
