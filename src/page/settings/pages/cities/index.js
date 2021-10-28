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
import { useCities } from 'hook/cities/index';
import ModalForm from './Components';
import { Button, Typography, Tooltip } from '@material-ui/core';
import HasPermission from 'utils/checkPermission';

export default function CitiesListPage() {
  const classes = useStyles();

  const permissions = {
    read: 'city/r',
    create: 'city/c',
    delete: 'city/d',
    update: 'city/u',
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
          maxWidthLabel={70}
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
  } = useCities();

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    search: '',
  });

  const handleGetPermissions = useCallback(() => {
    getList(filter);
  }, [filter]);

  useEffect(() => {
    handleGetPermissions();
  }, [filter]);

  const handleSearch = (search) => {
    setFilter((old) => ({ ...old, page: 1, search }));
  };

  const handleChangePage = (page) => {
    setFilter((old) => ({ ...old, page }));
  };

  const handleChangeStatus = useCallback((status, data) => {
    toggleStatus({
      id: data?.id,
      status,
      data: { ...data, state_id: data?.state?.id },
    });
  });

  const handleDeleteUnit = (id) => {
    getDelete({ id });
  };

  const ModalPermissionsRef = useRef(null);

  const handleOpenModal = useCallback((item) => {
    ModalPermissionsRef.current.openModalPermissions({
      ...item,
      state_id: item?.state?.id,
    });
  }, []);

  return (
    <Layout title="Cidades" showToday backArrow>
      <>
        <SearchContainer>
          <InputContainer>
            <SearchInputDebounce
              className={classes.inputWidth}
              onChange={handleSearch}
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
                  : undefined
              }
              className={classes.registerButton}
            >
              <Typography className={classes.registerText}>
                Cadastrar cidade
              </Typography>
            </Button>
          </Tooltip>
        </SearchContainer>
        <TableControl data-cy="dataTable">
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
