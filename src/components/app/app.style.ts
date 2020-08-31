import { makeStyles } from '@material-ui/core/styles';

export const useWrapperStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
  },
});

export const useButtonStyles = makeStyles({
  root: {
    minWidth: '60px',
    minHeight: '20px',
  },
});

export const useTextareaStyles = makeStyles({
  root: {
    minWidth: '75%',
    height: '100%'
  },

  textareaWrapper: {
    height: '90%',
    paddingRight: '16px',
    fontSize: 0,
  },

  textarea: {
    width: '100%',
    resize: 'none',
  },

  textareaProgram: {
    height: '60%',
  },

  textareaOutput: {
    height: '35%',
    marginTop: '8px'
  },
});

export const useModalStyles = makeStyles({
  code: {
    whiteSpace: 'pre-wrap',
  },
  loader: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
