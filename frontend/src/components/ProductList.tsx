import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import type { Product } from '../types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export const ProductList = () => {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Price Sell</TableCell>
          <TableCell>Is Sold</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.productType.name}</TableCell>
            <TableCell>{p.priceSell}</TableCell>
            <TableCell>{p.isSold ? 'Yes' : 'No'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
