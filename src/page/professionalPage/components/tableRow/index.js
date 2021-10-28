import React from 'react';
import { Typography, Icon, IconButton, Avatar } from '@material-ui/core';
import {
  useStyles,
  LeftSideContainer,
  CenterContainer,
  IdContainer,
  DataContainer,
  NameContainer,
  RightSideContainer,
  FinalContainer,
  ContainerStatus,
  ContainerActions,
} from './styles';
import { Link } from 'react-router-dom';

const TableRow = ({ item }) => {
  const classes = useStyles();

  return (
    <>
      <DataContainer>
        <div className={classes.rowContainer}>
          <LeftSideContainer>
            <IdContainer>
              <Typography className={classes.textColor}>1</Typography>
            </IdContainer>
            <div>
              <Avatar
                style={{ marginRight: 20, width: 33, height: 33 }}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sizes="5px"
              />
            </div>
            <NameContainer>
              <Typography className={classes.textName}>
                Mariana Teresinha Mor...
              </Typography>
            </NameContainer>
          </LeftSideContainer>
          <CenterContainer>
            <Typography className={classes.textColor}>
              833.888.450-26
            </Typography>
          </CenterContainer>
          <RightSideContainer>
            <Typography className={classes.textAtuation}>
              Multi-profissional
            </Typography>
          </RightSideContainer>
          <FinalContainer>
            <Typography className={classes.textAtuation}>
              Fisioterapeuta
            </Typography>
          </FinalContainer>
          <ContainerStatus>
            <div className={classes.status_view}>
              <Typography
                style={{
                  color: item.status !== 1 ? '#24B8EC' : '#A2A5A8',
                }}
                className={classes.status_text}
              >
                Ativa
              </Typography>
              {' | '}
              <Typography
                style={{
                  color: item.status === 1 ? '#24B8EC' : '#A2A5A8',
                }}
                className={classes.status_text}
              >
                Inativa
              </Typography>
            </div>
          </ContainerStatus>
          <ContainerActions>
            <div
              style={{
                display: 'flex',
                marginLeft: 50,
              }}
            >
              <IconButton
                style={{ padding: 6, marginRight: 10 }}
                onClick={() => {}}
              >
                <Icon fontSize="small">insert_drive_file_outlined</Icon>
              </IconButton>
              <Link
                to={`/cadastros/profissional/cadastrar/${item.id}`}
                style={{ textDecoration: 'none' }}
              >
                <IconButton style={{ padding: 6, marginRight: 10 }}>
                  <Icon fontSize="small">edit</Icon>
                </IconButton>
              </Link>
              <IconButton style={{ padding: 6 }} onClick={() => {}}>
                <Icon fontSize="small">delete_outlined</Icon>
              </IconButton>
            </div>
          </ContainerActions>
        </div>
      </DataContainer>
    </>
  );
};

export default TableRow;
