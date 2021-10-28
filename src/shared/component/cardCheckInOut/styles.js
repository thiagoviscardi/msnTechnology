import { makeStyles } from '@material-ui/core';

export default makeStyles({
  container: {
    backgroundColor: 'white',
    position: 'relative',
    display: 'flex',
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
    flex: 1,
    minHeight: 120,
  },
  imgContainer: {
    display: 'flex',
    width: 95,
    height: 95,
  },
  userImage: {
    width: '56px',
    height: '56px',
    margin: '16px 0px 16px 16px',
  },
  infoContainer: {
    flexWrap: 'wrap',
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  dateRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    maxWidth: 270,
    width: '100%',
  },
  green: {
    color: '#008A00',
  },
  orange: {
    color: 'orange',
  },
  red: {
    color: 'red',
  },
  circleContainer: {
    marginLeft: 20,
    minWidth: 96,
    minHeight: 96,
    maxWidth: 96,
    maxHeight: 96,
    color: '#24B8EC',
    borderColor: '#24B8EC',
    marginTop: 15,
    marginRight: 40,
  },
  textWorkHour: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    color: '#24B8EC',
  },
  progressText: {
    textAlign: 'center',
    color: '#24B8EC',
    fontSize: 18,
  },
  textStatus: {
    textAlign: 'center',
    color: '#24B8EC',
    fontSize: 12,
    maxWidth: 50,
  },
  blueColor: {
    color: '#24B8EC',
    fontSize: 17,
    marginRight: 5,
    marginLeft: 2,
  },
  upIcon: {
    position: 'relative',
    bottom: 2,
    fontSize: 10,
  },
});
