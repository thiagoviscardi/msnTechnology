import React from 'react';
import { useStyles, DocsContainer } from './styles';
import { CircularProgress, Grid, Icon, Typography } from '@material-ui/core';

export default function ContainerCollapse({ row, list, loadingDocsList }) {
  const classes = useStyles();
  const SpecialtiesNames = ({ especialties }) => {
    if (!especialties || !especialties.length > 0)
      return <div className={classes.specialty}>...</div>;
    const concatedNames = especialties.map((item) => (
      <>
        {item?.name}
        <br />
      </>
    ));
    return <div className={classes.specialty}>{concatedNames}</div>;
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <div className={classes.text_title}>Especialidades</div>
          {SpecialtiesNames(row)}
        </Grid>
        <Grid item xs={8}>
          <div className={classes.text_title}>Documentos</div>
          <DocsContainer>
            {loadingDocsList && <CircularProgress size={25} />}
            {!loadingDocsList &&
              list.map((item) => (
                <a
                  key={item.id}
                  className={classes.link_button}
                  href={item?.doc_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={classes.docStyle}>
                    <Icon className={classes.icon_file}>insert_drive_file</Icon>
                    <Typography className={classes.docsText}>
                      {item.type?.name}
                    </Typography>
                  </div>
                </a>
              ))}
          </DocsContainer>
          {list.length === 0 && !loadingDocsList && (
            <Typography className={classes.no_document}>
              Nenhum documento recebido
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
