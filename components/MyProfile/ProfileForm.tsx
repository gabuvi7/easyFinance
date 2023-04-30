/* eslint-disable react/no-unstable-nested-components */

'use client';

import { useState, ReactEventHandler } from 'react';
import {
  CheckOutlined,
  CloseOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Input, notification, Row, Select, Switch, Tag, theme } from 'antd';
import { getKeyByValue } from '../../utils';
import { RevenueAgencies, statesValues } from '../../utils/enums/enums';
import { useFetch } from '../../utils/hooks/useFetch';
import { AfipDataResponse } from '../../utils/interfaces/afip.interface';
import { Encrypt } from '../../utils/interfaces/encrypt.interface';
import CustomCard from '../CustomCard/CustomCard';
import styles from './MyProfile.module.css';
import { PersonalData, PersonalDataResponse } from '../../utils/interfaces/user.interface';

function ProfileForm({ userEmail }: { userEmail: string }) {
  const [form] = Form.useForm();
  const [revenueAgency, setRevenueAgency] = useState('');
  const [showFiscalPassword, setShowFiscalPassword] = useState<boolean>(false);
  const simplifiedRegimeRequired = [
    { required: true, message: 'Please input your Simplified Regime' },
  ];
  const healthInsuranceRequired = [
    { required: true, message: 'Please input your Health Insurance' },
  ];
  const ruleNotRequired = [{ required: false, message: '' }];
  const [simplifiedRegimeRules, setSimplifiedRegimeRules] = useState(simplifiedRegimeRequired);
  const [healthInsuranceRules, setHealthInsuranceRules] = useState(ruleNotRequired);

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
  const { fetchDataManually } = useFetch<Encrypt>({
    url: '/api/encrypt',
    options: { method: 'POST' },
    maxRetry: 3,
    doInitialCall: false,
    onError: () => {
      notification.error({
        message: 'Error encrypting data',
        description: 'Could encrypt your fiscal password',
      });
    },
  });

  const { loading: isUploading, fetchDataManually: uploadData } = useFetch<PersonalDataResponse>({
    url: `/api/users/${userEmail}`,
    options: { method: 'PUT' },
    doInitialCall: false,
    onError: () => {
      notification.error({
        message: 'Oh!',
        description: 'An error has occurred. Please try again later.',
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

  const simplifiedRegimeOptions = data?.monotributoCategoriesArray.map((category) => {
    return {
      value: category.category,
      label: `${category.category} - $${category.anualBilling}/year`,
    };
  });

  const onIsSimplifiedRegimeChange = (checked: boolean) => {
    if (checked) {
      setSimplifiedRegimeRules(simplifiedRegimeRequired);
    } else {
      setSimplifiedRegimeRules(ruleNotRequired);
    }
  };

  const onAllocationOfContributionChange = (event: ReactEventHandler) => {
    if (Boolean(event) === true) {
      setHealthInsuranceRules(healthInsuranceRequired);
    } else {
      setHealthInsuranceRules(ruleNotRequired);
    }
  };

  const onFinish = async (values: any) => {
    const formData = { ...values };
    let personalData: Pick<
      PersonalData,
      | 'country'
      | 'cuilCuit'
      | 'allocationOfContribution'
      | 'fiscalPassword'
      | 'healthInsurance'
      | 'iIBBType'
      | 'iIBBStatus'
      | 'monotributoCategory'
      | 'state'
    >;
    if (formData.fiscalPassword) {
      await fetchDataManually(
        {
          body: JSON.stringify({ fiscalPassword: formData.fiscalPassword }),
        },
        {
          onDataReceived: (encryptedFiscalPassword: Encrypt) => {
            formData.fiscalPassword = encryptedFiscalPassword.encryptedData;
          },
        }
      );
    }
    // eslint-disable-next-line prefer-const
    personalData = {
      country: formData.country,
      cuilCuit: formData.cuilCuit,
      allocationOfContribution: Boolean(formData.allocationOfContribution),
      fiscalPassword: formData.fiscalPassword,
      healthInsurance: formData.healthInsurance,
      iIBBType: revenueAgency,
      iIBBStatus: 'Unified',
      monotributoCategory: formData.monotributoCategory,
      state: formData.state,
    };

    await uploadData({
      body: JSON.stringify(personalData),
    });
  };

  return (
    <div className={styles.container}>
      <Form wrapperCol={{ span: 24 }} layout="vertical" form={form} onFinish={onFinish}>
        <CustomCard title="My Personal Data" bordered={false} maxWidth="1000px">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                hasFeedback
                className={styles.formItem}
                labelAlign="left"
                label="CUIT:"
                name="cuilCuit"
                rules={[
                  { required: true, message: 'Please input your CUIT' },
                  { pattern: /^[0-9]{2}-?[0-9]{8}-?[0-9]$/, message: 'Please input a valid CUIT' },
                ]}
              >
                <Input className={styles.formItemElement} placeholder="Enter your CUIT" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                hasFeedback
                className={styles.formItem}
                labelAlign="left"
                label="Are you in Simplified Regime?"
                name="isSimplifiedRegime"
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  onChange={onIsSimplifiedRegimeChange}
                  defaultChecked
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                hasFeedback
                className={styles.formItem}
                labelAlign="left"
                label="Simplified Regime:"
                name="monotributoCategory"
                rules={simplifiedRegimeRules}
              >
                <Select
                  loading={isLoading}
                  showSearch
                  className={styles.formItemElement}
                  placeholder="Select a category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={simplifiedRegimeOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                hasFeedback
                className={styles.formItem}
                labelAlign="left"
                label="Country:"
                name="country"
                initialValue="Argentina"
              >
                <Tag color={colorInfo}>Argentina</Tag>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                hasFeedback
                className={styles.formItem}
                labelAlign="left"
                label="State:"
                name="state"
                rules={[{ required: true, message: 'Please input your state' }]}
              >
                <Select
                  showSearch
                  className={styles.formItemElement}
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
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                hasFeedback
                className={styles.formItem}
                labelAlign="left"
                label="IIBB:"
                name="iIBBStatus"
                initialValue={revenueAgency}
              >
                <Tag color={colorInfo}>{revenueAgency}</Tag>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                hasFeedback
                className={styles.formItem}
                labelAlign="left"
                label="Allocation of Contribution:"
                name="allocationOfContribution"
                rules={[
                  { required: true, message: 'Please input your insurance contribution status' },
                ]}
              >
                <Select
                  className={styles.formItemElement}
                  showSearch
                  placeholder="Select an option"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={onAllocationOfContributionChange}
                  options={[
                    { value: 0, label: 'Inactive' },
                    { value: 1, label: 'Active' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                hasFeedback
                className={styles.formItem}
                labelAlign="left"
                label="Health Insurance:"
                name="healthInsurance"
                rules={healthInsuranceRules}
              >
                <Input
                  className={styles.formItemElement}
                  placeholder="Enter your Health Insurance"
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                hasFeedback
                className={styles.formItem}
                labelAlign="left"
                label="Fiscal Password:"
                name="fiscalPassword"
                rules={[{ required: true, message: 'Please input your Fiscal Password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className={`${styles.fiscalPasswordInput} ${styles.formItemElement}`}
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  placeholder="Enter your Fiscal Password"
                  visibilityToggle
                  onClick={() => setShowFiscalPassword(!showFiscalPassword)}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isUploading}>
                  {isUploading ? 'Saving...' : 'Save'}
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
