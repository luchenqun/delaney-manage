import req from '@/utils/request';
import { PageParams } from '../user-table/api';

export const getDynamicRewardsList = (params?: PageParams) => {
  return req.get('dynamic-rewards', { params });
};
