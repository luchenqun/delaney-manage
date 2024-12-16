import React, { useEffect, useState } from 'react';
import { Card, Tabs } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import DynamicsTable from './dynamics-table';
import StaticTable from './static-table';
import { getClaim } from './api';
import Info from './header';
import { getClaimsList } from '../claim-table/api';

function UserInfo() {
  const t = useLocale(locale);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  // const dynamicIds = searchParams.get('dynamic_ids');
  // const staticIds = searchParams.get('static_ids');
  const [activeTab, setActiveTab] = useState('1');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dynamicIds, setDynamicIds] = useState('');
  const [staticIds, setStaticIds] = useState('');

  useEffect(() => {
    setLoading(true);
    getClaimsList({
      'filters[id]': `=${id}`,
    }).then((res) => {
      setData(res.data.data.items[0]);
      const json = JSON.parse(res.data.data.items[0].reward_ids);
      setDynamicIds(json.dynamic_ids);
      setStaticIds(json.static_ids);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Card>
        <Info userInfo={data} loading={loading} />
      </Card>
      {dynamicIds && (
        <Card style={{ marginTop: '16px' }} title="动态奖励">
          <DynamicsTable ids={dynamicIds} />
        </Card>
      )}
      {staticIds && (
        <Card style={{ marginTop: '16px' }} title="静态奖励">
          <StaticTable ids={staticIds} />
        </Card>
      )}
      {/* <Card style={{ marginTop: '16px' }}>
        <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
          <Tabs.TabPane key="1" title="动态奖励" lazyload>
            <DynamicsTable ids={dynamicIds} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" title="静态奖励" lazyload>
            <StaticTable ids={staticIds} />
          </Tabs.TabPane>
        </Tabs>
      </Card> */}
    </div>
  );
}

export default UserInfo;
