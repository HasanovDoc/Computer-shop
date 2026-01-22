import { api } from './api';
import type { Product, BuyRequest, BuyResponse, ProductType } from '../types';

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const res = await api.get<Product[]>('/products');
    return res.data;
  },

  buy: async (payload: BuyRequest): Promise<BuyResponse> => {
    const res = await api.post<BuyResponse>('/sales/buy', payload);
    return res.data;
  }
};

export const productTypesApi = {
  getAll: async (): Promise<ProductType[]> => {
    const res = await api.get<ProductType[]>('/product-types');
    return res.data;
  },
  create: async (name: string): Promise<ProductType> => {
    const res = await api.post<ProductType>('/product-types', { name });
    return res.data;
  }
};
