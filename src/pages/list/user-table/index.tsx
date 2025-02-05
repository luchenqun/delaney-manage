import React, { useState, useEffect, useMemo } from 'react';
import { Table, Card, PaginationProps, Button, Space, Typography, Modal, Input, Message } from '@arco-design/web-react';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import SearchForm from './form';
import locale from './locale';
import styles from './style/index.module.less';
import { getColumns } from './constants';
import { getUserList, setUserStart } from './api';
import { ColumnProps } from '@arco-design/web-react/es/Table';

const { Title } = Typography;

function SearchTable() {
  const t = useLocale(locale);
  const [visible, setVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [newStar, setNewStar] = useState('');

  const tableCallback = async (record, type) => {
    if (type === 'view') {
      window.location.href = `/list/user-detail/?id=${record.address}`;
    } else if (type === 'edit-star') {
      setCurrentRecord(record);
      setVisible(true);
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
    getUserList({
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

  const handleOk = async () => {
    if (!newStar) {
      Message.error('请输入新的星级');
      return;
    }

    try {
      await setUserStart({
        address: currentRecord.address,
        star: parseInt(newStar),
      });

      Message.success('修改成功');
      setVisible(false);
      setNewStar('');
      fetchData(); // 刷新表格数据
    } catch (error) {
      Message.error('修改失败');
    }
  };

  const handleStarChange = (value: string) => {
    // 如果输入为空，直接更新
    if (!value) {
      setNewStar('');
      return;
    }

    // 转换为数字并验证
    const num = parseInt(value);
    if (isNaN(num) || num < 0 || num > 5) {
      Message.error('星级必须在0-5之间');
      setNewStar('');
      return;
    }

    setNewStar(value);
  };

  return (
    <Card>
      <Title heading={6}>用户列表</Title>
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

      <Modal title="修改用户星级" visible={visible} onOk={handleOk} onCancel={() => setVisible(false)}>
        <div style={{ marginBottom: 15 }}>
          <div style={{ marginBottom: 10 }}>当前用户: {currentRecord?.address}</div>
          <div style={{ marginBottom: 10 }}>当前星级: {currentRecord ? Math.max(currentRecord.star, currentRecord.min_star) : '-'}</div>
          <Input placeholder="请输入新的星级" value={newStar} onChange={handleStarChange} type="number" />
        </div>
      </Modal>
    </Card>
  );
}

export default SearchTable;
