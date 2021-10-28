import React from 'react';
import DivStatusCanceled from '../divStatusCanceled';
import DivStatusChanged from '../divStatusChanged';
import DivStatusWaiting from '../divStatusWaiting';
import UserInfoDetails from '../userInfoDetails';
import { useStyles } from './styles';

const OldUserDetails = ({
  situationStatus,
  userOld,
  openDetails,
  statusType,
  exchange,
}) => {
  const classes = useStyles();

  return (
    <div data-cy="container_old_user_details" className={classes.rowContainer}>
      {situationStatus === statusType.RECUSADO && (
        <DivStatusCanceled
          user={userOld}
          exchange={exchange}
          openDetails={openDetails}
        />
      )}
      {(situationStatus === statusType.CONFIRMADO ||
        situationStatus === statusType.OCORRENDO ||
        situationStatus === statusType.REALIZADO) && (
        <DivStatusChanged
          user={userOld}
          exchange={exchange}
          openDetails={openDetails}
        />
      )}
      {situationStatus === statusType.SOLICITADO && (
        <DivStatusWaiting
          user={userOld}
          exchange={exchange}
          openDetails={openDetails}
        />
      )}
      <UserInfoDetails user={userOld} />
    </div>
  );
};

export default OldUserDetails;
