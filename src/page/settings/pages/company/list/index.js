import React, { useState, useEffect, useCallback } from 'react';
import {
  useStyles,
  SearchContainer,
  TableControl,
  InputContainer,
} from './styles';
import Layout from 'shared/component/Layout';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import { useCompany } from 'hook/company/index';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import DefaultTable from 'shared/component/DefaultTable';
import StatusSwitch from 'shared/component/StatusSwitch';
import { AvatarNameComponent } from 'shared/component/AvatarNameComponent';
import CustomSelect from 'shared/component/forms/CustomSelect';
import HasPermission from 'utils/checkPermission';

export default function CompanyListPage() {
  const classes = useStyles();

  const permissions = {
    read: 'company/r',
    create: 'company/c',
    delete: 'company/d',
    update: 'company/u',
  };

  const columns = ({ handleChangeStatus }) => [
    { id: 'id', label: '#', minWidth: 10 },
    {
      id: 'name',
      label: 'Hospital',
      minWidth: 100,
      render: (rowData, index) => (
        <AvatarNameComponent key={index} rowData={rowData} />
      ),
    },
    { id: 'social_name', label: 'Razão Social', minWidth: 170 },
    { id: 'cnpj', label: 'CNPJ', minWidth: 170 },
    {
      id: 'status',
      label: 'Status',
      minWidth: 10,
      render: (rowData, index) => (
        <StatusSwitch
          key={index}
          changeStatus={handleChangeStatus}
          rowData={{ ...rowData, status: parseInt(rowData?.status) }}
          permissions={permissions}
        />
      ),
    },
  ];

  const {
    data: dataCompanyList,
    total: totalCompany,
    loading,
    deleteLoading,
    getList,
    getDelete,
    toggleStatus,
  } = useCompany();

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    search: '',
    status: '',
  });
  const [statusCompany, setStatusCompany] = useState({
    label: 'Todas',
    value: 'all',
  });
  useEffect(() => {
    getList(filter);
  }, [filter]);

  const handleSearch = (search) => {
    setFilter((old) => ({ ...old, search }));
  };

  const handleChangePage = (page) => {
    setFilter((old) => ({ ...old, page }));
  };

  const handleChangeStatus = useCallback((status, data) => {
    toggleStatus({ id: data?.id, data, status });
  });

  const handleChangeStatusCompany = (val) => {
    setStatusCompany(val);
    setFilter((old) => ({ ...old, status: val?.value }));
  };

  const statusCompanyType = [
    { label: 'Ativa', value: 'active' },
    { label: 'Inativa', value: 'deactive' },
    { label: 'Todas', value: 'all' },
  ];
  return (
    <Layout title="Companhias" showToday backArrow>
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
          <div
            data-cy="select_input_status"
            style={{ width: 300, backgroundColor: '#fff', borderRadius: 16 }}
          >
            <CustomSelect
              name="subscriber"
              loading={false}
              isProf={false}
              placeholder="Selecione o tipo de profissional"
              handleChange={handleChangeStatusCompany}
              value={statusCompany}
              options={statusCompanyType}
              isClearable
            />
          </div>
          <Link
            to={
              HasPermission(permissions.create)
                ? `/settings/companhias/cadastrar`
                : '#'
            }
            style={{ textDecoration: 'none' }}
          >
            <Button className={classes.registerButton}>
              <Typography className={classes.registerText}>
                Cadastrar companhia
              </Typography>
            </Button>
          </Link>
        </SearchContainer>
        <TableControl data-cy="dataTable">
          <DefaultTable
            permissions={permissions}
            dataList={dataCompanyList}
            columns={columns({ handleChangeStatus })}
            loading={loading}
            totalList={totalCompany}
            redirectTo="/settings/companhias/editar"
            perPage={filter?.per_page}
            handleChangePage={handleChangePage}
            deleteLoading={deleteLoading}
            onDeleteRequest={(id) => getDelete({ id })}
            showExportButton={false}
          />
        </TableControl>
      </>
    </Layout>
  );
}
