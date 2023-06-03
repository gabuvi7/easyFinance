export interface Encrypt {
  encryptedData: string;
}

export interface DecryptResponse {
  decryptedData: string;
}

export interface DecryptDataRequest {
  fiscalPassword: string;
}
