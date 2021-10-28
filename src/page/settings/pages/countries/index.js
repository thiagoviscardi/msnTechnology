import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  useStyles,
  SearchContainer,
  TableControl,
  InputContainer,
} from './styles';
import Layout from 'shared/component/Layout';
import DefaultTable from 'shared/component/DefaultTable';
import StatusSwitch from 'shared/component/StatusSwitch';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import { useCountries } from 'hook/countries/index';
import ModalForm from './Components';
import { Button, Typography, Tooltip } from '@material-ui/core';
import HasPermission from 'utils/checkPermission';

export default function CountriesListPage() {
  const classes = useStyles();

  const permissions = {
    read: 'country/r',
    create: 'country/c',
    delete: 'country/d',
    update: 'country/u',
  };

  const columns = ({ handleChangeStatus }) => [
    { id: 'id', label: '#', minWidth: 10 },
    { id: 'name', label: 'Nome', minWidth: 170 },
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

  const {
    data: dataUnits,
    total: totalUnits,
    loading,
    deleteLoading,
    getList,
    getDelete,
    toggleStatus,
  } = useCountries();

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    search: '',
    statusNotification: false,
  });

  const handleGetPermissions = useCallback(() => {
    getList(filter);
  }, [filter]);

  useEffect(() => {
    handleGetPermissions();
  }, [filter]);

  const searchUnits = (search) => {
    setFilter((old) => ({ ...old, search }));
  };

  const handleChangePage = (page) => {
    setFilter((old) => ({ ...old, page }));
  };

  const handleChangeStatus = useCallback((status, data) => {
    toggleStatus({ id: data?.id, status, data });
  });

  const handleDeleteUnit = (id) => {
    getDelete({ id });
  };

  const ModalPermissionsRef = useRef(null);

  const handleOpenModal = useCallback((item) => {
    ModalPermissionsRef.current.openModalPermissions(item);
  }, []);

  return (
    <Layout title="Países" showToday backArrow>
      <>
        <SearchContainer>
          <InputContainer>
            <SearchInputDebounce
              className={classes.inputWidth}
              onChange={searchUnits}
              placeholder="Busque por nome"
              style={{
                alignItems: 'center',
                height: 48,
                width: '90%',
              }}
            />
          </InputContainer>
          <Tooltip
            title={
              HasPermission(permissions.create)
                ? 'Cadastrar'
                : 'Você não tem permissão'
            }
            placement="bottom"
            arrow
          >
            <Button
              data-cy="btn_register"
              onClick={
                HasPermission(permissions.create)
                  ? () => handleOpenModal({ name: '', status: 1 })
                  : null
              }
              className={classes.registerButton}
            >
              <Typography className={classes.registerText}>
                Cadastrar país
              </Typography>
            </Button>
          </Tooltip>
        </SearchContainer>
        <TableControl data-cy="dataTable_countrie">
          <DefaultTable
            permissions={permissions}
            dataList={dataUnits}
            columns={columns({ handleChangeStatus })}
            loading={loading}
            deleteLoading={deleteLoading}
            totalList={totalUnits}
            perPage={filter?.per_page}
            redirectTo="/"
            handleChangePage={handleChangePage}
            onDeleteRequest={handleDeleteUnit}
            showExportButton={false}
            handleOpenModal={handleOpenModal}
          />
        </TableControl>
        <ModalForm
          ref={ModalPermissionsRef}
          handleGetPermissions={handleGetPermissions}
        />
      </>
    </Layout>
  );
}
