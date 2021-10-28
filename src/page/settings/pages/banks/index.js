import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  useStyles,
  SearchContainer,
  TableControl,
  InputContainer,
} from './styles';
import Layout from 'shared/component/Layout';
import DefaultTable from 'shared/component/DefaultTable';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import useBanks from 'hook/banks';
import ModalEditBanks from './ModalEditBanks';
import ModalRegisterBank from './ModalRegisterBanks';
const columns = () => {
  return [
    { id: 'id', label: '#', minWidth: 10 },
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'code', label: 'Código', minWidth: 100 },
  ];
};

export default function BankPage() {
  const classes = useStyles();

  const {
    data: dataUnits,
    total: totalUnits,
    loading,
    deleteLoading,
    getList,
    getDelete,
  } = useBanks();

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
    search: '',
    statusNotification: false,
  });

  const handleUpdateList = useCallback(() => {
    getList(filter);
  }, [filter]);

  useEffect(() => {
    handleUpdateList();
  }, [filter]);

  const searchUnits = (search) => {
    setFilter((old) => ({ ...old, search }));
  };

  const handleChangePage = (page) => {
    setFilter((old) => ({ ...old, page }));
  };

  const handleDeleteBank = (id) => {
    getDelete({ id });
  };

  const ModalPermissionsRef = useRef(null);

  const handleOpenModal = useCallback((item) => {
    ModalPermissionsRef.current.openModalPermissions(item);
  }, []);

  return (
    <Layout title="Bancos" showToday backArrow>
      <>
        <SearchContainer>
          <InputContainer>
            <SearchInputDebounce
              className={classes.inputWidth}
              onChange={searchUnits}
              placeholder="Busque por nome do banco"
              style={{
                alignItems: 'center',
                height: 48,
                width: '90%',
              }}
            />
          </InputContainer>

          <div>
            <ModalRegisterBank
              ref={ModalPermissionsRef}
              handleUpdateList={handleUpdateList}
            />
          </div>
        </SearchContainer>
        <TableControl>
          <DefaultTable
            dataList={dataUnits}
            columns={columns({})}
            loading={loading}
            deleteLoading={deleteLoading}
            totalList={totalUnits}
            perPage={filter?.per_page}
            redirectTo="/"
            handleChangePage={handleChangePage}
            onDeleteRequest={handleDeleteBank}
            showExportButton={false}
            handleOpenModal={handleOpenModal}
          />
        </TableControl>
        <ModalEditBanks
          ref={ModalPermissionsRef}
          handleUpdateList={handleUpdateList}
        />
      </>
    </Layout>
  );
}
