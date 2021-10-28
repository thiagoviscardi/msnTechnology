import React from 'react';
import Layout from 'shared/component/Layout';
import IconReportCardSvg from 'shared/component/iconReportCardSvg';
import { useStyles } from './styles';
import { Tabs } from './tab';
import HasPermission from 'utils/checkPermission';
import { useHistory } from 'react-router';

const ReportPage = () => {
  const classes = useStyles();
  const { push } = useHistory();

  return (
    <Layout title="Relatórios" showToday>
      <div data-cy="relatorios_cards" className={classes.rowContainer}>
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
};

export default ReportPage;
