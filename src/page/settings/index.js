import React from 'react';
import { useStyles } from './styles';
import { Tabs } from './tabs';
import Layout from 'shared/component/Layout';
import IconReportCardSvg from 'shared/component/iconReportCardSvg';
import HasPermission from 'utils/checkPermission';
import { useHistory } from 'react-router';

export default function SettingsPage() {
  const styles = useStyles();
  const { push } = useHistory();

  return (
    <Layout title="Configurações" showToday>
      <div data-cy="container_configuracoes" className={styles.rowContainer}>
        {Tabs.map((item, index) => {
          let permission = HasPermission(item.permission);
          return (
            <div
              onClick={() => (permission ? push(item.link) : undefined)}
              key={index}
            >
              <IconReportCardSvg
                icon={item.icon}
                title={item.title}
                subtitle={item.info}
                permission={permission}
              />
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
