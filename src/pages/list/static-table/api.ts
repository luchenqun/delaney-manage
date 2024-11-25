import req from '@/utils/request';
import { PageParams } from '../user-table/api';

export const getStaticRewardsList = (params?: PageParams) => {
  return req.get('static-rewards', { params });
};
