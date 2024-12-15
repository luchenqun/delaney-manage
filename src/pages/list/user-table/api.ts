import req from '@/utils/request';

export const getUserList = (params?: PageParams) => {
  return req.get('users', { params });
};

export const setUserStart = (data: { address: string; star: number }) => {
  return req.post('set-user-star', data);
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
