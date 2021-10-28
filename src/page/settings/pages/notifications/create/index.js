import React, { useState } from 'react';
import Layout from 'shared/component/Layout';
import NotificationsForm from 'shared/forms/NotificationsForm';
import { useTemplateNotifications } from 'hook/templateNotifications';
import MessageNotification from 'shared/component/messageNotification';
import { useHistory } from 'react-router-dom';

function NotificationsCreatePage() {
  const history = useHistory();

  const { getCreate, loading } = useTemplateNotifications();

  const [status, setStatus] = useState(false);

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
    getCreate({ data: formatRequest(data) })
      .then(() => {
        history.push(`/settings/notificacoes`);
      })
      .catch(() => setStatus(500));
  };

  const getMessage = (status) => {
    return status === 200 || status === 201
      ? 'Editado com sucesso!'
      : 'Falha ao cadastrar!';
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
        <NotificationsForm formSubmit={formSubmit} loading={loading} />
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

export default NotificationsCreatePage;
