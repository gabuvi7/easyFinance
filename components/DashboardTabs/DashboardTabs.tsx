'use client';

import { Tabs } from 'antd';
import { Items } from './Items/Items';

const onChange = (key: string) => {
  console.log(key);
};

function DashboardTabs() {
  return <Tabs onChange={onChange} type="card" items={Items} />;
}
export default DashboardTabs;
