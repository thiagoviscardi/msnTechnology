import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    background: '#FAFAFA',
    marginLeft: -24,
    marginRight: -24,
    margin: -7.8,
    minHeight: 100,
    boxShadow: '0px 1px 2px rgba(80, 82, 85, 0.1)',
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#BBBDBF',
  },
  tableCellStyle: {
    minHeight: 100,
  },
  scaleName: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#505255',
  },
  grayTextDetail: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#8B8E93',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    background: '#FAFAFA',
    paddingRight: 84,
    marginLeft: -24,
    marginRight: -24,
    margin: -7.8,
    marginBottom: -9.3,
  },
}));

export const ScaleNameContainer = styled.div`
  padding-left: 64px;
  width: 33%;
  margin-right: 21%;
  min-height: 100px;
  @media (max-width: 1920px) {
    padding-left: 64px;
    width: 33%;
    margin-right: 7%;
    min-height: 100px;
  }
  @media (max-width: 1750px) {
    padding-left: 64px;
    width: 27%;
    margin-right: 12%;
    min-height: 100px;
  }
  @media (max-width: 1440px) {
    padding-left: 64px;
    width: 33%;
    margin-right: 7%;
    min-height: 100px;
  }
  @media (max-width: 1366px) {
    padding-left: 64px;
    width: 33%;
    margin-right: 7%;
    min-height: 100px;
  }
`;

export const DateContainer = styled.div`
  width: 21%;
  margin-right: 3%;
  min-height: 100px;
  @media (max-width: 1920px) {
    width: 21%;
    margin-right: 3%;
    min-height: 100px;
  }
  @media (max-width: 1750px) {
    width: 19%;
    margin-right: 6%;
    min-height: 100px;
  }
  @media (max-width: 1440px) {
    width: 22%;
    margin-right: 3%;
    min-height: 100px;
  }
  @media (max-width: 1366px) {
    width: 23%;
    margin-right: 2%;
    min-height: 100px;
  }
`;

export const StatusContainer = styled.div`
  width: 10%;
  margin-right: 9%;
  min-height: 100px;
  @media (max-width: 1920px) {
    width: 10%;
    margin-right: 9%;
    min-height: 100px;
  }
  @media (max-width: 1750px) {
    width: 12%;
    margin-right: 7%;
    min-height: 100px;
  }
  @media (max-width: 1440px) {
    width: 12%;
    margin-right: 8%;
    min-height: 100px;
  }
  @media (max-width: 1366px) {
    width: 14%;
    margin-right: 6%;
    min-height: 100px;
  }
`;

export const PriceContainer = styled.div`
  width: 12%;
  min-height: 100px;
  @media (max-width: 1920px) {
    width: 12%;
    min-height: 100px;
  }
  @media (max-width: 1750px) {
    width: 12%;
    min-height: 100px;
  }
  @media (max-width: 1440px) {
    width: 12%;
    min-height: 100px;
  }
  @media (max-width: 1366px) {
    width: 1%;
    min-height: 100px;
  }
`;
