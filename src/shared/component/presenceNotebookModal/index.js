import React, { useState } from 'react';
import {
  useStyles,
  ModalNotebookContainer,
  TypographyAfter,
  TypographyBefore,
} from './styles';
import {
  Modal,
  Typography,
  Divider,
  Button,
  Icon,
  Radio,
  IconButton,
  RadioGroup,
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SelectComponent from 'shared/component/selectComponent';
import SendAlertModal from 'shared/component/sendAlertModal';
export default function PresenceNotebookModal({
  open,
  handleClosePresence,
  title,
  type,
  buttonText,
}) {
  const classes = useStyles();
  const [state, setState] = useState({
    openAlert: false,
  });
  const { openAlert } = state;
  const handleOpenAlert = () => {
    setState({
      ...state,
      openAlert: true,
    });
  };
  const handleCloseAlert = () => {
    setState({ ...state, openAlert: false });
  };
  const [value, setValue] = useState('0');
  const [spreadsheet, setSpreadsheet] = useState('0');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChangeSpreadsheet = (event) => {
    setSpreadsheet(event.target.value);
  };
  const options = [
    { id: 0, name: 'teste' },
    { id: 1, name: 'teste' },
    { id: 2, name: 'teste' },
  ];
  const label = options.map((item) => item.name);
  return (
    <div>
      {open && (
        <Modal
          className={classes.modal}
          open={true}
          disableAutoFocus
          disableEnforceFocus
          onClose={handleClosePresence}
        >
          <ModalNotebookContainer>
            <div className={classes.rootz}>
              <Typography className={classes.textModal}>{title}</Typography>
              <div>
                <IconButton
                  onClick={handleClosePresence}
                  style={{
                    marginTop: 15,
                  }}
                >
                  <Icon>close</Icon>
                </IconButton>
              </div>
            </div>
            <Divider style={{ height: 1, width: 616 }} />
            {type === 'presence' && (
              <>
                <Typography className={classes.subTextModal}>
                  Escolha o formato da planilha
                </Typography>
                <div className={classes.radioContainer}>
                  <RadioGroup
                    style={{ paddingLeft: '3%' }}
                    row
                    name="position"
                    onChange={handleChange}
                    value={value}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label={
                        value === '1' ? (
                          <TypographyAfter> XLS / Excel</TypographyAfter>
                        ) : (
                          <TypographyBefore>XLS / Excel</TypographyBefore>
                        )
                      }
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio color="primary" />}
                      label={
                        value === '2' ? (
                          <TypographyAfter>PDF</TypographyAfter>
                        ) : (
                          <TypographyBefore>PDF</TypographyBefore>
                        )
                      }
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </div>
              </>
            )}
            {type === 'spreadsheet' && (
              <>
                <div className={classes.subtitle}>
                  <div className={classes.radioContainer}>
                    <Typography className={classes.subTextModal}>
                      Escolha o formato da planilha
                    </Typography>
                    <RadioGroup
                      style={{ paddingLeft: '8%' }}
                      row
                      name="position"
                      defaultValue="top"
                      onChange={handleChangeSpreadsheet}
                      value={spreadsheet}
                    >
                      <FormControlLabel
                        value="3"
                        control={<Radio color="primary" />}
                        label={
                          spreadsheet === '3' ? (
                            <TypographyAfter>Operacional</TypographyAfter>
                          ) : (
                            <TypographyBefore>Operacional</TypographyBefore>
                          )
                        }
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio color="primary" />}
                        label={
                          spreadsheet === '4' ? (
                            <TypographyAfter>Financeiro</TypographyAfter>
                          ) : (
                            <TypographyBefore>Financeiro</TypographyBefore>
                          )
                        }
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </div>

                  <div className={classes.radioContainer}>
                    <Typography className={classes.subTextModal}>
                      Escolha o formato da planilha
                    </Typography>
                    <RadioGroup
                      style={{ paddingLeft: '10%' }}
                      row
                      name="position"
                      defaultValue="top"
                      onChange={handleChangeSpreadsheet}
                      value={spreadsheet}
                    >
                      <FormControlLabel
                        value="3"
                        control={<Radio color="primary" />}
                        label={
                          spreadsheet === '3' ? (
                            <TypographyAfter>XLS / Excel</TypographyAfter>
                          ) : (
                            <TypographyBefore>XLS / Excel</TypographyBefore>
                          )
                        }
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio color="primary" />}
                        label={
                          spreadsheet === '4' ? (
                            <TypographyAfter>PDF</TypographyAfter>
                          ) : (
                            <TypographyBefore>PDF</TypographyBefore>
                          )
                        }
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </div>
                </div>
              </>
            )}
            <div className={classes.select}>
              <SelectComponent
                style={{
                  width: '568px',
                  height: '48px',
                }}
                title="Selecione o hospital"
                label={label}
                options={options}
              />
              <SelectComponent
                style={{
                  width: '568px',
                  height: '48px',
                }}
                title="Selecione a escala"
                label={label}
                options={options}
              />
            </div>
            <SelectComponent
              className={classes.selec}
              style={{
                width: '271px',
                height: '48px',
              }}
              title="Selecione mês"
              label={label}
              options={options}
            />
            <SelectComponent
              style={{
                width: '271px',
                height: '49px',
              }}
              title="Selecione ano"
              label={label}
              options={options}
            />
            <div className={classes.buttonContainer}>
              <div className={classes.buttonCancel}>
                <Button onClick={handleClosePresence}>
                  <Typography className={classes.textCancel}>
                    Cancelar
                  </Typography>
                </Button>
              </div>
              <div className={classes.buttonExport}>
                <Button onClick={handleOpenAlert}>
                  <Typography className={classes.textExport}>
                    {buttonText}
                  </Typography>
                </Button>
              </div>
            </div>
          </ModalNotebookContainer>
        </Modal>
      )}
      {openAlert && (
        <SendAlertModal
          openAlert={openAlert}
          title="Alerta enviado com sucesso!"
          subtitle="Verifique o documento salvo emsua pasta de download."
          close={handleCloseAlert}
        />
      )}
    </div>
  );
}
