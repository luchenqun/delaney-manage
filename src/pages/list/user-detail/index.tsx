import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Tabs } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import InfoHeader from './header';
import InfoForm from './info';
import Security from './security';
import Verified from './verified';
import { getUser } from './api';
import Deletegate from './delegate-table';

function UserInfo() {
  const t = useLocale(locale);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [userInfo, setUserInfo] = useState({});
  // const userInfo = useSelector((state: any) => state.userInfo);
  const loading = useSelector((state: any) => state.userLoading);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    getUser({
      address: id,
    }).then((res) => {
      setUserInfo(res.data.data);
    });
  }, []);

  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={userInfo} loading={loading} />
      </Card>
      <Card style={{ marginTop: '16px' }}>
        <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
          <Tabs.TabPane key="1" title="质押">
            <Deletegate address={id} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" title="动态奖励">
            <Security />
          </Tabs.TabPane>
          <Tabs.TabPane key="3" title="静态奖励">
            <Verified />
          </Tabs.TabPane>
          <Tabs.TabPane key="4" title="领取奖励">
            <Verified />
          </Tabs.TabPane>
          <Tabs.TabPane key="5" title="消息">
            <Verified />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default UserInfo;
