import appColors from 'utils/appColors';
import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },

  paper: {
    marginRight: 131,
    width: '176px',
    borderRadius: '4px',
  },

  tableRow: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    height: 128,
    borderRadius: 4,
    alignItems: 'center',
  },
  textPrice: {
    height: '24px',
    width: '96px',
    color: '#505255',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 16,
  },
  textHours: {
    height: '8px',
    width: '71px',
    color: '#A2A5A8',
    marginBottom: 10,
    marginRight: 24,
    marginLeft: 24,
  },
  numberHours: {
    height: '8px',
    width: '71px',
    color: '#505255',
    fontSize: '18px',
    marginBottom: 24,
    marginRight: 24,
    marginLeft: 24,
  },
  textHoursCard: {
    height: '16px',
    width: '72px',
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'Open Sans',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#A2A5A8',
    marginLeft: 16,
  },
  card: {
    backgroundColor: 'white',
    width: 176,
    height: 96,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 16,
  },
  cardClose: {
    backgroundColor: 'white',
    height: 96,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 16,
    '@media (min-width: 1921px)': {
      width: '190px',
    },
    '@media (max-width: 1920px)': {
      width: '190px',
    },
    '@media (max-width: 1660px)': {
      width: '176px',
    },
    '@media (max-width: 1550px)': {
      width: '176px',
    },
    '@media (max-width: 1600px)': {
      width: '176px',
    },
    '@media (max-width: 1440px)': {
      width: '176px',
    },
    '@media (max-width: 1400px)': {
      maxWidth: '176px',
    },
    '@media (max-width: 1360px)': {
      width: '176px',
    },
    '@media (max-width: 1024px)': {
      width: '176px',
    },
  },
  iconButton: {
    width: 10,
    height: 10,
    color: ' #A2A5A8',
  },

  iconButtonScale: {
    width: 10,
    height: 10,
    color: ' #505255',
  },

  insideCard: {
    marginTop: 8,
  },
  titleCard: {
    fontFamily: 'Open Sans',
    fontSize: '12px',
    fontStyle: 'normal',
    textAlign: 'left',
    height: '16px',
    width: '150px',
    color: ' #A2A5A8',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  cardNoneShift: {
    backgroundColor: '#D8D8DA',
    width: 176,
    height: 96,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 16,
    cursor: 'pointer',
  },
}));
