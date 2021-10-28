import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  main_container: {
    padding: '10px 0',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  top_container: {
    height: 200,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom_container: {
    height: 230,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    marginTop: 10,
    width: 80,
    height: 80,
    borderColor: '#24B8EC',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  link_to_schedule: {
    textDecoration: 'none',
    width: '144px',
    color: '#24B8EC',
    fontSize: '12px',
    borderBottom: '1px solid #E9E9E9',
    paddingBottom: '.5rem',
  },
  previst_hour: {
    fontSize: '10px',
    fontWeight: '400',
    color: '#A2A5A8',
  },
  date_schedule: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#505255',
  },
  title_value: {
    fontSize: '10px',
    fontWeight: '400',
    color: '#A2A5A8',
    marginTop: '24px',
  },
  value: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#505255',
  },
  button: {
    color: '#24B8EC',
    textTransform: 'capitalize',
    width: '136px',
    height: '32px',
    border: '1px solid #24B8EC',
    fontSize: '12px',
  },
}));

export const ContainerModal = styled.div``;

export const SituationContainer = styled.div`
  margin-top: 5px;
`;
