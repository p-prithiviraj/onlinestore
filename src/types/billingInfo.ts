export interface billingInfoType {
  name: string;
  address: string;
  email: string;
  phone: string;
  creditcard: string;
  [key: string]: string;
}
export interface billingInfoErrorType {
  name: boolean;
  address: boolean;
  email: boolean;
  phone: boolean;
  creditcard: boolean;
  [key: string]: boolean;
}

export interface billingInput {
  type: string;
  id: string;
  placeholder: string;
  errorMessage: string;
}
