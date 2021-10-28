import React from 'react';
import RichTextEditor from 'react-rte';
import { FormHelperText, Typography } from '@material-ui/core';
import { ErrorMessage } from 'formik';

const CustomRichText = ({ field, form, label = '' }) => {
  const [valueRTE, setValueRTE] = React.useState(
    RichTextEditor.createValueFromString(field.value || '', 'html')
  );

  React.useEffect(() => {
    const valueServer = RichTextEditor.createValueFromString(
      field.value || '',
      'html'
    );
    if (valueServer.toString('html') !== valueRTE.toString('html')) {
      setValueRTE(valueServer);
    }
  }, [field.value]);

  const onChange = (value) => {
    form.setFieldValue(field.name, value.toString('html'));
    setValueRTE(value);
  };

  return (
    <>
      <Typography
        variant="p"
        style={{
          fontFamily: 'Poppins',
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: 400,
          color: '#505255',
        }}
      >
        {label}
      </Typography>
      <RichTextEditor value={valueRTE} onChange={onChange} />
      <ErrorMessage name={field.name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

export default CustomRichText;
