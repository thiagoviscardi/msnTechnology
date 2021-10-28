import React from 'react';
import {
  Typography,
  Button,
  Icon,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import {
  useStyles,
  LeftSideContainer,
  CenterContainer,
  RightSideContainer,
  IdContainer,
  PageDiv,
  FinalContainer,
  ContainerStatus,
  ContainerActions,
} from './styles';
import TableRow from '../tableRow';
import appColors from 'utils/appColors';

const Table = ({
  page,
  addPage,
  backPage,
  totalPages,
  professionalListLoading,
  deletar,
  professionalList,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.tableDiv}>
        {professionalListLoading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress
              size={90}
              style={{
                color: appColors.PRIMARY_COLOR,
              }}
            />
          </div>
        ) : (
          <>
            <div className={classes.content_table}>
              <div className={classes.headerRow}>
                <LeftSideContainer style={{ marginLeft: 14, marginRight: 1 }}>
                  <IdContainer>
                    <Typography className={classes.darkText}>
                      #<Icon style={{ marginLeft: 5 }}>arrow_drop_down</Icon>
                    </Typography>
                  </IdContainer>
                  <Typography className={classes.darkText}>
                    Profissional
                  </Typography>
                </LeftSideContainer>
                <CenterContainer>
                  <Typography>CPF</Typography>
                </CenterContainer>
                <RightSideContainer>
                  <Typography className={classes.darkText}>
                    Campo de atuação
                  </Typography>
                </RightSideContainer>
                <FinalContainer>
                  <Typography className={classes.darkText}>
                    Especialidades
                  </Typography>
                </FinalContainer>
                <ContainerStatus>
                  <Typography>Status</Typography>
                </ContainerStatus>
                <ContainerActions>
                  <Typography className={classes.darkText}>Ações</Typography>
                </ContainerActions>
              </div>
              {professionalList &&
                professionalList.length > 0 &&
                !professionalListLoading &&
                professionalList.map((item) => (
                  <div key={item.id}>
                    <TableRow item={item} deletar={deletar} />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      <Divider className={classes.divider} />
      <PageDiv>
        <Button
          onClick={backPage()}
          disabled={page === 1}
          className={classes.pageButton}
        >
          <Icon style={{ color: '#24B8EC' }}>keyboard_arrow_left</Icon>
        </Button>
        <div className={classes.pageContainer}>
          <Typography className={classes.pageNumber}>{page}</Typography>
        </div>
        <Button
          onClick={addPage()}
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
