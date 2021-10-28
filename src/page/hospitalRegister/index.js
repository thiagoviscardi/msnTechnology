import React from 'react';
import { useStyles } from './styles';
import { useUnits } from 'hook/units/index';
import Layout from 'shared/component/Layout';
import UnitForm from 'shared/forms/UnitForm';
export default function HospitalRegisterPage() {
  const classes = useStyles();
  const { getCreate, status } = useUnits();
  const formSubmit = (data) => {
    getCreate({ data });
  };

  return (
    <Layout title="Hospitais" showToday backArrow>
      <>
        <div className={classes.title}>Cadastrar novo hospital</div>
        <UnitForm formSubmit={formSubmit} status={status} />
      </>
    </Layout>
  );
}
