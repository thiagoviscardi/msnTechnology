import React, { useCallback, useEffect } from 'react';
import { useStyles, TableControl, InputContainer, InputSelect } from './styles';
import {
  Button,
  Typography,
  Divider,
  TableCell,
  Tooltip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useProfessional } from 'hook/professional/index';
import { useConfig } from 'hook/config';
import Layout from 'shared/component/Layout';
import DefaultTable from 'shared/component/DefaultTable';
import TabPanel from 'shared/component/tabPanel';
import { AntTab, AntTabs } from 'shared/component/TabsComponents';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import StatusSwitch from 'shared/component/StatusSwitch';
import { AvatarNameComponent } from 'shared/component/AvatarNameComponent';
import CustomSelect from 'shared/component/forms/CustomSelect';
import usePersistedState from 'hook/usePersistedState';
import '../../shared/fixedtab.css';
import HasPermission from 'utils/checkPermission';

export default function ProfessionalPage() {
  const classes = useStyles();
  const { config } = useConfig();

  const permissions = {
    read: 'professional/r',
    create: 'professional/c',
    delete: 'professional/d',
    update: 'professional/u',
    export: 'professional/export',
  };

  const columns = ({ handleChangeStatus }) => {
    return [
      { id: 'id', label: '#', minWidth: 10 },
      {
        id: 'name',
        label: 'Nome',
        minWidth: 100,
        render: (rowData, index) => (
          <AvatarNameComponent key={index} rowData={rowData} />
        ),
      },
      { id: 'cpf', label: 'CPF', minWidth: 100 },
      { id: 'group.name', label: 'Campo de atuação', minWidth: 100 },
      {
        id: 'specialties',
        label: 'Especialidades',
        minWidth: 100,
        render: (rowData, index) => (
          <SpecialtiesNames key={index} specialties={rowData?.especialties} />
        ),
      },
      {
        id: 'status',
        label: 'Status',
        minWidth: 10,
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

  const SpecialtiesNames = ({ specialties }) => {
    if (!specialties || !specialties.length > 0)
      return <TableCell>...</TableCell>;
    const concatedNames = specialties.map((item) => item?.name).join(', ');
    return <TableCell>{concatedNames}</TableCell>;
  };

  const {
    data: dataProfessionals,
    loading: loadingProfessionals,
    total: totalProfessionals,
    deleteLoading,
    getProfessionals,
    deleteProfessional,
    toggleStatus,
  } = useProfessional();

  const [filterProfessionals, setFilterProfessionals] = usePersistedState(
    'plantaoextra@professional',
    {
      value: 0,
      page: 1,
      search: '',
      per_page: 10,
      unit_id:
        config.hospitalData.length > 0 ? config.hospitalData[0].id : null,
      group_type: 'professional',
      status: 'active',
    }
  );

  const [profissionalType, setProfissionalType] = usePersistedState(
    'plantaoextra@typeProfessional',
    {
      label: 'Todos',
      value: 'professional',
    }
  );
  const [profissionalStatus, setProfissionalStatus] = usePersistedState(
    'plantaoextra@statusProfessional',
    {
      label: 'Ativos',
      value: 'active',
    }
  );
  const handleChangeProfessional = (val) => {
    setProfissionalType(val);
    setFilterProfessionals((oldState) => ({
      ...oldState,
      group_type: val?.value,
    }));
  };
  const handleChangeProfessionalStatus = (val) => {
    setProfissionalStatus(val);
    setFilterProfessionals((oldState) => ({
      ...oldState,
      status: val?.value,
    }));
  };
  React.useEffect(() => {
    getProfessionals(filterProfessionals);
  }, [filterProfessionals]);

  const handleChangePage = (page) => {
    setFilterProfessionals({ ...filterProfessionals, page: page });
  };

  const handleSearch = (search) => {
    setFilterProfessionals((old) => ({ ...old, page: 1, search }));
  };

  const handleChangeUnit = (unit) => {
    setFilterProfessionals((oldState) => ({ ...oldState, unit_id: unit?.id }));
  };

  const handleChangeStatus = useCallback((status, data) => {
    toggleStatus({ id: data?.id, status });
    getProfessionals({
      value: filterProfessionals.value,
      page: 1,
      unit_id: filterProfessionals.unit_id,
      group_type: filterProfessionals.group_type,
      status: filterProfessionals.status,
    });
  });
  const handleChangeTab = (event, newValue) => {
    setFilterProfessionals({
      ...filterProfessionals,
      value: newValue,
      page: 1,
    });
  };

  const abas = config.hospitalData.map((item) => ({
    name: item.name,
    id: item.id,
  }));
  const typeProfessional = [
    { label: 'Todos', value: 'professional' },
    { label: 'Médicos', value: 'doctor' },
    { label: 'Multiprofissional', value: 'multi' },
  ];
  const typeProfessionalStatus = [
    { label: 'Ativos', value: 'active' },
    { label: 'Inativos', value: 'deactive' },
  ];

  useEffect(() => {
    if (config.hospitalData) {
      setFilterProfessionals({
        value: 0,
        page: 1,
        per_page: 10,
        search: '',
        unit_id:
          config.hospitalData.length > 0 ? config.hospitalData[0].id : null,
        group_type: 'professional',
        status: 'active',
      });
    }
  }, [config]);
  useEffect(() => {
    if (dataProfessionals.length < 1) {
      setFilterProfessionals({
        ...filterProfessionals,
        page: 1,
      });
    }
  }, []);
  const handleDeleteProfessional = (id_professional) => {
    dataProfessionals.length > 1
      ? deleteProfessional({ id_professional, params: filterProfessionals })
      : deleteProfessional({
          id_professional,
          params: {
            ...filterProfessionals,
            page: 1,
          },
        });
  };
  return (
    <Layout title="Profissionais" showToday backArrow>
      <div style={{ margin: '0 0px 0 30px', backgroundColor: '#EDEDED' }}>
        <div>
          <AntTabs
            onChange={handleChangeTab}
            value={filterProfessionals.value}
            aria-label="ant example"
          >
            {abas.map((option, i) => (
              <AntTab
                data-cy="antTab_unit"
                key={i}
                onClick={() => handleChangeUnit(option)}
                label={option.name}
              />
            ))}
          </AntTabs>
          <Divider style={{ marginBottom: 24, paddingTop: 2 }} />

          <div
            data-cy="div_professional_filters"
            className={classes.inputContainer}
          >
            <InputContainer>
              <SearchInputDebounce
                value={filterProfessionals.search}
                className={classes.inputWidth}
                placeholder="Busque por nome"
                onChange={handleSearch}
                style={{
                  alignItems: 'center',
                  height: 48,
                  width: '90%',
                }}
              />
            </InputContainer>
            <InputSelect>
              <CustomSelect
                isProf={false}
                name="group_type"
                loading={false}
                placeholder="Selecione o tipo de profissional"
                handleChange={handleChangeProfessional}
                className={classes.withoutBorder}
                value={profissionalType}
                options={typeProfessional}
                isClearable
              />
            </InputSelect>
            <InputSelect>
              <CustomSelect
                isProf={false}
                name="status"
                loading={false}
                placeholder="Selecione o status do profisional"
                handleChange={handleChangeProfessionalStatus}
                className={classes.withoutBorder}
                value={profissionalStatus}
                options={typeProfessionalStatus}
                isClearable
              />
            </InputSelect>
            <Tooltip
              title={
                HasPermission(permissions.create) !== true
                  ? 'Você não tem permissão'
                  : ''
              }
              placement="bottom"
              arrow
            >
              <Link
                to={
                  HasPermission(permissions.create) &&
                  `/cadastros/profissional/cadastrar`
                }
                style={{ textDecoration: 'none' }}
              >
                <Button className={classes.registerButton}>
                  <Typography className={classes.registerText}>
                    Cadastrar profissional
                  </Typography>
                </Button>
              </Link>
            </Tooltip>
          </div>
        </div>
        <div className={classes.root}>
          {config?.hospitalData.map((option, i) => (
            <TabPanel key={i} value={filterProfessionals.value} index={i}>
              <TableControl data-cy="dataTable">
                <DefaultTable
                  permissions={permissions}
                  dataList={dataProfessionals}
                  pageByProps={filterProfessionals.page}
                  columns={columns({ handleChangeStatus })}
                  loading={loadingProfessionals}
                  totalList={totalProfessionals}
                  redirectTo="/cadastros/profissional/editar"
                  perPage={filterProfessionals?.perPage}
                  handleChangePage={handleChangePage}
                  deleteLoading={deleteLoading}
                  onDeleteRequest={handleDeleteProfessional}
                  showExportButton={false}
                  useTimeOut={false}
                />
              </TableControl>
            </TabPanel>
          ))}
        </div>
      </div>
    </Layout>
  );
}
