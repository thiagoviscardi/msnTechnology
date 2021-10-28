import React from 'react';
import { Typography, Icon, Divider, IconButton } from '@material-ui/core';
import { useStyles, FormContainer } from './styles';

const SelectedDocs = ({ item, deleteDoc }) => {
  const classes = useStyles();

  const handleOpenFile = () => {
    window.open(item?.doc_url, '_blank').focus();
  };

  function download(url, filename) {
    fetch(url).then(function (t) {
      return t.blob().then((b) => {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.setAttribute('download', filename);
        a.click();
      });
    });
  }

  return (
    <div>
      <FormContainer>
        <div className={classes.columnContainer}>
          <Icon className={classes.docIcon}>description</Icon>
          <Typography className={classes.docName}>
            {item?.description || item?.name}
          </Typography>
        </div>
        <div>
          <IconButton disabled={!item?.doc_url} onClick={handleOpenFile}>
            <Icon>remove_red_eye</Icon>
          </IconButton>
          <IconButton
            disabled={!item?.doc_url}
            onClick={() => download(item?.doc_url, item?.description)}
          >
            <Icon>download</Icon>
          </IconButton>
          <IconButton onClick={deleteDoc(item)}>
            <Icon>delete_outlined</Icon>
          </IconButton>
        </div>
      </FormContainer>
      <Divider style={{ marginTop: 12, marginBottom: 12 }} />
    </div>
  );
};

export default SelectedDocs;
