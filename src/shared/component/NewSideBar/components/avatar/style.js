const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Poppins',
    marginLeft: 12,
    marginRight: 10,
    fontSize: 15,
    color: '#505255',
  },

  small: {
    width: 32,
    height: 32,
    marginLeft: 10,
    border: '0.5px solid #BBBDBF',
  },
}));

export default useStyles;
