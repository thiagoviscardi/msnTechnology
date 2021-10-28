import React, { useState, useEffect, useCallback } from 'react';
import { useStyles, TableControl, InputContainer } from './styles';
import Layout from 'shared/component/Layout';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import CollapseTable from 'shared/component/CollapseTable';
import { useTemplateNotifications } from 'hook/templateNotifications';
import StatusSwitch from 'shared/component/StatusSwitch';
import HasPermission from 'utils/checkPermission';

function NotificationsListPage() {
  const classes = useStyles();

  const permissions = {
    read: 'notification/r',
    create: 'notification/c',
    delete: 'notification/d',
    update: 'notification/u',
  };

  const columns = ({ handleChangeStatus }) => [
    { id: 'id', label: '#', width: 10 },
    { id: 'title', label: 'Título', minWidth: 350 },
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
    data: notificationsList,
    loading: notificationsLoading,
    total: notificationsTotal,
    deleteLoading,
    getList,
    getDelete,
    toggleStatus,
  } = useTemplateNotifications();

  const [seletedRow, setSelectedRow] = useState(0);

  const [mainFilter, setMainFilter] = React.useState({
    page: 1,
    per_page: 10,
    search: null,
  });

  const handleChangePage = (page) => {
    setMainFilter((oldState) => ({ ...oldState, page }));
  };

  const handleSearch = (search = '') => {
    setMainFilter((oldState) => ({ ...oldState, search }));
  };

  const handleChangeStatus = useCallback((status, data) => {
    toggleStatus({ id: data?.id, status, data });
  });

  const componentMinimizable = (row) => (
    <div className={classes.container_expand}>
      <div className={classes.content_title}>Conteúdo</div>
      <div>{row?.text}</div>
      <div className={classes.content_title}>Área de atuação</div>
      <div>{row?.professional_type ? row?.professional_type : '---'}</div>
    </div>
  );

  useEffect(() => {
    getList(mainFilter);
  }, [mainFilter]);

  return (
    <Layout
      title="Notificações"
      isLoading={false}
      calendarWeek={false}
      showToday
      backArrow
    >
      <>
        <div>
          <div className={classes.inputContainer}>
            <InputContainer>
              <SearchInputDebounce
                className={classes.inputWidth}
                onChange={handleSearch}
                style={{
                  alignItems: 'center',
                  width: '90%',
                }}
              />
            </InputContainer>
            <Link
              to={
                HasPermission(permissions.create)
                  ? `/settings/notificacoes/cadastrar`
                  : '#'
              }
              style={{ textDecoration: 'none' }}
            >
              <Button className={classes.registerButton}>
                <Typography className={classes.registerText}>
                  Cadastrar notificação
                </Typography>
              </Button>
            </Link>
          </div>
        </div>
        <TableControl>
          <CollapseTable
            origin="NOTIFICATIONS"
            dataList={notificationsList}
            permissions={permissions}
            columns={columns({ handleChangeStatus })}
            loading={notificationsLoading}
            totalList={notificationsTotal}
            redirectTo="/settings/notificacoes/editar"
            perPage={mainFilter?.per_page}
            handleChangePage={handleChangePage}
            deleteLoading={deleteLoading}
            useTimeOut={false}
            onDeleteRequest={(id) => getDelete({ mainFilter, id })}
            componentMinimizable={componentMinimizable}
            seletedRow={seletedRow}
            setSelectedRow={setSelectedRow}
            defaultButtons={true}
          />
        </TableControl>
      </>
    </Layout>
  );
}

export default NotificationsListPage;
