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
import { usePermissions } from 'hook/Permissions/index';
import ModalEditPermissions from './ModalEditPermissions';
import ModalCreatePermissions from './ModalCreatePermissions';
import { Button, Typography, Tooltip } from '@material-ui/core';
import HasPermission from 'utils/checkPermission';

export default function PermissionsListPage() {
  const classes = useStyles();
  const {
    data: dataUnits,
    total: totalUnits,
    loading,
    deleteLoading,
    getList,
    getDelete,
    toggleStatus,
  } = usePermissions();

  const permissions = {
    read: 'permission/r',
    create: 'permission/c',
    delete: 'permission/d',
    update: 'permission/u',
  };

  const columns = ({ handleChangeStatus }) => [
    { id: 'id', label: '#', minWidth: 10 },
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'permission', label: 'Código', minWidth: 100 },
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
    toggleStatus({ id: data?.id, status });
  });

  const handleDeleteUnit = (id) => {
    getDelete({ id });
  };

  const ModalEditPermissionsRef = useRef(null);
  const ModalCreatePermissionsRef = useRef(null);

  const handleOpenModal = useCallback((item) => {
    ModalEditPermissionsRef.current.openModalPermissions(item);
  }, []);

  const handleOpenModalCreatePermission = useCallback(() => {
    ModalCreatePermissionsRef.current.handleOpenModal();
  }, []);

  return (
    <Layout title="Lista de permissões" showToday backArrow>
      <>
        <SearchContainer>
          <InputContainer>
            <SearchInputDebounce
              className={classes.inputWidth}
              onChange={searchUnits}
              placeholder="Busque por nome, código ou status"
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
                ? 'Cadastrar Permissão'
                : 'Você não tem permissão'
            }
            placement="bottom"
            arrow
          >
            <Button
              data-cy="btn_register"
              onClick={
                HasPermission(permissions.create)
                  ? () => handleOpenModalCreatePermission()
                  : undefined
              }
              className={classes.registerButton}
            >
              <Typography className={classes.registerText}>
                Cadastrar permissão
              </Typography>
            </Button>
          </Tooltip>
        </SearchContainer>
        <TableControl>
          <DefaultTable
            dataList={dataUnits}
            permissions={permissions}
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
        <ModalEditPermissions
          ref={ModalEditPermissionsRef}
          handleGetPermissions={handleGetPermissions}
        />
        <ModalCreatePermissions
          ref={ModalCreatePermissionsRef}
          handleGetPermissions={handleGetPermissions}
        />
      </>
    </Layout>
  );
}
