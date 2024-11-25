import req from '@/utils/request';
import { PageParams } from '../user-table/api';

export const getMessagesList = (params?: PageParams) => {
  return req.get('messages', { params });
};
