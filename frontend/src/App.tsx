import { useState } from 'react';
import { CatalogPage } from './pages/CatalogPage';
import { AdminPage } from './pages/AdminPage';
import { ThemeToggle } from './components/ThemeToggle';
import { CartDrawer } from './components/CartDrawer';
import { useAuthStore } from './store/authStore';
import { useCartStore } from './store/cartStore';
import { Button, Badge, AppBar, Toolbar, Typography, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ComputerIcon from '@mui/icons-material/Computer';

export default function App() {
  const [view, setView] = useState<'catalog' | 'admin'>('catalog');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, login, logout } = useAuthStore();
  const cartCount = useCartStore((s) => s.items.length);

  return (
    <>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => setView('catalog')} style={{ cursor: 'pointer' }}>
            <ComputerIcon />
            Computer Shop
          </Typography>
          
          <ThemeToggle />

          {user?.role === 'Admin' && (
            <Button startIcon={<AdminPanelSettingsIcon />} onClick={() => setView(view === 'admin' ? 'catalog' : 'admin')}>
              {view === 'admin' ? 'В каталог' : 'Админ'}
            </Button>
          )}

          {!user ? (
            <Button onClick={() => login('admin', 'Admin', 'token')}>Войти (Admin)</Button>
          ) : (
            <Button onClick={logout}>Выйти ({user.username})</Button>
          )}

          <Button onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {view === 'admin' && user?.role === 'Admin' ? <AdminPage /> : <CatalogPage />}
      </Container>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}