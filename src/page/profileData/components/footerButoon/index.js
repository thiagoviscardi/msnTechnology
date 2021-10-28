import React from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { useStyles, FormContainer } from './styles';
import { useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const FooterButton = ({
  type,
  onClick,
  loading,
  handleCloseAlert,
  openAlert,
}) => {
  const history = useHistory();
  const classes = useStyles();

  const goBack = () => history.goBack();
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const buttons = (
    <React.Fragment>
      <Button
        onClick={handleClick({ vertical: 'top', horizontal: 'right' })}
      ></Button>
    </React.Fragment>
  );
  return (
    <FormContainer
      style={{ justifyContent: 'flex-end', marginTop: 48, marginRight: 150 }}
    >
      <Button onClick={goBack} className={classes.cancelButton}>
        <Typography className={classes.cancelText}>Voltar</Typography>
      </Button>
      <Button
        disabled={loading}
        type={type}
        className={classes.registerButton}
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        {loading && (
          <CircularProgress
            style={{
              color: 'white',
            }}
            size={21}
          />
        )}
        <Typography className={classes.registerText}>Salvar</Typography>
      </Button>
      <Snackbar
        open={openAlert}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Dados atualizados com sucesso
        </Alert>
      </Snackbar>
      {buttons}
    </FormContainer>
  );
};

export default FooterButton;
