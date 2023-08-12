'use client';

import { Tabs } from 'antd';
import { ITabsProps } from '@interfaces/incomes.interface';
import { Items } from './Items/Items';

function DashboardTabs({ email }: ITabsProps) {
  return <Tabs type="card" items={Items({ email })} />;
}
export default DashboardTabs;
