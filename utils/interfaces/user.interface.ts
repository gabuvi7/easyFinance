export interface PersonalData {
  name: string;
  lastname: string;
  cuilCuit: string;
  monotributoCategory: string;
  iIBBStatus: string;
  allocationOfContribution: boolean;
  healthInsurance: string;
  fiscalPassword: string;
  iIBBType: string;
  firstLogin: boolean;
  country: string;
  state: string;
}

export interface PersonalDataResponse {
  message: string;
}
