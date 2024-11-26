import req from '@/utils/request';

export const getUserList = (params?: PageParams) => {
  return req.get('users', { params });
};

export interface PageParams {
  page?: number;
  page_size?: number;
  sort_field?: string;
  sort_order?: string;
  filters?: {
    [key: string]: string;
  };
  [key: string]: any;
}
