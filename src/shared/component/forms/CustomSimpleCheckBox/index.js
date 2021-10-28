import React from 'react';
import {
  Checkbox,
  FormHelperText,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { ErrorMessage } from 'formik';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: '16px',
    color: '#606367',
  },
}));

const CustomSimpleCheckbox = ({ field, label, form, ...props }) => {
  const [state, setState] = React.useState({
    checked: false,
  });
  const handleChange = (event) => {
    if (props.id && event.target.checked) {
      props.arrayhelp.push(props.item);
      setState({ ...state, checked: true });
      form.setFieldValue(field.name, event.target.checked);
    } else {
      const itemIndex = props.hospitais.indexOf(props.item);
      props.arrayhelp.remove(itemIndex);
      setState({ ...state, checked: false });
      form.setFieldValue(field.name, event.target.checked);
    }
  };
  const classes = useStyles();

  const BlueCheckbox = withStyles({
    root: {
      color: '#DADADA',
      '&$checked': {
        color: '#24B8EC',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const labelDiferent = (label) => (
    <Typography className={classes.label}>{label}</Typography>
  );

  return (
    <>
      <FormControlLabel
        control={
          <BlueCheckbox
            {...field}
            {...props}
            checked={state.checked}
            onChange={handleChange}
          />
        }
        label={labelDiferent(label)}
      />
      <ErrorMessage name={field.name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

export default CustomSimpleCheckbox;
