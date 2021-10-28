import React, { useState, useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import {
  useStyles,
  ContainerHeader,
  ContainerCenter,
  Container,
  ContainerBottom,
} from './styles';

import IconButton from '@material-ui/core/IconButton';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { Button } from '@material-ui/core';
import { ModalCancelSchedule } from '../../ModalCancelSchedule';
import { ModalResponseAlert } from '../../ModalResponseAlert';
import { ModalSubstutionSchedule } from '../../ModalSubstutionSchedule';
import { ModalPaymentSchedule } from '../../ModalPaymentSchedule';
import { ModalAcceptValidation } from '../../ModalAcceptValidation';
import { ModalRecuseValidation } from '../../ModalRecuseValidation';
import { ModalTogglePriceSchedule } from '../../ModalTogglePriceSchedule';

import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';
import MessageNotification from 'shared/component/messageNotification';
import moment from 'moment';
import { ModalSignature } from '../../ModalSignature';
import { useAuth } from 'hook/auth';

function RightGridInfo({ onClose }) {
  const classes = useStyles();

  const {
    agendaDetails = {},
    setOpenModalSchedule = {},
    selectedUnit = {},
    setAgendaDetailsData = () => {},
  } = useContext(ScheduleWeekPageContext);
  const [openModalValidate, setOpenModalValidate] = useState(false);
  const [openModalRecuse, setOpenModalRecuse] = useState(false);
  const [openModalToggle, setOpenModalToggle] = useState(false);
  const [openModalSignature, setOpenModalSignature] = useState(false);

  const [openModalCancellation, setOpenModalCancellation] = useState(false);
  const [openModalChangePro, setOpenModalChangePro] = useState(false);
  const [openModalCash, setOpenModalCash] = useState(false);

  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState();
  const [statusError, setStatusError] = useState(false);
  const handleCloseSendFinish = () => {
    setOpenAlertMessage(false);
  };

  const handleFormatDate = (date) => {
    return moment(date).format('DD-MM-YYYY HH:mm:ss');
  };
  const dataObj = moment(new Date()).format('MM');
  const dayModal = moment(agendaDetails?.date_end).format('MM');
  const [blockButtons, setBlockButtons] = useState(false);
  React.useEffect(() => {
    if (moment(dataObj).isAfter(dayModal)) setBlockButtons(true);
  }, []);

  const { userLogged } = useAuth();
  return (
    <>
      <div style={{ marginLeft: 20 }}>
        <ContainerHeader>
          <div>
            <h3 className={classes.name_schedule}>
              {agendaDetails?.scale?.name}
            </h3>
            <h6 className={classes.name_unit}>{selectedUnit?.name}</h6>
          </div>
          <div>
            <IconButton
              onClick={() => {
                setOpenModalSchedule(false);
                setAgendaDetailsData(null);
              }}
              aria-label="delete"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </ContainerHeader>

        <ContainerCenter>
          <Container>
            {!!agendaDetails?.user_old &&
              !!agendaDetails?.user_old?.id !== agendaDetails?.user?.id && (
                <div>
                  <span className={classes.scheduled_by_title}>
                    Recebido de{' '}
                  </span>
                  <span className={classes.scheduled_by_name}>
                    {agendaDetails?.user_old?.name}
                  </span>
                </div>
              )}
          </Container>
          <Container style={{ marginTop: 20 }}>
            <div className={classes.scheduled_by}>
              <p className={classes.scheduled_by_title}>Agendado por</p>
              <span className={classes.scheduled_by_name}>
                {agendaDetails?.user_created?.name}
              </span>
            </div>
            <div className={classes.edited_by}>
              <p className={classes.edited_by_title}>Editado por</p>
              <span className={classes.edited_by_name}>
                {agendaDetails?.user_updated?.name}
              </span>
            </div>
          </Container>

          <Container style={{ marginTop: 30, justifyContent: 'space-between' }}>
            {!agendaDetails?.validated_status ? (
              <>
                <Button
                  className={classes.validade_button}
                  onClick={() => setOpenModalValidate(true)}
                  color="primary"
                  startIcon={<CheckIcon className={classes.icon} />}
                >
                  Validar Plantão
                </Button>
                {userLogged.group.id === 1 || userLogged.group.id === 2 ? (
                  <Button
                    className={classes.recuse_button}
                    onClick={() => setOpenModalRecuse(true)}
                    color="primary"
                    startIcon={<NotInterestedIcon className={classes.icon} />}
                  >
                    Invalidar Plantão
                  </Button>
                ) : (
                  <Button
                    disabled={blockButtons}
                    className={classes.recuse_button}
                    onClick={() => setOpenModalRecuse(true)}
                    color="primary"
                    startIcon={<NotInterestedIcon className={classes.icon} />}
                  >
                    Invalidar Plantão
                  </Button>
                )}
              </>
            ) : (
              <>
                {agendaDetails?.validated_status === 1 ? (
                  <div className={classes.validated_status_recuse}>
                    <NotInterestedIcon className={classes.icon} />
                    <div style={{ marginLeft: 10 }}>Plantão Invalidado!</div>
                  </div>
                ) : (
                  <div className={classes.validated_status_accepted}>
                    <CheckIcon className={classes.icon} />
                    <div style={{ marginLeft: 10 }}>Plantão Validado!</div>
                  </div>
                )}
              </>
            )}

            <Button
              id="BtnAlterarValor"
              className={classes.toggle_shift}
              onClick={() => setOpenModalToggle(true)}
              color="primary"
              startIcon={
                <MonetizationOnOutlinedIcon className={classes.icon} />
              }
            >
              Alterar valor plantão
            </Button>
          </Container>

          <Container
            style={{
              height: 250,
              marginTop: 15,
              alignItems: 'flex-start',
            }}
          >
            <div className={classes.container_checkin_cards}>
              <div className={classes.card_checking_checkout}>
                <p style={{ color: '#8B8E93', marginBottom: '8px' }}>
                  Check-in
                </p>
                <span style={{ color: '#505255', marginBottom: '25px' }}>
                  {agendaDetails?.user_date_start
                    ? handleFormatDate(agendaDetails?.user_date_start)
                    : '---'}
                </span>
              </div>
              <div
                className={classes.card_checking_checkout}
                style={{ marginLeft: 40 }}
              >
                <p
                  style={{
                    color: '#8B8E93',
                    marginBottom: '8px',
                  }}
                >
                  Check-out
                </p>
                <span style={{ color: '#505255', marginBottom: '25px' }}>
                  {agendaDetails?.user_date_end
                    ? handleFormatDate(agendaDetails?.user_date_end)
                    : '---'}
                </span>
              </div>
              <div
                style={{
                  marginLeft: 40,
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                {agendaDetails?.signature !== null ? (
                  <Button
                    style={{
                      color: '#8B8E93',
                      textTransform: 'none',
                      padding: 0,
                    }}
                    onClick={() => {
                      setOpenModalSignature(true);
                    }}
                  >
                    Assinatura eletrônica
                  </Button>
                ) : (
                  <Button
                    disabled
                    style={{
                      color: '#8B8E93',
                      textTransform: 'none',
                      padding: 0,
                    }}
                  >
                    Assinatura eletrônica
                  </Button>
                )}
                <span style={{ color: '#505255', marginBottom: '25px' }}>
                  {agendaDetails?.signature !== null
                    ? 'Possui assinatura'
                    : 'Não possui assinatura'}
                </span>
              </div>
            </div>
          </Container>
        </ContainerCenter>
        <ContainerBottom>
          {userLogged.group.id === 1 || userLogged.group.id === 2 ? (
            <>
              <Button
                data-cy="btn_cancelar_plantao"
                className={classes.button}
                onClick={() => setOpenModalCancellation(!openModalCancellation)}
              >
                Cancelar plantão
              </Button>
              <Button
                data-cy="btn_substituir_plantao"
                className={classes.button}
                onClick={() => setOpenModalChangePro(!openModalChangePro)}
              >
                Substituir
              </Button>
              <Button
                data-cy="btn_pagar_plantao"
                className={classes.button}
                onClick={() => setOpenModalCash(!openModalCash)}
              >
                Pagar à vista
              </Button>
            </>
          ) : (
            <>
              <Button
                data-cy="btn_cancelar_plantao_disabled"
                disabled={blockButtons}
                className={classes.button}
                onClick={() => setOpenModalCancellation(!openModalCancellation)}
              >
                Cancelar plantão
              </Button>
              <Button
                data-cy="btn_substituir_plantao_disabled"
                disabled={blockButtons}
                className={classes.button}
                onClick={() => setOpenModalChangePro(!openModalChangePro)}
              >
                Substituir
              </Button>
              <Button
                data-cy="btn_pagar_plantao_disabled"
                disabled={blockButtons}
                className={classes.button}
                onClick={() => setOpenModalCash(!openModalCash)}
              >
                Pagar à vista
              </Button>
            </>
          )}
        </ContainerBottom>

        <ModalAcceptValidation
          open={openModalValidate}
          close={() => setOpenModalValidate(!openModalValidate)}
          setResponseMessage={setResponseMessage}
          setOpenAlertMessage={setOpenAlertMessage}
          setStatusError={setStatusError}
          title="Validar Plantão"
        />
        <ModalRecuseValidation
          open={openModalRecuse}
          close={() => setOpenModalRecuse(!openModalRecuse)}
          setResponseMessage={setResponseMessage}
          setOpenAlertMessage={setOpenAlertMessage}
          setStatusError={setStatusError}
          title="Invalidar Plantão"
        />
        <ModalTogglePriceSchedule
          open={openModalToggle}
          close={onClose}
          setResponseMessage={setResponseMessage}
          setOpenAlertMessage={setOpenAlertMessage}
          setStatusError={setStatusError}
          title="Alterar valor do Plantão"
        />

        <ModalSignature
          open={openModalSignature}
          close={() => setOpenModalSignature(!openModalSignature)}
          setResponseMessage={setResponseMessage}
          setOpenAlertMessage={setOpenAlertMessage}
          setStatusError={setStatusError}
          title="Assinatura eletrônica"
          image={agendaDetails?.signature}
        />
        <ModalCancelSchedule
          open={openModalCancellation}
          close={() => setOpenModalCancellation(!openModalCancellation)}
          title="Cancelar agendamento"
          textButton="Confirmar"
          setResponseMessage={setResponseMessage}
          setOpenAlertMessage={setOpenAlertMessage}
          setStatusError={setStatusError}
        />
        <ModalSubstutionSchedule
          open={openModalChangePro}
          close={() => setOpenModalChangePro(!openModalChangePro)}
          title="Selecione o profissional substituto"
          placeholderSelect="Busque o profissional"
          textButton="Substituir"
          setResponseMessage={setResponseMessage}
          setOpenAlertMessage={setOpenAlertMessage}
          setStatusError={setStatusError}
        />
        <ModalPaymentSchedule
          open={openModalCash}
          close={() => setOpenModalCash(!openModalCash)}
          title="Colocar plantão com pagamento à vista"
          textButton="Confirmar"
          setResponseMessage={setResponseMessage}
          setOpenAlertMessage={setOpenAlertMessage}
          setStatusError={setStatusError}
        />
        <ModalResponseAlert
          openSendFinish={openAlertMessage}
          messageTitleAlert={responseMessage}
          handleCloseSendFinish={handleCloseSendFinish}
        />
        <MessageNotification
          openNotification={statusError}
          closeNotification={() => setStatusError(false)}
          type={'error'}
          message={responseMessage}
          vertical={10}
          horizontal="40vw"
        />
      </div>
    </>
  );
}

export default RightGridInfo;
