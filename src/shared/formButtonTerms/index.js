import React from 'react';
import PropTypes from 'prop-types';
import CustomButton from './components/customButtom';
import { InputContainer } from 'page/settings/pages/companyRegister/components/useTerms/styles';

const FormButtons = ({
  handleBack,
  handleBackLabel,
  submitText,
  style,
  loading = false,
}) => (
  <InputContainer style={{ justifyContent: 'flex-end', ...style }}>
    {typeof handleBack === 'function' && (
      <CustomButton
        style={{ width: 100, marginRight: 5, backgroundColor: '#797d80' }}
        onClick={handleBack}
        variant="contained"
        data-cy="handleBack"
        label={handleBackLabel}
        color="primary"
      />
    )}
    <CustomButton
      id="submit"
      data-cy="subimit"
      type="submit"
      style={{ width: 100 }}
      label={submitText}
      isLoading={loading}
    />
  </InputContainer>
);

FormButtons.propTypes = {
  handleBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  submitText: PropTypes.string.isRequired,
  handleBackLabel: PropTypes.string,
  loading: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object]),
};

FormButtons.defaultProps = {
  handleBackLabel: 'Voltar',
  handleBack: false,
  loading: false,
  style: {},
};

export default FormButtons;
