import React, { memo } from 'react';
import { useStyles } from './styles';
import CardCellSchedule from '../CardCellSchedule';
import CardEmptyDay from '../CardEmptyDay';

const TableCards = ({ scaleData, schedule, permissions }) => {
  const classes = useStyles();
  const SwitchCell = ({ item, index }) => {
    if (item?.status === 1) {
      return (
        <CardCellSchedule
          permissions={permissions}
          scaleData={scaleData}
          schedule={schedule}
          agenda={item?.agenda}
          item={item}
          index={index}
        />
      );
    } else return <CardEmptyDay />;
  };

  return (
    <div className={classes.container_days}>
      {schedule.map((item, index) => (
        <SwitchCell key={index} index={index} item={item} />
      ))}
    </div>
  );
};

export default memo(TableCards);
