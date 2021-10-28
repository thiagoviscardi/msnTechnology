import React from 'react';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: '12px',
    color: '#A2A5A8',
  },
}));

const CheckboxFilter = ({ setChipFilter, label, ...props }) => {
  const [state, setState] = React.useState({
    checked: false,
  });
  const handleChange = (event) => {
    if (props.id && event.target.checked) {
      props.setFilters([...props.filters, props.id]);
      setState({ ...state, checked: true });
      setChipFilter((oldState) => [
        ...oldState,
        { ...state, checked: true, label, id: props.id },
      ]);
    } else {
      const newArray = props.filters.filter((item) => item !== props.id);
      props.setFilters(newArray);
      setState({ ...state, checked: false });
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
        style={{ width: 155 }}
        control={
          <BlueCheckbox
            {...props}
            checked={state.checked}
            size="small"
            onChange={handleChange}
            style={{
              width: 23,
              height: 23,
              marginLeft: 9,
              marginBottom: 3,
            }}
          />
        }
        label={labelDiferent(label)}
      />
    </>
  );
};

export default CheckboxFilter;
