import React from 'react';
import MaterialModal from '@material-ui/core/Modal';

import { useStyles } from './modal.style';

type ModalProps = {
  open: boolean,
  onClose: () => void,
  children: JSX.Element | Array<JSX.Element>
};

export function Modal(props: ModalProps) {
  const {
    open,
    onClose,
    children,
  } = props;

  const classes = useStyles();

  return (
    <MaterialModal
    open={open}
    onClose={onClose}
    >
      <div className={classes.paper}>
        {children}
      </div>
    </MaterialModal>
  );
}
