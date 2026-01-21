import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeStore } from '../store/themeStore';

export const ThemeToggle = () => {
    const { mode, toggle } = useThemeStore();

    return (
        <IconButton onClick={toggle}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
    );
};
