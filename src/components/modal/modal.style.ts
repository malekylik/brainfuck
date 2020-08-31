import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
    overflow: 'auto',
    width: '80%',
    maxHeight: '90%',
    maxWidth: 1440,
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: 5,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));
