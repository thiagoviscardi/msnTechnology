import React, { memo, useEffect } from 'react';
import { InputContainer, InputItem } from './styles';
import { FastField, Field } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import { InputMaskField } from 'shared/component/forms/CustomMaskField';
import CustomSelectStates from 'shared/component/forms/CustomSelectStates';

const specialGroupsList = [
  { id: 45, label: 'Biomédico', doc_name: 'CRMB' },
  { id: 17, label: 'Enfermagem', doc_name: 'COREN' },
  { id: 32, label: 'Farmacêutico', doc_name: 'CRF' },
  { id: 14, label: 'Fisioterapeuta', doc_name: 'CREFITO' },
  { id: 15, label: 'Fonoaudiólogo', doc_name: 'CREFONO' },
  { id: 16, label: 'Nutricionista', doc_name: 'CRN' },
  { id: 13, label: 'Odontólogo', doc_name: 'CRO' },
  { id: 35, label: 'Psicólogo', doc_name: 'CRP' },
  { id: 18, label: 'Téc. Enfermagem', doc_name: 'COREN' },
  { id: 34, label: 'Técnico de radiologia', doc_name: 'CRTR' },
  // { id: 3, label: 'Médico', doc_name: 'CRM' },
];

function SpecialGroups({
  values,
  errors,
  touched,
  currentGroup,
  isEdit,
  setFieldValue = () => {},
}) {
  // const classes = useStyles();

  const [selectedState, setSelectedState] = React.useState('');
  const [currentSpecialType, setCurrentSpecialType] = React.useState(null);

  useEffect(() => {
    if (currentGroup && currentGroup.id) {
      setCurrentSpecialType(null);
      const isSpecial = specialGroupsList.find(
        (item) => item.id === currentGroup.id
      );
      setTimeout(() => {
        setCurrentSpecialType(isSpecial);
        if (isSpecial)
          setFieldValue('crm.regulation_agency', isSpecial.doc_name);
        else {
          setFieldValue('crm.regulation_agency', 'crm');
        }
      }, 100);
    }
  }, [currentGroup]);

  const getInitialState = (state) => {
    const initialState = {
      value: state.id,
      label: state.name,
    };
    setFieldValue('crm.state', parseInt(initialState.value));
    setSelectedState(initialState);
  };

  useEffect(() => {
    isEdit && values?.crm && values.crm.state
      ? getInitialState(values.crm.state)
      : setFieldValue('crm.state', '');
  }, []);

  return (
    <>
      {currentSpecialType && (
        <InputContainer>
          <InputItem>
            <FastField
              name="crm.number"
              value={values.crm.number}
              errors={errors}
              placeholder={`Numero do conselho ${currentSpecialType.doc_name}`}
              touched={touched}
              style={{ width: '100%' }}
              variant="outlined"
              component={CustomTextField}
            />
          </InputItem>
          <InputItem>
            <Field
              name="crm.state"
              placeholder={`${currentSpecialType.doc_name} - UF`}
              value={selectedState}
              // loading={loading}
              handleChange={(val) => {
                if (val?.value) {
                  setSelectedState(val);
                  setFieldValue('crm.state', val.value);
                } else {
                  setSelectedState(null);
                  setFieldValue('crm.state', '');
                }
              }}
              menuList={() => ({ height: 116, overflowY: 'auto' })}
              errors={errors && errors.crm && errors.crm.state}
              component={CustomSelectStates}
            />
          </InputItem>
          <InputItem>
            <FastField
              name="crm.validate"
              placeholder={`Validade do ${currentSpecialType.doc_name}`}
              style={{ width: '100%' }}
              format="99/99/9999"
              variant="outlined"
              errors={errors && errors.crm && errors.crm.validate}
              touched={touched}
              value={values?.crm.validate}
              component={InputMaskField}
              onChange={(e) => {
                setFieldValue('crm.validate', e.target.value);
              }}
            />
          </InputItem>
        </InputContainer>
      )}
    </>
  );
}

export default memo(SpecialGroups);
