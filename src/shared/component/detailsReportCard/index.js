import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { useStyles, StyledDetailsReportCard } from './styles';

const DetailsReportCard = ({ title, details }) => {
  const classes = useStyles();

  return (
    <StyledDetailsReportCard elevation={0}>
      <Typography className={classes.title}>{title}</Typography>
      <Divider style={{ marginBottom: 25 }} />
      {details &&
        details.length > 0 &&
        details.map((detail, i) => (
          <>
            <div style={{ margin: '10px 0' }} key={i}>
              <div className={classes.rowContainer}>
                <Typography className={classes.details}>
                  {detail.name}
                </Typography>
                <Typography className={classes.details}>
                  {detail?.value || detail?.total || 0}
                </Typography>
              </div>
            </div>
            <Divider light />
          </>
        ))}
    </StyledDetailsReportCard>
  );
};

export default DetailsReportCard;
