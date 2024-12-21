import req from '@/utils/request';

export const getUser = (params: { address?: string }) => {
  return req.get('user', { params });
};

export const getUserReward = (params: { address?: string }) => {
  return req.get('reward-user-stat', { params });
};
