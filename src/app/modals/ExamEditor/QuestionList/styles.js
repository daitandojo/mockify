export const questionBoxStyle = {
  display: 'flex',
  padding: '5px',
  marginBottom: '4px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  '& .actions': {
    display: 'flex',
    alignItems: 'center',
  },
};

export const questionListContainerStyle = {
  flexGrow: 1, // Takes up remaining vertical space
  overflowY: 'auto', // Allows scrolling when the content overflows
  padding: '20px',
  backgroundColor: 'beige',
  borderRadius: '8px',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
};