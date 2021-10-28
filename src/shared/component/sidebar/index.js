import React from 'react';
import { IconButton, Divider, Drawer } from '@material-ui/core';
import clsx from 'clsx';
import { useConfig } from 'hook/config';
import { useStyles } from './style';
import { MenuSidebar } from 'route';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useAuth } from 'hook/auth';
import AvatarSidebar from './components/avatar';
import useUser from 'hook/user';

const Sidebar = () => {
  const classes = useStyles();
  const { config, setConfig } = useConfig();
  const { userLogged } = useAuth();
  const handleDrawerClose = () => {
    setConfig({ ...config, open: false });
  };
  const handleDrawerOpen = () => {
    setConfig({ ...config, open: true });
  };
  const { user, getUserId } = useUser();
  const { data } = user;
  const id = userLogged.id;
  const name = userLogged.name;
  React.useEffect(() => {
    getUserId(id);
  }, []);

  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !config.open && classes.drawerPaperClose
          ),
        }}
        open={config.open}
      >
        {data && config.open ? (
          <div className={classes.sideImage}>
            <img
              alt=""
              src={data.company && data.company.image_url}
              className={classes.imageSideBar}
            />
          </div>
        ) : (
          <div className={classes.sideImage}></div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {config.open ? (
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
                onClick={handleDrawerClose}
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
                onClick={handleDrawerOpen}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
          )}
        </div>
        {config.open ? (
          <Link
            to="/profile"
            style={{
              textDecoration: 'none',
              color: 'black',
            }}
          >
            <div className={classes.profile}>
              <AvatarSidebar name={name} data={data} />
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
              <AvatarSidebar data={data} />
            </div>
          </Link>
        )}
        <Divider style={{ marginBottom: 20 }} />
        <MenuSidebar />
      </Drawer>
    </>
  );
};
export default Sidebar;
