import React, { useState, useEffect } from 'react';
import { useStyles } from './styles';
import Layout from 'shared/component/Layout';
import { useAdministrators } from 'hook/administrators';
import MessageNotification from 'shared/component/messageNotification';
import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import AdminForm from 'shared/forms/AdminForm';

function AdminUpdatePage() {
  const classes = useStyles();

  const history = useHistory();
  const { id } = useParams();
  const { getUpdate, getOne, data, loading } = useAdministrators();

  const [status, setStatus] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (id) {
      getOne({ id });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setTimeout(() => {
        setInitialValues({
          ...data,
          enterprise:
            data?.enterprise && Object.keys(data?.enterprise).length > 0
              ? data?.enterprise
              : { id: '' },
        });
      }, 750);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      setInitialValues(null);
    };
  }, []);

  const formatRequest = (data) => ({
    name: data?.name,
    email: data?.email,
    cpf: data?.cpf,
    cell_phone: data?.cell_phone,
    company: { id: data?.company.id },
    group: { id: data?.group.id },
    units: data?.units,
  });

  const formSubmit = ({ data }) => {
    getUpdate({
      id,
      data: formatRequest(data),
      permissions: data?.permissions.map((item) => ({ id: item?.id })),
    })
      .then(() => {
        setTimeout(() => {
          history.push(`/cadastros/administradores`);
        }, 500);
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
      title="Administradores"
      isLoading={false}
      calendarWeek={false}
      showToday
      backArrow
    >
      <>
        {initialValues ? (
          <AdminForm
            formInitialValues={initialValues}
            formSubmit={formSubmit}
            loading={loading}
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
      </>
    </Layout>
  );
}

export default AdminUpdatePage;
