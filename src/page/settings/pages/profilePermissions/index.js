import React, { useState, useEffect, useCallback } from 'react';
import Layout from 'shared/component/Layout';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DefaultTable from 'shared/component/DefaultTable';
import StatusSwitch from 'shared/component/StatusSwitch';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import {
  useStyles,
  SearchContainer,
  TableControl,
  InputContainer,
} from './styles';
import { useProfilePermissions } from 'hook/ProfilePermissions/index';
import HasPermission from 'utils/checkPermission';

export default function PermissionsProfilePage() {
  const classes = useStyles();

  const permissions = {
    read: 'group/r',
    create: 'group/c',
    delete: 'group/d',
    update: 'group/u',
  };

  const {
    data: dataUnits,
    total: totalUnits,
    loading,
    getList,
    toggleStatusProfile,
    getDelete,
  } = useProfilePermissions();

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 12,
    search: '',
  });

  const handleGetPermissions = useCallback(() => {
    getList(filter);
  }, [filter]);

  useEffect(() => {
    handleGetPermissions();
  }, [filter]);

  const searchPermissions = (search) => {
    setFilter((old) => ({ ...old, page: 1, search }));
  };

  const handleChangePage = (page) => {
    setFilter((old) => ({ ...old, page }));
  };

  const handleChangeStatus = useCallback((status, data) => {
    toggleStatusProfile({ id: data?.id, status });
  });

  const handleDeleteUnit = (id) => {
    getDelete({ id });
  };

  const columns = ({ handleChangeStatus }) => {
    return [
      { id: 'id', label: '#', minWidth: 10 },
      { id: 'name', label: 'Nome', minWidth: 170 },
      {
        id: 'status',
        label: 'Status',
        maxWidth: 10,
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
  };

  return (
    <Layout title="Grupos de permissões" showToday backArrow>
      <>
        <>
          <SearchContainer>
            <InputContainer>
              <SearchInputDebounce
                className={classes.inputWidth}
                onChange={searchPermissions}
                placeholder="Busque por nome, código ou status"
                style={{
                  alignItems: 'center',
                  height: 48,
                  width: '90%',
                }}
              />
            </InputContainer>
            <div className={classes.rowContainer}>
              <Link
                data-cy=""
                to={
                  HasPermission(permissions.create)
                    ? '/settings/perfil-de-permissoes/cadastrar'
                    : '#'
                }
                style={{ textDecoration: 'none' }}
              >
                <Button className={classes.registerButton}>
                  <Typography className={classes.registerText}>
                    Cadastrar grupo
                  </Typography>
                </Button>
              </Link>
            </div>
          </SearchContainer>
          <TableControl data-cy="dataTable_profile_permissions">
            <DefaultTable
              permissions={permissions}
              dataList={dataUnits}
              columns={columns({ handleChangeStatus })}
              loading={loading}
              totalList={totalUnits}
              perPage={filter?.per_page}
              redirectTo="/settings/perfil-de-permissoes/editar"
              handleChangePage={handleChangePage}
              onDeleteRequest={handleDeleteUnit}
              showExportButton={false}
            />
          </TableControl>
        </>
      </>
    </Layout>
  );
}
