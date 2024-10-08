import { createTheme } from '@mui/material/styles';

const primaryColor = '#9146ff'; // Fly.io inspired purple
const hoverColor = 'lightgray'; // Darker purple for hover effects
const backgroundColor = '#f9f9f9'; // Light background for general elements

export const containerStyle = {
  backgroundColor: primaryColor,
  color: '#ffffff',
  boxShadow: 'none',
  borderBottom: '2px solid #f0f0f0',
};

export const toolbarStyle = {
  minHeight: '56px', // Reduce the height of the NavBar
  paddingLeft: '24px',
  paddingRight: '24px',
};

export const brandStyle = {
  fontFamily: "'Pacifico', cursive",
  fontSize: '1.8rem',
  color: '#ffffff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  marginRight: '2rem',
};

export const linkStyle = {
  fontSize: '1.1rem', // Slightly larger font size for better readability
  fontWeight: 600,
  marginLeft: '1.5rem',
  marginRight: '1.5rem',
  textTransform: 'none',
  color: '#ffffff',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: hoverColor,
  },
};

export const iconButtonStyle = {
  marginLeft: '0.5rem',
  color: '#ffffff',
};

export const rightSideContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

export const dropdownMenuStyle = {
  '& .MuiMenu-paper': {
    backgroundColor: '#ffffff',
    color: primaryColor,
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  '& .MuiMenuItem-root': {
    '&:hover': {
      backgroundColor: hoverColor,
      color: '#ffffff',
    },
  },
};
