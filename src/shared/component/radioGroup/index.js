import React, { useState } from 'react';
import { TypographyAfter, TypographyBefore } from './styles';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

export default function RadioStatus({
  fieldName = '',
  title1,
  title2,
  setFieldValue,
  style,
  valueState = '',
}) {
  const [value, setValue] = useState(valueState);

  const handleChange = (event) => {
    setValue(event.target.value);
    setFieldValue(fieldName, parseInt(event.target.value));
  };

  return (
    <div>
      <RadioGroup
        row
        name="position"
        onChange={handleChange}
        value={value}
        style={style}
      >
        <FormControlLabel
          value="1"
          name={title1}
          control={<Radio color="primary" />}
          label={
            value === '1' ? (
              <TypographyAfter>{title1}</TypographyAfter>
            ) : (
              <TypographyBefore>{title1}</TypographyBefore>
            )
          }
          labelPlacement="end"
        />
        <FormControlLabel
          value="0"
          name={title2}
          control={<Radio color="primary" />}
          label={
            value === '0' ? (
              <TypographyAfter>{title2}</TypographyAfter>
            ) : (
              <TypographyBefore>{title2}</TypographyBefore>
            )
          }
          labelPlacement="end"
        />
      </RadioGroup>
    </div>
  );
}
