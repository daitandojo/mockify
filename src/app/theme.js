import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color for primary actions
      contrastText: '#ffffff', // White text for contrast
    },
    secondary: {
      main: '#dc004e', // Pink color for secondary actions
      contrastText: '#ffffff', // White text for contrast
    },
    error: {
      main: '#d32f2f', // Standard red for error
    },
    warning: {
      main: '#ffa000', // Amber color for warnings
    },
    info: {
      main: '#0288d1', // Light blue for informational messages
    },
    success: {
      main: '#388e3c', // Green color for success messages
    },
    background: {
      paper: '#ffffff', // White background for paper components
      default: '#f5f5f5', // Light grey for default background
    },
    grey: {
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  shape: {
    borderRadius: 8, // Default border radius for elements like buttons and cards
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.2)',
    '0px 1px 5px rgba(0, 0, 0, 0.2)',
    '0px 3px 8px rgba(0, 0, 0, 0.15)',
    '0px 4px 10px rgba(0, 0, 0, 0.2)', // Added additional shadows up to 24
    '0px 5px 12px rgba(0, 0, 0, 0.2)',
    '0px 6px 15px rgba(0, 0, 0, 0.2)',
    '0px 7px 17px rgba(0, 0, 0, 0.25)',
    '0px 8px 20px rgba(0, 0, 0, 0.25)',
    '0px 9px 22px rgba(0, 0, 0, 0.25)',
    '0px 10px 25px rgba(0, 0, 0, 0.3)',
    '0px 11px 27px rgba(0, 0, 0, 0.3)',
    '0px 12px 30px rgba(0, 0, 0, 0.3)',
    '0px 13px 33px rgba(0, 0, 0, 0.3)',
    '0px 14px 35px rgba(0, 0, 0, 0.3)',
    '0px 15px 38px rgba(0, 0, 0, 0.35)',
    '0px 16px 40px rgba(0, 0, 0, 0.35)',
    '0px 17px 43px rgba(0, 0, 0, 0.4)',
    '0px 18px 45px rgba(0, 0, 0, 0.4)',
    '0px 19px 48px rgba(0, 0, 0, 0.45)',
    '0px 20px 50px rgba(0, 0, 0, 0.45)',
    '0px 21px 53px rgba(0, 0, 0, 0.5)',
    '0px 22px 55px rgba(0, 0, 0, 0.5)',
    '0px 23px 58px rgba(0, 0, 0, 0.55)',
    '0px 24px 60px rgba(0, 0, 0, 0.6)', // Shadows up to elevation 24
  ],
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none', // Remove the default uppercase transformation
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Consistent shadow styling
        },
      },
    },
  },
});

export default theme;
