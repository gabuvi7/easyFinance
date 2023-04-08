'use client';

import { Button, Col, Form, Row, Select, Tag, theme } from 'antd';
import { useState } from 'react';
import { getKeyByValue } from '../../utils';
import { RevenueAgencies, statesValues } from '../../utils/enums/enums';
import CustomCard from '../CustomCard/CustomCard';
import styles from './MyProfile.module.css';

function ProfileForm() {
  const [form] = Form.useForm();
  const [revenueAgency, setRevenueAgency] = useState('');

  const {
    token: { colorInfo },
  } = theme.useToken();

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setRevenueAgency(getKeyByValue(RevenueAgencies, value)!);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const statesOptions = Object.values(statesValues).map((state) => {
    const key = Object.keys(statesValues).find((k) => statesValues[k] === state);
    return {
      value: state,
      label: key,
    };
  });

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <Form wrapperCol={{ span: 14 }} layout="horizontal" form={form} onFinish={onFinish}>
        <CustomCard title="My Personal Data" bordered={false} maxWidth="1000px">
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <Form.Item>
                <span className={styles.label}>CUIT:</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item>
                <span className={styles.label}>Monotributo:</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <span className={styles.label}>Country:</span>
              <Tag color={colorInfo}>Argentina</Tag>
            </Col>
            <Col span={10}>
              <Form.Item>
                <span className={styles.label}>State:</span>
                <Select
                  showSearch
                  style={{ width: 160 }}
                  placeholder="Select a state"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={statesOptions}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item>
                <span className={styles.label}>IIBB:</span>
                <Tag color={colorInfo}>{revenueAgency}</Tag>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item>
                <span className={styles.label}>Diversion of Contribution:</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item>
                <span className={styles.label}>Health Insurance:</span>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item>
                <span className={styles.label}>IIBB:</span>
              </Form.Item>
            </Col>
            <Col span={10}>
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
