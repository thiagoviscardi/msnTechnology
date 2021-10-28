import React, { useEffect, useState } from 'react';
import Layout from 'shared/component/Layout';
import FormProfilePermissions from 'shared/forms/FormProfilePermissions';
import MessageNotification from 'shared/component/messageNotification';
import { CircularProgress } from '@material-ui/core';
import { useStyles } from './styles';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useProfilePermissions } from 'hook/ProfilePermissions/index';

export default function PermissionsProfileUpdate() {
  const classes = useStyles();
  const history = useHistory();

  const { id } = useParams();
  const { data, loading, getOne, getUpdate } = useProfilePermissions();

  const [initialValues, setInitialValues] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (id !== ':id') {
      getOne({ id });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setTimeout(() => {
        setInitialValues({ ...data, group: { id: data.group_id } });
      }, 750);
    }
  }, [data]);

  const formSubmit = (data) => {
    getUpdate({
      id,
      data: { name: data?.name },
      permissions: [...data?.permissions.map((item) => ({ id: item?.id }))],
    })
      .then(() => {
        history.push(`/settings/perfil-de-permissoes`);
      })
      .catch(() => {
        setStatus(500);
      });
  };

  const getMessage = (status) => {
    return status === 200 || status === 201
      ? 'Editado com sucesso!'
      : 'Falha ao editar!';
  };

  return (
    <Layout title="Editar Grupo de Permissão" showToday backArrow>
      <>
        {initialValues ? (
          <FormProfilePermissions
            initialValues={initialValues}
            loading={loading}
            handleSubmit={formSubmit}
            idProfile={id}
            isEdit
          />
        ) : (
          <div className={classes.loading_container}>
            <CircularProgress color="primary" size={50} />
          </div>
        )}
      </>
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
    </Layout>
  );
}
