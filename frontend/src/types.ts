export type Product = {
  id: number;
  name: string;
  productTypeId: number;
  priceBuy: number;
  priceSell: number;
  specs: Record<string, unknown>;
  isSold: boolean;
  productType: {
    id: number;
    name: string;
  };
}
