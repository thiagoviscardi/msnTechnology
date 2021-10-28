import { Checkbox, makeStyles, withStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  scrollContainer: {
    maxHeight: 210,
    overflowY: 'auto',
    paddingLeft: 10,
  },
  containerPagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
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

export const ScrollContainer = styled.div`
  ::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  ::-webkit-scrollbar {
    width: 5px;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: #a2a5a8;
    border-radius: 10px;
  }
`;
