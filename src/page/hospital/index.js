import React, { useState, useEffect, useCallback } from 'react';
import {
  useStyles,
  SearchContainer,
  TableControl,
  InputContainer,
  InputSelect,
} from './styles';
import { Button, Tooltip, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Layout from 'shared/component/Layout';
import DefaultTable from 'shared/component/DefaultTable';
import { AvatarNameComponent } from 'shared/component/AvatarNameComponent';
import StatusSwitch from 'shared/component/StatusSwitch';
import { useUnits } from 'hook/units/index';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import CustomSelect from 'shared/component/forms/CustomSelect';

import HasPermission from 'utils/checkPermission';

export default function HospitalPage() {
  const classes = useStyles();

  const permissions = {
    read: 'unit/r',
    create: 'unit/c',
    delete: 'unit/d',
    update: 'unit/u',
  };

  const columns = ({ handleChangeStatus }) => {
    return [
      { id: 'id', label: '#', minWidth: 10 },
      {
        id: 'name',
        label: 'Hospital',
        minWidth: 100,
        render: (rowData, index) => (
          <AvatarNameComponent key={index} rowData={rowData} />
        ),
      },
      { id: 'cnpj', label: 'CNPJ', minWidth: 170 },
      { id: 'address.city.name', label: 'Cidade', minWidth: 100 },
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

  const {
    data: dataUnits,
    total: totalUnits,
    loading,
    deleteLoading,
    getList,
    getDelete,
    toggleStatus,
  } = useUnits();
  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    search: '',
    statusNotification: false,
    status: 'active',
  });

  const handleChangePage = (page) => {
    setFilter({ ...filter, page: page });
  };

  const searchUnits = (search) => {
    setFilter((old) => ({ ...old, page: 1, search }));
  };

  const handleChangeStatus = useCallback((status, data) => {
    toggleStatus({ id: data?.id, status });

    setTimeout(() => {
      getList({
        page: 1,
        per_page: 10,
        search: filter.search,
        statusNotification: false,
        status: filter.status,
      });
    }, 200);
  });

  const handleDeleteUnit = (id) => {
    getDelete({ id, filter });
  };

  const handleStatusHospital = (val) => {
    setStatusHospital(val);
    setFilter((oldState) => ({
      ...oldState,
      status: val?.value,
      page: 1,
    }));
  };

  const [statusHospital, setStatusHospital] = useState({
    label: 'Ativos',
    value: 'active',
  });
  const hospitalStatus = [
    { label: 'Ativos', value: 'active' },
    { label: 'Inativos', value: 'inactive' },
  ];
  useEffect(() => {
    getList(filter);
  }, [filter]);

  return (
    <Layout title="Hospitais" showToday backArrow>
      <>
        <SearchContainer>
          <InputContainer>
            <SearchInputDebounce
              value={filter.search}
              className={classes.inputWidth}
              placeholder="Busque pelo nome do hospital"
              onChange={searchUnits}
              style={{
                alignItems: 'center',
                height: 48,
                width: '90%',
              }}
            />
          </InputContainer>
          <InputSelect data-cy="select_ativo_inativo">
            <CustomSelect
              isProf={false}
              name="status"
              loading={false}
              placeholder="Selecione o status do hospital"
              handleChange={handleStatusHospital}
              className={classes.withoutBorder}
              value={statusHospital}
              options={hospitalStatus}
              isClearable
            />
          </InputSelect>
          <div className={classes.rowContainer}>
            <Tooltip
              title={
                HasPermission(permissions.create)
                  ? ''
                  : 'Você não tem permissão'
              }
              placement="bottom"
              arrow
            >
              <Link
                data-cy="link_cadastrar_hospital"
                to={
                  HasPermission(permissions.create) &&
                  '/cadastros/hospitais/cadastrar'
                }
                style={{ textDecoration: 'none' }}
              >
                <Button className={classes.registerButton}>
                  <Typography className={classes.registerText}>
                    Cadastrar hospital
                  </Typography>
                </Button>
              </Link>
            </Tooltip>
          </div>
        </SearchContainer>
        <TableControl data-cy="dataTable">
          <DefaultTable
            permissions={permissions}
            dataList={dataUnits}
            useTimeOut={false}
            columns={columns({ handleChangeStatus })}
            pageByProps={filter.page}
            loading={loading}
            deleteLoading={deleteLoading}
            totalList={totalUnits}
            perPage={filter?.per_page}
            redirectTo="/cadastros/hospitais/editar"
            handleChangePage={handleChangePage}
            onDeleteRequest={handleDeleteUnit}
            showExportButton={false}
          />
        </TableControl>
      </>
    </Layout>
  );
}
