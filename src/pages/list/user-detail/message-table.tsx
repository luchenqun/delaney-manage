import React, { useState, useEffect, useMemo } from 'react';
import { Table, PaginationProps, Tag } from '@arco-design/web-react';
import dayjs from 'dayjs';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { AddressText } from '@/components/Common/Address';
import { getMessagesList } from '../message-table/api';

function MessageTable({ address }: { address: string }) {
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
    getMessagesList({
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

  return <Table rowKey="id" loading={loading} onChange={onChangeTable} pagination={pagination} columns={columns} data={data} scroll={{ x: '100%' }} />;
}

export function getColumns(t: ColumnProps, callback: (record: ColumnProps<any>, type: string) => Promise<void>) {
  return [
    {
      title: 'ID',
      fixed: 'left',
      width: 70,
      dataIndex: 'id',
    },
    {
      title: '地址',
      width: 200,
      dataIndex: 'address',
      render: (value) => <AddressText address={value} />,
    },
    {
      title: '类型',
      width: 120,
      sorter: true,
      dataIndex: 'type',
    },
    {
      title: '标题',
      width: 180,
      dataIndex: 'title',
    },
    {
      title: '消息',
      dataIndex: 'content',
      width: 180,
    },
    {
      title: '状态',
      width: 120,
      dataIndex: 'is_read',
      sorter: true,
      render: (value) => (
        <>
          {value === 0 && <Tag color="gray">未读</Tag>}
          {value === 1 && <Tag color="green">已读</Tag>}
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
  ];
}

export default MessageTable;
