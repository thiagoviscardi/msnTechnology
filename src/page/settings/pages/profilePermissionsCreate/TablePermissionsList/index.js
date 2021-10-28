import React, { useState, useEffect, useCallback } from 'react';
import {
  useStyles,
  SearchContainer,
  TableControl,
  InputContainer,
} from './styles';
import DefaultTable from 'shared/component/DefaultTable';
import StatusSwitch from 'shared/component/StatusSwitch';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import { usePermissions } from 'hook/Permissions/index';

export default function TablePermissionsList({ setFieldValue, values }) {
  const classes = useStyles();

  const {
    data: dataUnits,
    total: totalUnits,
    loading,
    getList,
  } = usePermissions();

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 5,
    search: '',
    statusNotification: false,
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
    if (status) setFieldValue('permissions', [...values?.permissions, data]);
    else
      setFieldValue('permissions', [
        ...values?.permissions.filter((item) => item.id !== data.id),
      ]);
  });

  const isChecked = (id) => {
    return values?.permissions.find((item) => item.id === id) ? 1 : 0;
  };

  const columns = ({ handleChangeStatus }) => {
    return [
      { id: 'id', label: '#', minWidth: 10 },
      { id: 'name', label: 'Nome', minWidth: 170 },
      { id: 'permission', label: 'Código', minWidth: 100 },
      {
        id: 'status',
        label: 'Status',
        maxWidth: 10,
        render: (rowData, index) => (
          <StatusSwitch
            key={index}
            changeStatus={handleChangeStatus}
            rowData={{
              ...rowData,
              status: isChecked(rowData.id),
            }}
            maxWidthLabel={70}
          />
        ),
      },
    ];
  };

  return (
    <div>
      <>
        <SearchContainer>
          <InputContainer>
            <SearchInputDebounce
              data-cy="input_seach_permission"
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
        </SearchContainer>
        <TableControl data-cy="input_dataTable_permission">
          <DefaultTable
            dataList={dataUnits}
            columns={columns({ handleChangeStatus })}
            loading={loading}
            totalList={totalUnits}
            perPage={filter?.per_page}
            redirectTo="/"
            handleChangePage={handleChangePage}
            onDeleteRequest={() => {}}
            showExportButton={false}
            showActions={false}
          />
        </TableControl>
      </>
    </div>
  );
}
