export interface IncomeByDate {
  incomeSources: IncomeData[];
  totalIncome: number;
}

export interface IncomesResponse {
  incomeData: IncomeByDate[];
}

export interface IncomeData {
  id: number;
  amount: number;
  sourceName: string;
  date: string;
  currency: string;
}

export interface IncomeUploadResponse {
  message: string;
}

export interface ITabsProps {
  email: string;
}

export interface IFlattenedIncomeData extends IncomeData {
  totalIncome: number;
}
