import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  // modal
  boxModal: {
    width: 550,
  },

  modal_header: {
    padding: '5px 25px',
    paddingRight: 5,
  },

  modal_title: {
    fontSize: 18,
    lineHeight: '24px',
    color: '#505255',
  },

  modal_content: {
    padding: '10px 30px 25px',
  },

  input: {
    marginTop: 30,
  },

  status_field: {
    marginTop: 30,
  },

  button_outlined: {
    marginRight: 20,
    border: '1px solid #A2A5A8',
    color: '#A2A5A8',
    textTransform: 'capitalize',
  },

  button_contained: {
    width: 120,
    backgroundColor: '#0F83AD',
    color: 'white',
    textTransform: 'capitalize',
    boxShadow: 'none',
  },

  buttons: {
    marginTop: 32,
  },
  buttonRegister: {
    height: '32px',
    width: '152px',
    borderRadius: '4px',
    backgroundColor: '#0F83AD',
    color: 'white',
    textTransform: 'none',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    '&:hover': {
      border: ' 1px solid #0F83AD',
      color: '#0F83AD',
    },
  },
}));
