import React from 'react';
import { IconButton, Icon, Typography, Button } from '@material-ui/core';
import {
  useStyles,
  LeftSideContainer,
  CenterContainer,
  RightSideContainer,
  IdContainer,
  DataContainer,
  NameContainer,
  ProfContainer,
} from './styles';
import { Link } from 'react-router-dom';

const TableRow = ({ item, deleteUnit }) => {
  const classes = useStyles();
  return (
    <>
      <DataContainer>
        <div className={classes.rowContainer}>
          <LeftSideContainer>
            <IdContainer>
              <Typography>{item.id}</Typography>
            </IdContainer>
            <NameContainer>
              <Typography variant="span" className={classes.textName}>
                {item.name}
              </Typography>
            </NameContainer>
          </LeftSideContainer>
          <CenterContainer>
            <ProfContainer>
              <Typography style={{ color: ' #8B8E93' }}>{item.cnpj}</Typography>
            </ProfContainer>
            <Typography className={classes.city_name}>
              {item.address.city.name}edkendkledlkednlkendklendkendkejndkejndkje
              cebcnkebcjebcjbejchebc
            </Typography>
          </CenterContainer>
        </div>

        <div className={classes.column_actions}>
          <RightSideContainer>
            <Button>
              <Typography className={classes.docsText}>Exportar</Typography>
            </Button>
          </RightSideContainer>
          <RightSideContainer>
            <Link
              to={`/cadastros/hospitais/cadastrar/${item.id}`}
              style={{ textDecoration: 'none' }}
            >
              <IconButton style={{ padding: 0, marginRight: 34 }}>
                <Icon style={{ padding: 0, fontSize: 24 }}>edit</Icon>
              </IconButton>
            </Link>
            <IconButton
              onClick={() => deleteUnit(item.id)}
              style={{ padding: 0 }}
            >
              <Icon style={{ padding: 0, fontSize: 24 }}>delete</Icon>
            </IconButton>
          </RightSideContainer>
        </div>
      </DataContainer>
    </>
  );
};

export default TableRow;
