import React, { useMemo } from 'react';
import { useStyles, ModalContainer, PrevistTime, WorkedHours } from './styles';
import {
  Modal,
  Icon,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  Tooltip,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { SITUATION_STATUS } from 'shared/component/cardCheckInOut/enum';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import useReport from 'hook/report';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import appColors from 'utils/appColors';

export default function ModalDetails({
  openDetails,
  details,
  handleCloseDetails,
  company,
  item,
  unitId,
  dateStart,
  dateEnd,
}) {
  const { getCheckInReportsDetails, checkWithDetails } = useReport();
  const { listCheckDetails, loadingCheckDetails, paginationCheckDetails } =
    checkWithDetails;
  const classes = useStyles();
  const formatDateAndTime = (date) =>
    moment(date, 'DD/MM/YYYY HH:mm:ss').format('DD/MM [ - ]HH[h]mm'); // card
  const formatHourCheck = (item) =>
    moment(item, 'DD/MM/YYYY HH:mm:ss').format('HH[h]mm'); // tootip
  const fromatMonthCard = (date) => moment(date, 'DD/MM/YYYY').format('MMMM');
  const [state, setState] = React.useState({
    page: 1,
    perPage: 100,
  });
  const { page, perPage } = state;
  const totalPages = Math.round(paginationCheckDetails / perPage);
  const startOfMonth = moment(dateStart.formated_date)
    .startOf('month')
    .format('YYYY-MM-DD');
  const endOfMonth = moment(dateEnd.formated_date)
    .endOf('month')
    .format('YYYY-MM-DD');
  React.useEffect(() => {
    getCheckInReportsDetails({
      page,
      perPage,
      unitId,
      dateStart: startOfMonth,
      dateEnd: endOfMonth,
      filter: 'universal',
      userId: item.user.id,
    });
  }, []);
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
  const StartIcon = ({ x }) => {
    return x && startIcon[x.situation_code]();
  };

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
  const EndIcon = ({ x }) => {
    return x && endIcon[x.situation_code]();
  };
  const format = 'DD/MM/YYYY HH:mm:ss';

  const onScrollBottom = (event) => {
    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight;

    if (bottom && !loadingCheckDetails && page < totalPages) {
      setState({ ...state, page: page + 1 });
    }
    if (event.currentTarget.scrollTop === 0 && page > 1) {
      setState({ ...state, page: page - 1 });
    }
  };
  const convertMin = (min) => {
    const hours = Math.trunc(min / 60);
    const mins = Math.trunc(min % 60);

    const minText = mins < 10 ? `0${mins}` : `${mins}`;

    return `${hours}h${minText}`;
  };
  const convertMinProgess = (min) => {
    const hours = Math.trunc(min / 60);
    const mins = Math.trunc(min % 60);

    const minText = mins < 10 ? `0${mins}` : `${mins}`;

    return `${hours}h\n${minText}min`;
  };

  const countedPrevistHours = useMemo(() => {
    let countedHours = moment.duration(0);
    listCheckDetails.forEach((item) => {
      countedHours.add(
        moment.duration(
          moment(item.scale.date_end, format).diff(
            moment(item.scale.date_start, format)
          )
        )
      );
    });
    return convertMin(countedHours.asMinutes());
  }, [listCheckDetails]);

  const countedWorkedHours = useMemo(() => {
    let countedHours = moment.duration(0);
    listCheckDetails.forEach((item) => {
      countedHours.add(
        moment.duration(
          moment(item?.user.check_out, format).diff(
            moment(item?.user.check_in, format)
          )
        )
      );
    });
    return convertMin(countedHours.asMinutes());
  }, [listCheckDetails]);
  const countedWorkedHoursProgress = useMemo(() => {
    let countedHours = moment.duration(0);
    listCheckDetails.forEach((item) => {
      countedHours.add(
        moment.duration(
          moment(item?.user.check_out, format).diff(
            moment(item?.user.check_in, format)
          )
        )
      );
    });
    return convertMinProgess(countedHours.asMinutes());
  }, [listCheckDetails]);
  return (
    <div>
      <Modal
        className={classes.modal}
        open={openDetails}
        onClose={handleCloseDetails}
        disableAutoFocus
        disableEnforceFocus
      >
        <ModalContainer>
          <div style={{ minWidth: '30%' }} className={classes.rowModal}>
            <Avatar
              style={{
                width: '96px',
                height: '96px',
                margin: '24px 24px 0px 24px',
              }}
              src={item?.user.image}
            />
            <div className={classes.detailsTextName}>{item.user.name}</div>
            <div className={classes.detailsTextGroup}>
              {item.user.group.name}
            </div>
            <div className={classes.detailsTextCompany}>{company}</div>

            <Link
              to={`/agenda/profissional/${item?.user.id}`}
              className={classes.link_to_schedule}
              id="VerAgendaProf"
            >
              <div className={classes.seeMore}>Ver mais</div>
            </Link>
          </div>

          <div style={{ paddingLeft: 28 }}>
            <div className={classes.closeButton}>
              <IconButton
                onClick={handleCloseDetails}
                style={{ padding: 0, marginRight: 10, marginTop: 10 }}
              >
                <Icon>close</Icon>
              </IconButton>
            </div>
            <div>
              {Object.keys(details).length > 0 && (
                <>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <Typography className={classes.textTitle} id="Title-Form">
                        Plantões de {fromatMonthCard(item.scale.date_start)}
                      </Typography>
                      <div
                        style={{
                          display: 'flex',
                          marginTop: 8,
                        }}
                      >
                        <Icon size="small" className={classes.grayColor}>
                          schedule
                        </Icon>
                        <Typography className={classes.textHourForecast}>
                          <PrevistTime>
                            {`${countedPrevistHours}`} Horas Previstas
                          </PrevistTime>
                        </Typography>
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
                        <Typography className={classes.textHourWork}>
                          <WorkedHours>
                            {`${countedWorkedHours}`} Horas Trabalhadas
                          </WorkedHours>
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.circleContainer}>
                      <CircularProgressbar
                        strokeWidth={4}
                        text={`${countedWorkedHoursProgress}`}
                        styles={buildStyles({
                          textColor: '#24B8EC',
                          pathColor: '#24B8EC',
                          trailColor: '#A2A5A8',
                          textSize: '15px',
                        })}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <Typography className={classes.textShifts}>
                      Último plantão
                    </Typography>
                    <div
                      className={classes.dateRow}
                      style={{ color: '#8b8e93', fontSize: 12 }}
                    >
                      <>
                        <div
                          className={classes.iconDateContainer}
                          style={{
                            marginRight: 10,
                            color: '#8B8E93',
                            fontSize: 13,
                            fontFamily: 'Poppins',
                          }}
                        >
                          <Tooltip
                            placement="right"
                            title={`Horário para iniciar : ${formatHourCheck(
                              listCheckDetails[0]?.scale?.date_start
                            )}`}
                          >
                            <IconButton size="small">
                              <StartIcon
                                x={
                                  listCheckDetails &&
                                  listCheckDetails.length > 0 &&
                                  listCheckDetails[0]
                                }
                              />
                            </IconButton>
                          </Tooltip>
                          {listCheckDetails[0]?.user?.check_in === null
                            ? 'Não iniciado'
                            : formatDateAndTime(
                                listCheckDetails[0]?.user?.check_in
                              )}
                        </div>
                        <div
                          className={classes.iconDateContainer}
                          style={{
                            marginRight: 10,
                            color: '#8B8E93',
                            fontSize: 13,
                            fontFamily: 'Poppins',
                          }}
                        >
                          <Tooltip
                            title={`Horário para finalizar : ${formatHourCheck(
                              listCheckDetails[0]?.scale?.date_end
                            )}`}
                            placement="right"
                          >
                            <IconButton size="small">
                              <EndIcon
                                x={
                                  listCheckDetails &&
                                  listCheckDetails.length > 0 &&
                                  listCheckDetails[0]
                                }
                              />
                            </IconButton>
                          </Tooltip>
                          {listCheckDetails[0]?.user?.check_out === null
                            ? 'Não finalizado'
                            : formatDateAndTime(
                                listCheckDetails[0]?.user?.check_out
                              )}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            marginLeft: 10,
                          }}
                        >
                          <Icon size="small" className={classes.blueColor}>
                            schedule
                          </Icon>
                          {(listCheckDetails[0]?.situation_code === 14 ||
                            listCheckDetails[0]?.situation_code === 34) && (
                            <Typography className={classes.textWorkHour}>
                              {parseInt(listCheckDetails[0]?.worked_hours)}h
                              {(
                                (
                                  listCheckDetails[0]?.worked_hours -
                                  parseInt(listCheckDetails[0]?.worked_hours)
                                ).toFixed(3) * 60
                              ).toFixed(0)}{' '}
                              horas trabalhadas
                            </Typography>
                          )}
                          {(listCheckDetails[0]?.situation_code === 13 ||
                            listCheckDetails[0]?.situation_code === 33) && (
                            <Typography className={classes.textWorkHour}>
                              Ocorrendo
                            </Typography>
                          )}
                          {listCheckDetails[0] &&
                            listCheckDetails[0]?.situation_code === 21 && (
                              <Typography className={classes.textWorkHour}>
                                --
                              </Typography>
                            )}
                          {(listCheckDetails[0]?.situation_code === 12 ||
                            listCheckDetails[0]?.situation_code === 32) && (
                            <Typography className={classes.textWorkHour}>
                              --
                            </Typography>
                          )}
                        </div>
                      </>
                    </div>
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <Typography className={classes.textShifts}>
                      Plantões anteriores
                    </Typography>
                    <div
                      onScroll={onScrollBottom}
                      className={classes.scrollContainer}
                    >
                      {listCheckDetails.map((x, i) => (
                        <div
                          key={String(i)}
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
                            }}
                          >
                            <Tooltip
                              title={`Horário para iniciar : ${formatHourCheck(
                                x.scale.date_start
                              )}`}
                              placement="right"
                            >
                              <IconButton size="small">
                                <StartIcon x={x} />
                              </IconButton>
                            </Tooltip>

                            {x.situation_code === 14 ||
                            x.situation_code === 34 ? (
                              <>
                                {x.user.check_in === null
                                  ? 'Validado'
                                  : formatDateAndTime(x.user.check_in)}{' '}
                              </>
                            ) : (
                              <>
                                {x.user.check_in === null
                                  ? 'Não iniciado'
                                  : formatDateAndTime(x.user.check_in)}{' '}
                              </>
                            )}
                          </div>
                          <div
                            className={classes.iconDateContainer}
                            style={{
                              color: '#8B8E93',
                              fontSize: 13,
                              fontFamily: 'Poppins',
                            }}
                          >
                            <Tooltip
                              title={`Horário para finalizar : ${formatHourCheck(
                                x.scale.date_end
                              )}`}
                              placement="right"
                            >
                              <IconButton size="small">
                                <EndIcon x={x} />
                              </IconButton>
                            </Tooltip>

                            {x.situation_code === 14 ||
                            x.situation_code === 34 ? (
                              <>
                                {x.user.check_out === null
                                  ? 'Validado'
                                  : formatDateAndTime(x.user.check_out)}
                              </>
                            ) : (
                              <>
                                {x.user.check_out === null
                                  ? 'Não finalizado'
                                  : formatDateAndTime(x.user.check_out)}
                              </>
                            )}
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              marginLeft: 20,
                            }}
                          >
                            <Icon size="small" className={classes.blueColor}>
                              schedule
                            </Icon>

                            {(x.situation_code === 14 ||
                              x.situation_code === 34) && (
                              <Typography className={classes.textWorkHour}>
                                {x.user.check_out === null
                                  ? `--`
                                  : `${parseInt(x.worked_hours)}h${(
                                      (
                                        x.worked_hours -
                                        parseInt(x.worked_hours)
                                      ).toFixed(3) * 60
                                    ).toFixed(0)} horas trabalhadas`}
                              </Typography>
                            )}
                            {(x.situation_code === 13 ||
                              x.situation_code === 33) && (
                              <Typography className={classes.textWorkHour}>
                                Ocorrendo
                              </Typography>
                            )}
                            {x && x.situation_code === 21 && (
                              <Typography className={classes.textWorkHour}>
                                --
                              </Typography>
                            )}
                            {(x.situation_code === 12 ||
                              x.situation_code === 32) && (
                              <Typography className={classes.textWorkHour}>
                                --
                              </Typography>
                            )}
                          </div>
                          <Divider
                            style={{
                              width: 460,
                              marginTop: 5,
                              marginBottom: 5,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ minHeight: 50 }}>
                      {listCheckDetails.length === 0 && (
                        <div className={classes.loadingContainer}>
                          <Typography>Nenhum resultado encontrado</Typography>
                        </div>
                      )}
                      {loadingCheckDetails && (
                        <div className={classes.loadingContainer}>
                          <CircularProgress
                            style={{
                              color: appColors.PRIMARY_COLOR,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </ModalContainer>
      </Modal>
    </div>
  );
}
