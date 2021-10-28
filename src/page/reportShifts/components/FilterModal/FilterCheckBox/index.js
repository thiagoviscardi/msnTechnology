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
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    color: '#A2A5A8',
  },
}));

const FilterCheckBox = ({
  checkedprops,
  field,
  label,
  form,
  onclearfilters,
  setfiltertype,
  arraychecked,
  setarraychecked,
  ...props
}) => {
  const [state, setState] = React.useState({
    checked: false,
  });

  React.useEffect(() => {
    if (props.clearfilters !== 'false') {
      setState({ ...state, checked: false });
      setarraychecked([]);
      setfiltertype('universal');
      form.setFieldValue('scales', []);
      form.setFieldValue('situationStatus', []);
    }
  }, [props.clearfilters]);

  const handleChange = (event) => {
    if (props.id && event.target.checked) {
      if (props.clearfilters && onclearfilters) {
        onclearfilters(false);
      }
      props.arrayhelp.push(props.id);
      setState({ ...state, checked: true });
      form.setFieldValue(field.name, event.target.checked);
    } else {
      const removedFromChecked = arraychecked.find(
        (item) => item.id == props.id
      );
      if (removedFromChecked) {
        const arrayFilterByRemoved = arraychecked.filter(
          (item) => item.id !== removedFromChecked.id
        );
        setarraychecked(arrayFilterByRemoved);
      }
      const itemIndex =
        props.hospitais &&
        props.hospitais.length > 0 &&
        props.hospitais.indexOf(props.id);
      props.arrayhelp.remove(itemIndex);
      setState({ ...state, checked: false });
      form.setFieldValue(field.name, event.target.checked);
    }
  };
  const classes = useStyles();

  const BlueCheckbox = withStyles({
    root: {
      padding: 0,
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
        style={{ margin: 0 }}
        control={
          <BlueCheckbox
            {...field}
            {...props}
            checked={checkedprops ? checkedprops : state.checked}
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

export default FilterCheckBox;
