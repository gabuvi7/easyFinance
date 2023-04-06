'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import styles from './FirstLoginModal.module.css';
import { useFetch } from '../../utils/hooks/useFetch';

interface FirstLoginModalProps {
  isOpen: boolean;
  email: string;
}

function FirstLoginModal({ isOpen, email }: FirstLoginModalProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    loading: isLoading,
    error,
    fetchDataManually,
  } = useFetch(`/api/users/${email}`, { method: 'PUT' }, false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    await fetchDataManually({ body: JSON.stringify({ firstLogin: false }) })
      .then(() => {
        router.push('/account');
      })
      .catch(() => {
        console.log('error: ', error);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      showModal();
    }
  }, [isOpen]);

  return (
    <Modal
      title="Welcome to EasyFinance!"
      open={open}
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={handleCancel}
      okText="Continue to profile"
      cancelText="Remind me later"
    >
      <div>
        <p className={styles.welcome_text}>
          On your first login, discover our app for managing personal finances and tax information,
          including your <span className={styles.key_text}>fiscal key</span>.
        </p>
        <p className={styles.welcome_text}>
          Your data is securely encrypted, ensuring a safe and user-friendly experience.
        </p>
        <p className={styles.welcome_text}>
          Before you continue using the app, we need you to complete your personal information. This
          will help us provide a more personalized and secure experience for you. Please take a
          moment to fill out your profile information now.
        </p>
      </div>
    </Modal>
  );
}

export default FirstLoginModal;
