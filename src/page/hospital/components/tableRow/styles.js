import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  detailsTypes: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    marginBottom: 16,
    color: '#BBBDBF',
  },
  specialty: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#505255',
    marginBottom: 12,
    marginLeft: 12,
  },
  docsText: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#24B8EC',
  },
  column_actions: {
    flex: 1,
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textName: {
    height: '24px',
    width: '392px',
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#505255',
  },
  city_name: {
    color: ' #8B8E93',
    width: 160,
    '@media (min-width: 1920px)': {
      width: 560,
    },
  },
}));

export const LeftSideContainer = styled.div`
  display: flex;
  align-items: center;
  width: 530px;
  @media (max-width: 1920px) {
    width: 530px;
  }
  @media (max-width: 1750px) {
    width: 450px;
  }
  @media (max-width: 1440px) {
    width: 406px;
  }
  @media (max-width: 1366px) {
    width: 406px;
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 1920px) {
    width: 540px;
  }
  @media (max-width: 1440px) {
    width: 410px;
  }
  @media (max-width: 1366px) {
    width: 360px;
  }
`;

export const RightSideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82px;
  margin-left: 85px;
  @media (max-width: 1920px) {
    width: 82px;
    margin-left: 85px;
  }
  @media (max-width: 1440px) {
    width: 82px;
    margin-left: 45px;
  }
  @media (max-width: 1366px) {
    width: 82px;
    margin-left: 35px;
  }
`;

export const IdContainer = styled.div`
  width: 60px;
  margin-right: 25px;
  @media (max-width: 1920px) {
    width: 60px;
    margin-right: 25px;
  }
  @media (max-width: 1440px) {
    width: 50px;
    margin-right: 24px;
  }
  @media (max-width: 1366px) {
    width: 50px;
    margin-right: 15px;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: white;
  box-shadow: 0px 1px 2px rgba(80, 82, 85, 0.1);
  margin-top: 8px;
  border-radius: 4px;
  min-height: 56px;
  height: auto;
  margin-right: 80px;
  @media (max-width: 1920px) {
    margin-right: 80px;
  }
  @media (max-width: 1440px) {
    margin-right: 30px;
  }
  @media (max-width: 1366px) {
    margin-right: 20px;
  }
`;

export const NameContainer = styled.div`
  width: 400px;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 1920px) {
    width: 400px;
  }
  @media (max-width: 1440px) {
    width: 310px;
  }
  @media (max-width: 1366px) {
    width: 305px;
  }
`;

export const ProfContainer = styled.div`
  width: 280px;
  margin-right: 40px;
  @media (max-width: 1920px) {
    width: 280px;
    margin-right: 40px;
  }
  @media (max-width: 1440px) {
    width: 190px;
    margin-right: 20px;
  }
  @media (max-width: 1366px) {
    width: 180px;
    margin-right: 20px;
  }
`;
