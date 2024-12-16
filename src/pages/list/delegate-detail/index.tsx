import React, { useEffect, useState } from 'react';
import { Card, Tabs } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import InfoHeader from './header';
import { getDelegate } from './api';
import DynamicsTable from './dynamics-table';
import StaticTable from './static-table';
import { getDelegateList } from '../delegate-table/api';

function UserInfo() {
  const t = useLocale(locale);
  const searchParams = new URLSearchParams(location.search);
  const hash = searchParams.get('hash');
  const id = searchParams.get('id');
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    getDelegateList({
      'filters[id]': `=${id}`,
    }).then((res) => {
      if (res.data.data.items.length > 0) {
        setInfo(res.data.data.items[0]);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={info} loading={loading} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="动态奖励">
        <DynamicsTable hash={hash} id={id} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="静态奖励">
        <StaticTable hash={hash} id={id} />
      </Card>
      {/* <Card style={{ marginTop: '16px' }}>
        <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
          <Tabs.TabPane key="1" title="动态奖励" lazyload>
            <DynamicsTable hash={hash} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" title="静态奖励" lazyload>
            <StaticTable hash={hash} />
          </Tabs.TabPane>
        </Tabs>
      </Card> */}
    </div>
  );
}

export default UserInfo;
