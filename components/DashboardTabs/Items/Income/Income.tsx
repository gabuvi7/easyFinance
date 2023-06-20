'use client';

import { IncomeData, ITabsProps } from '@/utils/interfaces/incomes.interface';
import { Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useGetIncomes } from '@/utils/apiHooks';
import { ColumnsType } from 'antd/es/table';
import { Currency } from '@/utils/enums/enums';
import IncomeForm from './IncomeForm';

interface IFlattenedIncomeData extends IncomeData {
  totalIncome: number;
}

function Income({ email }: ITabsProps) {
  const [data, setData] = useState<IFlattenedIncomeData[]>([]);
  const [sourceNameFilters, setSourceNameFilters] = useState([{ text: '', value: '' }]);
  const {
    data: incomes,
    fetchDataManually: getIncomes,
    loading: loadingIncomes,
  } = useGetIncomes({ email });

  useEffect(() => {
    if (!incomes) return;
    const flattenedData = incomes.incomeData.flatMap((item) =>
      item.incomeSources.map((source) => ({
        ...source,
        totalIncome: item.totalIncome,
      }))
    );

    const uniqueSourceNames = Array.from(new Set(flattenedData.map((item) => item.sourceName)));

    setSourceNameFilters(
      uniqueSourceNames.map((sourceName) => ({
        text: sourceName,
        value: sourceName,
      }))
    );
    setData(flattenedData);
  }, [incomes]);

  const columns: ColumnsType<IncomeData> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: IncomeData, b: IncomeData) => {
        const dateA = moment(a.date, 'YYYYMMDD');
        const dateB = moment(b.date, 'YYYYMMDD');

        if (dateA.isValid() && dateB.isValid()) {
          return dateA.diff(dateB, 'milliseconds');
        }

        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      render: (date: string) => moment(date, 'YYYYMMDD').format('DD/MM/YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      filters: Object.entries(Currency).map(([key, value]) => ({ text: value, value: key })),
      onFilter: (value: string | number | boolean, record: IncomeData) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          return record.currency === value;
        }
        return false;
      },
    },
    {
      title: 'Source Name',
      dataIndex: 'sourceName',
      key: 'sourceName',
      filters: sourceNameFilters,
      onFilter: (value, record) => record.sourceName === value,
    },
    {
      title: 'Total',
      dataIndex: 'totalIncome',
      key: 'totalIncome',
    },
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <IncomeForm email={email} refetchIncomes={getIncomes} />
      <Table loading={loadingIncomes} dataSource={data} columns={columns} scroll={{ x: true }} />
    </Space>
  );
}
export default Income;
