import React from 'react';
import { useStyles, ModalContainer } from './styles';
import { Modal, Icon, Typography, Input } from '@material-ui/core';
import appColors from 'utils/appColors';
import CustomSimpleCheckbox from 'shared/component/forms/CustomSimpleCheckBox';
import { Formik, Field, Form } from 'formik';

function FilterModalShifts({ options, openFilter, handleClose }) {
  const classes = useStyles();
  return (
    <Modal
      disableEnforceFocus
      disableAutoFocus
      className={classes.modal}
      open={openFilter}
      onClose={handleClose}
    >
      <ModalContainer>
        <div className={classes.rowContainer}>
          <Icon
            style={{
              fontSize: 16,
              marginRight: 12,
              color: appColors.PRIMARY_COLOR,
            }}
          >
            filter_alt
          </Icon>
          <Typography
            style={{
              color: appColors.PRIMARY_COLOR,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Filtros
          </Typography>
        </div>

        <Formik initialValues={{}}>
          {() => (
            <Form>
              <div
                style={{
                  justifyContent: 'space-between',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingLeft: 12,
                  paddingTop: 12,
                }}
              >
                <div style={{ width: 161, marginBottom: 12 }}>
                  <Input
                    placeholder="Buscar plantão "
                    primary
                    inputProps={{ 'aria-label': 'description' }}
                  />
                  {options.map((option, i) => (
                    <div key={i}>
                      <Field
                        name={option.name}
                        label={option.name}
                        component={CustomSimpleCheckbox}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
}

export default FilterModalShifts;
