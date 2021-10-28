import React from 'react';
import {
  IconButton,
  Icon,
  Typography,
  CircularProgress,
  Button,
} from '@material-ui/core';
import moment from 'moment';
import {
  useStyles,
  LeftSideContainer,
  CenterContainer,
  RightSideContainer,
  IdContainer,
  DataContainer,
  NameContainer,
  ProfContainer,
  DetailsButton,
  DetailsContainer,
  DocsContainer,
  DocTitleContainer,
} from './styles';
import useRequests from 'hook/requests';

const TableRow = ({ item, acceptRequest, refuseRequest }) => {
  const { docsList, getUserDocs } = useRequests();
  const { list, loadingDocsList, totalDocsList } = docsList;
  const [state, setState] = React.useState({
    openDetails: false,
    page: 1,
    perPage: 12,
  });
  const { openDetails, page, perPage } = state;

  const totalPages = Math.ceil(totalDocsList / perPage);
  React.useEffect(() => {
    openDetails && getUserDocs(page, perPage, item.id);
  }, [openDetails]);

  const setOpenDetail = () => {
    setState({ ...state, openDetails: !openDetails });
  };

  const moreDocs = () => {
    setState({ ...state, page: page + 1 });
  };

  const registerDate = moment(item.createdAt).format('DD/MM/YYYY - H:mm');
  const classes = useStyles();
  return (
    <>
      <DataContainer>
        <div className={classes.rowContainer}>
          <LeftSideContainer>
            <IdContainer>
              <Typography className={classes.darkText}>{item.id}</Typography>
            </IdContainer>
            <NameContainer>
              <Typography className={classes.darkText}>{item.name}</Typography>
            </NameContainer>
          </LeftSideContainer>
          <CenterContainer>
            <ProfContainer>
              <Typography
                style={{ color: ' #8B8E93' }}
                className={classes.darkText}
              >
                {item.group.name}
              </Typography>
            </ProfContainer>
            <div style={{ width: 146 }}>
              <Typography
                style={{ color: ' #8B8E93' }}
                className={classes.darkText}
              >
                {item.cpf}
              </Typography>
            </div>
          </CenterContainer>

          <Typography
            style={{ color: ' #8B8E93', width: 142 }}
            className={classes.darkText}
          >
            {registerDate}
          </Typography>
        </div>

        <div className={classes.rowContainer}>
          <RightSideContainer>
            <IconButton
              onClick={() => acceptRequest(item.id)}
              style={{ padding: 0, marginRight: 34 }}
            >
              <Icon style={{ padding: 0, fontSize: 24, color: '#24B8EC' }}>
                check
              </Icon>
            </IconButton>
            <IconButton
              onClick={() => refuseRequest(item.id)}
              style={{ padding: 0 }}
            >
              <Icon style={{ padding: 0, fontSize: 24 }}>block</Icon>
            </IconButton>
          </RightSideContainer>
          <DetailsButton onClick={setOpenDetail} style={{ padding: 0 }}>
            {openDetails ? (
              <Icon style={{ padding: 0, fontSize: 24 }}>
                keyboard_arrow_up
              </Icon>
            ) : (
              <Icon style={{ padding: 0, fontSize: 24 }}>
                keyboard_arrow_down
              </Icon>
            )}
          </DetailsButton>
        </div>
      </DataContainer>
      {openDetails && (
        <DetailsContainer>
          <div className={classes.rowContainer}>
            <NameContainer>
              <Typography
                style={{ marginLeft: 12 }}
                className={classes.detailsTypes}
              >
                Especialidades
              </Typography>
            </NameContainer>
            <DocTitleContainer>
              <Typography className={classes.detailsTypes}>
                Documentos
              </Typography>
            </DocTitleContainer>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <NameContainer>
              {item.specialties.map((item) => (
                <Typography key={item.id} className={classes.specialty}>
                  {item.name}
                </Typography>
              ))}
            </NameContainer>
            <div>
              <DocsContainer>
                {loadingDocsList && <CircularProgress />}
                {list.length > 0 &&
                  !loadingDocsList &&
                  list.map((item) => (
                    <div className={classes.docStyle} key={item.id}>
                      <Icon style={{ color: '#24B8EC' }}>
                        insert_drive_file
                      </Icon>
                      <Typography className={classes.docsText}>
                        {item.name}
                      </Typography>
                    </div>
                  ))}
                {list.length === 0 && !loadingDocsList && (
                  <Typography style={{ fontSize: 19 }}>
                    Nenhum documento recebido
                  </Typography>
                )}
              </DocsContainer>
              {page < totalPages && (
                <DocTitleContainer
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Button
                    onClick={moreDocs}
                    className={classes.moreDocsContainer}
                  >
                    <Typography className={classes.moreDocsText}>
                      Ver mais
                    </Typography>
                  </Button>
                </DocTitleContainer>
              )}
            </div>
          </div>
        </DetailsContainer>
      )}
    </>
  );
};

export default TableRow;
