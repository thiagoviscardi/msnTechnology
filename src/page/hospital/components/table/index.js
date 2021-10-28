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
  deleteUnit,
}) => {
  const classes = useStyles();

  return (
    <>
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
            <div className={classes.content_table}>
              <div className={classes.headerRow}>
                <LeftSideContainer style={{ marginLeft: 14 }}>
                  <IdContainer>
                    <Typography>#</Typography>
                  </IdContainer>
                  <Typography>Hospital</Typography>
                </LeftSideContainer>
                <CenterContainer>
                  <ProfContainer>
                    <Typography>CNPJ </Typography>
                  </ProfContainer>
                  <Typography>Cidade</Typography>
                </CenterContainer>
                <RightSideContainer>
                  <Typography>Ações</Typography>
                </RightSideContainer>
              </div>
              {data.map((item) => (
                <div key={item.id}>
                  <TableRow item={item} deleteUnit={deleteUnit} />
                </div>
              ))}
            </div>
          </>
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
          disabled={page === totalPages}
          className={classes.pageButton}
        >
          <Icon style={{ color: '#24B8EC' }}>keyboard_arrow_right</Icon>
        </Button>
      </PageDiv>
    </>
  );
};

export default Table;
