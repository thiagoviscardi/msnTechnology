import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles, StyledIndividualReportCard } from './styles';
import Tooltip from '@material-ui/core/Tooltip';

const IconReportCardSvg = ({ title, subtitle, icon, permission = true }) => {
  const classes = useStyles(permission);
  return (
    <Tooltip
      title={!permission ? 'Você não tem permissão' : ''}
      placement="top"
      arrow
    >
      <StyledIndividualReportCard className={classes.card}>
        <div>
          <img className={classes.img} src={icon}></img>
        </div>
        <div>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.subTitle}>{subtitle}</Typography>
        </div>
      </StyledIndividualReportCard>
    </Tooltip>
  );
};

export default IconReportCardSvg;
