import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sub_container: {
    width: '360px',
    height: 'auto',
    padding: 20,
    background: '#FFFFFF',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: '118px',
    height: '118px',
    marginBottom: '19px',
    color: 'green',
  },
  button: {
    background: '#0F83AD',
    width: '136px',
    height: '32px',
    fontSize: '12px',
    borderRadius: '4px',
    color: '#ffffff',
    textTransform: 'unset',
    marginTop: '32px',
  },
  title: {
    font: 'Open Sans',
    size: 18,
    marginBottom: 8,
    color: '#505255',
    fontWeight: 400,
  },
  sub_title: {
    font: 'Open Sans',
    size: 12,
    marginBottom: 8,
    color: '#505255',
    fontWeight: 400,
    textAlign: 'center',
  },
}));
