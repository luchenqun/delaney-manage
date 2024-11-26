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
      title: '合约ID',
      width: 75,
      dataIndex: 'cid',
    },
    {
      title: '用户地址',
      width: 190,
      sorter: true,
      dataIndex: 'address',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '领取USDT',
      width: 120,
      dataIndex: 'usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '最小MUD',
      width: 120,
      dataIndex: 'min_mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '实际MUD',
      width: 120,
      dataIndex: 'mud',
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
          {value === 1 && '已领取'}
          {value === 2 && '领取失败'}
        </>
      ),
    },
    {
      title: '创建日期',
      width: 170,
      dataIndex: 'create_time',
      sorter: true,
      render: (x) => dayjs.unix(x).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '领取时间',
      width: 170,
      dataIndex: 'claim_time',
      sorter: true,
      render: (x) => dayjs.unix(x).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '截止时间',
      width: 170,
      dataIndex: 'deadline',
      sorter: true,
      render: (x) => dayjs.unix(x).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 100,
      fixed: 'right',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <Button
          type="text"
          size="small"
          onClick={() => callback(record, 'view')}
        >
          {t['searchTable.columns.operations.view']}
        </Button>
      ),
    },
  ];
}