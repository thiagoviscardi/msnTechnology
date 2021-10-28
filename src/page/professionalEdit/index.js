import React, { useState, useEffect } from 'react';
import ProfessionalForm from 'shared/forms/ProfessionalForm';
import Layout from 'shared/component/Layout';
import { useProfessional } from 'hook/professional';
import { useParams } from 'react-router-dom';
import { useStyles } from './styles';
import { CircularProgress } from '@material-ui/core';

export default function ProfessionalRegister() {
  const classes = useStyles();
  const { id } = useParams();
  const { data, loading, getOne, getUpdate } = useProfessional();
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

  const formSubmit = (formData) => {
    const { data } = formData;
    getUpdate({ id, data });
  };

  return (
    <Layout title="Profissionais" showToday backArrow>
      <>
        {initialValues ? (
          <ProfessionalForm
            formInitialValues={initialValues}
            isLoading={loading}
            formSubmit={formSubmit}
            isEdit
          />
        ) : (
          <div className={classes.loading_container}>
            <CircularProgress color="primary" size={50} />
          </div>
        )}
      </>
    </Layout>
  );
}
