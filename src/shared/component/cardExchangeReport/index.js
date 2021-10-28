import React from 'react';
import { StyledDetailsReportCard, useStyles } from './styles';
import { Typography } from '@material-ui/core';
import OldUserDetails from './components/oldUserDetails';
import ContainerStatusExchange from './components/containerStatusExchange';
import CurrentUserDetails from './components/currentUserDetails';

const CardExchangeReport = ({
  exchange,
  statusType,
  openDetails = () => {},
}) => {
  const classes = useStyles();

  return (
    <StyledDetailsReportCard elevation={0}>
      <Typography className={classes.title}>{exchange?.scale?.name}</Typography>
      <OldUserDetails
        situationStatus={`${exchange?.situation}${exchange?.situation_status}`}
        userOld={exchange?.user_old}
        openDetails={openDetails}
        statusType={statusType}
        exchange={exchange}
      />
      <ContainerStatusExchange
        situationStatus={`${exchange?.situation}${exchange?.situation_status}`}
        statusType={statusType}
      />
      <CurrentUserDetails
        currentUser={exchange?.user}
        situationStatus={`${exchange?.situation}${exchange?.situation_status}`}
        openDetails={openDetails}
        statusType={statusType}
        exchange={exchange}
      />
    </StyledDetailsReportCard>
  );
};

export default CardExchangeReport;
