'use client';

/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Button, Input, message, Space } from 'antd';
import { CopyOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import styles from './MyProfile.module.css';
import CustomCard from '../CustomCard/CustomCard';

interface PersonalData {
  fullName: string;
  CUIT: string;
  monotributoCategory: string;
  billingAmount: number;
  iIBBStatus: string;
  diversionOfContributionStatus: string;
  healthInsurance: string;
  fiscalPassword: string;
}

function MyProfile() {
  const [showFiscalPassword, setShowFiscalPassword] = useState<boolean>(false);

  const personalData: PersonalData = {
    fullName: 'Gabriel Oscar Uviedo',
    CUIT: '24388582282',
    monotributoCategory: 'Category G',
    billingAmount: 4500000,
    iIBBStatus: 'Unificado',
    diversionOfContributionStatus: 'Registered',
    healthInsurance: 'Swiss Medical',
    fiscalPassword: 'fiscalpassword123',
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
            <span className={styles.label}>Full Name:</span> {personalData.fullName}
          </div>
          <div className={styles.CUIT}>
            <span className={styles.CUITText}>{personalData.CUIT}</span>
            <Button
              className={styles.copyButton}
              type="text"
              onClick={() => {
                navigator.clipboard.writeText(personalData.CUIT);
              }}
            >
              <CopyOutlined className={styles.copyIcon} />
            </Button>
          </div>
        </div>
        <Space className={styles.dataRow}>
          <div>
            <span className={styles.label}>Monotributo:</span>
            {personalData.monotributoCategory} - ${personalData.billingAmount}/year
          </div>
          <div>
            <span className={styles.label}>Ingresos Brutos:</span>
            <span className={styles.registered}>{personalData.iIBBStatus}</span>
          </div>
          <div>
            <span className={styles.label}>Derivación de Aportes:</span>
            <span className={styles.registered}>
              {personalData.diversionOfContributionStatus}
            </span>{' '}
            - {personalData.healthInsurance}
          </div>
        </Space>
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
