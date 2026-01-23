import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi, productTypesApi } from '../api/productsApi';
import type { Product, ProductsByCategory } from '../types';
import { ProductCard } from '../components/ProductCard';
import { 
    Grid, Typography, CircularProgress, Box, TextField, 
    Button, Paper, FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';

export const CatalogPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        typeId: '',
        brand: '',
        freq: ''
    });

    const { data: categories = [] } = useQuery({ 
        queryKey: ['productTypes'], 
        queryFn: productTypesApi.getAll
    });

    const { data: filterOptions } = useQuery({ 
        queryKey: ['filterOptions'], 
        queryFn: productsApi.getFilters 
    });

    const { data: products = [], isLoading, isError } = useQuery<Product[]>({
        queryKey: ['products', filters, searchTerm],
        queryFn: () => productsApi.getAll({ 
            ...filters, 
            search: searchTerm 
        }),
    });

    const grouped: ProductsByCategory = products.reduce((acc, product) => {
        const category = product.productType?.name ?? 'Без категории';
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
    }, {} as ProductsByCategory);

    const handleReset = () => {
        setFilters({ typeId: '', brand: '', freq: '' });
        setSearchTerm('');
    };    

    return (
        <Box sx={{ flexGrow: 1 }}>
            <TextField 
                fullWidth 
                label="Поиск по характеристикам..." 
                variant="outlined" 
                sx={{ mb: 3 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Фильтры</Typography>
                        
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Категория</InputLabel>
                            <Select 
                                value={filters.typeId} 
                                label="Категория"
                                onChange={(e) => setFilters({...filters, typeId: e.target.value})}
                            >
                                <MenuItem value="">Все</MenuItem>
                                {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Бренд</InputLabel>
                            <Select 
                                value={filters.brand} 
                                label="Бренд"
                                onChange={(e) => setFilters({...filters, brand: e.target.value})}
                            >
                                <MenuItem value="">Все</MenuItem>
                                {filterOptions?.brands.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Частота (GHz)</InputLabel>
                            <Select 
                                value={filters.freq} 
                                label="Частота (GHz)"
                                onChange={(e) => setFilters({...filters, freq: e.target.value})}
                            >
                                <MenuItem value="">Все</MenuItem>
                                {filterOptions?.freqs.map(f => <MenuItem key={f} value={f}>{f} ГГц</MenuItem>)}
                            </Select>
                        </FormControl>
                        
                        <Button sx={{ mt: 2 }} fullWidth variant="outlined" onClick={handleReset}>
                            Сбросить
                        </Button>
                    </Paper>
                </Grid>

                <Grid size={{xs:12, md: 9}}>
                    {isLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {isError && (
                        <Typography color="error">Ошибка загрузки товаров</Typography>
                    )}

                    {!isLoading && products.length === 0 && (
                        <Typography sx={{ textAlign: 'center', mt: 4 }} color="textSecondary">
                            Товары не найдены
                        </Typography>
                    )}

                    {!isLoading && Object.entries(grouped).map(([category, items]) => (
                        <Box key={category} sx={{ mb: 4 }}>
                            <Typography variant="h5" sx={{ mb: 2 }}>{category}</Typography>
                            <Grid container spacing={2}>
                                {items.map((product) => (
                                    <Grid size={{xs: 12, sm: 6, md: 4}} key={product.id}>
                                        <ProductCard product={product} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};