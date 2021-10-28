import React, { useEffect, useState } from 'react';
import {
  useStyles,
  TableControl,
  SearchContainer,
  InputContainer,
} from './styles';
import {
  Divider,
  Icon,
  Grid,
  Typography,
  TableRow,
  Table,
  TableBody,
  TableHead,
  Tooltip,
  Button,
  CircularProgress,
} from '@material-ui/core';
import Layout from 'shared/component/Layout';
import { AntTab, AntTabs } from 'shared/component/TabsComponents';
import { Link } from 'react-router-dom';
import CardShiftTable from './components/shiftTable';
import CollapseTable from 'shared/component/CollapseTable';
import { useConfig } from 'hook/config';
import useScales from 'hook/scales';
import appColors from 'utils/appColors';
import StatusSwitch from 'shared/component/StatusSwitch';
import { useHistory } from 'react-router-dom';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import { ModalAlertSucess } from 'shared/component/modalAlertSucess';
import '../../shared/fixedtab.css';
import SpecialtyName from './components/specialtyName';
import usePersistedState from 'hook/usePersistedState';
import HasPermission from 'utils/checkPermission';

export default function ScalesPage() {
  const history = useHistory();
  const classes = useStyles();
  const { config } = useConfig();

  const permissions = {
    read: 'scale/r',
    create: 'scale/c',
    delete: 'scale/d',
    update: 'scale/u',
  };

  const [stateModal, setStateModal] = useState(false);

  const [filterScales, setFilterScales] = usePersistedState(
    'plantaoextra@scales',
    {
      value: 0,
      page: 1,
      per_page: 10,
      search: '',
      status: 2,
      unit_id:
        config.hospitalData.length > 0 ? config.hospitalData[0].id : null,
    }
  );

  const {
    scalesTimesFilter,
    scalesFilter,
    totalScales,
    loadingChange,
    message,
    setMessage,
    getFilterScales,
    getTimesFilterScales,
    changeScalesId,
    deleteScale,
  } = useScales();

  const { page, unit_id, perPageScale, search } = filterScales;

  React.useEffect(() => {
    config.hospitalData.length > 0 &&
      getFilterScales(page, perPageScale, unit_id, '', search);
  }, [page, totalScales, unit_id, search]);

  React.useEffect(() => {
    message && message !== 'Deletado com Sucesso' && setStateModal(true);
  }, [message]);

  const [seletedRow, setSelectedRow] = useState('');
  const handleStateModal = () => {
    setStateModal(!stateModal);
    setMessage('');
  };

  const handleChangePage = (page) => {
    setFilterScales({ ...filterScales, page: page });
  };

  const handleSearch = (search) => {
    setFilterScales((old) => ({ ...old, page: 1, search }));
  };

  const handleChangeUnit = (unit) => {
    setFilterScales((oldState) => ({ ...oldState, unit_id: unit?.id }));
  };

  const handleChangeTab = (event, newValue) => {
    setTimeout(function () {
      window.location.reload(1);
    });
    setFilterScales({
      ...filterScales,
      value: newValue,
      page: 1,
      search: '',
    });
  };

  const componentMinimizable = (row) => (
    <div>
      <Table style={{ backgroundColor: '#E5E5E5' }}>
        {scalesTimesFilter.loadingScales ? (
          <div
            style={{
              textAlign: 'center',
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <CircularProgress
              style={{
                color: appColors.PRIMARY_COLOR,
              }}
              size={90}
            />
          </div>
        ) : (
          <div
            className={
              config.open
                ? classes.container_minimizable
                : classes.container_minimizableClose
            }
          >
            <TableHead>
              <TableRow className={classes.textRow}>
                <Typography className={classes.textWeek}>Segunda</Typography>
                <Typography className={classes.textWeek}>Terça</Typography>
                <Typography className={classes.textWeek}>Quarta</Typography>
                <Typography className={classes.textWeek}>Quinta</Typography>
                <Typography className={classes.textWeek}>Sexta</Typography>
                <Typography className={classes.textWeek}>Sábado</Typography>
                <Typography className={classes.textWeek}>Domingo</Typography>
              </TableRow>
            </TableHead>
            <TableBody>
              <Grid>
                <Grid component="th" scope="row">
                  {scalesTimesFilter.dataTimesScalesFilter.length > 0 ? (
                    scalesTimesFilter.dataTimesScalesFilter
                      .slice(0, 3)
                      .map((scales) => (
                        <CardShiftTable
                          key={scales.id}
                          scales={scales}
                          hourStart={scales[0].hour_start}
                          hourEnd={scales[0].hour_end}
                          seachTimesScale={seachTimesScale}
                          permissions={permissions}
                        />
                      ))
                  ) : (
                    <Button
                      className={classes.tableAddScales}
                      onClick={() => {
                        history.push(
                          `/escala-completa/${filterScales.unit_id}/${row.id}/true`
                        );
                      }}
                    >
                      <Icon className={classes.iconAdd}>
                        add_circle_outline
                      </Icon>
                      <Typography className={classes.textAddTable}>
                        Adicionar horário
                      </Typography>
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Link
                style={{ textDecoration: 'none' }}
                to={`/escala-completa/${filterScales.unit_id}/${row.id}`}
              >
                <div className={classes.rootFullScales}>
                  <Typography className={classes.textTable}>
                    Ver escala completa
                    <Icon fontSize="small">keyboard_arrow_right</Icon>
                  </Typography>
                </div>
              </Link>
            </TableBody>
          </div>
        )}
      </Table>
    </div>
  );

  const onExpandRow = (row, isExpanded) => {
    if (isExpanded) seachTimesScale(row.id);
  };

  const seachTimesScale = (id) => {
    if (scalesFilter.dataScalesFilter.length > 0) {
      getTimesFilterScales(filterScales.unit_id, id);
    }
  };

  const abas = config.hospitalData.map((item) => ({
    name: item.name,
    id: item.id,
  }));

  const columns = ({ handleChangeStatus }) => {
    return [
      { id: 'id', label: '#', minWidth: 10 },
      { id: 'name', label: 'Escala', minWidth: 100 },
      {
        id: 'specialty.name',
        label: 'Especialidade',
        minWidth: 50,
        render: (rowData) => <SpecialtyName rowData={rowData} />,
      },
      {
        id: 'status',
        label: 'Status da escala',
        minWidth: 50,
        render: (rowData, index) => (
          <StatusSwitch
            key={index}
            changeStatus={handleChangeStatus}
            rowData={rowData}
            permissions={permissions}
          />
        ),
      },
    ];
  };

  const handleChangeStatus = (status, data) => {
    changeScalesId(data.id, data.unit.id);
  };

  useEffect(() => {
    if (config.hospitalData.length <= 2) {
      setFilterScales({
        value: 0,
        page: 1,
        per_page: 10,
        search: '',
        unit_id:
          config.hospitalData.length > 0 ? config.hospitalData[0].id : null,
      });
    }
  }, [config]);
  useEffect(() => {
    if (scalesFilter.dataScalesFilter.length < 1) {
      setFilterScales({ ...filterScales, page: 1 });
    }
  }, []);

  return (
    <Layout
      route="/cadastros"
      specificRoute
      title="Escalas"
      showToday
      backArrow
      isLoading={loadingChange}
    >
      <div id="fixed-tab">
        <AntTabs
          onChange={handleChangeTab}
          value={filterScales.value}
          aria-label="ant example"
        >
          {abas.map((option, i) => (
            <AntTab
              key={i}
              onClick={() => handleChangeUnit(option)}
              label={option.name}
            />
          ))}
        </AntTabs>
        <Divider style={{ paddingTop: 2, marginRight: 20 }} />
      </div>
      <SearchContainer>
        <InputContainer>
          <SearchInputDebounce
            className={classes.inputWidth}
            onChange={handleSearch}
            placeholder="Busque por escala"
            style={{
              alignItems: 'center',
              height: 48,
              width: '90%',
            }}
          />
        </InputContainer>
        <Tooltip
          title={
            HasPermission(permissions.create) ? '' : 'Você não tem permissão'
          }
          placement="bottom"
          arrow
        >
          <Button
            data-cy="btn_cadastrar"
            onClick={
              HasPermission(permissions.create)
                ? () =>
                    history.push(
                      `/cadastros/escalas/cadastrar/${filterScales.unit_id}`
                    )
                : undefined
            }
            className={classes.registerButton}
          >
            <Typography className={classes.registerText}>
              Cadastrar escala
            </Typography>
          </Button>
        </Tooltip>
      </SearchContainer>
      <TableControl data-cy="dataTable">
        <CollapseTable
          permissions={permissions}
          pageByProps={filterScales.page}
          dataList={scalesFilter.dataScalesFilter}
          useTimeOut={false}
          columns={columns({ handleChangeStatus })}
          loading={scalesFilter.loadingScales}
          totalList={scalesFilter.totalScales}
          redirectTo={`/escala-completa/${filterScales.unit_id}`}
          perPage={filterScales?.perPage}
          origin="SCALE"
          handleChangePage={handleChangePage}
          componentMinimizable={componentMinimizable}
          onExpandRow={onExpandRow}
          seletedRow={seletedRow}
          setSelectedRow={setSelectedRow}
          onDeleteRequest={(scale_id) => {
            scalesFilter.dataScalesFilter.length > 1
              ? deleteScale(unit_id, scale_id).then(() => {
                  getFilterScales(page, perPageScale, unit_id);
                })
              : deleteScale(unit_id, scale_id).then(() => {
                  getFilterScales(page === 1, perPageScale, unit_id);
                });
          }}
        />
      </TableControl>
      {status.status !== 403 ? (
        <ModalAlertSucess
          openSendFinish={stateModal}
          handleCloseSendFinish={handleStateModal}
          messageTitleAlert={message}
          error
        />
      ) : (
        <ModalAlertSucess
          openSendFinish={stateModal}
          handleCloseSendFinish={handleStateModal}
          messageTitleAlert={message}
        />
      )}
    </Layout>
  );
}
