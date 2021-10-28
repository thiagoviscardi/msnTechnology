import React, { useEffect } from 'react';
import {
  useStyles,
  SearchContainer,
  InputContainer,
  TableControl,
} from './styles';
import Layout from 'shared/component/Layout';
import { Button, Typography, Divider, Tooltip } from '@material-ui/core';
import { useAdministrators } from 'hook/administrators';
import { useConfig } from 'hook/config';
import DefaultTable from 'shared/component/DefaultTable';
import { AntTab, AntTabs } from 'shared/component/TabsComponents';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import { AvatarNameComponent } from 'shared/component/AvatarNameComponent';
import '../../../shared/fixedtab.css';
import { useHistory } from 'react-router-dom';
import HasPermission from 'utils/checkPermission';
import usePersistedState from 'hook/usePersistedState';

export default function AdminPageList() {
  const { push } = useHistory();

  const permissions = {
    read: 'user/r',
    create: 'user/c',
    delete: 'user/d',
    update: 'user/u',
  };

  const columns = [
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
    { id: 'company.name', label: 'Companhia', minWidth: 100 },
    { id: 'group.name', label: 'Grupo', minWidth: 100 },
  ];
  const classes = useStyles();
  const { config } = useConfig();
  const {
    data: dataList,
    loading: loadingAdm,
    total: totalAdm,
    deleteLoading,
    getList,
    getDelete,
  } = useAdministrators();

  const [filter, setFilter] = usePersistedState('plantaoextra@adminList', {
    value: 0,
    page: 1,
    per_page: 10,
    search: '',
    status: 1,
    group_id: 2,
    unit_id: config.hospitalData.length > 0 ? config.hospitalData[0].id : null,
  });

  useEffect(() => {
    getList(filter);
  }, [filter]);

  const handleChangePage = (page) => {
    setFilter({ ...filter, page: page });
  };
  useEffect(() => {
    if (dataList.length < 1) {
      setFilter({ ...filter, page: 1 });
    }
  }, []);

  const handleDeleteProfessional = (id) => {
    dataList.length > 1
      ? getDelete({ id, params: filter })
      : getDelete({
          id,
          params: {
            ...filter,
            page: 1,
          },
        });
  };
  const handleSearch = (search) => {
    setFilter((old) => ({ ...old, page: 1, search }));
  };

  const handleChangeUnit = (unit) => {
    setFilter((oldState) => ({ ...oldState, unit_id: unit?.id }));
  };

  const handleChangeTab = (event, newValue) => {
    setFilter({ ...filter, value: newValue });
  };

  const abas = config.hospitalData.map((item) => ({
    name: item.name,
    id: item.id,
  }));
  useEffect(() => {
    if (config.hospitalData) {
      setFilter({
        value: 0,
        page: 1,
        per_page: 10,
        search: '',
        status: 1,
        group_id: 2,
        unit_id:
          config.hospitalData.length > 0 ? config.hospitalData[0].id : null,
      });
    }
  }, [config]);
  return (
    <Layout title="Administradores" showToday backArrow>
      <div id="fixed-tab">
        <AntTabs
          onChange={handleChangeTab}
          value={filter.value}
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
            value={filter.search}
            className={classes.inputWidth}
            onChange={handleSearch}
            placeholder="Busque por nome, CPF..."
            style={{
              alignItems: 'center',
              height: 48,
              width: '90%',
            }}
          />
        </InputContainer>
        <div className={classes.rowContainer}>
          <Tooltip
            title={
              HasPermission(permissions.create) ? '' : 'Você não tem permissão'
            }
            placement="bottom"
            arrow
          >
            <Button
              data-cy="btn_register"
              onClick={
                HasPermission(permissions.create)
                  ? () => push('/cadastros/administradores/cadastrar')
                  : undefined
              }
              className={classes.registerButton}
            >
              <Typography className={classes.registerText}>
                Cadastrar administrador
              </Typography>
            </Button>
          </Tooltip>
        </div>
      </SearchContainer>
      <TableControl data-cy="dataTable">
        <DefaultTable
          dataList={dataList}
          pageByProps={filter.page}
          permissions={permissions}
          columns={columns}
          loading={loadingAdm}
          totalList={totalAdm}
          redirectTo="/cadastros/administradores/editar"
          perPage={filter?.per_page}
          handleChangePage={handleChangePage}
          deleteLoading={deleteLoading}
          onDeleteRequest={handleDeleteProfessional}
          showExportButton={false}
        />
      </TableControl>
    </Layout>
  );
}
