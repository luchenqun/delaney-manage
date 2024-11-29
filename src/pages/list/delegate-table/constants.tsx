import React from 'react';
import { Button, Tag, Typography } from '@arco-design/web-react';
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
      fixed: 'left',
      width: 75,
      dataIndex: 'cid',
    },
    {
      title: '用户地址',
      width: 190,
      dataIndex: 'address',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '质押MUD',
      width: 120,
      dataIndex: 'mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '最小USDT',
      width: 120,
      dataIndex: 'min_usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '实际USDT',
      width: 120,
      dataIndex: 'usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '最小返回MUD',
      width: 150,
      dataIndex: 'back_min_mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '实际返回MUD',
      width: 150,
      dataIndex: 'back_mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '质押哈希',
      width: 190,
      dataIndex: 'hash',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '取消质押哈希',
      width: 190,
      dataIndex: 'undelegate_hash',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '每期时长',
      width: 110,
      sorter: true,
      dataIndex: 'period_duration',
      render: (value) => <>{value}s</>,
    },
    {
      title: '期数',
      width: 80,
      sorter: true,
      dataIndex: 'period_num',
    },
    {
      title: '期化率',
      width: 100,
      sorter: true,
      dataIndex: 'period_reward_ratio',
      render: (value) => <>{value}%</>,
    },
    {
      title: '状态',
      width: 80,
      dataIndex: 'status',
      render: (value) => (
        <>
          {value === 0 && <Tag color="gray">质押中</Tag>}
          {value === 1 && <Tag color="green">成功</Tag>}
          {value === 2 && <Tag color="red">失败</Tag>}
          {value === 3 && <Tag color="cyan">撤回中</Tag>}
          {value === 4 && <Tag color="magenta">已撤回</Tag>}
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
      title: '质押日期',
      width: 175,
      dataIndex: 'delegate_time',
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
      title: '取消质押',
      width: 175,
      dataIndex: 'undelegate_time',
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
