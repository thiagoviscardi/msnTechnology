import React from 'react';
import { Typography, Icon, Avatar, IconButton } from '@material-ui/core';
import { useStyles, StyledIndividualReportCard } from './styles';
import appColors from 'utils/appColors';
import { formatDate3 } from 'utils/converters';

const ScaleCard = ({
  title,
  group,
  company,
  unidade,
  dateStart,
  dateEnd,
  situation,
  situationStatus,
  openDetails,
  schedule,
  id,
  avatar,
}) => {
  const classes = useStyles();
  return (
    <StyledIndividualReportCard elevation={0}>
      <div style={{ paddingLeft: 12 }} className={classes.rowContainer}>
        <div
          style={{
            display: 'flex',
          }}
        >
          {(situation === 3 || situation === 1 || situation === 2) &&
            situationStatus === 4 && (
              <>
                <Icon
                  style={{ color: appColors.PRIMARY_COLOR, marginRight: 10 }}
                >
                  done_all
                </Icon>
                <Typography style={{ color: appColors.PRIMARY_COLOR }}>
                  Realizado
                </Typography>
              </>
            )}
          {(situation === 3 || situation === 1 || situation === 2) &&
            situationStatus === 3 && (
              <>
                <Icon style={{ color: 'green', marginRight: 10 }}>
                  av_timer
                </Icon>
                <Typography style={{ color: 'green' }}>Ocorrendo</Typography>
              </>
            )}
          {(situation === 3 || situation === 1 || situation === 2) &&
            (situationStatus === 2 || situationStatus === 1) && (
              <>
                <Icon style={{ color: 'blue', marginRight: 10 }}>
                  query_builder
                </Icon>
                <Typography style={{ color: 'blue' }}>Escalado</Typography>
              </>
            )}
        </div>

        <IconButton
          id="EditarCard"
          type="button"
          onClick={() => {
            openDetails(id);
          }}
          style={{
            padding: 0,
          }}
        >
          <Icon>more_horiz</Icon>
        </IconButton>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {(situation === 3 || situation === 1 || situation === 2) &&
          situationStatus === 4 && (
            <Avatar
              style={{
                width: '104px',
                height: '104px',
                margin: '24px 24px 0px 24px',
                border: '3px solid #BBE9F9',
              }}
              alt=""
              src={avatar}
            />
          )}
        {(situation === 3 || situation === 1 || situation === 2) &&
          situationStatus === 3 && (
            <Avatar
              style={{
                width: '104px',
                height: '104px',
                margin: '24px 24px 0px 24px',
                border: '3px solid #99D9B0',
              }}
              alt=""
              src={avatar}
            />
          )}
        {(situation === 3 || situation === 1 || situation === 2) &&
          (situationStatus === 2 || situationStatus === 1) && (
            <Avatar
              style={{
                width: '104px',
                height: '104px',
                margin: '24px 24px 0px 24px',
                border: '3px solid #8FA1BF',
              }}
              alt=""
              src={avatar}
            />
          )}

        {title.length > 19 ? (
          <Typography className={classes.title}>
            {title.substring(0, 19)}...
          </Typography>
        ) : (
          <Typography className={classes.title}>{title}</Typography>
        )}
        <Typography className={classes.specialty}>{group}</Typography>
        <div className={classes.borderHospital}>
          {company && company.length > 16 ? (
            <Typography className={classes.company}>
              {company.substring(0, 16)}...
            </Typography>
          ) : (
            <Typography className={classes.company}>{company}</Typography>
          )}
        </div>
        <Typography className={classes.unit}>{unidade}</Typography>
        <Typography className={classes.schedule}>{schedule}</Typography>

        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <div className={classes.rowContainer}>
            {(situation === 3 || situation === 1 || situation === 2) &&
              (situationStatus === 3 || situationStatus === 4) && (
                <Icon style={{ color: 'green' }}>check</Icon>
              )}
            {(situation === 3 || situation === 1 || situation === 2) &&
              situationStatus === 2 && (
                <Icon style={{ color: '#E5E500' }}>error_outline</Icon>
              )}
            {(situation === 3 || situation === 1 || situation === 2) &&
              situationStatus === 1 && (
                <Icon style={{ color: 'orange' }}>error_outline</Icon>
              )}
            {(situation === 3 || situation === 1 || situation === 2) &&
              situationStatus === 5 && (
                <Icon style={{ color: 'red' }}>block</Icon>
              )}
            {(situation === 3 || situation === 1 || situation === 2) &&
              situationStatus === 6 && (
                <Icon style={{ color: 'pink' }}>minimize</Icon>
              )}
            <Typography className={classes.date}>
              {formatDate3(dateStart, 'DD/MM HH:mm')}
            </Typography>
          </div>
          <div className={classes.rowContainer}>
            {(situation === 3 || situation === 1 || situation === 2) &&
              situationStatus === 4 && (
                <Icon style={{ color: 'green' }}>check</Icon>
              )}
            {(situation === 3 || situation === 1 || situation === 2) &&
              (situationStatus === 2 ||
                situationStatus === 1 ||
                situationStatus === 3) && (
                <Icon style={{ color: '#E5E500' }}>error_outline</Icon>
              )}
            {(situation === 3 || situation === 1 || situation === 2) &&
              situationStatus === 5 && (
                <Icon style={{ color: 'red' }}>block</Icon>
              )}
            {(situation === 3 || situation === 1 || situation === 2) &&
              situationStatus === 6 && (
                <Icon style={{ color: 'pink' }}>minimize</Icon>
              )}
            <Typography className={classes.date}>
              {formatDate3(dateEnd, 'DD/MM HH:mm:ss')}
            </Typography>
          </div>
        </div>
      </div>
    </StyledIndividualReportCard>
  );
};

export default ScaleCard;
