const primaryColor = '#9146ff';
const hoverColor = '#773fe7';
const backgroundColor = '#f9f9f9';

export const headerContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '20px',
  mb: 2,
};

export const topicTextStyle = {
  color: primaryColor,
  fontWeight: 'bold',
  fontFamily: "'Times New Roman'",
  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
  mb: 1,
};

export const levelTextStyle = {
  fontFamily: "'Times New Roman'",
  fontStyle: 'italic',
  color: '#555',
  fontWeight: '400',
  fontSize: { xs: '1rem', sm: '1.2rem' },
};

export const editButtonStyle = {
  color: 'gray',
  '&:hover': {
    color: hoverColor,
  },
};

export const deleteButtonStyle = {
  color: 'red',
  '&:hover': {
    color: hoverColor,
  },
};