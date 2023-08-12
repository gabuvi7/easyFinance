/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unstable-nested-components */

'use client';

import React, { useState } from 'react';
import { Button, Input, notification, Space, Tag, theme as antTheme } from 'antd';
import { CopyOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { DocumentData } from 'firebase-admin/firestore';
import styles from './MyProfile.module.css';
import CustomCard from '../CustomCard/CustomCard';
import { PersonalData } from '../../utils/interfaces/user.interface';
import { AfipData } from '../../utils/interfaces/afip.interface';
import { handleCopy } from '../../utils';
import { useFetch } from '../../utils/hooks/useFetch';
import { DecryptResponse } from '../../utils/interfaces/encrypt.interface';

type MyProfileArg = {
  personalData: PersonalData | DocumentData;
  afipData?: AfipData | DocumentData;
};

function MyProfile({ personalData, afipData }: MyProfileArg) {
  const {
    token: { colorSuccess, colorInfo },
  } = antTheme.useToken();
  const [showFiscalPassword, setShowFiscalPassword] = useState<boolean>(false);
  const { data: decryptedFiscalPassword, loading: isLoadingFiscalPassword } =
    useFetch<DecryptResponse>({
      url: '/api/decrypt',
      options: {
        method: 'POST',
        body: JSON.stringify({ fiscalPassword: personalData.fiscalPassword }),
      },
      maxRetry: 5,
      doInitialCall: true,
      onError: () => {
        notification.error({
          message: 'Error decrypting data',
          description: 'Couldn`t decrypt your fiscal password',
        });
      },
    });

  const getMonthlyBilling = (anualBilling: number) => {
    return Number.parseFloat((anualBilling / 12).toFixed(2));
  };

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
            <span className={styles.label}>Simplified Regime:</span>
            <span className={styles.contentFont}>
              <Tag color={colorInfo}>{personalData?.monotributoCategory}</Tag>- $
              {afipData?.anualBilling}/year
            </span>{' '}
            <span className={styles.contentFont}>
              ${getMonthlyBilling(afipData?.anualBilling)}/month
            </span>
          </div>
          <div>
            <span className={styles.label}>IIBB:</span>
            <Tag color={colorInfo}>{personalData?.iIBBType}</Tag>-{' '}
            <span className={styles.registered}>{personalData?.iIBBStatus}</span>
          </div>
          <div>
            <span className={styles.label}>Allocation of Contributions:</span>
            <Tag color={colorSuccess}>
              {personalData?.allocationOfContribution ? 'Active' : 'Inactive'}
            </Tag>
          </div>
          <div>
            <span className={styles.label}>Health Insurance:</span>
            <Tag color={colorSuccess}>{personalData?.healthInsurance}</Tag>
          </div>
        </Space>
      </CustomCard>
      <CustomCard title="My Payments" bordered={false}>
        <Space className={styles.dataRow}>
          <div>
            <span className={styles.label}>Simplified Regime:</span>
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
            value={decryptedFiscalPassword?.decryptedData ?? ''}
            className={styles.fiscalPasswordInput}
            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            readOnly
            visibilityToggle
            onClick={() => setShowFiscalPassword(!showFiscalPassword)}
            addonAfter={
              <Button
                loading={isLoadingFiscalPassword}
                onClick={() => handleCopy(decryptedFiscalPassword?.decryptedData ?? '')}
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
