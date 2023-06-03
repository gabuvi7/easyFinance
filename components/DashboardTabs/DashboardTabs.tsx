'use client';

import { Button, notification, Tabs } from 'antd';
import { useFetch } from '@hooks/useFetch';
import { IncomeByDateResponse } from '@interfaces/incomes.interface';
import { Items } from './Items/Items';

const onChange = (key: string) => {
  console.log(key);
};

function DashboardTabs({ email }: { email: string }) {
  const { data: incomes } = useFetch<IncomeByDateResponse>({
    url: `/api/incomes/${email}`,
    options: { method: 'GET' },
    doInitialCall: true,
    onError: () => {
      notification.error({
        message: 'Oh!',
        description: 'An error has occurred. Please try again later.',
      });
    },
  });

  const { fetchDataManually } = useFetch<IncomeByDateResponse>({
    url: `/api/incomes/byDate/${email}/20230601`,
    options: { method: 'POST' },
    doInitialCall: false,
    onError: () => {
      notification.error({
        message: 'Oh!',
        description: 'An error has occurred. Please try again later.',
      });
    },
  });

  console.log(incomes);
  return (
    <>
      {' '}
      <Tabs onChange={onChange} type="card" items={Items} />
      <Button
        onClick={() =>
          fetchDataManually({
            body: JSON.stringify({
              amount: 3500,
              sourceName: 'Job',
            }),
          })
        }
      >
        Add income
      </Button>
    </>
  );
}
export default DashboardTabs;
