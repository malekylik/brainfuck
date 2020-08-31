import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
    overflow: 'auto',
    width: '80%',
    minHeight: 200,
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
