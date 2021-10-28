import React, { useEffect, useState } from 'react';
import {
  useStyles,
  TableControl,
  SearchContainer,
  InputContainer,
} from './styles';
import { Divider } from '@material-ui/core';
import { useProfessional } from 'hook/professional/index';
import { useProfessionalDocs } from 'hook/professional/documents';
import { useConfig } from 'hook/config';
import Layout from 'shared/component/Layout';
import TabPanel from 'shared/component/tabPanel';
import { AntTab, AntTabs } from 'shared/component/TabsComponents';
import ContainerCollapse from './components/ContainerCollapse';
import ConfirmUpdateStatusModal from './components/ConfirmUpdateStatusModal';
import CollapseTable from 'shared/component/CollapseTable';
import moment from 'moment';
import useRequests from 'hook/requests';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import { ModalResponseAlert } from '../../shared/component/modalResponseAlert';
import '../../shared/fixedtab.css';

const columns = [
  { id: 'id', label: '#', minWidth: 10 },
  { id: 'name', label: 'Profissional', minWidth: 170 },
  { id: 'cpf', label: 'CPF', minWidth: 100 },
  { id: 'group.name', label: 'Campo de atuação', minWidth: 100 },
  { id: 'cpf', label: 'CPF/CNPJ', minWidth: 100 },
  {
    id: 'created_at',
    label: 'Data de cadastro',
    minWidth: 100,
    format: (date) =>
      moment(date, 'DD/MM/YYYY HH:mm:ss').format('DD/MM HH[h]mm'),
  },
];

export default function RequestsPage() {
  const permissions = {
    accept: 'moderation/accept',
    recuse: 'moderation/recuse',
  };
  const classes = useStyles();
  const { config } = useConfig();
  const { updateUserRequest, requests, setRequests } = useRequests();
  const { statusRequest } = requests;
  const {
    data: listDocs,
    loading: loadingDocsList,
    getProfessionalsDocs,
  } = useProfessionalDocs();

  const {
    data: dataProfessionals,
    loading: loadingProfessionals,
    total: totalProfessionals,
    deleteLoading,
    getProfessionals,
    deleteProfessional,
  } = useProfessional();

  const [type, setType] = useState('');
  const [statusNotification, setStatusNotification] = useState(false);
  const [openAcceptUpdateModal, setOpenAcceptUpdateModal] = useState(false);
  const [openRefuseUpdateModal, setOpenRefuseUpdateModal] = useState(false);
  const [item, setItem] = useState('');
  const [filterProfessionals, setFilterProfessionals] = useState({
    page: 1,
    per_page: 10,
    search: '',
    status: 'moderation',
    unit_id: config.hospitalData.length > 0 ? config.hospitalData[0].id : null,
    value: 0,
  });

  const [seletedRow, setSelectedRow] = useState(0);

  React.useEffect(() => {
    getProfessionals(filterProfessionals);
  }, [filterProfessionals]);

  React.useEffect(() => {
    statusRequest && getProfessionals(filterProfessionals);
  }, [filterProfessionals, statusRequest]);

  React.useEffect(() => {
    if (statusRequest === 200) {
      setStatusNotification(true);
      setOpenRefuseUpdateModal(false);
      setOpenAcceptUpdateModal(false);
    }
  }, [statusRequest, type]);

  const handleChangePage = (page) => {
    setFilterProfessionals((oldState) => ({ ...oldState, page }));
  };

  const handleSearch = (search) => {
    setFilterProfessionals((old) => ({ ...old, page: 1, search }));
  };

  const handleChangeUnit = (unit) => {
    setFilterProfessionals((oldState) => ({ ...oldState, unit_id: unit?.id }));
  };

  const handleChangeTab = (event, newValue) => {
    setFilterProfessionals({
      ...filterProfessionals,
      value: newValue,
      page: 1,
    });
  };

  const componentMinimizable = (row) => (
    <ContainerCollapse
      row={row}
      list={listDocs}
      loadingDocsList={loadingDocsList}
    />
  );

  const onExpandRow = (row, isExpanded) => {
    if (isExpanded)
      getProfessionalsDocs({ id_user: row.id }, { page: 1, per_page: 15 });
  };

  const abas = config.hospitalData.map((item) => ({
    name: item.name,
    id: item.id,
  }));
  const acceptRequest = () => {
    updateUserRequest(item, 1);
  };

  const refuseRequest = () => {
    updateUserRequest(item, 0);
  };

  const handleAcceptStatusModal = (item) => {
    setType('accept');
    setItem(item);
    setOpenAcceptUpdateModal(!openAcceptUpdateModal);
  };
  const handleRefuseStatusModal = (item) => {
    setType('refuse');
    setItem(item);
    setOpenRefuseUpdateModal(!openRefuseUpdateModal);
  };
  const getMessage = (status) => {
    return status === 200 || status === 201
      ? 'Atualizado com sucesso!'
      : 'Falha ao atualizar!';
  };

  useEffect(() => {
    if (config.hospitalData) {
      setFilterProfessionals({
        ...filterProfessionals,
        page: 1,
        per_page: 10,
        search: '',
        status: 'moderation',
        unit_id:
          config.hospitalData.length > 0 ? config.hospitalData[0].id : null,
        value: 0,
      });
    }
  }, [config]);
  return (
    <Layout title="Moderação de novos cadastros" showToday backArrow>
      <div id="fixed-tab">
        <AntTabs
          onChange={handleChangeTab}
          value={filterProfessionals.value}
          aria-label="ant example"
        >
          {abas.map((option, i) => (
            <AntTab
              key={i}
              onClick={() => handleChangeUnit(option)}
              label={option.name}
            />
          ))}
        </AntTabs>
        <Divider style={{ paddingTop: 2, marginRight: 20 }} />
      </div>
      <SearchContainer>
        <InputContainer>
          <SearchInputDebounce
            value={filterProfessionals.search}
            className={classes.inputSearch}
            placeholder="Busque por nome, CPF..."
            onChange={handleSearch}
            style={{
              alignItems: 'center',
              height: 48,
              width: '90%',
            }}
          />
        </InputContainer>
      </SearchContainer>
      <div className={classes.root}>
        {config?.hospitalData.map((option, i) => (
          <TabPanel key={i} value={filterProfessionals.value} index={i}>
            <TableControl data-cy="dataTable">
              <CollapseTable
                maxWidth={120}
                origin="REQUEST"
                type="moderation"
                permissions={permissions}
                handleAccept={handleAcceptStatusModal}
                handleBlock={handleRefuseStatusModal}
                dataList={dataProfessionals}
                columns={columns}
                loading={loadingProfessionals}
                totalList={totalProfessionals}
                perPage={filterProfessionals?.perPage}
                pageByProps={filterProfessionals.page}
                handleChangePage={handleChangePage}
                deleteLoading={deleteLoading}
                onDeleteRequest={(id_professional) =>
                  deleteProfessional({ id_professional })
                }
                componentMinimizable={componentMinimizable}
                onExpandRow={onExpandRow}
                seletedRow={seletedRow}
                setSelectedRow={setSelectedRow}
              />
            </TableControl>
          </TabPanel>
        ))}
      </div>
      <ConfirmUpdateStatusModal
        open={openAcceptUpdateModal}
        message="Deseja realmente aceitar essa solicitação?"
        handleClose={handleAcceptStatusModal}
        onConfirm={acceptRequest}
        onCancel={handleAcceptStatusModal}
      />
      <ConfirmUpdateStatusModal
        open={openRefuseUpdateModal}
        message="Deseja realmente recusar essa solicitação?"
        handleClose={handleRefuseStatusModal}
        onConfirm={refuseRequest}
        onCancel={handleRefuseStatusModal}
      />
      <ModalResponseAlert
        messageTitleAlert={getMessage(statusRequest)}
        openSendFinish={statusNotification}
        handleCloseSendFinish={() =>
          setRequests({ ...requests, statusRequest: '' }) ||
          setStatusNotification(false)
        }
        error={statusRequest !== 200}
      />
    </Layout>
  );
}
