import { makeStyles } from '@material-ui/core';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: '17%',
    marginTop: '9%',
  },
  closeBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    background: '#F5F5F5',
    padding: 3,
    margin: 0,
  },
  statusTitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    marginBottom: 9,
  },
  filterButton: {
    background: '#24B8EC',
    marginLeft: 12,
    marginRight: 12,
    color: '#F5F5F5',
  },
  paperContainer: {
    position: 'absolute',
    left: 54,
    top: 21,
    backgroundColor: '#fafafa',
    borderRadius: 4,
    minWidth: 472,
    minHeight: 328,
  },
  rowPadding: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 12,
  },
  divPadding: {
    padding: '12px 12px 0px 12px',
  },
  iconStyles: {
    fontSize: 16,
    marginRight: 12,
    color: appColors.PRIMARY_COLOR,
  },
  titleStyles: {
    color: appColors.PRIMARY_COLOR,
    fontSize: 14,
    fontWeight: 500,
  },
  scrollContainer: {
    paddingLeft: 14,
    paddingTop: 9,
    height: 212,
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
  },
  dividerStyles: {
    height: 252,
    width: 0.5,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: '12px',
    fontFamily: 'Poppin',
  },
  clearAllText: {
    fontSize: '12px',
    fontFamily: 'Poppin',
    color: '#A2A5A8',
  },
  leftContainer: {
    width: 240,
    marginBottom: 12,
  },
}));
