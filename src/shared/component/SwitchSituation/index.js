import React from 'react';
import { useStyles } from './styles';
import { StatusSituationType } from 'utils/StatusSituationType';
import moment from 'moment';

const SwitchSituation = ({ item, element }) => {
  const classes = useStyles();
  const { situation, situation_status } = item;

  const Props = StatusSituationType(classes).find(
    (item) => item.id === `${situation}${situation_status}`
  );

  const verifyIsPast = () => {
    const dateCard = element?.date_start;
    const today = moment();
    return moment(dateCard).diff(today, 'days') < 0;
  };

  const getClassName = () => {
    return !element
      ? classes.status
      : verifyIsPast()
      ? classes.status_opacity
      : classes.status;
  };

  return (
    <div className={getClassName()} style={{ color: Props?.color }}>
      {Props?.icon}
      {Props?.label}
    </div>
  );
};

export default SwitchSituation;
