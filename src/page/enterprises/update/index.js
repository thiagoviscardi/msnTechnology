import React, { useState, useEffect } from 'react';
import EnterprisesForm from 'shared/forms/EnterprisesForm';
import Layout from 'shared/component/Layout';
import { useEnterprise } from 'hook/enterprise';
import MessageNotification from 'shared/component/messageNotification';
import { useParams } from 'react-router-dom';
import { useStyles, ScreenContainer } from './styles';
import { CircularProgress } from '@material-ui/core';

export default function EnterpriseUpdatePage() {
  const classes = useStyles();
  const { id } = useParams();
  const { data, loading, getOne, getUpdate, status, setStatus } =
    useEnterprise();
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
      }, 500);
    }
  }, [data]);

  const formSubmit = (data) => {
    getUpdate({ id, data });
  };

  const getMessage = (status) => {
    return status === 200 || status === 201
      ? 'Editado com sucesso!'
      : 'Falha ao cadastrar!';
  };

  return (
    <Layout title="Empresas" showToday backArrow>
      <ScreenContainer>
        {initialValues ? (
          <EnterprisesForm
            formInitialValues={initialValues}
            loading={loading}
            formSubmit={formSubmit}
            isEdit
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
      </ScreenContainer>
    </Layout>
  );
}
