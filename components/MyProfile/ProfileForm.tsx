/* eslint-disable react/no-unstable-nested-components */

'use client';

import { EyeInvisibleOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, notification, Row, Select, Tag, theme } from 'antd';
import { useState } from 'react';
import { getKeyByValue } from '../../utils';
import { RevenueAgencies, statesValues } from '../../utils/enums/enums';
import { useFetch } from '../../utils/hooks/useFetch';
import { AfipDataResponse } from '../../utils/interfaces/afip.interface';
import CustomCard from '../CustomCard/CustomCard';
import styles from './MyProfile.module.css';

function ProfileForm() {
  const [form] = Form.useForm();
  const [revenueAgency, setRevenueAgency] = useState('');
  const [showFiscalPassword, setShowFiscalPassword] = useState<boolean>(false);
  const { loading: isLoading, data } = useFetch<AfipDataResponse>({
    url: '/api/afip',
    options: { method: 'GET' },
    maxRetry: 3,
    onError: () => {
      notification.error({
        message: 'Error fetching data',
        description: 'Could not fetch monotributo categories',
      });
    },
  });

  const {
    token: { colorInfo },
  } = theme.useToken();

  const onStateChange = (value: string) => {
    setRevenueAgency(getKeyByValue(RevenueAgencies, value)!);
  };

  const statesOptions = Object.values(statesValues).map((state) => {
    const key = Object.keys(statesValues).find((k) => statesValues[k] === state);
    return {
      value: state,
      label: key,
    };
  });

  const monotributoOptions = data?.monotributoCategoriesArray.map((category) => {
    return {
      value: category.category,
      label: `${category.category} - $${category.anualBilling}/year`,
    };
  });

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <Form wrapperCol={{ span: 14 }} layout="horizontal" form={form} onFinish={onFinish}>
        <CustomCard title="My Personal Data" bordered={false} maxWidth="1000px">
          <Row>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <Form.Item
                hasFeedback
                className={styles.formItemState}
                labelAlign="left"
                label="CUIT:"
                name="cuit"
                rules={[
                  { required: true, message: 'Please input your CUIT' },
                  { pattern: /^[0-9]{2}-?[0-9]{8}-?[0-9]$/, message: 'Please input a valid CUIT' },
                ]}
              >
                <Input placeholder="Enter your CUIT" />
              </Form.Item>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <Form.Item
                hasFeedback
                className={styles.formItemState}
                labelAlign="left"
                label="Monotributo:"
                name="monotributo"
                rules={[{ required: true, message: 'Please input your monotributo' }]}
              >
                <Select
                  loading={isLoading}
                  showSearch
                  className={styles.selectState}
                  placeholder="Select a category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={monotributoOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <Form.Item
                hasFeedback
                className={styles.formItemState}
                labelAlign="left"
                label="Country:"
                name="country"
                initialValue="Argentina"
              >
                <Tag color={colorInfo}>Argentina</Tag>
              </Form.Item>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <Form.Item
                hasFeedback
                className={styles.formItemState}
                labelAlign="left"
                label="State:"
                name="state"
                rules={[{ required: true, message: 'Please input your state' }]}
              >
                <Select
                  showSearch
                  className={styles.selectState}
                  placeholder="Select a state"
                  optionFilterProp="children"
                  onChange={onStateChange}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={statesOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <Form.Item
                hasFeedback
                className={styles.formItemState}
                labelAlign="left"
                label="IIBB:"
                name="IIBB"
                initialValue={revenueAgency}
              >
                <Tag color={colorInfo}>{revenueAgency}</Tag>
              </Form.Item>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <Form.Item
                hasFeedback
                className={styles.formItemState}
                labelAlign="left"
                label="Diversion of Contribution:"
                name="diversionOfContribution"
                rules={[
                  { required: true, message: 'Please input your insurance contribution status' },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select an option"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    { value: 0, label: 'Inactive' },
                    { value: 1, label: 'Active' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <Form.Item
                hasFeedback
                className={styles.formItemState}
                labelAlign="left"
                label="Health Insurance:"
                name="healthInsurance"
              >
                <Input placeholder="Enter your Health Insurance" />
              </Form.Item>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <Form.Item
                hasFeedback
                className={styles.formItemState}
                labelAlign="left"
                label="Fiscal Password:"
                name="fiscalPassword"
                rules={[{ required: true, message: 'Please input your Fiscal Password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className={styles.fiscalPasswordInput}
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  placeholder="Enter your Fiscal Password"
                  visibilityToggle
                  onClick={() => setShowFiscalPassword(!showFiscalPassword)}
                />
              </Form.Item>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </CustomCard>
      </Form>
    </div>
  );
}

export default ProfileForm;
