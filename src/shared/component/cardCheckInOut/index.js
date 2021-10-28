import React from 'react';
import useStyles from './styles';
import {
  Typography,
  IconButton,
  Avatar,
  Icon,
  Tooltip,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import moment from 'moment';
import { SITUATION_STATUS } from './enum';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CardCheckInOut = ({ item, openDetails, id }) => {
  const classes = useStyles();
  const formatDateAndTime = (date) =>
    moment(date, 'DD/MM/YYYY HH:mm:ss').format('DD/MM[ - ]HH[h]mm');
  const formatHourCheck = (item) =>
    moment(item, 'DD/MM/YYYY HH:mm:ss').format('HH[h]mm'); // tootip
  const startIcon = {
    [SITUATION_STATUS.SHEDULED]: () => (
      <ErrorOutlineOutlinedIcon className={classes.orange} fontSize="inherit" />
    ),
    [SITUATION_STATUS.EXCHANGE_SHEDULED]: () => (
      <ErrorOutlineOutlinedIcon className={classes.orange} fontSize="inherit" />
    ),
    [SITUATION_STATUS.IN_PROGRESS]: () => (
      <CheckIcon className={classes.green} fontSize="inherit" />
    ),
    [SITUATION_STATUS.EXCHANGE_IN_PROGRESS]: () => (
      <CheckIcon className={classes.green} fontSize="inherit" />
    ),
    [SITUATION_STATUS.COMPLETED]: () => (
      <CheckIcon className={classes.green} fontSize="inherit" />
    ),
    [SITUATION_STATUS.EXCHANGE_COMPLETED]: () => (
      <CheckIcon className={classes.green} fontSize="inherit" />
    ),
    [SITUATION_STATUS.LANCADO]: () => (
      <ErrorOutlineOutlinedIcon className={classes.orange} fontSize="inherit" />
    ),
  };
  const StartIcon = item.situation_code
    ? startIcon[item.situation_code]
    : () => (
        <ErrorOutlineOutlinedIcon
          className={classes.orange}
          fontSize="inherit"
        />
      );

  const endIcon = {
    [SITUATION_STATUS.SHEDULED]: () => (
      <ErrorOutlineOutlinedIcon className={classes.orange} fontSize="inherit" />
    ),
    [SITUATION_STATUS.EXCHANGE_SHEDULED]: () => (
      <ErrorOutlineOutlinedIcon className={classes.orange} fontSize="inherit" />
    ),
    [SITUATION_STATUS.IN_PROGRESS]: () => (
      <ErrorOutlineOutlinedIcon className={classes.orange} fontSize="inherit" />
    ),
    [SITUATION_STATUS.EXCHANGE_IN_PROGRESS]: () => (
      <ErrorOutlineOutlinedIcon className={classes.orange} fontSize="inherit" />
    ),
    [SITUATION_STATUS.COMPLETED]: () => (
      <CheckIcon className={classes.green} fontSize="inherit" />
    ),
    [SITUATION_STATUS.EXCHANGE_COMPLETED]: () => (
      <CheckIcon className={classes.green} fontSize="inherit" />
    ),
    [SITUATION_STATUS.LANCADO]: () => (
      <ErrorOutlineOutlinedIcon className={classes.orange} fontSize="inherit" />
    ),
  };
  const EndIcon = item.situation_code
    ? endIcon[item.situation_code]
    : () => (
        <ErrorOutlineOutlinedIcon
          className={classes.orange}
          fontSize="inherit"
        />
      );
  const format = 'DD/MM/YYYY HH:mm:ss';
  const getDurationTxt = () => {
    let diff = moment('00/00/00', 'DD/MM/YYYY');
    switch (item.situation_code) {
      case SITUATION_STATUS.SHEDULED:
        diff = moment(item.scale.date_end, format).diff(
          moment(item.scale.date_start, format)
        );
        break;
      case SITUATION_STATUS.EXCHANGE_SHEDULED:
        diff = moment(item.scale.date_end, format).diff(
          moment(item.scale.date_start, format)
        );
        break;
      case SITUATION_STATUS.IN_PROGRESS:
        diff = moment().diff(moment(item.user.check_in, format));
        break;
      case SITUATION_STATUS.EXCHANGE_IN_PROGRESS:
        diff = moment().diff(moment(item.user.check_in, format));
        break;
      case SITUATION_STATUS.COMPLETED:
        diff = moment(item.user.check_out, format).diff(
          moment(item.user.check_in, format)
        );
        break;
      case SITUATION_STATUS.EXCHANGE_COMPLETED:
        diff = moment(item.user.check_out, format).diff(
          moment(item.user.check_in, format)
        );
        break;
      case SITUATION_STATUS.LANCADO:
        diff = moment(item.scale.date_end, format).diff(
          moment(item.scale.date_start, format)
        );
        break;
      default:
        diff = moment(item.scale.date_end, format).diff(
          moment(item.scale.date_start, format)
        );
        break;
    }
    return moment.utc(diff).format('HH[h]mm');
  };

  const getPercent = () => {
    let percent = 0.0;
    const total = moment(item.scale.date_end, format).diff(
      moment(item.scale.date_start, format)
    );
    switch (item.situation_code) {
      case SITUATION_STATUS.SHEDULED:
        break;
      case SITUATION_STATUS.EXCHANGE_SHEDULED:
        break;
      case SITUATION_STATUS.IN_PROGRESS:
        percent =
          (moment().diff(moment(item.user.check_in, format)) / total) * 100;
        break;
      case SITUATION_STATUS.EXCHANGE_IN_PROGRESS:
        percent =
          (moment().diff(moment(item.user.check_in, format)) / total) * 100;
        break;
      case SITUATION_STATUS.COMPLETED:
        percent = 100.0;
        break;
      case SITUATION_STATUS.EXCHANGE_COMPLETED:
        percent = 100.0;
        break;
      case SITUATION_STATUS.LANCADO:
        break;
      default:
        break;
    }
    return percent;
  };

  return (
    <div className={classes.container}>
      <div style={{ position: 'absolute', top: 0, right: 0, marginRight: 10 }}>
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
      <div className={classes.imgContainer}>
        <Avatar className={classes.userImage} src={item.user.image} />
      </div>
      <div className={classes.infoContainer}>
        <div style={{ marginLeft: 3 }}>
          <Typography
            style={{
              color: '#505255',
              fontSize: 18,
              marginTop: 10,
              fontFamily: 'Poppins',
            }}
          >
            {item.user.name.substring(0, 20)}...
          </Typography>
          <Typography
            style={{
              color: '#8b8e93',
              fontSize: 14,
              marginBottom: 8,
              maxWidth: '208px',
              fontFamily: 'Poppins',
            }}
          >
            {item.scale.name}
          </Typography>
        </div>
        <div
          className={classes.dateRow}
          style={{ color: '#8b8e93', fontSize: 12 }}
        >
          <div
            className={classes.iconDateContainer}
            style={{
              marginRight: 10,
              color: '#8B8E93',
              fontSize: 13,
              fontFamily: 'Poppins',
              width: 125,
            }}
          >
            <Tooltip
              title={`Horário para iniciar : ${formatHourCheck(
                item.scale.date_start
              )}`}
              placement="right"
            >
              <IconButton size="small">
                <StartIcon />
              </IconButton>
            </Tooltip>

            {item.situation_code === 14 || item.situation_code === 34 ? (
              <>
                {item.user.check_in === null
                  ? 'Validado'
                  : formatDateAndTime(item.user.check_in)}
              </>
            ) : (
              <>
                {item.user.check_in === null
                  ? 'Não iniciado'
                  : formatDateAndTime(item.user.check_in)}
              </>
            )}
          </div>
          <div
            className={classes.iconDateContainer}
            style={{
              color: '#8B8E93',
              fontSize: 13,
              maxWidth: 125,
            }}
          >
            <Tooltip
              title={`Horário para finalizar : ${formatHourCheck(
                item.scale.date_end
              )}`}
              placement="right"
            >
              <IconButton size="small">
                <EndIcon />
              </IconButton>
            </Tooltip>

            {item.situation_code === 14 || item.situation_code === 34 ? (
              <>
                {item.user.check_out === null
                  ? 'Validado'
                  : formatDateAndTime(item.user.check_out)}
              </>
            ) : (
              <>
                {item.user.check_out === null
                  ? 'Não finalizado'
                  : formatDateAndTime(item.user.check_out)}
              </>
            )}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 8,
          }}
        >
          <Icon size="small" className={classes.blueColor}>
            schedule
          </Icon>

          {(item.situation_code === 14 || item.situation_code === 34) && (
            <Typography className={classes.textWorkHour}>
              {getDurationTxt()} Últimas horas trabalhadas
            </Typography>
          )}
          {(item.situation_code === 13 || item.situation_code === 33) && (
            <Typography className={classes.textWorkHour}>Ocorrendo</Typography>
          )}
          {item && item.situation_code === 21 && (
            <Typography className={classes.textWorkHour}>
              {getDurationTxt()} Últimas horas trabalhadas
            </Typography>
          )}
          {(item.situation_code === 12 || item.situation_code === 32) && (
            <Typography className={classes.textWorkHour}>
              Não iniciado
            </Typography>
          )}
        </div>
      </div>
      <div>
        <div className={classes.circleContainer}>
          {(item.situation_code === 14 || item.situation_code === 34) && (
            <CircularProgressbarWithChildren
              value={getPercent().toFixed(0)}
              styles={buildStyles({
                textColor: '#24B8EC',
                pathColor: '#24B8EC',
                trailColor: '#E5E5E5',
              })}
            >
              <div className={classes.progressText}>{getDurationTxt()}</div>
            </CircularProgressbarWithChildren>
          )}
          {(item.situation_code === 13 || item.situation_code === 33) && (
            <CircularProgressbarWithChildren
              value={getPercent().toFixed(0)}
              styles={buildStyles({
                textColor: '#24B8EC',
                pathColor: '#24B8EC',
                trailColor: '#E5E5E5',
              })}
            >
              <div>Ocorrendo</div>
            </CircularProgressbarWithChildren>
          )}
          {(item.situation_code === 12 ||
            item.situation_code === 32 ||
            item.situation_code === 21) && (
            <CircularProgressbarWithChildren
              value={getPercent().toFixed(0)}
              styles={buildStyles({
                textColor: '#24B8EC',
                pathColor: '#24B8EC',
                trailColor: '#E5E5E5',
              })}
            >
              <div className={classes.textStatus}>não iniciado</div>
            </CircularProgressbarWithChildren>
          )}
          {item && item.situation_code === 11 && (
            <CircularProgressbarWithChildren
              value={getPercent().toFixed(0)}
              styles={buildStyles({
                textColor: '#24B8EC',
                pathColor: '#24B8EC',
                trailColor: '#E5E5E5',
              })}
            >
              <div className={classes.progressText}>{getDurationTxt()}</div>
            </CircularProgressbarWithChildren>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardCheckInOut;
