import React from 'react';
import { Button, Link, Tag, Typography } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { humanReadable, isMobile, UsdtPrecision } from '@/utils/tools';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { AddressText } from '@/components/Common/Address';

const { Text } = Typography;

export function getColumns(t: ColumnProps, callback: (record: ColumnProps<any>, type: string) => Promise<void>) {
  return [
    {
      title: 'ID',
      fixed: isMobile() ? false : 'left',
      width: 60,
      dataIndex: 'id',
    },
    {
      title: '质押ID',
      width: 75,
      dataIndex: 'delegate_id',
      render: (value, record) => {
        return (
          <Link
            onClick={() => {
              window.open(`/list/delegate-detail/?id=${record.delegate_id}`, '_blank');
            }}
          >
            {value}
          </Link>
        );
      },
    },
    {
      title: '领取ID',
      width: 75,
      dataIndex: 'claim_id',
      render: (value, record) => {
        if (value === -1) {
          return value;
        }
        return (
          <Link
            onClick={() => {
              window.open(`/list/claim-detail/?id=${record.claim_id}`, '_blank');
            }}
          >
            {value}
          </Link>
        );
      },
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
      render: (value) => <>{humanReadable(value, UsdtPrecision)}</>,
    },
    {
      title: '交易哈希',
      width: 190,
      dataIndex: 'hash',
      render: (value) => <AddressText address={value} type="hash" />,
    },
    {
      title: '状态',
      width: 80,
      dataIndex: 'status',
      sorter: true,
      render: (value) => (
        <>
          {value === 0 && <Tag color="gray">未领取</Tag>}
          {value === 1 && <Tag color="lime">领取中</Tag>}
          {value === 2 && <Tag color="green">已领取</Tag>}
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
