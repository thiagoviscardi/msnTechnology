import React, { useState, useEffect } from 'react';
import { useStyles } from './styles';
import Layout from 'shared/component/Layout';
import CompanyForm from 'shared/forms/CompanyForm';
import { useCompany } from 'hook/company';
import MessageNotification from 'shared/component/messageNotification';
import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

function CompanyUpdatePage() {
  const classes = useStyles();

  const history = useHistory();
  const { id } = useParams();
  const { getUpdate, getOne, data, loading } = useCompany();

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
        setInitialValues(data);
      }, 750);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      setInitialValues(null);
    };
  }, []);

  const formSubmit = ({ data }) => {
    getUpdate({ id, data })
      .then(() => {
        setTimeout(() => {
          history.push(`/settings/companhias`);
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
      title="Companhias"
      isLoading={false}
      calendarWeek={false}
      showToday
      backArrow
    >
      <>
        {initialValues ? (
          <CompanyForm
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

export default CompanyUpdatePage;
