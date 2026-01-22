import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/productsApi';
import type { Product, ProductsByCategory } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';

export const CatalogPage = () => {
    const { data: products, isLoading, isError } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: productsApi.getAll,
    });

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (isError || !Array.isArray(products)) return <Typography color="error">Ошибка загрузки товаров</Typography>;

    const grouped: ProductsByCategory = products.reduce((acc, product) => {
        const category = product.productType?.name ?? 'Без категории';
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
                    <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
                        {category}
                    </Typography>
                    <Grid container spacing={2}>
                        {items.map((product) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ))}
        </>
    );
};