import appColors from 'utils/appColors';
import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    marginLeft: 22,
    backgroundColor: appColors.BACKGROUND_COLOR,
    paddingBottom: '2%',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  progressContainer: {
    flex: 1,
    textAlign: 'center',
    marginTop: 30,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: appColors.GRAY_TEXT_COLOR,
    fontSize: '18px',
    fontWeight: 400,
    textAlign: 'left',
    paddingBottom: '21px',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '3%',
  },
  closeButton: {
    marginRight: 24,
    borderColor: '#A2A5A8',
  },
  closeText: {
    fontSize: '12px',
    fontWeight: 400,
    textAlign: 'center',
    color: '#A2A5A8',
  },
  printButton: {
    background: appColors.SECUNDARY_COLOR,
    alignItems: 'center',
  },
  printText: {
    fontSize: '12px',
    fontWeight: 400,
    textAlign: 'center',
    color: '#DADADA',
  },
  columnContainer: {
    display: 'flex',
    flex: 1,
    minHeight: 650,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginTop: '10%',
  },
  messageContainer: {
    textAlign: 'center',
    width: '100%',
    marginTop: '7%',
  },
  emptyMessage: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#24B8EC',
  },
}));

export const ModalContainer = styled(Paper)`
  background-color: ${appColors.BACKGROUND_COLOR};
  padding: 24px;
  overflow-y: scroll;
  width: 1152px;
  height: 752px;
  @media (max-width: 1440px) {
    width: 775px;
    height: 600px;
  }
  @media (max-width: 1366px) {
    width: 775px;
    height: 600px;
  }
  @media (max-width: 1024px) {
    width: 900px;
  }
  @media (max-width: 768px) {
    width: 700px;
  }
`;
