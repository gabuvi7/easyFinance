import { message } from 'antd';

export * from './const/menu';
export * from './interfaces/children.interface';

export function getKeyByValue(object: any, value: any) {
  return Object.keys(object).find((key) => object[key] === value);
}
export const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    message.success('Copied to clipboard');
  });
};
