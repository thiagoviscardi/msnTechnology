const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },
  dataContainer: {
    marginTop: 9,
    textAlign: 'center',
  },
  dataText: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: '#606367',
  },
  itensMenu: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#BBBDBF',
    width: 140,
  },
  imageSideBar: {
    width: 180,
    marginTop: 21,
    marginBottom: 21,
  },
  linkStyle: {
    textDecoration: 'none',
    color: '#BBBDBF',
  },
}));

export default useStyles;
