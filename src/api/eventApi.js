import axiosClient from './axiosClient';

export const createEvent = (data) => {
  const url = '/event';
  return axiosClient.post(url, data);
};

export const getAllEvent = () => {
  const url = '/event';
  return axiosClient.get(url);
};

export const joinEvent = (id) => {
  const url = `/event/${id}/join-event`;
  return axiosClient.post(url);
};

export const leaveEvent = (id) => {
  const url = `/event/${id}/leave-event`;
  return axiosClient.post(url);
};

export const attendEvent = () => {};
