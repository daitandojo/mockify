// styles.js
export const modalStyles = {
  position: 'fixed',
  zIndex: 3,
  top: '50%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  height: "80vh",
  width: 'auto',
  minWidth: '40vw',
  backgroundColor: '#fff',
  padding: '60px 20px 40px 20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  fontFamily: "'Arial', sans-serif",
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
};

export const headerStyles = {
  textAlign: 'center',
  marginBottom: '20px',
  borderBottom: '1px solid #ccc',
  paddingBottom: '10px',
};

export const treeContainerStyles = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center', // Center the tree horizontally
};

export const buttonStyles = {
  alignSelf: 'flex-end', // Move the button to the bottom right
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '20px',
};

export const treeItemStyles = {
  padding: '5px 0',
};

export const checkboxStyles = {
  marginRight: '8px',
};

export const expandButtonStyles = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  marginRight: '8px',
  fontSize: '12px',
  padding: '0',
};
