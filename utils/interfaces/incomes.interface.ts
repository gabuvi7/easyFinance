export interface IncomeByDate {
  incomeSources: IncomeData[];
  month: Date;
  totalIncome: number;
}

export interface IncomeByDateResponse {
  incomeByDateArray: IncomeByDate[];
}

export interface IncomeData {
  id?: number;
  amount: number;
  sourceName: string;
}

export interface IncomeUploadResponse {
  message: string;
}
