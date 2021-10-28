import React, { useEffect, useRef } from 'react';
import { useStyles } from './styles';
import IndividualReportCard from 'shared/component/individualReportCard';
import { CircularProgress, Button, Typography } from '@material-ui/core';
import appColors from 'utils/appColors';
import moment from 'moment';
import useDashboardBi from 'hook/dashboardBi';
import TabPanel from './components/tabPanel';
import ShiftsModal from './components/shiftsModal';
import GeralReports from './components/geralReports';
import ShiftsTab from './components/shiftsTab';
import Layout from 'shared/component/Layout';

export default function ShiftsPage() {
  const dateObj = new Date();
  const day = moment(dateObj).format('YYYY-MM-DD');
  const dayByLocal = localStorage.getItem('calendarDayPiker')
    ? moment(localStorage.getItem('calendarDayPiker')).format('YYYY-MM-DD')
    : '';
  const timer = useRef();

  const {
    getDashboardBi,
    dashboardBi,
    getDashboardBiDetail,
    dashboardBiDetail,
  } = useDashboardBi();
  const { dataBi, loadingBi, dataBiTotalMounth } = dashboardBi;
  const { dataBiDetail, loadingBiDetail, totalBiDetail } = dashboardBiDetail;
  const [date, setDate] = React.useState(dayByLocal ? dayByLocal : day);

  const debounce = (fn, d) => {
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        fn.apply(context, args);
      }, d);
    };
  };
  useEffect(() => {
    const _getDashboardBi = debounce(getDashboardBi, 300);
    _getDashboardBi(date);
  }, [date]);

  const handleDateChange = ({ formated_date }) => {
    setDate(formated_date);
  };
  const [state, setState] = React.useState({
    value: 0,
    open: false,
    title: '',
    type: '',
  });
  const { open, title, value, type } = state;
  const handleOpen = (data, type) => () => {
    getDashboardBiDetail(data.unit.id, type, date);
    setState({ ...state, open: true, title: data.unit.name, type: type });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleChange = (event, newValue) => {
    setState({ ...state, value: newValue });
  };

  const classes = useStyles();
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTimeout(() => {
        getDashboardBi(date);
      }, 1000);
    }, 180000);
    return () => {
      clearInterval(intervalo);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Layout
        title="Visão geral de plantões"
        backArrow={true}
        handleDateChange={handleDateChange}
        calendarWeek={false}
        isLoading={loadingBiDetail}
      >
        <GeralReports
          quantityShifts={dataBiTotalMounth.shifts_month}
          quantityFinished={dataBiTotalMounth.finished_month}
          quantityNotStarted={dataBiTotalMounth.not_started_month}
        />
        <ShiftsTab handleChange={handleChange} value={value} />
        <div className={classes.rowContainer}>
          {loadingBi && (
            <div className={classes.progressContainer}>
              <CircularProgress
                style={{
                  color: appColors.PRIMARY_COLOR,
                }}
                size={90}
              />
            </div>
          )}
          <TabPanel value={value} index={0} fullWidth>
            {!loadingBi &&
              dataBi.shifts &&
              dataBi.shifts.units.length > 0 &&
              dataBi.shifts.units.map((item, i) => (
                <Button
                  key={i}
                  type="button"
                  onClick={handleOpen(item, 'shifts')}
                >
                  <IndividualReportCard
                    title={item.unit.name}
                    quantity={item.total}
                    type="shift"
                  />
                </Button>
              ))}
            {!loadingBi && dataBi.shifts && dataBi.shifts.units.length === 0 && (
              <div className={classes.messageContainer}>
                <Typography className={classes.emptyMessage}>
                  Não há plantões
                </Typography>
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1} fullWidth>
            {!loadingBi &&
              dataBi.in_progress &&
              dataBi.in_progress.units.length > 0 &&
              dataBi.in_progress.units.map((item, i) => (
                <Button
                  key={i}
                  type="button"
                  onClick={handleOpen(item, 'in_progress')}
                >
                  <IndividualReportCard
                    title={item.unit.name}
                    quantity={item.total}
                    type="shift"
                  />
                </Button>
              ))}
            {!loadingBi &&
              dataBi.in_progress &&
              dataBi.in_progress.units.length === 0 && (
                <div className={classes.messageContainer}>
                  <Typography className={classes.emptyMessage}>
                    Não há plantões
                  </Typography>
                </div>
              )}
          </TabPanel>
          <TabPanel value={value} index={2} fullWidth>
            {!loadingBi &&
              dataBi.finished &&
              dataBi.finished.units.length > 0 &&
              dataBi.finished.units.map((item, i) => (
                <Button
                  key={i}
                  type="button"
                  onClick={handleOpen(item, 'finished')}
                >
                  <IndividualReportCard
                    title={item.unit.name}
                    quantity={item.total}
                    type="shift"
                  />
                </Button>
              ))}
            {!loadingBi &&
              dataBi.finished &&
              dataBi.finished.units.length === 0 && (
                <div className={classes.messageContainer}>
                  <Typography className={classes.emptyMessage}>
                    Não há plantões
                  </Typography>
                </div>
              )}
          </TabPanel>
          <TabPanel value={value} index={3} fullWidth>
            {!loadingBi &&
              dataBi.not_finished &&
              dataBi.not_finished.units.length > 0 &&
              dataBi.not_finished.units.map((item, i) => (
                <Button
                  key={i}
                  type="button"
                  onClick={handleOpen(item, 'not_finished')}
                >
                  <IndividualReportCard
                    title={item.unit.name}
                    quantity={item.total}
                    type="shift"
                  />
                </Button>
              ))}
            {!loadingBi &&
              dataBi.not_finished &&
              dataBi.not_finished.units.length === 0 && (
                <div className={classes.messageContainer}>
                  <Typography className={classes.emptyMessage}>
                    Não há plantões
                  </Typography>
                </div>
              )}
          </TabPanel>
          <TabPanel value={value} index={4} fullWidth>
            {!loadingBi &&
              dataBi.validated &&
              dataBi.validated.units.length > 0 &&
              dataBi.validated.units.map((item, i) => (
                <Button
                  key={i}
                  type="button"
                  onClick={handleOpen(item, 'validated')}
                >
                  <IndividualReportCard
                    title={item.unit.name}
                    quantity={item.total}
                    type="shift"
                  />
                </Button>
              ))}
            {!loadingBi &&
              dataBi.validated &&
              dataBi.validated.units.length === 0 && (
                <div className={classes.messageContainer}>
                  <Typography className={classes.emptyMessage}>
                    Não há plantões
                  </Typography>
                </div>
              )}
          </TabPanel>
          <TabPanel value={value} index={5} fullWidth>
            {!loadingBi &&
              dataBi.at_sight &&
              dataBi.at_sight.units.length > 0 &&
              dataBi.at_sight.units.map((item, i) => (
                <Button
                  key={i}
                  type="button"
                  onClick={handleOpen(item, 'at_sight')}
                >
                  <IndividualReportCard
                    title={item.unit.name}
                    quantity={item.total}
                    type="shift"
                  />
                </Button>
              ))}
            {!loadingBi &&
              dataBi.at_sight &&
              dataBi.at_sight.units.length === 0 && (
                <div className={classes.messageContainer}>
                  <Typography className={classes.emptyMessage}>
                    Não há plantões
                  </Typography>
                </div>
              )}
          </TabPanel>
          <TabPanel value={value} index={6} fullWidth>
            {!loadingBi &&
              dataBi.not_started &&
              dataBi.not_started.units.length > 0 &&
              dataBi.not_started.units.map((item, i) => (
                <Button
                  key={i}
                  type="button"
                  onClick={handleOpen(item, 'not_started')}
                >
                  <IndividualReportCard
                    title={item.unit.name}
                    quantity={item.total}
                    type="shift"
                  />
                </Button>
              ))}
            {!loadingBi &&
              dataBi.not_started &&
              dataBi.not_started.units.length === 0 && (
                <div className={classes.messageContainer}>
                  <Typography className={classes.emptyMessage}>
                    Não há plantões
                  </Typography>
                </div>
              )}
          </TabPanel>
        </div>
        <ShiftsModal
          open={open}
          title={title}
          list={dataBiDetail}
          loadingReports={loadingBiDetail}
          totalReports={totalBiDetail}
          type={type}
          handleClose={handleClose}
        />
      </Layout>
    </div>
  );
}
