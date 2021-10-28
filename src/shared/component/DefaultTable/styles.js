import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  container: {
    // maxHeight: 440,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    marginTop: 100,
  },
  pagination_control: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
}));

export const TableStyles = styled.div`
  .MuiTableHead-root > tr > th {
    background-color: ${appColors.BACKGROUND_COLOR};
  }
  .MuiTable-stickyHeader {
    border-collapse: collapse;
  }
  .MuiTableBody-root > tr {
    border-top-style: solid;
    border-top-width: 8px;
    border-top-color: ${appColors.BACKGROUND_COLOR};
    background-color: #fff;
  }
  .MuiTableContainer-root {
    @media (max-width: 1920px) {
      width: 100%;
      overflow-x: inherit;
    }
  }
`;
