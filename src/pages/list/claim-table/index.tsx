import React, { useState, useEffect, useMemo } from 'react';
import { Table, Card, PaginationProps, Button, Space, Typography } from '@arco-design/web-react';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import SearchForm from './form';
import locale from './locale';
import styles from './style/index.module.less';
import { getColumns } from './constants';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { getClaimsList } from './api';

const { Title } = Typography;

function SearchTable() {
  const t = useLocale(locale);

  const tableCallback = async (record, type) => {
    if (type === 'view') {
      const parseData = JSON.parse(record.reward_ids);
      window.location.href = `/list/claim-detail/?id=${record.id}&dynamic_ids=${parseData.dynamic_ids.join(',')}&static_ids=${parseData.static_ids.join(',')}`;
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
    getClaimsList({
      page: current,
      page_size: pageSize,
      ...formParams,
      ...sortParams,
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

  return (
    <Card>
      <Title heading={6}>领取奖励列表</Title>
      <SearchForm onSearch={handleSearch} />
      <div className={styles['button-group']}>
        <Space>
          <Button type="primary" icon={<IconPlus />}>
            {t['searchTable.operations.add']}
          </Button>
          <Button>{t['searchTable.operations.upload']}</Button>
        </Space>
        <Space>
          <Button icon={<IconDownload />}>{t['searchTable.operation.download']}</Button>
        </Space>
      </div>
      <Table rowKey="id" loading={loading} onChange={onChangeTable} pagination={pagination} columns={columns} data={data} scroll={{ x: '100%' }} />
    </Card>
  );
}

export default SearchTable;
