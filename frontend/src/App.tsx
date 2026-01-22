import { useState } from 'react';
import { CatalogPage } from './pages/CatalogPage';
import { ThemeToggle } from './components/ThemeToggle';
import { CartDrawer } from './components/CartDrawer';
import { Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { useCartStore } from './store/cartStore';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItemsCount = useCartStore((s) => s.items.length);

  return (
    <div style={{ padding: 20 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <ThemeToggle />
        <Button
          variant="outlined"
          startIcon={<ShoppingCartIcon />}
          onClick={() => setIsCartOpen(true)}
        >
          <Badge badgeContent={cartItemsCount} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </Button>
      </Box>

      <CatalogPage />

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}