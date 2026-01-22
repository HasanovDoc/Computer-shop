import { useState } from 'react';
import { CatalogPage } from './pages/CatalogPage';
import { ThemeToggle } from './components/ThemeToggle';
import { CartDrawer } from './components/CartDrawer';
import { useCartStore } from './store/cartStore';
import { Button, Badge, Container, AppBar, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = useCartStore((s) => s.items.length);

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Computer Store
          </Typography>
          <ThemeToggle />
          <Button onClick={() => setIsCartOpen(true)} color="inherit">
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <CatalogPage />
      </Container>

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}