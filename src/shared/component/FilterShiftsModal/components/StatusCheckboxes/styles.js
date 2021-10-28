import { Checkbox, makeStyles, withStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  scrollContainer: {
    marginTop: 10,
    maxHeight: 210,
    overflowY: 'auto',
    paddingLeft: 10,
  },
  label: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    color: '#A2A5A8',
  },
}));

export const BlueCheckbox = withStyles({
  root: {
    padding: 0,
    color: '#DADADA',
    '&$checked': {
      color: '#24B8EC',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
