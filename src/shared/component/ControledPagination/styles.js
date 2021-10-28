import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  root: {
    '& > * + *': {
      marginTop: 20,
    },
    marginLeft: 5,
  },
}));

export const StyledPagination = styled(Pagination)`
  .MuiPaginationItem-root {
    color: #646464;
    border: none;
  }
  .MuiPagination-ul li {
    margin-right: 5px;
  }
  .MuiPagination-ul li:first-child button {
    background-color: #fff;
    color: ${appColors.PRIMARY_COLOR};
    border: none;
  }
  .MuiPagination-ul li:last-child button {
    background-color: #fff;
    color: ${appColors.PRIMARY_COLOR};
    border: none;
  }
  .MuiPaginationItem-page.Mui-selected {
    background-color: ${appColors.PRIMARY_COLOR};
    color: #fff;
  }
  .MuiPaginationItem-page {
    background-color: ${appColors.BACKGROUND_COLOR};
    border-radius: 6px;
  }
`;
