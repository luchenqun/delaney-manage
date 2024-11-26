import req from '@/utils/request';
import { PageParams } from '../user-table/api';

export const getDelegateList = (params?: PageParams) => {
  return req.get('delegates', { params });
};
