import styled from 'styled-components';
import { Paper, makeStyles } from '@material-ui/core';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  doctorName: {
    marginLeft: 12,
    fontSize: '14px',
    fontWeight: 500,
    color: appColors.GRAY_TEXT_COLOR,
  },
  escaleDate: {
    fontSize: '14px',
    fontWeight: 400,
    marginLeft: 12,
    color: '#606367',
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const UserCard = styled(Paper)`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 12px;
  margin: 12px;
  min-width: 337px;
  height: 80px;
  border-radius: 4px;
  @media (max-width: 1024px) {
    width: 414px;
    margin: 6px;
  }
  @media (max-width: 768px) {
    width: 314px;
    margin: 6px;
  }
`;
