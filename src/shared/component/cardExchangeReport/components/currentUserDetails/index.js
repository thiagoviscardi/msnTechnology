import React from 'react';
import DivStatusCanceled from '../divStatusCanceled';
import DivStatusChanged from '../divStatusChanged';
import DivStatusWaiting from '../divStatusWaiting';
import UserInfoDetails from '../userInfoDetails';
import { useStyles } from './styles';

const CurrentUserDetails = ({
  situationStatus,
  currentUser,
  openDetails,
  statusType,
  exchange,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.rowContainer2}>
      {situationStatus === statusType.RECUSADO && (
        <DivStatusCanceled
          isCurrentUser
          user={currentUser}
          openDetails={openDetails}
          exchange={exchange}
        />
      )}
      {(situationStatus === statusType.CONFIRMADO ||
        situationStatus === statusType.OCORRENDO ||
        situationStatus === statusType.REALIZADO) && (
        <DivStatusChanged
          isCurrentUser
          user={currentUser}
          openDetails={openDetails}
          exchange={exchange}
        />
      )}
      {situationStatus === statusType.SOLICITADO && (
        <DivStatusWaiting
          isCurrentUser
          user={currentUser}
          openDetails={openDetails}
          exchange={exchange}
        />
      )}
      <UserInfoDetails user={currentUser} />
    </div>
  );
};
export default CurrentUserDetails;
