'use client';

/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Button, Input, message, Space, Tag, theme as antTheme } from 'antd';
import { CopyOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import styles from './MyProfile.module.css';
import CustomCard from '../CustomCard/CustomCard';

interface PersonalData {
  name: string;
  lastname: string;
  cuilCuit: string;
  monotributoCategory: string;
  iIBBStatus: string;
  diversionOfContributionStatus: string;
  healthInsurance: string;
  fiscalPassword: string;
  iIBBType: string;
}

interface AfipData {
  anualBilling: number;
  monthlyBilling: number;
}

function MyProfile() {
  const {
    token: { colorSuccess, colorInfo },
  } = antTheme.useToken();
  const [showFiscalPassword, setShowFiscalPassword] = useState<boolean>(false);

  const personalData: PersonalData = {
    name: 'Gabriel Oscar',
    lastname: 'Uviedo',
    cuilCuit: '24388582282',
    monotributoCategory: 'Category G',
    iIBBStatus: 'Unificado',
    diversionOfContributionStatus: 'Active',
    healthInsurance: 'Swiss Medical',
    fiscalPassword: 'fiscalpassword123',
    iIBBType: 'ARBA',
  };

  const afipData: AfipData = {
    monthlyBilling: 18347.44,
    anualBilling: 4563652.57,
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('Copied to clipboard');
    });
  };

  return (
    <div className={styles.container}>
      <CustomCard title="My Personal Data" bordered={false}>
        <div className={styles.dataRow}>
          <div className={styles.fullName}>
            <span className={styles.label}>Full Name:</span> {personalData.name}{' '}
            {personalData.lastname}
          </div>
          <div className={styles.CUIT}>
            <span className={styles.CUITText}>{personalData.cuilCuit}</span>
            <Button
              className={styles.copyButton}
              type="text"
              onClick={() => {
                navigator.clipboard.writeText(personalData.cuilCuit);
              }}
            >
              <CopyOutlined className={styles.copyIcon} />
            </Button>
          </div>
        </div>
        <Space className={styles.dataRow}>
          <div>
            <span className={styles.label}>Monotributo:</span>
            <span className={styles.contentFont}>
              <Tag color={colorInfo}>{personalData.monotributoCategory}</Tag>- $
              {afipData.anualBilling}/year
            </span>
          </div>
          <div>
            <span className={styles.label}>Ingresos Brutos:</span>
            <Tag color={colorInfo}>{personalData.iIBBType}</Tag>-{' '}
            <span className={styles.registered}>{personalData.iIBBStatus}</span>
          </div>
          <div>
            <span className={styles.label}>Derivación de Aportes:</span>
            <Tag color={colorSuccess}>{personalData.diversionOfContributionStatus}</Tag>
            <span className={styles.contentFont}>- {personalData.healthInsurance}</span>
          </div>
        </Space>
      </CustomCard>
      <CustomCard title="My Payments" bordered={false}>
        <Space className={styles.dataRow}>
          <div>
            <span className={styles.label}>Monotributo:</span>
            <Tag color={colorInfo}>{personalData.monotributoCategory}</Tag>- $
            {afipData.monthlyBilling}/month
          </div>
          <div>
            <span className={styles.label}>IIBB:</span>
            <Tag color={colorInfo}>{personalData.iIBBType}</Tag>-{' '}
            {personalData.iIBBStatus === 'Unificado' ? "Doesn't apply" : '$ /month'}
          </div>
        </Space>
      </CustomCard>
      <CustomCard title="Last Billings" bordered={false}>
        <Space className={styles.dataRow}>something</Space>
      </CustomCard>
      <CustomCard title="My Passwords" bordered={false}>
        <div className={styles.passwordRow}>
          <span className={styles.label}>Fiscal Password:</span>
          <Input.Password
            value={personalData.fiscalPassword}
            className={styles.fiscalPasswordInput}
            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            readOnly
            visibilityToggle
            onClick={() => setShowFiscalPassword(!showFiscalPassword)}
            addonAfter={
              <Button
                onClick={() => handleCopy(personalData.fiscalPassword)}
                icon={<CopyOutlined />}
                type="text"
                size="small"
                className={styles.copyButton}
              />
            }
          />
        </div>
      </CustomCard>
    </div>
  );
}

export default MyProfile;
