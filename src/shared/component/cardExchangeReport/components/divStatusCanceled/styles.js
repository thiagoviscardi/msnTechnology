import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  hlCancel: {
    borderLeft: '2px solid #EB0000',
    position: 'absolute',
    height: '29px',
    marginLeft: '53px',
    marginTop: '45px',
    transform: 'rotate(90deg)',
  },
  isCanceled: {
    borderLeft: '2px solid  #F79999',
    height: 53,
    position: 'absolute',
    marginLeft: '30px',
    marginTop: -95,
  },
  avatarCancel: {
    width: '52px',
    height: '52px',
    border: '2px solid #F79999',
  },
  statusCancel: {
    width: '104px',
    height: '32px',
    borderRadius: '5px',
    fontSize: '12px',
    border: '2px solid #EB0000 ',
    color: ' #EB0000',
    marginLeft: '28px',
    textAlign: 'center',
  },
  iconCancel: {
    position: 'absolute',
    marginLeft: 20,
    marginTop: 49,
    color: '#EB0000',
  },
}));
