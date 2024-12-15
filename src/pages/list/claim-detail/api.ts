import req from '@/utils/request';

export const getClaim = (params: { signature?: string }) => {
  return req.get('claim', { params });
};
