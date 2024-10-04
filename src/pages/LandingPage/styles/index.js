// styles.js
import { createTheme } from '@mui/material/styles';

// Fly.io color scheme adaptation
const primaryColor = '#9146ff'; // Distinctive Fly.io purple
const hoverColor = '#773fe7'; // Darker purple for hover effects

export const containerStyle = {
  padding: { xs: '5vh', sm: '8vh', md: '10vh' },
  maxWidth: { xs: '90%', sm: '800px', md: '1000px' },
  backgroundColor: '#f9f9f9',
  borderRadius: '16px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  marginTop: { xs: '5vh', sm: '8vh', md: '10vh' },
  marginBottom: { xs: '30px', sm: '40px', md: '50px' },
};

export const headerText = {
  textAlign: 'center',
  color: primaryColor,
  fontFamily: "'Pacifico', cursive",
  fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
  fontWeight: 1400,
  marginBottom: { xs: '10px', sm: '15px', md: '20px' },
};

export const headerSubText = {
  textAlign: 'center',
  color: primaryColor,
  fontFamily: "'Times New Roman'",
  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
  fontWeight: 100,
  marginBottom: { xs: '40px', sm: '55px', md: '70px' },
};

export const inputField = {
  marginBottom: { xs: '10px', sm: '15px', md: '20px' },
  width: '100%',
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
  },
  '& label': {
    color: primaryColor,
  },
  '& label.Mui-focused': {
    color: primaryColor,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: primaryColor,
    },
    '&:hover fieldset': {
      borderColor: hoverColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: primaryColor,
    },
  },
};

export const generateButton = {
  backgroundColor: primaryColor,
  color: 'white',
  fontWeight: 'bold',
  padding: { xs: '8px 16px', sm: '10px 24px', md: '10px 28px' },
  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.3rem' },
  textTransform: 'none',
  transition: 'all 0.4s ease-in-out',
  borderRadius: '8px',
  width: { xs: '100%', sm: 'auto' },
  marginBottom: { xs: '10px', sm: '0' },
  marginRight: { sm: '10px', md: '15px' },
  '&:hover': {
    backgroundColor: hoverColor,
    transform: 'scale(1.05)',
  },
  '&:disabled': {
    backgroundColor: '#cccccc',
    color: '#666666',
  },
};
