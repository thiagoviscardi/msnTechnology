import React, { useCallback, useRef } from 'react';
import { useStyles } from './style';
import Layout from 'shared/component/Layout';
import ModalPresenceBook from './ModalPresenceBook';
import ModalGenerateSpreadSheets from './ModalGenerateSpreadSheets';
import IconReportCardSvg from 'shared/component/iconReportCardSvg';
import { icons } from 'asset';
import { useHistory } from 'react-router';
import HasPermission from 'utils/checkPermission';

export default function SchedulePage() {
  const styles = useStyles();
  const { push } = useHistory();

  const ModalPresenceBookRef = useRef(null);
  const handleOpenModalPresenceBook = useCallback(() => {
    ModalPresenceBookRef.current.handleOpenModal();
  }, []);

  const ModalGenerateSpreadSheetsRef = useRef(null);
  const handleOpenModalGenerateSpreadSheets = useCallback(() => {
    ModalGenerateSpreadSheetsRef.current.handleOpenModal();
  }, []);

  const hasAgendaPermissionRead = HasPermission('schedule/r');
  const hasReportPermissionExport = HasPermission('spreadsheet/export');
  const hasPresencePermissionExport = HasPermission('presence/export');

  return (
    <Layout title="Agenda" showToday>
      <div data-cy="div_agenda" className={styles.cards}>
        <div
          id="btnAgenda"
          onClick={() =>
            hasAgendaPermissionRead ? push('/agenda/semana') : undefined
          }
        >
          <IconReportCardSvg
            icon={icons.dateRange}
            title="Agenda da semana"
            subtitle="Consulte, agende ou edite os plantões da semana"
            permission={hasAgendaPermissionRead}
          />
        </div>
        <div
          onClick={
            hasPresencePermissionExport
              ? () => handleOpenModalPresenceBook()
              : undefined
          }
        >
          <IconReportCardSvg
            icon={icons.chromeReaderMode}
            title="Caderno de presença"
            subtitle="Exporte o caderno de presença dos hospitais"
            permission={hasPresencePermissionExport}
          />
        </div>
        <div
          id="GerarPlanilha"
          onClick={
            hasReportPermissionExport
              ? () => handleOpenModalGenerateSpreadSheets()
              : undefined
          }
        >
          <IconReportCardSvg
            icon={icons.viewList}
            title="Gerar planilhas"
            subtitle="Exporte as planilhas dos relatórios operacionais e financeiros"
            permission={hasReportPermissionExport}
          />
        </div>
      </div>
      <ModalPresenceBook ref={ModalPresenceBookRef} />
      <ModalGenerateSpreadSheets ref={ModalGenerateSpreadSheetsRef} />
    </Layout>
  );
}
