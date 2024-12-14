import { Message } from '@arco-design/web-react';
import axios from 'axios';
import { authorizationValue, currentAddress } from './tools';

const instance = axios.create({
  baseURL: '/api',
  timeout: 60000,
});

instance.interceptors.request.use(
  function (config) {
    const authorization = authorizationValue(currentAddress());
    if (authorization) {
      config.headers.Authorization = authorization;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.data.msg) {
      Message.success(response.data.msg);
    }
    return response;
  },
  function (error) {
    if (error.code === 'ECONNABORTED') {
      Message.error('Request timeout, please check network connection');
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          // 客户端环境
          window && (location.href = '/login');
          break;
        case 403:
          window && (location.href = '/login');
          break;
        case 404:
          window && (location.href = '/login');
          break;
        default:
          Message.error(error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
