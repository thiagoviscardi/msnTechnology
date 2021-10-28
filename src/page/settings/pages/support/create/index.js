import React, { useState } from 'react';
import Layout from 'shared/component/Layout';
import SupportForm from 'shared/forms/SupportForm';
import { useSupport } from 'hook/Support';
import MessageNotification from 'shared/component/messageNotification';
import { useHistory } from 'react-router-dom';

function SupportCreatePage() {
  const history = useHistory();

  const { getCreate, loading } = useSupport();

  const [status, setStatus] = useState(false);

  const formSubmit = ({ data, docs }) => {
    getCreate({ data, docs })
      .then(() => {
        history.push(`/settings/suporte`);
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
      title="Suporte"
      isLoading={false}
      calendarWeek={false}
      showToday
      backArrow
    >
      <>
        <SupportForm formSubmit={formSubmit} loading={loading} />
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

export default SupportCreatePage;
