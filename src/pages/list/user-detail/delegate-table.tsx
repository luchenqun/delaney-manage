import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Typography,
} from '@arco-design/web-react';
import PermissionWrapper from '@/components/PermissionWrapper';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { AddressText } from '@/components/Common/Address';
import { getUserList } from '../user-table/api';

const { Title } = Typography;

function DeletegateTable({ address }: { address: string }) {
  const t = useLocale(locale);

  const tableCallback = async (record, type) => {
    if (type === 'view') {
      window.location.href = `/list/user-detail/?id=${record.address}`;
    }
  };

  const columns = useMemo(
    () => getColumns(t, tableCallback),
    [t]
  ) as ColumnProps[];

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
  }, [
    pagination.current,
    pagination.pageSize,
    JSON.stringify(formParams),
    JSON.stringify(sortParams),
  ]);

  function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);
    getUserList({
      page: current,
      page_size: pageSize,
      ...formParams,
      ...sortParams,
      'filters[address]': `=${address}`,
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
        obj[`filters[${key}]`] = `=${params[key].toLowerCase()}`;
      }
    }

    setFormParams({
      ...obj,
    });
  }

  return (
    <Table
      rowKey="id"
      loading={loading}
      onChange={onChangeTable}
      pagination={pagination}
      columns={columns}
      data={data}
      scroll={{ x: '100%' }}
    />
  );
}

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
      title: '用户地址',
      fixed: 'left',
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
      title: '质押MUD',
      width: 130,
      dataIndex: 'mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '质押USDT',
      width: 130,
      dataIndex: 'usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '直推MUD',
      width: 130,
      dataIndex: 'sub_mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '直推USDT',
      width: 130,
      dataIndex: 'sub_usdt',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '团队MUD',
      width: 130,
      dataIndex: 'team_mud',
      sorter: true,
      render: (value) => <>{divideByMillionAndRound(value)}</>,
    },
    {
      title: '团队USDT',
      width: 130,
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

export default DeletegateTable;
