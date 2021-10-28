import React from 'react';
import { Icon, Typography } from '@material-ui/core';
import { useStyles, HoverButton, StyledInput } from './styles';

const DocsButton = ({ docsChange, name }) => {
  const classes = useStyles();
  return (
    <HoverButton className={classes.docsContainer}>
      <div className={classes.docsTitleBox}>
        <Icon style={{ color: '#24B8EC' }}>playlist_add</Icon>
        <Typography className={classes.documentsText}>
          Enviar documento
        </Typography>
      </div>
      <StyledInput
        name={name}
        onChange={(event) => {
          const file = event.currentTarget.files;
          // setFieldValue(name, [...doc, ...file]);
          docsChange(file);
        }}
        type="file"
        accept=".pdf"
        style={{ paddingTop: 9, paddingBottom: 9 }}
        multiple
      />
    </HoverButton>
  );
};

export default DocsButton;
