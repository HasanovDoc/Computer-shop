import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/productsApi';
import type { Product, ProductsByCategory } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Grid, Typography } from '@mui/material';

export const CatalogPage = () => {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });
  
  const grouped: ProductsByCategory = products.reduce((acc, product) => {
    const category = product.productType.name;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(product);
    return acc;
  }, {} as ProductsByCategory);

  return (
    <>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <Typography variant="h5" sx={{ mt: 3 }}>
            {category}
          </Typography>

          <Grid container spacing={2}>
            {items.map((product) => (
              <Grid size={{ xs: 12, md: 4 }} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </>
  );
};
