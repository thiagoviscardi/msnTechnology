import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import { AntSwitch } from './styles';
const SwitchComponent = (props) => {
  const { setFieldValue, field, active, value, inactive } = props;
  const [state, setState] = React.useState(value);

  const handleChangeSwitch = (event) => {
    const newValue = event.target.checked;
    setState(newValue);
    setFieldValue(field.name, newValue);
  };

  return (
    <FormControlLabel
      control={
        <AntSwitch
          checked={state}
          onChange={handleChangeSwitch}
          name={field.name}
          style={{ color: '#24B8EC' }}
        />
      }
      label={state ? active : inactive}
    />
  );
};

export default SwitchComponent;
