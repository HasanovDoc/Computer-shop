import ReactDOM from 'react-dom/client';
import App from './App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { useThemeStore } from './store/themeStore';
import { lightTheme, darkTheme } from './theme';

const queryClient = new QueryClient();

// eslint-disable-next-line react-refresh/only-export-components
const Root = () => {
  const mode = useThemeStore(s => s.mode);

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
