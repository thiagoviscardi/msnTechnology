import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const useStyles = makeStyles({
  title: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    color: (permission) => (permission ? 'black' : '#242527'),
  },
  subTitle: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    color: (permission) => (permission ? '#A2A5A8' : '#575a5d'),
    marginRight: 12,
  },
  img: {
    width: 50,
    marginRight: 18,
    marginLeft: 18,
  },

  card: {
    cursor: (permission) => (permission ? 'pointer' : 'auto'),
    margin: '16px',
    width: '358px',
    height: '136px',
    background: (permission) => (permission ? 'white' : '#a99d9d'),
    alignItems: 'center',
    display: 'flex',
    borderRadius: '10px',
    '&:hover': {
      background: (permission) => (permission ? '#0f83ad' : ''),
      '& p': {
        color: (permission) => (permission ? 'white' : 'none'),
      },
      '& img': {
        '-webkit-filter': (permission) =>
          permission ? 'brightness(0) invert(1)' : 'none',
      },
    },
  },
});

export const StyledIndividualReportCard = styled(Paper)`
  @media (max-width: 1920px) {
    width: 358px;
    height: 136px;
    margin: 12px;
  }
  @media (max-width: 1440px) {
    width: 358px;
    height: 136px;
    margin: 7px;
  }
  @media (max-width: 1366px) {
    width: 268px;
    height: 108px;
    margin: 9px;
  }
  @media (max-width: 1024px) {
    width: 158px;
    height: 108px;
    margin: 12px;
  }
  @media (max-width: 768px) {
    width: 108px;
    height: 108px;
    margin: 9px;
    text-align: center;
  }
`;
