import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  title: {
    fontSize: 16,
    fontWeight: 400,
    color: '#8B8E93',
    textAlign: 'left',
    marginBottom: 16,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowContainer2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  data: {
    marginLeft: 18,
  },
  vlCancel: {
    borderLeft: '2px solid #F79999',
    position: 'absolute',
    height: '52px',
    marginLeft: '30px',
  },
  vlComfirm: {
    borderLeft: '2px solid  #BBE9F9',
    height: '54px',
    position: 'absolute',
    marginLeft: '30px',
  },
  vlWaiting: {
    borderLeft: '2px solid #BBBDBF',
    position: 'absolute',
    height: '55px',
    marginLeft: '30px',
  },
  hlComfirm: {
    borderLeft: '2px solid #24B8EC',
    position: 'absolute',
    height: '36px',
    marginLeft: '50px',
    marginTop: '38px',
    transform: 'rotate(90deg)',
  },
  hlCancel: {
    borderLeft: '2px solid #EB0000',
    position: 'absolute',
    height: '29px',
    marginLeft: '53px',
    marginTop: '45px',
    transform: 'rotate(90deg)',
  },
  hlWaiting: {
    borderLeft: '2px solid #787B80',
    position: 'absolute',
    height: '28px',
    marginLeft: '44px',
    marginTop: 45,
    transform: 'rotate(90deg)',
  },

  ballWaiting: {
    borderRadius: '50% ',
    position: 'absolute',
    height: '6px',
    width: '6px',
    border: '1px solid   #787B80',
    backgroundColor: ' #787B80',
    marginLeft: 28,
    marginTop: '2.65%',
  },
  ballComfirm: {
    borderRadius: '50% ',
    position: 'absolute',
    height: '6px',
    width: '6px',
    border: '1px solid  #24B8EC',
    backgroundColor: ' #24B8EC',
    marginLeft: 28,
    marginTop: '2.8%',
  },
  status: {
    display: ' flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  specialty: {
    fontSize: '12px',
    width: '128px',
    height: '16px',
    color: '#8B8E93',
    marginBottom: 8,
  },
  schedule: {
    fontSize: '12px',
    width: 90,
    height: '16px',
    color: '#8B8E93',
  },
  avatarCancel: {
    width: '52px',
    height: '52px',
    border: '2px solid #F79999',
  },
  avatarConfirm: {
    width: '52px',
    height: '52px',
    border: '2px solid #BBE9F9',
  },
  avatarWaiting: {
    width: '52px',
    height: '52px',
    border: '2px solid #787B80',
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
  statusConfirm: {
    width: '104px',
    height: '32px',
    borderRadius: '5px',
    fontSize: '12px',
    border: '2px solid #24B8EC ',
    color: ' #24B8EC',
    textAlign: 'center',
    marginLeft: '28px',
  },
  statusWaiting: {
    width: '132px',
    height: '32px',
    borderRadius: '5px',
    fontSize: '12px',
    border: '2px solid #787B80 ',
    color: ' #787B80',
    textAlign: 'center',
    marginLeft: '40px',
  },
  iconCancel: {
    position: 'absolute',
    marginLeft: 20,
    marginTop: 49,
    color: '#EB0000',
  },
  iconComfirm: {
    position: 'absolute',
    marginLeft: 26,
    marginTop: 50,
    fontSize: 10,
    color: '#24B8EC',
  },
  iconWaiting: {
    position: 'absolute',
    marginLeft: 26,
    marginTop: 53,
    fontSize: 10,
    color: '#787B80',
  },
  titleType: {
    fontSize: 12,
    margin: 5,
  },
}));
