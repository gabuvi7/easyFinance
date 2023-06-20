import { useState } from 'react';
import { usePostIncome } from '@/utils/apiHooks';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { Currency } from '@/utils/enums/enums';
import moment from 'moment';
import { IncomeData } from '@/utils/interfaces/incomes.interface';
import styles from './Income.module.css';

const { Option } = Select;
interface IncomeFormProps {
  email: string;
  refetchIncomes: () => void;
}

function IncomeForm({ email, refetchIncomes }: IncomeFormProps) {
  const [form] = Form.useForm();
  const [selectedDocDate, setDocDate] = useState('');
  const { fetchDataManually, loading } = usePostIncome({ email, docDate: selectedDocDate });

  const selectCurrency = (
    <Form.Item name="currency" className={styles.CurrencyItem} initialValue={Currency.USD}>
      <Select style={{ width: 80 }}>
        {Object.entries(Currency).map(([key, value]) => (
          <Option key={key} value={key}>
            {value}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  const handleDateChange = (date: any) => {
    setDocDate(moment(date.$d).format('YYYYMM'));
  };

  const onFinish = async (values: any) => {
    const newIncome: IncomeData = {
      id: 0,
      sourceName: values.sourceName,
      amount: values.amount,
      currency: values.currency,
      date: moment(values.date.$d).format('YYYYMMDD'),
    };

    fetchDataManually({
      body: JSON.stringify({
        amount: newIncome.amount,
        currency: newIncome.currency,
        sourceName: newIncome.sourceName,
        date: newIncome.date,
      }),
    }).then(() => {
      form.resetFields();
      refetchIncomes();
    });
  };

  return (
    <Form form={form} onFinish={onFinish} style={{ width: '300px' }}>
      <Form.Item
        name="sourceName"
        rules={[{ required: true, message: 'Please input the source name' }]}
      >
        <Input width={200} placeholder="Source Name" />
      </Form.Item>
      <Form.Item name="amount" rules={[{ required: true, message: 'Please input the amount' }]}>
        <InputNumber addonBefore={selectCurrency} placeholder="Amount" />
      </Form.Item>
      <Form.Item name="date" rules={[{ required: true, message: 'Please select a date' }]}>
        <DatePicker
          placeholder="Select a date"
          format="DD/MM/YYYY"
          onChange={handleDateChange}
          disabledDate={(current) => current && current > moment().endOf('day')}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={form.submit} loading={loading}>
          Add Income
        </Button>
      </Form.Item>
    </Form>
  );
}

export default IncomeForm;
