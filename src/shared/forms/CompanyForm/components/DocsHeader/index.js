import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { FormContainer, useStyles, NameContainer } from './styles';
const DocsHeader = () => {
  const classes = useStyles();
  return (
    <>
      <FormContainer>
        <NameContainer>
          <Typography className={classes.documentsTitles}>
            Nome do arquivo
          </Typography>
        </NameContainer>
      </FormContainer>
      <Divider style={{ marginTop: 16, marginBottom: 16 }} />
    </>
  );
};

export default DocsHeader;
