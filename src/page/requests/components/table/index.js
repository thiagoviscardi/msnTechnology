import React from 'react';
import { Typography, Button, Icon, CircularProgress } from '@material-ui/core';
import {
  useStyles,
  LeftSideContainer,
  CenterContainer,
  RightSideContainer,
  IdContainer,
  ProfContainer,
  PageDiv,
} from './styles';
import TableRow from '../tableRow';

const Table = ({
  data,
  page,
  addPage,
  backPage,
  totalPages,
  loading,
  search,
  acceptRequest,
  refuseRequest,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.tableDiv}>
      {loading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress
            size={90}
            style={{
              color: '#24B8EC',
            }}
          />
        </div>
      ) : (
        <>
          <div>
            <div className={classes.headerRow}>
              <LeftSideContainer style={{ marginLeft: 14 }}>
                <IdContainer>
                  <Typography className={classes.darkText}>#</Typography>
                </IdContainer>
                <Typography className={classes.darkText}>
                  Profissional
                </Typography>
              </LeftSideContainer>
              <CenterContainer>
                <ProfContainer>
                  <Typography className={classes.darkText}>
                    Campo de atuação
                  </Typography>
                </ProfContainer>
                <Typography className={classes.darkText}>CPF/CNPJ</Typography>
              </CenterContainer>
              <Typography style={{ width: 142 }} className={classes.darkText}>
                Data de Cadastro
              </Typography>
              <RightSideContainer>
                <Typography className={classes.darkText}>Ações</Typography>
              </RightSideContainer>
            </div>
            {data.map((item) => (
              <div key={item.id}>
                <TableRow
                  item={item}
                  acceptRequest={acceptRequest}
                  refuseRequest={refuseRequest}
                />
              </div>
            ))}
            {data.length === 0 && search === '' && (
              <div className={classes.centerMessage}>
                <Typography style={{ fontSize: 19 }}>
                  Nenhuma solicitação pendente
                </Typography>
              </div>
            )}
            {data.length === 0 && search !== '' && (
              <div className={classes.centerMessage}>
                <Typography style={{ fontSize: 19 }}>
                  Nenhuma resultado encontrado
                </Typography>
              </div>
            )}
          </div>
          <PageDiv>
            <Button
              onClick={backPage}
              disabled={page === 1}
              className={classes.pageButton}
            >
              <Icon style={{ color: '#24B8EC' }}>keyboard_arrow_left</Icon>
            </Button>
            <div className={classes.pageContainer}>
              <Typography className={classes.pageNumber}>{page}</Typography>
            </div>
            <Button
              onClick={addPage}
              disabled={page > totalPages}
              className={classes.pageButton}
            >
              <Icon style={{ color: '#24B8EC' }}>keyboard_arrow_right</Icon>
            </Button>
          </PageDiv>
        </>
      )}
    </div>
  );
};

export default Table;
