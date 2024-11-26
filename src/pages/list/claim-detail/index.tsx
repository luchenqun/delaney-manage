import React, { useEffect, useState } from 'react';
import { Card, Tabs } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import DynamicsTable from './dynamics-table';
import StaticTable from './static-table';

function UserInfo() {
  const t = useLocale(locale);
  const searchParams = new URLSearchParams(location.search);
  const dynamicIds = searchParams.get('dynamic_ids');
  const staticIds = searchParams.get('static_ids');
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div>
      <Card style={{ marginTop: '16px' }}>
        <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
          <Tabs.TabPane key="1" title="动态奖励" lazyload>
            <DynamicsTable ids={dynamicIds} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" title="静态奖励" lazyload>
            <StaticTable ids={staticIds} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default UserInfo;
