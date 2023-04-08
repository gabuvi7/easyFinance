export interface AfipData {
  anualBilling: number;
  monthlyPayment: number;
  category?: string;
}

export interface AfipDataResponse {
  monotributoCategoriesArray: AfipData[];
}
