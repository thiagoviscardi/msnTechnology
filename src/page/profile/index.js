import React from 'react';
import { styles } from './styles';
import Layout from 'shared/component/Layout';
import IconReportCard from 'shared/component/iconReportCard';
import { Link } from 'react-router-dom';

export default function Profile() {
  const classes = styles();
  return (
    <Layout title="Perfil" showToday>
      <div className={classes.rowContainer}>
        <Link
          to={`/profile-data`}
          style={{
            textDecoration: 'none',
          }}
        >
          <div>
            <IconReportCard
              icon="person_outline"
              title="Meu perfil"
              subtitle="Edite suas informações de usuário e altere sua senha."
            />
          </div>
        </Link>
        <div>
          <IconReportCard
            icon="notifications_none"
            title="Notificações"
            subtitle="Confira e organize todas as suas notificações"
          />
        </div>
      </div>
    </Layout>
  );
}
