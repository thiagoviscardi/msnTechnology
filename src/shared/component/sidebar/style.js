const { makeStyles } = require('@material-ui/core');

const drawerWidth = 260;

export const useStyles = makeStyles((theme) => ({
  sideImage: {
    textAlign: 'center',
    marginTop: 16,
  },
  iconSideContainer: {
    position: 'absolute',
    display: 'flex',
    overflow: 'inherit',
  },
  title: {
    marginLeft: 21,
  },
  drawerPaper: {
    whiteSpace: 'wrap',
    overflow: 'inherit',
    width: 260,
    paddingRight: 11,
    maxHeight: '100vh',
    overflowY: 'scroll',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&::-webkit-scrollbar': {
      width: '1px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    '&::-webkit-scrollbar': {
      width: '1px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  // drawerPaperClose: {
  //   overflowX: 'hidden',
  //   transition: theme.transitions.create('width', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   width: theme.spacing(8),
  //   [theme.breakpoints.up('sm')]: {
  //     width: theme.spacing(9),
  //   },
  // },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'inherit',
    flexDirection: 'column',
  },
  profile: {
    marginLeft: 8,
    marginBottom: 30,
    marginTop: 0,
    display: 'flex',
    flexDirection: 'horizontal',
    alignItems: 'center',
  },
  imageSideBar: {
    width: 117,
  },
}));
