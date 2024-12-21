import React, { useEffect, useState } from 'react';
import { Card, Tabs } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import InfoHeader from './header';
import { getUser, getUserReward } from './api';
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
  const [userReward, setUserReward] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    getUser({
      address: id,
    }).then((res) => {
      setUserInfo(res.data.data);
      setLoading(false);
    });

    getUserReward({
      address: id,
    }).then((res) => {
      setUserReward(res.data.data);
    });
  }, []);

  return (
    <div>
      <Card style={{ padding: '14px 20px' }}>
        <InfoHeader userInfo={userInfo} userReward={userReward} loading={loading} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="质押">
        <Deletegate address={id} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="领取奖励">
        <ClaimTable address={id} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="动态奖励">
        <DynamicsTable address={id} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="静态奖励">
        <StaticTable address={id} />
      </Card>
      <Card style={{ marginTop: '16px' }} title="消息">
        <MessageTable address={id} />
      </Card>
    </div>
  );
}

export default UserInfo;
