import React from 'react';
import { useStyles } from './styles';
import IconReportCardSvg from 'shared/component/iconReportCardSvg';
import Layout from 'shared/component/Layout';
import { Tabs } from './tabs';
import HasPermission from 'utils/checkPermission';
import { useHistory } from 'react-router';

export default function RegistrationPage() {
  const styles = useStyles();
  const { push } = useHistory();

  return (
    <Layout title="Cadastros" showToday>
      <div data-cy="cadastros_cards" className={styles.rowContainer}>
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
                link={item.link}
                permission={permission}
              />
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
