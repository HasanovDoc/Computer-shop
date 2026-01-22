import { api } from './api';
import type { Product, BuyRequest, BuyResponse, ProductType } from '../types';

export interface FilterOptions {
  brands: string[];
  freqs: string[];
}

export const productsApi = {
  getAll: async (params?: { 
    typeId?: number | string, 
    brand?: string, 
    freq?: string, 
    search?: string 
  }): Promise<Product[]> => {
    const res = await api.get<Product[]>('/products', { params });
    return res.data;
  },

  getFilters: async (): Promise<FilterOptions> => {
    const res = await api.get<FilterOptions>('/products/filters');
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