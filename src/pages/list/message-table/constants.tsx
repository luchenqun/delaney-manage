import React from 'react';
import { Button, Tag, Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { AddressText } from '@/components/Common/Address';

const { Text } = Typography;

export function getColumns(t: ColumnProps, callback: (record: ColumnProps<any>, type: string) => Promise<void>) {
  return [
    {
      title: 'ID',
      fixed: 'left',
      width: 70,
      dataIndex: 'id',
    },
    {
      title: '地址',
      width: 200,
      dataIndex: 'address',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '类型',
      width: 70,
      sorter: true,
      dataIndex: 'type',
    },
    {
      title: '标题',
      width: 180,
      dataIndex: 'title',
    },
    {
      title: '消息',
      dataIndex: 'content',
      width: 600,
    },
    {
      title: '状态',
      width: 70,
      dataIndex: 'is_read',
      sorter: true,
      render: (value) => (
        <>
          {value === 0 && <Tag color="gray">未读</Tag>}
          {value === 1 && <Tag color="green">已读</Tag>}
        </>
      ),
    },
    {
      title: '创建日期',
      width: 175,
      dataIndex: 'create_time',
      sorter: true,
      render: (x) => dayjs.unix(x).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];
}
