import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
  //   grow: {
  //     flexGrow: 1,
  //   },
  search: {
    position: 'relative',
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default styles;
