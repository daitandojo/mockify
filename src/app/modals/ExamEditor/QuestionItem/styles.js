export const questionItemStyle = (hasOptions) => ({
  width: "100%",
  marginBottom: '4px',
  borderRadius: '4px',
  background: hasOptions ? "white" : "lightgray",
  '& .actions': {
    display: 'flex',
    alignItems: 'center',
  },
});

export const questionBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '5px',
  marginBottom: '4px',
  borderRadius: '4px',
  '& .actions': {
    display: 'flex',
    alignItems: 'center',
  },
};

export const optionsContainerStyle = {
  width: "80%",
  marginLeft: "50px",
  backgroundColor: '#f9f9f9',
  padding: '8px',
  borderRadius: '4px',
  marginTop: '10px',
  transition: 'all 0.5s cubic-bezier(0.5, 1, 0.89, 1)', // Gradual easing like syrup dripping
  overflow: 'hidden',
};

export const optionBoxStyle = (isCorrectAnswer) => ({
  color: isCorrectAnswer ? 'green' : 'black',
  background: isCorrectAnswer ? 'rgb(220, 255, 220)' : 'beige',
  fontWeight: isCorrectAnswer ? 'bold' : 'normal',
  padding: '4px',
  marginBottom: '4px',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid lightgray', // Add bottom border
});

export const rationaleBoxStyle = {
  marginTop: '10px',
  padding: '8px',
  backgroundColor: '#f0f0f0',
  borderRadius: '4px',
  fontStyle: 'italic',
};

export const loadingContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  backgroundColor: '#f9f9f9',
  borderRadius: '4px',
  marginTop: '10px',
};
