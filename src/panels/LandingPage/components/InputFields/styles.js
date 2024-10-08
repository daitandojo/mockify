// Fly.io color scheme adaptation
const primaryColor = '#9146ff'; // Distinctive Fly.io purple
const hoverColor = '#773fe7'; // Darker purple for hover effects

// Styles for the input fields container
export const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  marginTop: '2.5vh',
};

// Styles for the input fields
export const inputField = {
  marginBottom: { xs: '20px', sm: '25px', md: '30px' },
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