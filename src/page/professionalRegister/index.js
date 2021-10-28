import React from 'react';
import ProfessionalForm from 'shared/forms/ProfessionalForm';
import Layout from 'shared/component/Layout';
import { useProfessional } from 'hook/professional';

export default function ProfessionalRegister() {
  const { loading, getCreate, status } = useProfessional();

  const formSubmit = (formData) => {
    const { data, docs, fileLogo } = formData;
    getCreate({ data, docs, fileLogo });
  };

  return (
    <Layout title="Profissionais" showToday backArrow>
      <>
        <ProfessionalForm
          isLoading={loading}
          formSubmit={formSubmit}
          status={status}
        />
      </>
    </Layout>
  );
}
