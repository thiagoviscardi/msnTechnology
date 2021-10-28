import React from 'react';
import { useStyles, DocsContainer } from './styles';
import { Icon, Typography } from '@material-ui/core';

export default function ContainerCollapse({ row }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.text_title}>Descrição</div>
      <div
        className={classes.text_title}
        dangerouslySetInnerHTML={{ __html: row?.description }}
      ></div>
      <div className={classes.text_title}>Arquivo</div>
      {row?.doc_url && row?.doc_url !== '' ? (
        <DocsContainer>
          <a
            className={classes.link_button}
            href={row?.doc_url}
            target="_blank"
            rel="noreferrer"
          >
            <div className={classes.docStyle}>
              <Icon className={classes.icon_file}>insert_drive_file</Icon>
              <Typography className={classes.docsText}>{row?.name}</Typography>
            </div>
          </a>
        </DocsContainer>
      ) : (
        <Typography className={classes.no_document}>
          Nenhum documento recebido
        </Typography>
      )}
    </div>
  );
}
