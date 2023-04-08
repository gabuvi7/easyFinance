/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unstable-nested-components */

'use client';

import React, { useState } from 'react';
import { Button, Input, Space, Tag, theme as antTheme } from 'antd';
import { CopyOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { DocumentData } from 'firebase-admin/firestore';
import styles from './MyProfile.module.css';
import CustomCard from '../CustomCard/CustomCard';
import { PersonalData } from '../../utils/interfaces/user.interface';
import { AfipData } from '../../utils/interfaces/afip.interface';
import { handleCopy } from '../../utils';

type MyProfileArg = {
  personalData: PersonalData | DocumentData;
  afipData?: AfipData | DocumentData;
};

function MyProfile({ personalData, afipData }: MyProfileArg) {
  const {
    token: { colorSuccess, colorInfo },
  } = antTheme.useToken();
  const [showFiscalPassword, setShowFiscalPassword] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <CustomCard title="My Personal Data" bordered={false}>
        <div className={styles.dataRow}>
          <div className={styles.fullName}>
            <span className={styles.label}>Full Name:</span> {personalData?.name}{' '}
            {personalData?.lastname}
          </div>
          <div className={styles.CUIT}>
            <span className={styles.CUITText}>{personalData?.cuilCuit}</span>
            <Button
              className={styles.copyButton}
              type="text"
              onClick={() => handleCopy(personalData?.cuilCuit)}
            >
              <CopyOutlined className={styles.copyIcon} />
            </Button>
          </div>
        </div>
        <Space className={styles.dataRow}>
          <div>
            <span className={styles.label}>Monotributo:</span>
            <span className={styles.contentFont}>
              <Tag color={colorInfo}>{personalData?.monotributoCategory}</Tag>- $
              {afipData?.anualBilling}/year
            </span>
          </div>
          <div>
            <span className={styles.label}>IIBB:</span>
            <Tag color={colorInfo}>{personalData?.iIBBType}</Tag>-{' '}
            <span className={styles.registered}>{personalData?.iIBBStatus}</span>
          </div>
          <div>
            <span className={styles.label}>Diversion of Contribution:</span>
            <Tag color={colorSuccess}>
              {personalData?.diversionOfContribution ? 'Active' : 'Inactive'}
            </Tag>
            <span className={styles.contentFont}>- {personalData?.healthInsurance}</span>
          </div>
          <div>
            <span className={styles.label}>Health Insurance:</span>
            <Tag color={colorSuccess}>{personalData?.healthInsurance}</Tag>
            <span className={styles.contentFont}>- {personalData?.healthInsurance}</span>
          </div>
        </Space>
      </CustomCard>
      <CustomCard title="My Payments" bordered={false}>
        <Space className={styles.dataRow}>
          <div>
            <span className={styles.label}>Monotributo:</span>
            <Tag color={colorInfo}>{personalData?.monotributoCategory}</Tag>-
            <span> ${afipData?.monthlyPayment}/month</span>
          </div>
          <div>
            <span className={styles.label}>IIBB:</span>
            <Tag color={colorInfo}>{personalData?.iIBBType}</Tag>-{' '}
            {personalData?.iIBBStatus === 'Unificado' ? "Doesn't apply" : '$ /month'}
          </div>
        </Space>
      </CustomCard>
      <CustomCard title="My Passwords" bordered={false}>
        <div className={styles.passwordRow}>
          <span className={styles.label}>Fiscal Password:</span>
          <Input.Password
            value={personalData?.fiscalPassword}
            className={styles.fiscalPasswordInput}
            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            readOnly
            visibilityToggle
            onClick={() => setShowFiscalPassword(!showFiscalPassword)}
            addonAfter={
              <Button
                onClick={() => handleCopy(personalData?.fiscalPassword)}
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
