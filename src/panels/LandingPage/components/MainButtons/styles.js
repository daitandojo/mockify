// Fly.io color scheme adaptation
const primaryColor = '#9146ff'; // Distinctive Fly.io purple
const hoverColor = '#773fe7'; // Darker purple for hover effects

export const buttonStyles = {
  backgroundColor: primaryColor,
  color: 'white',
  fontWeight: 'bold',
  padding: { xs: '8px 16px', sm: '10px 24px', md: '12px 28px' },
  margin: { xs: '4px', sm: '5px', md: '6px' },
  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.3rem' },
  textTransform: 'none',
  transition: 'all 0.4s ease-in-out',
  borderRadius: '8px',
  width: { xs: '100%', sm: 'auto' },
  '&:hover': {
    backgroundColor: hoverColor,
    transform: 'scale(1.05)',
  },
  '&:disabled': {
    backgroundColor: '#cccccc',
    color: '#666666',
  },
};
