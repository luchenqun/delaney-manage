import req from '@/utils/request';
import { PageParams } from '../user-table/api';

export const getClaimsList = (params?: PageParams) => {
  return req.get('claims', { params });
};
