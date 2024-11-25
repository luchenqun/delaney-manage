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
      title: 'id',
      fixed: 'left',
      width: 50,
      dataIndex: 'id',
    },
    {
      title: '质押id',
      fixed: 'left',
      width: 80,
      dataIndex: 'cid',
    },
    {
      title: '用户地址',
      width: 230,
      dataIndex: 'address',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '质押数量',
      width: 150,
      dataIndex: 'mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '最小usdt价值',
      width: 170,
      dataIndex: 'min_usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: 'usdt',
      width: 120,
      dataIndex: 'usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '取消质押返回最小mud',
      width: 170,
      dataIndex: 'back_min_mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '取消质押返回的mud',
      width: 180,
      dataIndex: 'back_mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '交易哈希',
      width: 200,
      dataIndex: 'hash',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '取消质押对应的hash',
      width: 200,
      dataIndex: 'undelegate_hash',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '每期时间',
      width: 110,
      sorter: true,
      dataIndex: 'period_duration',
    },
    {
      title: '总期数',
      width: 100,
      sorter: true,
      dataIndex: 'period_num',
    },
    {
      title: '每期奖励百分比率',
      width: 120,
      sorter: true,
      dataIndex: 'period_reward_ratio',
    },
    {
      title: '质押状态',
      width: 140,
      dataIndex: 'status',
      render: (value) => (
        <>
          {value === 0 && '质押中'}
          {value === 1 && '成功'}
          {value === 2 && '失败'}
          {value === 3 && '取消质押中'}
          {value === 4 && '已取消质押'}
        </>
      ),
    },
    {
      title: '质押解锁日期',
      width: 180,
      dataIndex: 'unlock_time',
      sorter: true,
      render: (x) => dayjs.unix(x).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '取消质押日期',
      width: 180,
      dataIndex: 'undelegate_time',
      sorter: true,
      render: (x) => dayjs.unix(x).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '创建日期',
      width: 180,
      dataIndex: 'create_time',
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
