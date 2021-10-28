const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles(() => ({
  unitContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
  },
  hospName: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    color: '#24B8EC',
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 70,
  },
  hospActions: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#A2A5A8',
  },
  nameContainer: { width: '100%', marginLeft: 30 },
}));

export default useStyles;
