import React from 'react';
import { Button, Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { divideByMillionAndRound } from '@/utils/tools';
import { ColumnProps } from '@arco-design/web-react/es/Table';

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
      title: '用户地址',
      fixed: 'left',
      width: 230,
      dataIndex: 'address',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '推荐人地址',
      width: 230,
      dataIndex: 'parent',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '团队星级',
      width: 120,
      dataIndex: 'star',
      sorter: true,
    },
    {
      title: '最小团队星级',
      width: 150,
      dataIndex: 'min_star',
      sorter: true,
    },
    {
      title: '个人质押mud数量',
      width: 170,
      dataIndex: 'mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '个人质押usdt数量',
      width: 170,
      dataIndex: 'usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '直推总额mud数量',
      width: 170,
      dataIndex: 'sub_mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '直推总额usdt数量',
      width: 170,
      dataIndex: 'sub_usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '团队总额mud数量',
      width: 170,
      dataIndex: 'team_mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '团队总额usdt数量',
      width: 170,
      dataIndex: 'team_usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '推荐码',
      width: 100,
      dataIndex: 'ref',
    },
    {
      title: '绑定的推荐码',
      width: 140,
      dataIndex: 'parent_ref',
    },
    {
      title: '创建时间',
      width: 180,
      dataIndex: 'create_time',
      sorter: true,
      render: (x) => dayjs.unix(x).format('YYYY-MM-DD HH:mm:ss'),
      // sorter: (a, b) => b.createdTime - a.createdTime,
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
