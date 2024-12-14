import React, { useEffect, useState } from 'react';
import { Card, Tabs } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import InfoHeader from './header';
import { getDelegate } from './api';
import DynamicsTable from './dynamics-table';
import StaticTable from './static-table';

function UserInfo() {
  const t = useLocale(locale);
  const searchParams = new URLSearchParams(location.search);
  const hash = searchParams.get('hash');
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    getDelegate({
      hash,
    }).then((res) => {
      setInfo(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={info} loading={loading} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="动态奖励">
        <DynamicsTable hash={hash} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="静态奖励">
        <StaticTable hash={hash} />
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
