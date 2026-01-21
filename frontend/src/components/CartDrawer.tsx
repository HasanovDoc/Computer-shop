import { Drawer, Button, List, ListItem, Typography } from '@mui/material';
import { useCartStore } from '../store/cartStore';
import { productsApi } from '../api/productsApi';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const CartDrawer = ({ open, onClose }: Props) => {
  const { items, remove, clear } = useCartStore();

  const buy = async () => {
    await productsApi.buy({ productIds: items.map((i) => i.id) });
    clear();
    alert('Покупка успешна!');
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 300, padding: 16 }}>
        <Typography variant="h6">Корзина</Typography>

        <List>
          {items.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <Button onClick={() => remove(item.id)}>X</Button>
              }
            >
              {item.name}
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          fullWidth
          onClick={buy}
          disabled={!items.length}
        >
          Купить
        </Button>
      </div>
    </Drawer>
  );
};
