const { makeStyles } = require('@material-ui/core');

const drawerWidth = 255;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    boxShadow: '0px 0px',
    backgroud: '#F5F5F5',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    marginTop: 40,
  },
  iconSideContainer: {
    position: 'absolute',
    display: 'flex',
    overflow: 'inherit',
  },
  container_button_open: {
    display: 'flex',
    justifyContent: 'center',
    width: 30,
  },
  container_image: { display: 'flex', width: '100%', justifyContent: 'center' },
  sideImage: {
    textAlign: 'center',
  },
  imageSideBar: {
    width: 106.3,
    height: 106.3,
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    margin: '15px 5px',
  },

  title: {
    marginLeft: 21,
  },
  drawerPaper: {
    whiteSpace: 'wrap',
    overflow: 'inherit',
    width: 256,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'inherit',
    flexDirection: 'column',
  },
}));
