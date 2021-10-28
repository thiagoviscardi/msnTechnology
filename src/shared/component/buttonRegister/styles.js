import { makeStyles } from '@material-ui/core';

const styles = makeStyles(() => ({
  rootButton: {
    display: 'flex',
    justifyContent: 'center',
    width: '152px',
    height: '32px',
    borderRadius: '4px',
    background: '#0F83AD',
    marginTop: 32,
    marginRight: 88,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    color: 'white',
    textAlign: 'center',
  },
}));
export default styles;
