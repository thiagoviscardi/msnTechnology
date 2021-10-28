import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  name_schedule: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 400,
    color: '#505255',
  },
  name_unit: {
    fontSize: 12,
    color: '#8B8E93',
    marginTop: 5,
    paddingBottom: 20,
  },
  scheduled_by: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: 50,
  },
  scheduled_by_title: {
    fontSize: '12px',
    color: '#8B8E93',
    marginBottom: '8px',
  },
  scheduled_by_name: {
    fontSize: '12px',
    color: '#505255',
  },
  edited_by: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginLeft: 20,
  },
  edited_by_title: {
    fontSize: '12px',
    color: '#8B8E93',
    marginBottom: '8px',
  },
  edited_by_name: {
    fontSize: '12px',
    color: '#505255',
  },
  validade_button: {
    color: '#24B8EC',
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'unset',
    padding: 0,
    marginRight: 50,
  },
  toggle_shift: {
    color: '#5AC17F',
    fontSize: '14px',
    textTransform: 'unset',
    padding: 0,
    marginRight: 20,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  recuse_button: {
    color: 'red',
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'unset',
    padding: 0,
  },
  validated_status_recuse: {
    color: 'red',
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'unset',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  },
  at_sight_status: {
    color: 'green',
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'unset',
    padding: 0,
    marginLeft: 50,
    display: 'flex',
    alignItems: 'center',
  },
  validated_status_accepted: {
    color: '#24B8EC',
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'unset',
    padding: 0,
    marginRight: 50,
    display: 'flex',
    alignItems: 'center',
  },
  container_checkin_cards: {
    display: 'flex',
    width: '100%',
    height: 128,
    border: '1px solid #E9E9E9',
    borderRadius: '4px',
    padding: '1rem',
    marginRight: 30,
    justifyContent: 'space-between',
  },
  card_checkout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100px',
  },
  icon: {
    fontSize: 19,
  },
  button: {
    width: 140,
    height: '32px',
    backgroundColor: '#BBE9F9',
    textTransform: 'unset',
    color: '#0F83AD',
    fontSize: '12px',
  },
}));

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px;
  border-bottom: 1px solid #e9e9e9;
`;

export const ContainerCenter = styled.div`
  height: 300px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const ContainerBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 10px;
`;
