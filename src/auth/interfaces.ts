export interface DataUser {
  email: string;
  hashed_password: string;
  name: string;
  last_name: string;
}

export interface ComparePasswords {
  password: string;
  hashed_password: string;
}

export interface SignToken {
  id: string;
  email: string;
}
