import React, { useState, useContext } from 'react';
import Icon from '@material-ui/core/Icon';
import { Avatar, Button } from '@material-ui/core';
import { ModalSendAlert } from '../../ModalSendAlert';
import { ModalResponseAlert } from '../../ModalResponseAlert';
import { formatDate } from 'react-day-picker/moment';
import { useStyles, SituationContainer } from './styles';
import moment from 'moment';
import { formatPrice } from 'utils/formatPrice';
import SwitchSituation from 'shared/component/SwitchSituation';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';

function LeftGridInfo() {
  const classes = useStyles();

  const { agendaDetails } = useContext(ProfessionalSchedulePageContext);
  const [openModalSendNotification, setOpenModalSendNotification] =
    useState(false);

  const [openSendFinish, setOpenSendFinish] = useState(false);

  const handleCloseSendFinish = () => {
    setOpenSendFinish(false);
  };

  const handleOpenSendNotification = () => {
    setOpenModalSendNotification(true);
  };

  const handleCloseSendNotification = () => {
    setOpenModalSendNotification(false);
  };

  const dispatchMessage = () => {
    setOpenSendFinish(true);
  };

  const formatedDate = (date) => {
    return `${formatDate(date, 'LL', 'pt-br')}`;
  };

  const formatHour = (hour) => moment(hour).format('HH:mm');

  const getSpecialties = (specialties) => {
    if (!specialties || !specialties.length > 0) return <span>...</span>;
    const concatedNames = specialties[0].name;
    return <span>{concatedNames}</span>;
  };

  return (
    <>
      <div className={classes.main_container}>
        <div className={classes.top_container}>
          <Avatar
            alt="User image"
            src={agendaDetails?.user?.image_url}
            className={classes.avatar}
          />
          <div>
            <h3
              style={{
                fontSize: '14px',
                textAlign: 'center',
                fontWeight: '500',
                margin: '0 3px',
              }}
            >
              {agendaDetails?.user?.name}
            </h3>
            <p style={{ fontSize: '12px', fontWeight: '400' }}>
              {getSpecialties(agendaDetails?.user?.specialties)}
            </p>
          </div>
          <div className={classes.link_to_schedule}>---</div>
        </div>
        <div className={classes.bottom_container}>
          <SituationContainer>
            {agendaDetails?.situation && (
              <SwitchSituation item={agendaDetails} />
            )}
          </SituationContainer>
          <div style={{ textAlign: 'center' }}>
            <p className={classes.previst_hour}>Horário previsto</p>
            <span className={classes.date_schedule}>
              {formatedDate(agendaDetails?.date_start)} <br />{' '}
              {formatHour(agendaDetails?.date_start)} -{' '}
              {formatHour(agendaDetails?.date_end)}
            </span>
            <p className={classes.title_value}>Valor</p>
            <span className={classes.value}>
              {formatPrice(agendaDetails?.price)}
            </span>
          </div>
          <Button
            data-cy="btn_modal_send_alert"
            className={classes.button}
            onClick={handleOpenSendNotification}
            startIcon={<Icon style={{ fontSize: 16 }}>send</Icon>}
          >
            Enviar alerta
          </Button>
        </div>
      </div>

      <ModalSendAlert
        open={openModalSendNotification}
        close={handleCloseSendNotification}
        title="Selecionar mensagem pré-definida"
        dispatchMessage={dispatchMessage}
        // options={data}
      />
      <ModalResponseAlert
        error
        openSendFinish={openSendFinish}
        messageTitleAlert="Alerta enviado com sucesso!"
        handleCloseSendFinish={handleCloseSendFinish}
      />
    </>
  );
}

export default LeftGridInfo;
