import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Header from 'shared/component/header';
import { useStyles } from './style';
import { useAuth } from 'hook/auth';
import MenuSidebar from 'route';
import { Link } from 'react-router-dom';
import AvatarSidebar from '../sidebar/components/avatar';
import appColors from 'utils/appColors';
import usePersistedState from 'hook/usePersistedState';
import { useConfig } from 'hook/config';

const NewSidebar = ({
  title = '',
  route,
  specificRoute,
  backArrow = false,
  handleDateChange = () => {},
  calendarWeek = true,
  calendarDay = true,
  calendarRange = false,
  showToday = false,
  calendarMonth = false,
  showHeader = true,
  handleCleanCheckbox = null,
  startNull = null,
}) => {
  const classes = useStyles();
  const { config, setConfig } = useConfig();

  const { userLogged } = useAuth();

  const [open, setOpen] = usePersistedState('openSidebar', true);

  const handledrawerPaper = () => {
    setOpen(true);
    setConfig({ ...config, open: true });
  };

  const handledrawerPaperClose = () => {
    setOpen(false);
    setConfig({ ...config, open: false });
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ backgroundColor: appColors.BACKGROUND_COLOR }}>
          {showHeader && (
            <Header
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
              open={open}
              startNull={startNull}
            />
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerPaper]: open,
          [classes.drawerPaperClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerPaper]: open,
            [classes.drawerPaperClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div className={classes.container_image}>
            {userLogged && open ? (
              <div className={classes.sideImage}>
                <img
                  alt=""
                  src={userLogged?.company?.image_url}
                  className={classes.imageSideBar}
                />
              </div>
            ) : (
              <div className={classes.sideImage}></div>
            )}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {open ? (
            <div className={classes.iconSideContainer}>
              <IconButton
                id="abrefechamenulateral"
                style={{
                  color: 'white',
                  backgroundColor: '#24B8EC',
                  width: 20,
                  height: 20,
                  overflow: 'inherit',
                  marginLeft: -13,
                  position: 'absolute',
                }}
                onClick={handledrawerPaperClose}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
            </div>
          ) : (
            <div className={classes.iconSideContainer}>
              <IconButton
                style={{
                  color: 'white',
                  backgroundColor: '#24B8EC',
                  width: 25,
                  height: 25,
                  marginRight: 20,
                  marginTop: 10,
                  justifyContent: 'center',
                }}
                onClick={handledrawerPaper}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
          )}
        </div>
        {open ? (
          <Link
            to="/profile"
            style={{
              textDecoration: 'none',
              color: 'black',
            }}
          >
            <div className={classes.profile}>
              <AvatarSidebar name={userLogged?.name} data={userLogged} />
            </div>
          </Link>
        ) : (
          <Link
            to="/profile"
            style={{
              textDecoration: 'none',
            }}
          >
            <div style={{ marginTop: 90 }} className={classes.profile}>
              <AvatarSidebar data={userLogged} />
            </div>
          </Link>
        )}
        <Divider style={{ marginBottom: 20 }} />
        <div style={{ overflowY: 'auto', flex: 1, overflowX: 'hidden' }}>
          <MenuSidebar handleCleanCheckbox={handleCleanCheckbox} />
        </div>
      </Drawer>
    </>
  );
};
export default NewSidebar;
