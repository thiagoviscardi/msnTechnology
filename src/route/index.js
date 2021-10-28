import React, { useState } from 'react';
import { ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'hook/auth';
import { icons } from 'asset';
import useStyles from './styles';
import { useConfig } from 'hook/config';
import logo from 'asset/image/logo.png';
import { Divider, Typography } from '@material-ui/core';
import HospitalList from './components/hospitalList';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';

export const MenuSidebar = ({ handleCleanCheckbox }) => {
  const history = useHistory();
  const { config, setConfig } = useConfig(false);
  const [data, setData] = useState(moment().format('lll'));
  const classes = useStyles();
  const { logout, getUserPermissions } = useAuth(); //userLogged to do voltar a esse userLogged
  const userLogged = { group: { id: 1 } };
  userLogged.group.id = 1;

  const logoutFunction = () => {
    logout();
    setConfig({ ...config, hospitalData: [] });
    history.push('/login');
  };

  React.useEffect(() => {
    getUserPermissions();
    return history.listen(() => {
      setData(moment().format('lll'));
    });
  }, [history]);

  const changeListHospital = (id, type) => () => {
    const scaleLocal = localStorage && localStorage.getItem('selectedScale');
    const scaleJsonInLocal =
      localStorage.getItem('selectedScale') && JSON.parse(scaleLocal);
    const scaleInArray = scaleJsonInLocal ? scaleJsonInLocal : [];

    const selectedLocalUnit = localStorage.getItem('selectedLocalUnit');
    const selectedLocalUnitJsonInLocal =
      selectedLocalUnit && JSON.parse(selectedLocalUnit);

    const removedItemList = config.hospitalData.filter(
      (item) => item.id !== id
    );

    const removedScaleInList = removedItemList
      .map((item) => scaleInArray.filter((scale) => scale.unit === item.id))
      .flat();

    if (selectedLocalUnitJsonInLocal?.id === id) {
      removedItemList.length &&
        localStorage.setItem(
          'selectedLocalUnit',
          JSON.stringify(removedItemList[0])
        );
    }

    localStorage.setItem(
      'selectedScale',
      JSON.stringify([...removedScaleInList])
    );
    localStorage.setItem(
      'plantãoExtra@hospital',
      JSON.stringify([...removedItemList])
    );
    setConfig({
      ...config,
      hospitalData: [...removedItemList],
      hospitalId: [...removedItemList],
    });
    handleCleanCheckbox && handleCleanCheckbox(id);
    type === 'change' && !handleCleanCheckbox && history.push('/');
  };

  const [activeLink, setActiveLink] = React.useState(0);

  return (
    <div className={classes.container}>
      <div style={{ flex: 1 }}>
        {config.hospitalData?.length === 0 ? (
          <NavLink
            to={`/inicio`}
            activeStyle={{ color: '#020202' }}
            isActive={(match) => {
              match && setActiveLink(1);
              return match;
            }}
            style={{ color: '#BBBDBF', textDecoration: 'none' }}
          >
            <ListItem button>
              <Tooltip title="Início" placement="right">
                <ListItemIcon>
                  <Icon
                    data-cy="img_dashboard"
                    style={{
                      filter:
                        activeLink === 1
                          ? 'invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
                          : 'invert(84%) sepia(65%) saturate(0%) hue-rotate(297deg) brightness(84%) contrast(79%)',
                    }}
                    className={classes.icons}
                  >
                    grid_view
                  </Icon>
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                style={{ fontFamily: 'Poppins' }}
                primary="Início"
              />
            </ListItem>
          </NavLink>
        ) : (
          <NavLink
            to={`/plantoes`}
            activeStyle={{ color: '#020202' }}
            isActive={(match) => {
              match && setActiveLink(1);
              return match;
            }}
            style={{ color: '#BBBDBF', textDecoration: 'none' }}
          >
            <ListItem button>
              <Tooltip title="Visão Geral" placement="right">
                <ListItemIcon>
                  <Icon
                    data-cy="img_dashboard"
                    style={{
                      filter:
                        activeLink === 1
                          ? 'invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
                          : 'invert(84%) sepia(65%) saturate(0%) hue-rotate(297deg) brightness(84%) contrast(79%)',
                    }}
                    className={classes.icons}
                  >
                    analytics
                  </Icon>
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                style={{ fontFamily: 'Poppins' }}
                primary="Visão Geral"
              />
            </ListItem>
          </NavLink>
        )}
        {config.hospitalData?.length > 0 && (
          <>
            <NavLink
              to={`/dashboard`}
              activeStyle={{ color: '#020202' }}
              isActive={(match) => {
                match && setActiveLink(1);
                return match;
              }}
              style={{ color: '#BBBDBF', textDecoration: 'none' }}
            >
              <ListItem button>
                <Tooltip title="Dashboard" placement="right">
                  <ListItemIcon>
                    <Icon
                      data-cy="img_dashboard"
                      style={{
                        filter:
                          activeLink === 1
                            ? 'invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
                            : 'invert(84%) sepia(65%) saturate(0%) hue-rotate(297deg) brightness(84%) contrast(79%)',
                      }}
                      className={classes.icons}
                    >
                      grid_view
                    </Icon>
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  style={{ fontFamily: 'Poppins' }}
                  primary="Dashboard"
                />
              </ListItem>
            </NavLink>
            {config.hospitalData?.length > 0 &&
              config.hospitalData.map((item) => (
                <HospitalList
                  length={config.hospitalData?.length}
                  key={item.id}
                  item={item}
                  changeHospital={changeListHospital(item.id, 'change')}
                  removeHospital={changeListHospital(item.id)}
                />
              ))}
            <NavLink
              to={`/escala-do-dia`}
              activeStyle={{ color: '#020202' }}
              isActive={(match) => {
                match && setActiveLink(2);
                return match;
              }}
              style={{ color: '#BBBDBF', textDecoration: 'none' }}
            >
              <ListItem button>
                <Tooltip title="Escala do dia" placement="right">
                  <ListItemIcon>
                    <img
                      data-cy="img_escala_do_dia"
                      style={{
                        filter:
                          activeLink === 2
                            ? 'invert(0%) sepia(0%) saturate(28%) hue-rotate(136deg) brightness(101%) contrast(105%)'
                            : 'invert(84%) sepia(65%) saturate(0%) hue-rotate(297deg) brightness(84%) contrast(79%)',
                      }}
                      src={icons.howToReg}
                      alt=""
                    />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Escala do dia" />
              </ListItem>
            </NavLink>
            <NavLink
              to={`/agenda`}
              activeStyle={{ color: '#020202' }}
              isActive={(match) => {
                match && setActiveLink(3);
                return match;
              }}
              style={{ color: '#BBBDBF', textDecoration: 'none' }}
            >
              <ListItem button id="btnAgenda">
                <Tooltip title="Agenda" placement="right">
                  <ListItemIcon>
                    <img
                      style={{
                        filter:
                          activeLink === 3
                            ? 'invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
                            : 'invert(84%) sepia(65%) saturate(0%) hue-rotate(297deg) brightness(84%) contrast(79%)',
                      }}
                      src={icons.today}
                      alt=""
                    />
                  </ListItemIcon>
                </Tooltip>

                <ListItemText primary="Agenda" />
              </ListItem>
            </NavLink>
            <NavLink
              to={`/relatorios`}
              activeStyle={{ color: '#020202' }}
              isActive={(match) => {
                match && setActiveLink(4);
                return match;
              }}
              style={{ color: '#BBBDBF', textDecoration: 'none' }}
            >
              <ListItem button>
                <Tooltip title="Relatórios" placement="right">
                  <ListItemIcon>
                    <img
                      data-cy="img_relatorios"
                      style={{
                        filter:
                          activeLink === 4
                            ? 'invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
                            : 'invert(84%) sepia(65%) saturate(0%) hue-rotate(297deg) brightness(84%) contrast(79%)',
                      }}
                      src={icons.timeline}
                      alt=""
                    />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Relatórios" />
              </ListItem>
            </NavLink>
            <NavLink
              to={`/relatorio-de-trocas`}
              activeStyle={{ color: '#020202' }}
              isActive={(match) => {
                match && setActiveLink(5);
                return match;
              }}
              style={{ color: '#BBBDBF', textDecoration: 'none' }}
            >
              <ListItem button>
                <Tooltip title="Trocas" placement="right">
                  <ListItemIcon>
                    <img
                      data-cy="img_trocas"
                      style={{
                        filter:
                          activeLink === 5
                            ? 'invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
                            : 'invert(84%) sepia(65%) saturate(0%) hue-rotate(297deg) brightness(84%) contrast(79%)',
                      }}
                      src={icons.repeat}
                      alt=""
                    />
                  </ListItemIcon>
                </Tooltip>

                <ListItemText primary="Trocas" />
              </ListItem>
            </NavLink>
            <NavLink
              to={`/cadastros`}
              activeStyle={{ color: '#020202' }}
              isActive={(match) => {
                match && setActiveLink(6);
                return match;
              }}
              style={{ color: '#BBBDBF', textDecoration: 'none' }}
            >
              <ListItem button>
                <Tooltip title="Cadastros" placement="right">
                  <ListItemIcon>
                    <img
                      data-cy="img_cadastros"
                      style={{
                        filter:
                          activeLink === 6
                            ? 'invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
                            : 'invert(84%) sepia(65%) saturate(0%) hue-rotate(297deg) brightness(84%) contrast(79%)',
                      }}
                      src={icons.assignment}
                      alt=""
                    />
                  </ListItemIcon>
                </Tooltip>

                <ListItemText primary="Cadastros" />
              </ListItem>
            </NavLink>
          </>
        )}
      </div>
      <div>
        {userLogged.group.id == 1 && (
          <div className={classes.menuItem}>
            <NavLink
              to={`/settings`}
              activeStyle={{ color: '#020202' }}
              isActive={(match) => {
                match && setActiveLink(7);
                return match;
              }}
              style={{ color: '#BBBDBF', textDecoration: 'none' }}
            >
              <ListItem button>
                <Tooltip title="Configurações" placement="right">
                  <ListItemIcon>
                    <img
                      data-cy="img_configuracoes"
                      style={{
                        filter:
                          activeLink === 7
                            ? 'invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
                            : 'invert(84%) sepia(65%) saturate(0%) hue-rotate(297deg) brightness(84%) contrast(79%)',
                      }}
                      src={icons.settings}
                      alt=""
                    />
                  </ListItemIcon>
                </Tooltip>

                <ListItemText primary="Configurações" />
              </ListItem>
            </NavLink>
          </div>
        )}
        <div className={classes.menuItem}>
          <ListItem
            button
            onClick={logoutFunction}
            className={classes.linkStyle}
          >
            <Tooltip title="Sair" placement="right">
              <ListItemIcon id="btnSair">
                <img
                  style={{
                    filter:
                      'invert(84%) sepia(65%) saturate(0%) hue-rotate(297deg) brightness(84%) contrast(79%)',
                  }}
                  src={icons.exitToApp}
                  alt=""
                />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Sair" />
          </ListItem>
        </div>
        <Divider />
        {config.open && (
          <div className={classes.dataContainer}>
            <Typography className={classes.dataText}>
              Última sincronização: {data}
            </Typography>
            <img alt="" src={logo} className={classes.imageSideBar} />
          </div>
        )}
      </div>
    </div>
  );
};
export default MenuSidebar;
