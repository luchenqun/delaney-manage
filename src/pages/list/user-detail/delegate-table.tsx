import React, { useState, useEffect, useMemo } from 'react';
import { Table, PaginationProps, Typography, Tag, Link } from '@arco-design/web-react';
import dayjs from 'dayjs';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { AddressText } from '@/components/Common/Address';
import { humanReadable, UsdtPrecision } from '@/utils/tools';
import { getDelegateList } from '../delegate-table/api';

const { Title } = Typography;

function DeletegateTable({ address }: { address: string }) {
  const t = useLocale(locale);

  const tableCallback = async (record, type) => {
    if (type === 'view') {
      window.location.href = `/list/user-detail/?id=${record.address}`;
    }
  };

  const columns = useMemo(() => getColumns(t, tableCallback), [t]) as ColumnProps[];

  const [data, setData] = useState([]);
  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [sortParams, setSortParams] = useState({});
  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState({});

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, JSON.stringify(formParams), JSON.stringify(sortParams)]);

  function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);
    getDelegateList({
      page: current,
      page_size: pageSize,
      ...formParams,
      ...sortParams,
      'filters[address]': `='${address}'`,
    }).then((res) => {
      setData(res.data.data.items);
      setPatination({
        ...pagination,
        total: res.data.data.total,
      });
      setLoading(false);
    });
  }

  function onChangeTable({ current, pageSize }, sort) {
    if (!sort.direction) {
      setSortParams({});
    } else {
      setSortParams({
        sort_field: sort.field,
        sort_order: sort.direction === 'ascend' ? 'ASC' : 'DESC',
      });
    }
    setPatination({
      ...pagination,
      current,
      pageSize,
    });
  }

  function handleSearch(params) {
    setPatination({ ...pagination, current: 1 });
    const obj = {};
    for (const key in params) {
      if (params[key] !== '') {
        obj[`filters[${key}]`] = `= '${params[key].toLowerCase()}'`;
      }
    }

    setFormParams({
      ...obj,
    });
  }

  return <Table rowKey="id" loading={loading} onChange={onChangeTable} pagination={pagination} columns={columns} data={data} scroll={{ x: '100%' }} />;
}

export function getColumns(t: ColumnProps, callback: (record: ColumnProps<any>, type: string) => Promise<void>) {
  return [
    {
      title: 'ID',
      fixed: 'left',
      width: 60,
      dataIndex: 'id',
      render: (value, record) => (
        <Link
          onClick={() => {
            window.location.href = `/list/delegate-detail/?hash=${record.hash}&id=${record.id}`;
          }}
        >
          {value}
        </Link>
      ),
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
      render: (value) => <>{humanReadable(value)}</>,
    },
    {
      title: '最小USDT',
      width: 120,
      dataIndex: 'min_usdt',
      sorter: true,
      render: (value) => <>{humanReadable(value, UsdtPrecision)}</>,
    },
    {
      title: '实际USDT',
      width: 120,
      dataIndex: 'usdt',
      sorter: true,
      render: (value) => <>{humanReadable(value, UsdtPrecision)}</>,
    },
    {
      title: '最小返回MUD',
      width: 150,
      dataIndex: 'back_min_mud',
      sorter: true,
      render: (value) => <>{humanReadable(value)}</>,
    },
    {
      title: '实际返回MUD',
      width: 150,
      dataIndex: 'back_mud',
      sorter: true,
      render: (value) => <>{humanReadable(value)}</>,
    },
    {
      title: '质押哈希',
      width: 190,
      dataIndex: 'hash',
      render: (value) => <AddressText address={value} type="hash" />,
    },
    {
      title: '取消质押哈希',
      width: 190,
      dataIndex: 'undelegate_hash',
      render: (value) => <AddressText address={value} type="hash" />,
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
  ];
}

export default DeletegateTable;
