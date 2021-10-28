import { makeStyles } from '@material-ui/styles';
import appColors from 'utils/appColors';
import styled from 'styled-components';

const classes = makeStyles(() => ({
  cardDisagreement: {
    height: 450,
    marginTop: 24,
    width: 333,
    marginRight: 46,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1%',
    width: '100%',
    height: 450,
  },
  Avatar: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '5%',
    height: 70,
  },
  Titulo: {
    display: 'flex',
    flexDirection: 'column',
  },
  subtitle: {
    marginLeft: '3%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 0,
  },
  contents: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    paddingBottom: 0,
  },

  divider: {
    display: 'flex',
    flexDirection: 'row',
    justifyConten: 'space-between',
  },

  data: {
    display: 'flex',
    flexDirection: 'column',
    height: '120px',
    padding: 0,
    marginRight: 24,
  },
  contentPai: {
    display: 'flex',
    flexDirection: 'column',
    height: 264,
    width: 330,
    margingLeft: 14,
    marginBottom: 16,
  },
}));

export const Divisor = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  background-color: ${appColors.BACKGROUND_COLOR};

  @media (max-width: 1750px) {
    padding-top: 10%;
    margin-left: 18%;
  }
  @media (max-width: 1024px) {
    padding-top: 10%;
    margin-left: 25%;
  }
  @media (max-width: 768px) {
    padding-top: 10%;
    margin-left: 33%;
  }
`;
export const DivisorButton = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;

  background-color: ${appColors.BACKGROUND_COLOR};

  @media (max-width: 1750px) {
    padding-top: 10%;
    margin-left: 18%;
  }
  @media (max-width: 1024px) {
    padding-top: 10%;
    margin-left: 25%;
  }
  @media (max-width: 768px) {
    padding-top: 10%;
    margin-left: 33%;
  }
`;

export default classes;
