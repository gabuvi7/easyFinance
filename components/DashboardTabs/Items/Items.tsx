import { ITabsProps } from '@/utils/interfaces/incomes.interface';
import Income from './Income/Income';

export const Items = ({ email }: ITabsProps) => [
  {
    label: 'Income',
    key: '1',
    children: <Income email={email} />,
  },
  {
    label: 'Expense',
    key: '2',
    children: 'Content of Tab Pane 2',
  },
  {
    label: 'Investment',
    key: '3',
    children: 'Content of Tab Pane 3',
  },
  {
    label: 'Cryptocurrencies',
    key: '4',
    children: 'Content of Tab Pane 4',
  },
];
