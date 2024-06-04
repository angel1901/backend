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

export interface DataProduct {
  name: string;
  description: string;
  value: string;
  user_creator_id: string;
  url_image: string;
}

export interface DataOrder {
  value: number;
  name: string;
  user_creator_id: string;
}

export interface DataOrderLine {
  orderId: string;
  productId: string;
  user_creator_id: string;
  value: number;
  quantity: number;
}
