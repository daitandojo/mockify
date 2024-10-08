import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: "90%",
    maxWidth: '1000px',
    height: "90%",
    maxHeight: "900px",
    backgroundColor: '#fff',
    padding: theme.spacing(6),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    position: 'relative',
    textAlign: 'left',
    outline: 'none',
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: theme.spacing(2),
    color: '#9146ff',
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "12px solid darkgray"
  },
  header: {
    fontSize: '1.8rem',
    marginBottom: theme.spacing(2),
    color: '#9146ff',
  },
  subheader: {
    fontSize: '1.4rem',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: 1.5,
    marginBottom: theme.spacing(3),
  },
  quote: {
    fontStyle: 'italic',
    marginBottom: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  bulletPoints: {
    fontFamily: '"Times New Roman"',
    listStyleType: 'disc',
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  proceedButton: {
    backgroundColor: '#9146ff',
    color: '#fff',
    padding: theme.spacing(1.5, 3),
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    '&:hover': {
      backgroundColor: '#773fe7',
    },
  },
}));

export default useStyles;
