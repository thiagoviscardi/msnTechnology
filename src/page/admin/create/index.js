import React from 'react';
import Layout from 'shared/component/Layout';
import { useAdministrators } from 'hook/administrators';
import AdminForm from 'shared/forms/AdminForm';

function AdminPageCreate() {
  const { getCreate, loading, status } = useAdministrators();

  const formatRequest = (data) => ({
    name: data?.name,
    email: data?.email,
    cpf: data?.cpf,
    cell_phone: data?.cell_phone,
    company: { id: data?.company.id },
    group: { id: data?.group.id },
    units: data?.units,
  });

  const formSubmit = ({ data, fileLogo }) => {
    getCreate({
      data: formatRequest(data),
      fileLogo,
      permissions: data?.permissions.map((item) => ({ id: item?.id })),
    });
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
        <AdminForm formSubmit={formSubmit} loading={loading} status={status} />
      </>
    </Layout>
  );
}

export default AdminPageCreate;
