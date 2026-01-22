import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, MenuItem, Select, FormControl, InputLabel, Divider, Snackbar, Alert } from '@mui/material';
import { api } from '../api/api';
import { productTypesApi } from '../api/productsApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { ProductType } from '../types';

interface ProductForm {
    name: string;
    productTypeId: number | 'other';
    newCategoryName: string;
    priceBuy: number;
    priceSell: number;
    specs: string;
}

export const AdminPage = () => {
    const queryClient = useQueryClient();
    const [notify, setNotify] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    });

    const { data: categories = [] } = useQuery({
        queryKey: ['productTypes'],
        queryFn: productTypesApi.getAll
    });

    const [productForm, setProductForm] = useState<ProductForm>({
        name: '',
        productTypeId: 1,
        newCategoryName: '',
        priceBuy: 0,
        priceSell: 0,
        specs: '{}'
    });

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let finalTypeId = productForm.productTypeId;

            if (finalTypeId === 'other') {
                if (!productForm.newCategoryName.trim()) throw new Error('Укажите название категории');
                const newType = await productTypesApi.create(productForm.newCategoryName);
                finalTypeId = newType.id;
                await queryClient.invalidateQueries({ queryKey: ['productTypes'] });
            }

            await api.post('/products', {
                name: productForm.name,
                productTypeId: finalTypeId,
                priceBuy: productForm.priceBuy,
                priceSell: productForm.priceSell,
                specs: productForm.specs,
                isSold: false
            });

            setNotify({ open: true, message: 'Товар успешно добавлен', severity: 'success' });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        } catch (error) {
            console.error(error)
            setNotify({ open: true, message: 'Ошибка при сохранении', severity: 'error' });
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>Управление складом</Typography>
                <Box component="form" onSubmit={handleAddProduct} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <TextField 
                        label="Название товара" 
                        required 
                        value={productForm.name} 
                        onChange={e => setProductForm({ ...productForm, name: e.target.value })} 
                    />

                    <FormControl fullWidth>
                        <InputLabel>Категория</InputLabel>
                        <Select
                            value={productForm.productTypeId}
                            label="Категория"
                            onChange={e => setProductForm({ ...productForm, productTypeId: e.target.value as number | 'other' })}
                        >
                            {categories.map((cat: ProductType) => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                            <Divider />
                            <MenuItem value="other"><em>+ Добавить другое</em></MenuItem>
                        </Select>
                    </FormControl>

                    {productForm.productTypeId === 'other' && (
                        <TextField 
                            label="Название новой категории" 
                            required 
                            fullWidth 
                            sx={{ gridColumn: 'span 2' }}
                            value={productForm.newCategoryName}
                            onChange={e => setProductForm({ ...productForm, newCategoryName: e.target.value })}
                        />
                    )}

                    <TextField 
                        label="Цена закупки" 
                        type="number" 
                        required 
                        onChange={e => setProductForm({ ...productForm, priceBuy: Number(e.target.value) })} 
                    />
                    <TextField 
                        label="Цена продажи" 
                        type="number" 
                        required 
                        onChange={e => setProductForm({ ...productForm, priceSell: Number(e.target.value) })} 
                    />

                    <Button type="submit" variant="contained" size="large" sx={{ gridColumn: 'span 2' }}>
                        Сохранить в базу
                    </Button>
                </Box>
            </Paper>

            <Snackbar 
                open={notify.open} 
                autoHideDuration={4000} 
                onClose={() => setNotify({ ...notify, open: false })}
            >
                <Alert severity={notify.severity} variant="filled">{notify.message}</Alert>
            </Snackbar>
        </Box>
    );
};