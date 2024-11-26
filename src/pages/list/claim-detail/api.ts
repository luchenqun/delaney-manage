import req from '@/utils/request';

export const getClaim = (params: { hash?: string }) => {
  return req.get('claim', { params });
};
