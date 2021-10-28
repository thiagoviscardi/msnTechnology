import appColors from 'utils/appColors';
const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles(() => ({
  headerContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom: 24,
    marginLeft: 60,
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  header_min: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom: 24,
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: '36px',
    marginLeft: 10,
    color: appColors.GRAY_TEXT_COLOR,
  },
}));

export default useStyles;
