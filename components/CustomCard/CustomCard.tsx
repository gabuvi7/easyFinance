'use client';

/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */
import React, { FC } from 'react';
import { Card, theme as antTheme } from 'antd';
import { CardProps } from 'antd/lib/card';
import styles from './CustomCard.module.css';

interface CustomCardProps extends CardProps {
  title?: string;
  defaultStyles?: boolean;
  bg?: string;
  borderColor?: string;
}

const CustomCard: FC<CustomCardProps> = ({
  title,
  defaultStyles = true,
  children,
  bg,
  borderColor,
  ...props
}) => {
  const {
    token: { colorInfoBorder, colorBgElevated },
  } = antTheme.useToken();
  const cardStyle = defaultStyles ? { border: colorInfoBorder, background: colorBgElevated } : {};

  return (
    <Card className={styles.card} title={title} bordered={false} style={cardStyle} {...props}>
      {children}
    </Card>
  );
};

export default CustomCard;
