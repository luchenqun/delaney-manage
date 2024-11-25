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
      title: '领取id',
      width: 80,
      dataIndex: 'cid',
    },
    {
      title: '用户地址',
      width: 230,
      sorter: true,
      dataIndex: 'address',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '奖励usdt数量',
      width: 150,
      dataIndex: 'usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '期望最小usdt数量',
      width: 170,
      dataIndex: 'min_mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '交易哈希',
      width: 240,
      dataIndex: 'hash',
    },
    {
      title: '状态',
      width: 140,
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
      title: '奖励上链截止时间',
      width: 180,
      dataIndex: 'deadline',
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
