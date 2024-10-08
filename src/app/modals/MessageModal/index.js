import React from 'react';
import { Modal, Typography, Box, Button, List, ListItem } from '@mui/material';
import useStyles from './styles';

const MessageModal = ({ onClose, content }) => {
  const classes = useStyles();

  const handleProceed = () => {
    onClose();
  };

  return (
    <Modal
      open={true}
      onClose={handleProceed}
      aria-labelledby="message-modal-title"
      aria-describedby="message-modal-description"
      className={classes.modalContainer}
    >
      <Box className={classes.modalContent}>
        {content.map((item, idx) => {
          switch (item.type) {
            case "title":
              return (
                <Typography key={idx} variant="h2" component="h2" className={classes.title}>
                  {item.content}
                </Typography>
              );
            case "header":
              return (
                <Typography key={idx} variant="h4" component="h2" className={classes.header}>
                  {item.content}
                </Typography>
              );
            case "subheader":
              return (
                <Typography key={idx} variant="h6" component="h3" className={classes.subheader}>
                  {item.content}
                </Typography>
              );
            case "paragraph":
              return (
                <Typography key={idx} variant="body1" className={classes.paragraph}>
                  {item.content}
                </Typography>
              );
            case "quote":
              return (
                <Typography key={idx} variant="body2" className={classes.quote}>
                  "{item.content}"
                </Typography>
              );
            case "bulletPoints":
              return (
                <List key={idx} className={classes.bulletPoints}>
                  {item.content.map((point, i) => (
                    <ListItem key={i}>{point}</ListItem>
                  ))}
                </List>
              );
            default:
              return null;
          }
        })}

        <Button variant="contained" className={classes.proceedButton} onClick={handleProceed}>
          Proceed
        </Button>
      </Box>
    </Modal>
  );
};

export default MessageModal;
