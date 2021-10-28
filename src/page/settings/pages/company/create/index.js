import React, { useState } from 'react';
import Layout from 'shared/component/Layout';
import CompanyForm from 'shared/forms/CompanyForm';
import { useCompany } from 'hook/company';
import MessageNotification from 'shared/component/messageNotification';
import { useHistory } from 'react-router-dom';

function CompanyCreatePage() {
  const history = useHistory();

  const { getCreate, loading } = useCompany();

  const [status, setStatus] = useState(false);

  const formSubmit = ({ data, fileLogo }) => {
    getCreate({ data, fileLogo })
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
      : 'Falha ao cadastrar!';
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
        <CompanyForm formSubmit={formSubmit} loading={loading} />
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

export default CompanyCreatePage;
