import React, { useState } from 'react';
import Layout from 'shared/component/Layout';
import FormProfilePermissions from 'shared/forms/FormProfilePermissions';
import MessageNotification from 'shared/component/messageNotification';
import { useProfilePermissions } from 'hook/ProfilePermissions/index';
import { useHistory } from 'react-router-dom';

export default function PermissionsProfileCreate() {
  const history = useHistory();
  const { loading, getCreate } = useProfilePermissions();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = (data) => {
    getCreate({
      data: { name: data?.name, type: 1 },
      permissions: [...data?.permissions.map((item) => ({ id: item?.id }))],
    })
      .then(() => {
        history.push(`/settings/perfil-de-permissoes`);
      })
      .catch((message) => {
        setMessage(message);
        setError(true);
      });
  };

  return (
    <Layout title="Cadastrar Grupo de Permissão" showToday backArrow>
      <>
        <FormProfilePermissions handleSubmit={handleSubmit} loading={loading} />
      </>
      <div style={{ position: 'absolute' }}>
        <MessageNotification
          openNotification={error}
          closeNotification={() => setError(false)}
          type={'error'}
          message={message}
          vertical={10}
          horizontal="40vw"
        />
      </div>
    </Layout>
  );
}
