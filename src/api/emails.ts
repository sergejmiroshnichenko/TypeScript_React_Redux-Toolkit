import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://68.183.74.14:4005/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getToken = (username: string, password: string) =>
  btoa(`${username}:${password}`);

export const fetchUserData = async (username: string, password: string) => {
  const requestConfig: AxiosRequestConfig = {
    headers: { Authorization: `Basic ${getToken(username, password)}` },
    url: '/users/current/',
    method: 'get',
  };

  const response = await axiosInstance.request(requestConfig);
  return response.data;
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const requestConfig: AxiosRequestConfig = {
    url: '/users/',
    method: 'post',
    data: {
      username,
      email,
      password,
    },
  };

  const response = await axiosInstance.request(requestConfig);
  return response.data;
};
