import React from 'react';
import { Modal } from '@material-ui/core';
import style from './style';

const Spreadsheet = () => {
  const classes = style();
  return (
    <Modal open={true} className={classes.container}>
      <div>TESTE</div>
    </Modal>
  );
};

export default Spreadsheet;
