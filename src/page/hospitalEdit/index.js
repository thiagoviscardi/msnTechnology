import React, { useEffect, useState } from 'react';
import { useUnits } from 'hook/units/index';
import Layout from 'shared/component/Layout';
import UnitForm from 'shared/forms/UnitForm';
import MessageNotification from 'shared/component/messageNotification';
import { useParams } from 'react-router-dom';
import { useStyles } from './styles';
import { CircularProgress } from '@material-ui/core';
export default function HospitalEditPage() {
  const classes = useStyles();
  const { id } = useParams();
  const { data, loading, getOne, getUpdate, status, setStatus } = useUnits();
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

  const formSubmit = (data) => {
    getUpdate({ id, data });
  };

  const getMessage = (status) => {
    return status === 200 || status === 201
      ? 'Edição feita com sucesso!'
      : 'Falha ao cadastrar!';
  };

  return (
    <Layout title="Hospitais" showToday backArrow>
      <>
        {initialValues ? (
          <UnitForm
            formSubmit={formSubmit}
            formInitialValues={initialValues}
            isLoading={loading}
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
