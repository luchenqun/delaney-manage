import req from '@/utils/request';

export const getDelegate = (params: { hash?: string }) => {
  return req.get('delegate', { params });
};
