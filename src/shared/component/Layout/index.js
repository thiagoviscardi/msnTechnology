import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles';
import NewSidebar from '../NewSideBar';

export default function Layout({
  children,
  title = '',
  route,
  specificRoute,
  backArrow = false,
  handleDateChange = () => {},
  isLoading = false,
  calendarWeek = true,
  calendarDay = true,
  calendarRange = false,
  showToday = false,
  calendarMonth = false,
  showHeader = true,
  handleCleanCheckbox = null,
  startNull = null,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NewSidebar
        title={title}
        route={route}
        specificRoute={specificRoute}
        backArrow={backArrow}
        handleDateChange={handleDateChange}
        calendarWeek={calendarWeek}
        calendarRange={calendarRange}
        showToday={showToday}
        calendarMonth={calendarMonth}
        calendarDay={calendarDay}
        handleCleanCheckbox={handleCleanCheckbox}
        showHeader={showHeader}
        startNull={startNull}
      />
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <main className={classes.content}>
        <>{children}</>
      </main>
    </div>
  );
}
