import { Card, CardContent, Button, Typography } from '@mui/material';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';

type Props = {
    product: Product;
};

export const ProductCard = ({ product }: Props) => {
    const add = useCartStore((s) => s.add);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>{product.priceSell} ₽</Typography>

                <Button
                    variant="contained"
                    onClick={() => add(product)}
                    disabled={product.isSold}
                >
                    {!product.isSold ? 'В корзину' : 'Нет в наличии'}
                </Button>
            </CardContent>
        </Card>
    );
};
