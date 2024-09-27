export interface User {
  login: string;
  phone: string;
  creationDate: string;
  status: UserStatus;
  email: string;
  role: string;
  changeDate: string;
  selected?: boolean;
  id?: number;
  hasESignature?: boolean;
}

export type UserStatus = 'Активен' | 'Заблокирован' | 'Не выбран';
