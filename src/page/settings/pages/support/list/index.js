import React, { useState, useEffect } from 'react';
import {
  useStyles,
  SearchContainer,
  TableControl,
  InputContainer,
} from './styles';
import Layout from 'shared/component/Layout';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import { useSupport } from 'hook/Support/index';
import CollapseTable from 'shared/component/CollapseTable';
import ContainerCollapse from './ContainerCollapse';
import { Button, Typography, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import HasPermission from 'utils/checkPermission';

export default function SupportListPage() {
  const { push } = useHistory();
  const classes = useStyles();

  const permissions = {
    read: 'support/r',
    create: 'support/c',
    delete: 'support/d',
    update: 'support/u',
  };

  const columns = [
    { id: 'id', label: '#', minWidth: 10 },
    { id: 'name', label: 'Nome', minWidth: 170 },
  ];

  const {
    data: dataSupport,
    total: totalSupport,
    loading,
    deleteLoading,
    getList,
    getDelete,
  } = useSupport();

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    search: '',
  });

  const [seletedRow, setSelectedRow] = useState(0);

  useEffect(() => {
    getList(filter);
  }, [filter]);

  const handleSearch = (search) => {
    setFilter((old) => ({ ...old, search }));
  };

  const handleChangePage = (page) => {
    setFilter((old) => ({ ...old, page }));
  };

  const componentMinimizable = (row) => <ContainerCollapse row={row} />;

  const onExpandRow = () => {};

  return (
    <Layout title="Suporte" showToday backArrow>
      <>
        <SearchContainer>
          <InputContainer>
            <SearchInputDebounce
              className={classes.inputWidth}
              onChange={handleSearch}
              placeholder="Busque por título"
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
              data-cy="btn_register"
              onClick={
                HasPermission(permissions.create)
                  ? () => push('/settings/suporte/cadastrar')
                  : undefined
              }
              className={classes.registerButton}
            >
              <Typography className={classes.registerText}>
                Cadastrar suporte
              </Typography>
            </Button>
          </Tooltip>
        </SearchContainer>
        <TableControl data-cy="dataTable_support">
          <CollapseTable
            origin="SUPPORT"
            dataList={dataSupport}
            permissions={permissions}
            columns={columns}
            loading={loading}
            totalList={totalSupport}
            redirectTo="/settings/suporte/editar"
            perPage={filter?.perPage}
            handleChangePage={handleChangePage}
            deleteLoading={deleteLoading}
            onDeleteRequest={(id) => getDelete({ id })}
            componentMinimizable={componentMinimizable}
            onExpandRow={onExpandRow}
            seletedRow={seletedRow}
            setSelectedRow={setSelectedRow}
            defaultButtons={true}
            maxWidth={120}
          />
        </TableControl>
      </>
    </Layout>
  );
}
