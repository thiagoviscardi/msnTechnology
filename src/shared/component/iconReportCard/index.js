import React from 'react';
import { Typography, Icon } from '@material-ui/core';
import { useStyles, StyledIndividualReportCard } from './styles';

const IconReportCard = ({ title, subtitle, icon }) => {
  const classes = useStyles();

  return (
    <StyledIndividualReportCard>
      <div>
        <Icon
          fontSize="large"
          style={{
            fontSize: 42,
            marginRight: 30,
            marginLeft: 30,
          }}
        >
          {icon}
        </Icon>
      </div>
      <div>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.subTitle}>{subtitle}</Typography>
      </div>
    </StyledIndividualReportCard>
  );
};

export default IconReportCard;
