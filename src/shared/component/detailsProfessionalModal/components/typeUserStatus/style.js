import { Avatar, makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  ballModalLate: {
    borderRadius: '50% ',
    height: '8px',
    width: '8px',
    border: '1px solid  #FA8F47',
    backgroundColor: ' #FA8F47',
  },
  ballModalClimbed: {
    borderRadius: '50% ',
    height: '8px',
    width: '8px',
    border: '1px solid  #1F437F',
    backgroundColor: ' #1F437F',
  },
  ballModalDone: {
    borderRadius: '50% ',
    height: '8px',
    width: '8px',
    border: '1px solid  #24B8EC',
    backgroundColor: ' #24B8EC',
  },

  ballModalOccurring: {
    borderRadius: '50% ',
    height: '8px',
    width: '8px',
    border: '1px solid   #5AC17F',
    backgroundColor: '  #5AC17F',
  },
  ballModalWarning: {
    borderRadius: '50% ',
    height: '8px',
    width: '8px',
    border: '1px solid #FF819A',
    backgroundColor: '#FF819A',
  },
  ballModalCancel: {
    borderRadius: '50% ',
    height: '8px',
    width: '8px',
    border: '1px solid #EB0000',
    backgroundColor: '#EB0000',
  },
}));

export const StyledAvatar = styled(Avatar)`
  margin: 10px 24px 0px 24px;
  border: 3px solid ${(props) => props.color};
  width: 104px !important;
  height: 104px !important;
`;
