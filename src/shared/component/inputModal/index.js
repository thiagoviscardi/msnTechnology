import React, { useCallback, useRef } from 'react';
import { useStyles } from './styles';
import { Modal, IconButton, Icon, Paper } from '@material-ui/core';
import SearchInput from 'shared/component/forms/SearchInput';

export default function InputModal({
  value,
  open,
  handleClose,
  onchange,
  placeholder,
}) {
  const classes = useStyles();
  const searchRef = useRef('');
  const [search, setSearch] = React.useState(value ? value : '');

  let _timer,
    _timeOut = 500;

  const handleSearchChange = useCallback((e) => {
    e.preventDefault();
    setSearch(e.target.value);
    searchRef.current = e.target.value;
  });

  const handleKeyUp = useCallback((e) => {
    clearTimeout(_timer);
    if (e.keyCode == 13) {
      // close on ENTER key
      onchange(searchRef.current);
    } else {
      // send api requests
      _timer = window.setTimeout(function () {
        onchange(searchRef?.current);
      }, _timeOut);
    }
  }, []);
  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      className={classes.modal}
      open={open}
      onClose={handleClose}
    >
      <Paper className={classes.paperContainer}>
        <div style={{ width: '100%' }}>
          <SearchInput
            value={search}
            placeholder={placeholder}
            onChange={handleSearchChange}
            onKeyUp={handleKeyUp}
            style={{
              width: '90%',
              height: 48,
              top: 0,
              padding: 5,
            }}
          />
        </div>

        <IconButton onClick={handleClose}>
          <Icon>close</Icon>
        </IconButton>
      </Paper>
    </Modal>
  );
}
