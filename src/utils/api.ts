import instance from './request';

export const getIsAdmin = (params: { address: string }) => {
  return instance.get('is-admin', { params });
};
