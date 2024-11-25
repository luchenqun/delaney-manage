import React from 'react';
import { Button, Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { AddressText } from '@/components/Common/Address';

const { Text } = Typography;

export function getColumns(
  t: ColumnProps,
  callback: (record: ColumnProps<any>, type: string) => Promise<void>
) {
  return [
    {
      title: 'id',
      fixed: 'left',
      width: 50,
      dataIndex: 'id',
    },
    {
      title: '操作者地址',
      width: 200,
      dataIndex: 'address',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '日志类型',
      width: 120,
      sorter: true,
      dataIndex: 'type',
    },
    {
      title: '日志标题',
      width: 240,
      dataIndex: 'title',
    },
    {
      title: '日志消息',
      width: 240,
      dataIndex: 'content',
    },
    {
      title: '是否已读日志',
      width: 140,
      dataIndex: 'is_read',
      sorter: true,
      render: (value) => <>{value ? '已读' : '未读'}</>,
    },
    {
      title: '创建日期',
      width: 180,
      dataIndex: 'create_time',
      sorter: true,
      render: (x) => dayjs.unix(x).format('YYYY-MM-DD HH:mm:ss'),
    },
    // {
    //   title: '操作',
    //   dataIndex: 'operations',
    //   width: 100,
    //   fixed: 'right',
    //   headerCellStyle: { paddingLeft: '15px' },
    //   render: (_, record) => (
    //     <Button
    //       type="text"
    //       size="small"
    //       onClick={() => callback(record, 'view')}
    //     >
    //       {t['searchTable.columns.operations.view']}
    //     </Button>
    //   ),
    // },
  ];
}
