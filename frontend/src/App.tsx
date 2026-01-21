import { CatalogPage } from './pages/CatalogPage';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <ThemeToggle />
      <CatalogPage />
    </div>
  );
}
