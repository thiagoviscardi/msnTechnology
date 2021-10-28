import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FooterButton from './FooterButton';
import ModalResponseSuccess from './ModalResponseSuccess';
import { ContainerFormModal, InputContainer, InputItem } from './styles';
import CustomSelectUnits from 'shared/component/forms/CustomSelectUnits';
import CalendarMonthYearPicker from 'shared/component/CalendarMonthYearPicker';
import CustomSelectUnitScales from 'shared/component/forms/CustomSelectUnitScales';

import { useBookPresence } from 'hook/agenda/presence_book';
import MessageNotification from 'shared/component/messageNotification';

export const formInitialValues = {
  unit: { id: '' },
  scales: '',
  monthYear: {
    year: '',
    month: '',
  },
};

const FormPresenceBook = ({ handleCloseModal }) => {
  const { loading, getAgendaPdf } = useBookPresence();
  const [error, setError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (data) => {
    const params = {
      unit_id: data.unit.id,
      year: data.monthYear.year,
      month: data.monthYear.month,
    };
    getAgendaPdf(params, data.scales)
      .then(() => {
        setModalSuccess(true);
        setMessage(null);
        setError(false);
      })
      .catch((errorMessage) => {
        setMessage(errorMessage);
        setError(true);
      });
  };

  const [selectedScales, setSelectedScales] = useState(null);
  const schema = Yup.object().shape({
    unit: Yup.object().shape({
      id: Yup.number().typeError('Obrigatório!').required('Obrigatório!'),
    }),
    scales: Yup.array().typeError('Obrigatório!').required('Obrigatório!'),
    monthYear: Yup.object().shape({
      year: Yup.number().typeError('Obrigatório!').required('Obrigatório!'),
      month: Yup.number().typeError('Obrigatório!').required('Obrigatório!'),
    }),
  });

  return (
    <ContainerFormModal>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={formInitialValues}
        validateOnBlur
        values
      >
        {({
          setFieldValue,
          setFieldTouched,
          errors,
          values,
          handleBlur,
          touched,
        }) => (
          <Form>
            <InputContainer>
              <InputItem data-cy="select_hospital">
                <Field
                  name="unit"
                  style={{ width: '100%' }}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  placeholder={'Selecione o hospital'}
                  label={'Selecione o hospital'}
                  errors={errors && errors?.unit?.id}
                  handleChange={(data) => {
                    setFieldValue('scales', '');
                    setSelectedScales(null);
                    if (data?.value) setFieldValue('unit.id', data.value);
                    else setFieldValue('unit.id', '');
                  }}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  variant="outlined"
                  component={CustomSelectUnits}
                  isClearable
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <Field
                  name="scales"
                  style={{ width: '100%' }}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  placeholder={'Selecione a escala'}
                  label={'Selecione a escala'}
                  value={selectedScales}
                  errors={errors && errors?.scales}
                  handleChange={(data) => {
                    setFieldValue('scales', data);
                    setSelectedScales(data);
                  }}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  variant="outlined"
                  component={CustomSelectUnitScales}
                  unit_id={values?.unit?.id && values.unit.id}
                  isMulti
                  isClearable
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem data-cy="containerCalendar">
                <Field
                  name="monthYear"
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  value={values.monthYear}
                  errors={errors && errors?.monthYear?.month}
                  touched={touched}
                  label="Mês/Ano"
                  variant="outlined"
                  component={CalendarMonthYearPicker}
                />
              </InputItem>
            </InputContainer>
            <FooterButton
              loading={loading}
              handleCloseModal={handleCloseModal}
            />
          </Form>
        )}
      </Formik>
      <MessageNotification
        openNotification={error}
        closeNotification={() => setError(false)}
        type={'error'}
        message={message}
        vertical={10}
        horizontal="40vw"
      />
      <ModalResponseSuccess
        openModalSuccess={modalSuccess}
        handleCloseModalSuccess={() => setModalSuccess(false)}
      />
    </ContainerFormModal>
  );
};

export default FormPresenceBook;
