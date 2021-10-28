import React, { useState } from 'react';
import Header from 'shared/component/header';
import { useStyles, DefaultContainer } from './styles';
import ButtonExport from 'shared/component/buttonExport';
import DetailsProfessionalModal from 'shared/component/detailsProfessionalModal';
import IconReportCard from 'shared/component/iconReportCard';
import PresenceNotebookModal from 'shared/component/presenceNotebookModal';
import FilterShiftsModal from 'shared/component/FilterShiftsModal';
import SendAlertModal from 'shared/component/sendAlertModal';
import { Typography, Divider, Button } from '@material-ui/core';
import Table from 'page/hospital/components/table';

export default function Components() {
  const classes = useStyles();

  const columns = [
    { name: '#' },
    { name: 'Hospital' },
    { name: 'CNPJ' },
    { name: 'Cidade' },
  ];
  const rows = [[1, 'HUGOL', '00.123.123/0002-81', 'Goiânia']];

  const [state, setState] = useState({
    value: 0,
    openDetails: false,
    openFilter: false,
    openAlert: false,
    openPresence: false,
  });
  const { openFilter, openDetails, openAlert, openPresence } = state;
  const handleOpen = () => {
    setState({ ...state, openDetails: true });
  };
  const handleOpenPresence = () => {
    setState({ ...state, openPresence: true });
  };
  const handleOpenFIlter = () => {
    setState({ ...state, openFilter: true });
  };
  const handleClose = () => {
    setState({ ...state, openFilter: false, open: false });
  };
  const handleCloseAlert = () => {
    setState({ ...state, openAlert: false });
  };
  const handleClosePresence = () => {
    setState({ ...state, openPresence: false });
  };
  const handleOpenAlert = () => {
    setState({
      ...state,
      openAlert: true,
    });
  };
  const options = [
    { id: 0, name: 'Trocas' },
    { id: 1, name: 'Canceladas' },
    { id: 2, name: 'Não confirmadas' },
  ];
  const handleCloseDetails = () => {
    setState({ ...state, openDetails: false });
  };
  const details = {
    id: 1,
    name: 'Nome',
    specialty: 'Oncologia',
    schedule: '22/06 (DOM) 07h30 ás 20h30 ',
    type: 'Cancelada',
    typeStatus: 'Realizado',
    avatar: '',
    crm: '4242-GO',
    company: 'Medical Center',
    hospital:
      'HUGOL - Hospital Estadual de Urgências Governador Otávio Lage de Siqueira',
    contact: 'drabetina-onco@sampleemail.com',
  };
  return (
    <>
      <div className={classes.root}>
        <Header title={'Components'} />
        <main>
          <DefaultContainer className={classes.container}>
            <Typography
              style={{
                fontSize: 30,
              }}
            >
              componentes de Formulários:
            </Typography>
            <Typography
              style={{
                fontSize: 20,
              }}
            >
              Este componente abre um modal para gerar o caderno de presença
            </Typography>
            <Button
              onClick={handleOpenPresence}
              style={{
                background: 'orange',
                width: 500,
                marginBottom: 30,
              }}
            >
              abrir modal para gerar caderno presença(PresenceNotebookModal)
            </Button>

            {openPresence && (
              <PresenceNotebookModal
                open={openPresence}
                title="Gerar Caderno de Presença"
                subtitle="Escolha o formato da planilha"
                buttonText="Exportar Caderno de Presença"
                type="spreadsheet"
                handleClosePresence={handleClosePresence}
              />
            )}
            <Typography>botão de exportar (ButtonExport)</Typography>
            <div>
              <ButtonExport />
            </div>
            <Divider
              style={{
                height: 10,
                margin: 30,
              }}
            />
            <Typography
              style={{
                fontSize: 30,
              }}
            >
              componentes de exibição de dados:
            </Typography>
            <Typography>Tabela</Typography>
            <Table columns={columns} rows={rows} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                style={{
                  fontSize: 20,
                }}
              >
                Este componente abre três modais que mostram detalhes sobre os
                médicos, é possível enviar uma mensagem para eles
              </Typography>
              <Button
                onClick={handleOpen}
                style={{
                  background: 'orange',
                  width: 500,
                  marginBottom: 30,
                }}
              >
                abrir modal detalhes profissional(DetailsProfessionalModal)
              </Button>
              {openDetails && (
                <DetailsProfessionalModal
                  openDetails={openDetails}
                  details={details}
                  handleCloseDetails={handleCloseDetails}
                />
              )}
              <Typography
                style={{
                  fontSize: 20,
                }}
              >
                Este componente abre um modal de filtros de escalas com checkbox
              </Typography>
              <Button
                onClick={handleOpenFIlter}
                style={{
                  background: 'orange',
                  width: 500,
                }}
              >
                abrir modal filtro de escalas e status(FilterShiftsModal)
              </Button>
              {openFilter && (
                <FilterShiftsModal
                  options={options}
                  openFilter={openFilter}
                  handleClose={handleClose}
                />
              )}
            </div>
            <Divider
              style={{
                height: 10,
                margin: 30,
              }}
            />
            <Typography
              style={{
                fontSize: 30,
              }}
            >
              componentes de sobreposição :
            </Typography>
            <Typography
              style={{
                fontSize: 20,
              }}
            >
              Este componente é um card fixo com um ícone, um título e um
              subtítulo, com link
            </Typography>
            <IconReportCard
              icon="person_outline"
              title="titulotitulo "
              subtitle="subtitulosubtitulosubtitulo"
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                style={{
                  fontSize: 30,
                }}
              >
                componentes de feedback :
              </Typography>
              <Button
                onClick={handleOpenAlert}
                style={{
                  background: 'orange',
                  width: 500,
                  height: 50,
                  marginBottom: 30,
                }}
              >
                abrir modal de alerta (SendAlertModal)
              </Button>
              {openAlert && (
                <SendAlertModal
                  openAlert={openAlert}
                  close={handleCloseAlert}
                  title="Alerta enviado com sucesso!"
                />
              )}
            </div>
          </DefaultContainer>
        </main>
      </div>
    </>
  );
}
