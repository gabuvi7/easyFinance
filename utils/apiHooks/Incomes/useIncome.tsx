import { notification } from 'antd';
import { useFetch } from '@/utils/hooks/useFetch';
import { IncomesResponse } from '@/utils/interfaces/incomes.interface';
import { IIIBBResponse } from '@/utils/interfaces/iibb.interface';

type UsePostIncomeProps = {
  email: string;
  docDate: string;
};

export function usePostIncome({ email, docDate }: UsePostIncomeProps) {
  return useFetch<IncomesResponse>({
    url: `/api/incomes/byDate/${email}/${docDate}`,
    options: { method: 'POST' },
    doInitialCall: false,
    onSuccess: () => {
      notification.success({
        message: 'Success!',
        description: 'Income has been added successfully.',
      });
    },
    onError: () => {
      notification.error({
        message: 'Oh!',
        description: 'An error has occurred. Please try again later.',
      });
    },
  });
}

type UseGetIncomesProps = Pick<UsePostIncomeProps, 'email'>;

export function useGetIncomes({ email }: UseGetIncomesProps) {
  return useFetch<IncomesResponse>({
    url: `/api/incomes/${email}`,
    options: { method: 'GET' },
    doInitialCall: true,
    onError: () => {
      notification.error({
        message: 'Oh!',
        description: 'An error has occurred. Please try again later.',
      });
    },
  });
}

type UseGetIIBBProps = {
  type: string;
};

export function useGetIIBB({ type }: UseGetIIBBProps) {
  return useFetch<IIIBBResponse>({
    url: `/api/iibb/${type}`,
    options: { method: 'GET' },
    doInitialCall: true,
    onError: () => {
      notification.error({
        message: 'Oh!',
        description: 'An error has occurred. Please try again later.',
      });
    },
  });
}
