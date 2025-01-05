export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  name: string;
  password: string;
  username: string;
  email: string;
  createAt: Date;
  updateAt: Date;
  avatarUrl: null | string;
  hashRt: never;
  tokens: Tokens;
}
