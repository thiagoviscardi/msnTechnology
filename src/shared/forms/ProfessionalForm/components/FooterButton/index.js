import React from 'react';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { useStyles, FormContainer } from './styles';
import { useHistory } from 'react-router-dom';
import { ModalResponseAlert } from 'page/Schedule/WeekSchedule/components/ModalResponseAlert';

const FooterButton = ({
  loading,
  errors,
  currentTab,
  isEdit,
  status,
  setCurrentTab = () => {},
  handleSubmit = () => {},
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [openModalSendNotification, setOpenModalSendNotification] =
    React.useState(false);
  React.useEffect(() => {
    if (status === 200 || status === 201) setOpenModalSendNotification(true);
  }, [status]);

  const handleCloseModal = () => {
    history.push(`/cadastros/profissionais`);
  };
  const goBack = () => history.goBack();

  const showMessageButton = () => {
    return currentTab === 2 ||
      currentTab === 3 ||
      isEdit ||
      (!verifyFirstStepErrors() &&
        !verifySecondStepErrors() &&
        !verifyThirdStepErrors() &&
        !verifyFouthStepErrors() &&
        currentTab !== 1)
      ? 'Salvar'
      : 'Próximo';
  };

  const verifyFirstStepErrors = () => {
    return (
      errors &&
      (!!errors?.name ||
        !!errors?.last_name ||
        !!errors?.email ||
        !!errors?.cpf ||
        !!errors?.rg ||
        !!errors?.cell_phone ||
        !!errors?.birth_date ||
        !!errors?.nationality?.id ||
        !!errors?.civil_status ||
        !!errors?.address?.street ||
        !!errors?.address?.number ||
        !!errors?.address?.complement ||
        !!errors?.address?.district ||
        !!errors?.address?.city?.state?.id ||
        !!errors?.address?.city?.id)
    );
  };

  const verifySecondStepErrors = () => {
    return (
      !!errors?.crm?.number ||
      !!errors?.crm?.validade ||
      !!errors?.crm?.state?.id ||
      !!errors?.enterprise?.id ||
      !!errors?.specialties ||
      !!errors?.units
    );
  };

  const verifyThirdStepErrors = () => {
    return (
      errors &&
      (!!errors?.bank?.bank?.id ||
        !!errors?.bank?.agency ||
        !!errors?.bank?.account ||
        !!errors?.bank?.account_holder ||
        !!errors?.bank?.type ||
        !!errors?.bank?.doc_type ||
        !!errors?.bank?.doc_number)
    );
  };

  const verifyFouthStepErrors = () => {
    return errors && (!!errors?.password || !!errors?.passwordConfirmation);
  };

  const verifySubmit = () => {
    if (currentTab !== 1 || isEdit) handleSubmit();
    else setCurrentTab(currentTab + 1);

    if (verifyFirstStepErrors()) {
      setCurrentTab(0);
    } else if (verifySecondStepErrors()) {
      setCurrentTab(1);
    } else if (verifyThirdStepErrors()) {
      setCurrentTab(2);
    } else if (verifyFouthStepErrors()) {
      setCurrentTab(3);
    } else if (currentTab === 2 || isEdit) {
      setOpenModalSendNotification(true);
    }
  };

  return (
    <FormContainer style={{ justifyContent: 'flex-end', marginTop: 48 }}>
      <Button onClick={goBack} className={classes.cancelButton}>
        <Typography className={classes.cancelText}>Cancelar</Typography>
      </Button>
      <>
        <Button
          data-cy="footerButton_proximo"
          onClick={() => verifySubmit()}
          disabled={loading}
          className={classes.registerButton}
        >
          {loading ? (
            <CircularProgress size={12} style={{ marginRight: 3 }} />
          ) : (
            <Typography className={classes.registerText}>
              {showMessageButton()}
            </Typography>
          )}
        </Button>
        {status !== 200 || status !== 201 ? (
          <ModalResponseAlert
            messageTitleAlert="Profissional salvo com sucesso!"
            openSendFinish={openModalSendNotification}
            handleCloseSendFinish={handleCloseModal}
          />
        ) : (
          <ModalResponseAlert
            messageTitleAlert="Profissional já cadastrado!"
            openSendFinish={openModalSendNotification}
            handleCloseSendFinish={handleCloseModal}
            error
          />
        )}
      </>
    </FormContainer>
  );
};

export default FooterButton;
