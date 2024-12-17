import React from 'react';
import { Button, Space, Typography } from '@arco-design/web-react';
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
      title: '用户地址',
      fixed: isMobile() ? false : 'left',
      width: 190,
      dataIndex: 'address',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '推荐人地址',
      width: 190,
      dataIndex: 'parent',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '星级',
      width: 80,
      dataIndex: 'star',
      sorter: true,
    },
    {
      title: '最小星级',
      width: 110,
      dataIndex: 'min_star',
      sorter: true,
    },
    {
      title: '质押',
      width: 220,
      dataIndex: 'mud',
      sorter: true,
      render: (value, record) => (
        <>
          {humanReadable(value)}MUD / {humanReadable(record.usdt, UsdtPrecision)}USDT
        </>
      ),
    },
    // {
    //   title: '质押USDT',
    //   width: 130,
    //   dataIndex: 'usdt',
    //   sorter: true,
    //   render: (value) => <>{humanReadable(value, UsdtPrecision)}</>,
    // },
    {
      title: '直推人数',
      width: 130,
      dataIndex: 'sub_person',
      sorter: true,
    },
    {
      title: '直推',
      width: 200,
      dataIndex: 'sub_mud',
      sorter: true,
      render: (value, record) => (
        <>
          {humanReadable(value)}MUD / {humanReadable(record.sub_usdt, UsdtPrecision)}USDT
        </>
      ),
    },
    {
      title: '团队人数',
      width: 130,
      dataIndex: 'team_person',
      sorter: true,
    },
    {
      title: '团队',
      width: 200,
      dataIndex: 'team_mud',
      sorter: true,
      render: (value, record) => (
        <>
          {humanReadable(value)}MUD / {humanReadable(record.team_usdt, UsdtPrecision)}USDT
        </>
      ),
    },
    {
      title: '领取奖励',
      width: 200,
      dataIndex: 'claim_mud',
      sorter: true,
      render: (value, record) => (
        <>
          {humanReadable(value)}MUD / {humanReadable(record.claim_usdt, UsdtPrecision)}USDT
        </>
      ),
    },
    {
      title: '推荐码',
      width: 100,
      dataIndex: 'ref',
    },
    {
      title: '绑定码',
      width: 100,
      dataIndex: 'parent_ref',
      render: (value) => <>{value ? value : '创始人'}</>,
    },
    {
      title: '创建时间',
      width: 175,
      dataIndex: 'create_time',
      sorter: true,
      render: (x) => dayjs.unix(x).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'operations',
      width: isMobile() ? 80 : 180,
      fixed: 'right',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <>
          <Button type="text" size="small" onClick={() => callback(record, 'view')}>
            {t['searchTable.columns.operations.view']}
          </Button>
          <Button type="text" size="small" onClick={() => callback(record, 'edit-star')}>
            修改星级
          </Button>
        </>
      ),
    },
  ];
}
