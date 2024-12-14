import React, { useEffect, useState } from 'react';
import { Card, Tabs } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import InfoHeader from './header';
import { getUser } from './api';
import Deletegate from './delegate-table';
import DynamicsTable from './dynamics-table';
import StaticTable from './static-table';
import ClaimTable from './claim-table';
import MessageTable from './message-table';

function UserInfo() {
  const t = useLocale(locale);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    getUser({
      address: id,
    }).then((res) => {
      setUserInfo(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={userInfo} loading={loading} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="质押">
        <Deletegate address={id} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="动态奖励">
        <DynamicsTable address={id} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="静态奖励">
        <StaticTable address={id} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="领取奖励">
        <ClaimTable address={id} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="消息">
        <MessageTable address={id} />
      </Card>
      {/* <Card style={{ marginTop: '16px' }}>
        <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
          <Tabs.TabPane key="1" title="质押">
            <Deletegate address={id} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" title="动态奖励" lazyload>
            <DynamicsTable address={id} />
          </Tabs.TabPane>
          <Tabs.TabPane key="3" title="静态奖励" lazyload>
            <StaticTable address={id} />
          </Tabs.TabPane>
          <Tabs.TabPane key="4" title="领取奖励" lazyload>
            <ClaimTable address={id} />
          </Tabs.TabPane>
          <Tabs.TabPane key="5" title="消息" lazyload>
            <MessageTable address={id} />
          </Tabs.TabPane>
        </Tabs>
      </Card> */}
    </div>
  );
}

export default UserInfo;
