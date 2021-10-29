import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rootz: {
    display: 'flex',
    justifyContent: 'space-between',
  },
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
    width: '100%',
    background: '#F5F5F5',
  },
  textModal: {
    fontFamily: 'Open Sans',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'left',
    paddingLeft: '32px',
  },
  subTitleModal: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    paddingLeft: '32px',
    marginBottom: 8,
    width: 368,
    height: 24,
    color: '#8B8E93',
  },
  buttonClear: {
    height: '32px',
    width: '104px',
    borderRadius: '4px',
    color: '#A2A5A8',
    border: ' 1px solid #A2A5A8',
    textTransform: 'none',
    marginRight: 24,
  },
  buttonAdd: {
    height: '32px',
    width: '200px',
    borderRadius: '4px',
    backgroundColor: '#0F83AD',
    color: 'white',
    textTransform: 'none',
    marginBottom: 10,
  },
  container: {
    textAlign: 'flex-start',
    marginTop: 90,
    marginLeft: '40%',
    marginRight: '30%',
  },
  scrollContainer: {
    maxHeight: 170,
    overflowY: 'scroll',
    marginTop: 12,
    marginBottom: 12,
  },
  loadingContainer: {
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
}));

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 1441px) {
    display: flex;
    margin-right: 15px;
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 1440px) {
    max-width: 1128px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 1366px) {
    max-width: 1058px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 1024px) {
    max-width: 728px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 768px) {
    max-width: 498px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const ModalContainer = styled(Paper)`
  background-color: #fafafa;
  border-radius: 10px;
  width: 456px;
  min-height: 568px;
  margin-left: 64%;
  margin-top: 7%;
  padding-top: 24px;
  padding-right: 29px;

  @media (max-width: 1756px) {
    margin-left: 5%;
    margin-top: 2%;
  }
  @media (max-width: 1024px) {
    margin-left: 14%;
    margin-top: 9%;
  }
  @media (max-width: 768px) {
    margin-left: 24%;
    margin-top: 12%;
    width: 473px;
  }
`;
