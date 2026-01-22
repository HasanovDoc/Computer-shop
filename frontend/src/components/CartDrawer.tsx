import { Drawer, Button, List, ListItem, ListItemText, Typography, Box, Divider } from '@mui/material';
import { useCartStore } from '../store/cartStore';
import { productsApi } from '../api/productsApi';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
    open: boolean;
    onClose: () => void;
};

export const CartDrawer = ({ open, onClose }: Props) => {
    const { items, remove, clear } = useCartStore();
    const queryClient = useQueryClient();

    const total = items.reduce((sum, i) => sum + i.priceSell, 0);

    const handleBuy = async () => {
        try {
            await productsApi.buy({ productIds: items.map(i => i.id) });
            await queryClient.invalidateQueries({ queryKey: ['products'] });
            clear();
            onClose();
            // alert('Спасибо за покупку!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 320, p: 3 }}>
                <Typography variant="h5" gutterBottom>Корзина</Typography>
                <Divider sx={{ my: 2 }} />
                <List>
                    {items.map((item) => (
                        <ListItem key={item.id} divider secondaryAction={
                            <Button color="error" onClick={() => remove(item.id)}>Удалить</Button>
                        }>
                            <ListItemText primary={item.name} secondary={`${item.priceSell} ₽`} />
                        </ListItem>
                    ))}
                </List>
                {items.length > 0 ? (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6">Итого: {total} ₽</Typography>
                        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleBuy}>
                            Оформить заказ
                        </Button>
                    </Box>
                ) : (
                    <Typography color="text.secondary">Корзина пуста</Typography>
                )}
            </Box>
        </Drawer>
    );
};