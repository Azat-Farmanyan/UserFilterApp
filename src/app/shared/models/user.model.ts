export interface User {
  login: string;
  phone: string;
  creationDate: string;
  status: string;
  email: string;
  role: string;
  changeDate: string;
  selected?: boolean;
  id?: number;
  hasESignature?: boolean;
}
