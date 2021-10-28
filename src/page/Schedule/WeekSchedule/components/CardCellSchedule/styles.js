import { makeStyles, withStyles } from '@material-ui/styles';
import { Tooltip } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    maxWidth: '100%',
    marginRight: 5,
  },
  day_cell: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: '5px 3px 5px 10px',
    marginBottom: 10,
    height: 146,
  },
  div_controler: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    cursor: 'pointer',
  },
  name: {
    fontSize: 14,
    fontWeight: 400,
    color: '#505255',
    whiteSpace: 'wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '99%',
    maxHeight: 40,
  },
  specialty: {
    fontSize: 10,
    fontWeight: 400,
    color: '#A2A5A8',
    whiteSpace: 'wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '99%',
    maxHeight: 40,
  },
  status: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
  },
  value: {
    fontSize: 10,
    fontWeight: 400,
    color: '#A2A5A8',
  },
  validatedShift: {
    fontSize: 10,
    fontWeight: 400,
    textTransform: 'unset',
    paddingTop: 3,
    display: 'flex',
    alignItems: 'center',
    color: '#24B8EC',
  },
  icon: {
    fontSize: 17,
    marginRight: 2,
  },
  atSightIcon: {
    fontSize: 19,
    color: 'green',
  },
  atSightIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  assignmentIcon: {
    color: '#A2A5A8',
    marginRight: 3,
  },
  signatureContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export const LightTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'white',
    color: '#24B8EC',
    border: '1px solid #C0C0C0',
    padding: 3,
    fontSize: 14,
  },
}))(Tooltip);
