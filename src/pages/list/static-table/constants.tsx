import React from 'react';
import { Button, Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { divideByMillionAndRound } from '@/utils/tools';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { AddressText } from '@/components/Common/Address';

const { Text } = Typography;

export function getColumns(
  t: ColumnProps,
  callback: (record: ColumnProps<any>, type: string) => Promise<void>
) {
  return [
    {
      title: 'ID',
      fixed: 'left',
      width: 60,
      dataIndex: 'id',
    },
    {
      title: '质押ID',
      width: 75,
      dataIndex: 'delegate_id',
    },
    {
      title: '领取ID',
      width: 75,
      dataIndex: 'claim_id',
    },
    {
      title: '哪期',
      width: 80,
      sorter: true,
      dataIndex: 'period',
    },
    {
      title: '用户地址',
      width: 190,
      sorter: true,
      dataIndex: 'address',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: 'USDT',
      width: 100,
      dataIndex: 'usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '交易哈希',
      width: 190,
      dataIndex: 'hash',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '状态',
      width: 80,
      dataIndex: 'status',
      sorter: true,
      render: (value) => (
        <>
          {value === 0 && '未领取'}
          {value === 1 && '领取中'}
          {value === 2 && '已领取'}
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
    {
      title: '解锁日期',
      width: 175,
      dataIndex: 'unlock_time',
      sorter: true,
      render: (x) => dayjs.unix(x).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '领取奖励',
      width: 175,
      dataIndex: 'claim_time',
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
