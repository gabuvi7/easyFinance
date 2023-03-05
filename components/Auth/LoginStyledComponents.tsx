import { Button, Card, Divider, Space } from 'antd';
import { styled } from 'styled-components';

interface ILoginCard extends ILoginDivider {
  bg_color?: string;
}

interface ILoginDivider {
  border?: string;
}

interface ILoginSpace {
  $google_btn?: boolean;
}

export const LoginDivider = styled(Divider)<ILoginDivider>`
  &::before,
  &::after {
    border-block-start: ${(props) => `1px solid ${props.border} `} !important;
  }
`;

export const LoginSpace = styled(Space)<ILoginSpace>`
  justify-content: center;
  flex: 1 1 100%;
  flex-wrap: wrap;
  padding: 1rem 0 2rem 0;
  & > div {
    ${(props) => props.$google_btn && 'width: 100%'};
    justify-content: center;
    display: flex;
  }
`;

export const GoogleButton = styled(Button)`
  height: auto;
  max-width: 230px;
  min-width: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LoginCard = styled(Card)<ILoginCard>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  border: ${(props) => `1px solid ${props.border} `} !important;
  background: ${(props) => props.bg_color};
  & > div {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }
`;
