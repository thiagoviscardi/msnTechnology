import React from 'react';
import {
  Typography,
  Button,
  Icon,
  TextField,
  IconButton,
} from '@material-ui/core';
import { useStyles, PaperContainerScales } from './styles';
import CustomMaskField from 'shared/component/forms/CustomMaskField';
import CurrencyInput from 'shared/component/maskedField/currencyInput';
import { CheckboxGroup, Checkbox } from 'shared/component/maskedField/checkBox';
import { Field, ErrorMessage } from 'formik';

const ScalesRegistrationPaper = ({
  style,
  handleClosePaper,
  type,
  openPaper,
  values,
  setFieldValue,
  handleChange,
  errors,
  touched,
  handleSubmit,
  setFieldTouched,
  handleBlur,
  name,
}) => {
  const classes = useStyles();

  return (
    <div>
      <PaperContainerScales
        style={style}
        onClose={handleClosePaper}
        disableAutoFocus
        disableEnforceFocus
        open={openPaper}
      >
        {type === 'addHour' && (
          <>
            <div className={classes.rootz}>
              <Typography className={classes.titlesPaper}>Horário</Typography>
              <div>
                <IconButton
                  onClick={handleClosePaper}
                  className={classes.closeButton}
                  style={{
                    padding: 0,
                    marginLeft: 490,
                  }}
                >
                  <Icon>close</Icon>
                </IconButton>
              </div>
            </div>
          </>
        )}
        {type === 'normal' && (
          <div>
            <Typography className={classes.titlesPaper}>Horário</Typography>
          </div>
        )}
        <div className={classes.rootz}>
          <div>
            <Field
              className={classes.paperSchedule}
              label="Início"
              mask=""
              format="##:##"
              placeholder="00:00"
              name="hour_start"
              variant="outlined"
              component={CustomMaskField}
              handleBlur={handleBlur}
              onChange={handleChange}
              error={errors && errors[name] && touched[name]}
            />
          </div>
          <div>
            <Field
              className={classes.paperSchedule}
              label="Fim"
              mask=""
              format="##:##"
              placeholder="00:00"
              name="hour_end"
              variant="outlined"
              component={CustomMaskField}
              handleBlur={handleBlur}
              onChange={handleChange}
              error={errors && errors[name] && touched[name]}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              className={classes.ScheduleVagas}
              variant="outlined"
              placeholder="0"
              name="quantity_Professional"
              value={values.quantity_Professional}
              label="Vagas"
              onChange={handleChange}
              error={errors && errors[name] && touched[name]}
            />
            <ErrorMessage name="quantity_Professional">
              {errors[name]}
            </ErrorMessage>
          </div>
        </div>
        <Typography className={classes.titlesPaper}>Dias da semana</Typography>
        <div className={classes.checkBoxRoot}>
          <CheckboxGroup
            id="week_day"
            value={values.week_day}
            error={errors && errors.week_day}
            touched={touched && touched.week_day}
            onChange={setFieldValue}
            handleBlur={setFieldTouched}
          >
            <Field component={Checkbox} name="week_day" id="0" label="Seg" />
            <Field component={Checkbox} name="week_day" id="1" label="Ter" />
            <Field component={Checkbox} name="week_day" id="2" label="Qua" />
            <Field component={Checkbox} name="week_day" id="3" label="Qui" />
            <Field component={Checkbox} name="week_day" id="4" label="Sex" />
            <Field component={Checkbox} name="week_day" id="5" label="Sáb" />
            <Field component={Checkbox} name="week_day" id="6" label="Dom" />
          </CheckboxGroup>
          <Typography className={classes.titlesPaperValues}>Valores</Typography>
          <div style={{ marginBottom: 32 }}>
            <CurrencyInput
              className={classes.textFieldValue}
              name="price"
              value={values.price}
              setFieldValue={setFieldValue}
              label="Valor"
              handleblur={handleBlur}
              error={errors}
              touched={touched}
            />
          </div>
          <div
            style={{
              display: 'flex',
            }}
          >
            <Button
              data-cy="btn_adicionar_horario_modal"
              type="submit"
              className={classes.button}
              onClick={handleSubmit}
            >
              <Icon className={classes.icon}>add_circle_outline</Icon>
              <Typography className={classes.titleButton}>
                Adicionar horário
              </Typography>
            </Button>
          </div>
        </div>
      </PaperContainerScales>
    </div>
  );
};
export default ScalesRegistrationPaper;
