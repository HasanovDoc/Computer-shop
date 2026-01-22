export type ProductType = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  productTypeId: number;
  productType: ProductType;
  priceBuy: number;
  priceSell: number;
  specs: Record<string, unknown>;
  isSold: boolean;
};

export type CartItem = Product;

export type BuyRequest = {
  productIds: number[];
};

export type BuyResponse = {
  success: boolean;
  totalAmount: number;
};

export interface User {
    id?: number;
    username: string;
    passwordHash: string;
    role: 'Admin' | 'Customer';
}

export type ProductsByCategory = Record<string, Product[]>;
