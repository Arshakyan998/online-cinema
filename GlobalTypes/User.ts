export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  name: string;
  password: string;
  fullName: string;
  email: string;
  createAt: Date;
  updateAt: Date;
  avatarUrl: null | string;
  hashRt: never;
  tokens: Tokens;
}

export type EditUser = Pick<User, 'name' | 'fullName' | 'password'>;

export interface SuccessUpdate {
  status: number;
  message: string;
}
