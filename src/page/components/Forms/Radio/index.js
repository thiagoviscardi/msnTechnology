import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ErrorMessage } from 'formik';
import React from 'react';

const RadioCustom = withStyles({
  root: {
    color: '#24B8EC',
    '&$checked': {
      color: '#24B8EC',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function RadioComponent({ field, label, form, options }) {
  return (
    <div>
      <FormControl component="fieldset">
        <Typography style={styles.label}>{label}</Typography>
        <RadioGroup
          onChange={(e) =>
            form.setFieldValue(field.name, Number(e.target.value))
          }
          value={field.value}
          row
        >
          {options.map((item) => (
            <FormControlLabel
              key={item.id}
              value={item.id}
              control={<RadioCustom />}
              label={item.name}
              style={{ color: '#A2A5A8' }}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <ErrorMessage name={field.name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </div>
  );
}

const styles = {
  label: {
    fontSize: 12,
    color: '#777',
  },
};

export default RadioComponent;
