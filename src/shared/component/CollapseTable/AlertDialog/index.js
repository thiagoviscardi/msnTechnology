import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { List, ListItem, Typography, LinearProgress } from '@material-ui/core';

const AlertDialog = ({
  title,
  description,
  buttonConfirmLabel = 'Confirmar',
  buttonDismissLabel = 'Cancelar',
  isOpen,
  handleClose,
  onConfirm,
  isLoading,
}) => {
  const renderDesc =
    typeof description === 'string' ? (
      <DialogContentText id="alert-dialog-description">
        {description}
      </DialogContentText>
    ) : (
      <List>
        {description.map((desc) => (
          <ListItem key={desc.id}>
            <Typography>{`${desc.name}: ${desc.value}`}</Typography>
          </ListItem>
        ))}
      </List>
    );
  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {isLoading && <LinearProgress />}
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{renderDesc}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {buttonDismissLabel}
        </Button>
        <Button onClick={onConfirm} style={{ color: 'red' }} autoFocus>
          {buttonConfirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
