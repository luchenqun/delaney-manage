import req from '@/utils/request';

export const getUser = (params: { address?: string }) => {
  return req.get('user', { params });
};
