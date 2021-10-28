import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const statusList = [
  {
    id: 1,
    name: 'Solteiro(a)',
  },
  {
    id: 2,
    name: 'Casado(a)',
  },
  {
    id: 3,
    name: 'Viúvo(a)',
  },
  {
    id: 4,
    name: 'União Estável',
  },
  {
    id: 5,
    name: 'Divorciado',
  },
];

const CivilStatusPicker = ({ onChange, onBlur, name, value }) => (
  <Select onChange={onChange} onBlur={onBlur} name={name} value={value || ''}>
    {statusList.length > 0 &&
      statusList.map((status) => (
        <MenuItem key={status.id} value={status.id}>
          {status.name}
        </MenuItem>
      ))}
  </Select>
);
CivilStatusPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.any]),
};
CivilStatusPicker.defaultProps = {
  value: '',
};
export default CivilStatusPicker;
