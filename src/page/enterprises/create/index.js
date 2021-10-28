import React from 'react';
import { ScreenContainer } from './styles';
import Layout from 'shared/component/Layout';
import EnterprisesForm from 'shared/forms/EnterprisesForm';
import { useEnterprise } from 'hook/enterprise';

export default function EnterpriseRegisterPage() {
  const { loading, getCreate, status } = useEnterprise();

  const formSubmit = (data) => {
    getCreate({ data });
  };

  return (
    <Layout title="Empresas" showToday backArrow>
      <ScreenContainer>
        <EnterprisesForm
          loading={loading}
          formSubmit={formSubmit}
          status={status}
        />
      </ScreenContainer>
    </Layout>
  );
}
