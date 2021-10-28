import React, { useCallback, useEffect, useState } from 'react';
import {
  useStyles,
  SearchContainer,
  TableControl,
  InputContainer,
  ScreenContainer,
} from './styles';
import Layout from 'shared/component/Layout';
import { Button, Tooltip, Typography } from '@material-ui/core';
import { useEnterprise } from 'hook/enterprise';
import { Link } from 'react-router-dom';
import DefaultTable from 'shared/component/DefaultTable';
import StatusSwitch from 'shared/component/StatusSwitch';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import HasPermission from 'utils/checkPermission';

export default function Enterprises() {
  const classes = useStyles();

  const permissions = {
    read: 'company/r',
    create: 'company/c',
    delete: 'company/d',
    update: 'company/u',
  };

  const columns = ({ handleChangeStatus }) => [
    { id: 'id', label: '#', minWidth: 10 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'cnpj', label: 'CNPJ', minWidth: 100 },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      render: (rowData, index) => (
        <StatusSwitch
          key={index}
          changeStatus={handleChangeStatus}
          rowData={{ ...rowData, status: parseInt(rowData?.status) }}
          maxWidthLabel={65}
          permissions={permissions}
        />
      ),
    },
  ];

  const {
    data,
    loading,
    total,
    getList,
    getDelete,
    deleteLoading,
    toggleStatus,
  } = useEnterprise();

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    search: '',
  });

  useEffect(() => {
    getList(filter);
  }, [filter]);

  const handleChangePage = (page) => {
    setFilter({ ...filter, page: page });
  };

  const handleDelete = (id) => {
    getDelete({ id });
  };
  const handleSearch = (search) => {
    setFilter((old) => ({ ...old, page: 1, search }));
  };

  const handleChangeStatus = useCallback((status, data) => {
    toggleStatus({ id: data?.id, status, data });
  });

  return (
    <Layout title="Empresas" showToday backArrow>
      <ScreenContainer>
        <SearchContainer>
          <InputContainer>
            <SearchInputDebounce
              value={filter.search}
              className={classes.inputWidth}
              onChange={handleSearch}
              style={{
                alignItems: 'center',
                height: 48,
                width: '90%',
              }}
            />
          </InputContainer>
          <div className={classes.rowButtons}>
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
                to={
                  HasPermission(permissions.create) &&
                  `/cadastros/empresas/cadastrar`
                }
                style={{ textDecoration: 'none' }}
              >
                <Button className={classes.registerButton}>
                  <Typography className={classes.registerText}>
                    Cadastrar empresa
                  </Typography>
                </Button>
              </Link>
            </Tooltip>
          </div>
        </SearchContainer>
        <TableControl data-cy="dataTable">
          <DefaultTable
            permissions={permissions}
            dataList={data}
            pageByProps={filter.page}
            columns={columns({ handleChangeStatus })}
            loading={loading}
            deleteLoading={deleteLoading}
            totalList={total}
            perPage={filter?.per_page}
            redirectTo="/cadastros/empresas/editar"
            handleChangePage={handleChangePage}
            onDeleteRequest={handleDelete}
            showExportButton={false}
          />
        </TableControl>
      </ScreenContainer>
    </Layout>
  );
}
