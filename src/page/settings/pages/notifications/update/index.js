import React, { useState, useEffect } from 'react';
import { useStyles } from './styles';
import Layout from 'shared/component/Layout';
import NotificationsForm from 'shared/forms/NotificationsForm';
import { useTemplateNotifications } from 'hook/templateNotifications';
import MessageNotification from 'shared/component/messageNotification';
import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

function NotificationsUpdatePage() {
  const classes = useStyles();

  const history = useHistory();
  const { id } = useParams();
  const { getUpdate, getOne, data, loading } = useTemplateNotifications();

  const [status, setStatus] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (id !== ':id') {
      getOne({ id });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setTimeout(() => {
        setInitialValues(data);
      }, 750);
    }
  }, [data]);

  const formatRequest = (data) => ({
    ...data,
    // professional_type: data?.professional_type.value,
    // units: data?.units ? data?.units.map((item) => ({ id: item.value })) : [],
    // specialties: data?.specialties
    //   ? data?.specialties.map((item) => ({ id: item.value }))
    //   : [],
    // users: data?.users ? data?.users.map((item) => ({ id: item.value })) : [],
  });

  const formSubmit = (data) => {
    getUpdate({ id, data: formatRequest(data) })
      .then(() => {
        history.push(`/settings/notificacoes`);
      })
      .catch(() => setStatus(500));
  };

  const getMessage = (status) => {
    return status === 200 || status === 201
      ? 'Editado com sucesso!'
      : 'Falha ao editar!';
  };

  return (
    <Layout
      title="Notificações"
      isLoading={false}
      calendarWeek={false}
      showToday
      backArrow
    >
      <>
        {initialValues ? (
          <NotificationsForm
            formInitialValues={initialValues}
            formSubmit={formSubmit}
            loading={loading}
          />
        ) : (
          <div className={classes.loading_container}>
            <CircularProgress color="primary" size={50} />
          </div>
        )}
        <div style={{ position: 'absolute' }}>
          <MessageNotification
            openNotification={status}
            closeNotification={() => setStatus(false)}
            type={(status === 200 || status === 201) && 'success'}
            message={getMessage(status)}
            vertical={10}
            horizontal="40vw"
          />
        </div>
      </>
    </Layout>
  );
}

export default NotificationsUpdatePage;
