import React from 'react';
import { styles, DefaultContainer } from './styles';
import Sidebar from 'shared/component/sidebar';
import Header from 'shared/component/header';
import IconReportCard from 'shared/component/iconReportCard';
import { Link } from 'react-router-dom';
import SearchInput from 'shared/component/forms/SearchInput';
import { Paper, Icon, IconButton } from '@material-ui/core';

const ReportPage = () => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <div>
        <Header title={'Relatórios'} />
        <Sidebar />
      </div>
      <DefaultContainer>
        <Paper className={classes.search}>
          <SearchInput
            placeholder="Busque por notificação ou status"
            style={{ width: '80%', height: 48 }}
          />
          <IconButton>
            <Icon> close </Icon>
          </IconButton>
        </Paper>
        <div className={classes.rowContainer}>
          <Link
            to="/relatorio-de-plantoes"
            style={{
              textDecoration: 'none',
            }}
          >
            <div>
              <IconReportCard
                icon="local_hospital"
                title="Plantões"
                subtitle="Confira e exporte o histórico de plantões de cada profissional escalado"
              />
            </div>
          </Link>
          <Link
            to="/relatorios/checkin"
            style={{
              textDecoration: 'none',
            }}
          >
            <div>
              <IconReportCard
                icon="done_all"
                title="Check-In/Check-Out"
                subtitle="Confira e exporte os registros de entrada e saída dos plantões"
              />
            </div>
          </Link>
        </div>
      </DefaultContainer>
    </div>
  );
};

export default ReportPage;
