import React, { useState, useEffect, useMemo } from 'react';
import { Table, PaginationProps, Tag } from '@arco-design/web-react';
import dayjs from 'dayjs';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { AddressText } from '@/components/Common/Address';
import { divideByMillionAndRound } from '@/utils/tools';
import { getStaticRewardsList } from '../static-table/api';

function StaticTable({ ids }: { ids: string }) {
  const t = useLocale(locale);

  const tableCallback = async (record, type) => {
    console.log(record, type);
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
    if (!ids) {
      setData([]);
      return;
    }
    setLoading(true);
    getStaticRewardsList({
      page: current,
      page_size: pageSize,
      ...formParams,
      ...sortParams,
      'filters[id]': `in (${ids})`,
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

export default StaticTable;
