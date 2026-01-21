import { api } from './api';
import type { Product, BuyRequest, BuyResponse } from '../types';

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
