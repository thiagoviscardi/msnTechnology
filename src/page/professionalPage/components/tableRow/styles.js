import { makeStyles, IconButton } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  textColor: {
    height: '24px',
    width: '160px',
    fontFamily: 'Open Sans',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#8B8E93',
  },

  textAtuation: {
    height: '24px',
    width: '224px',
    fontFamily: 'Open Sans',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#8B8E93',
  },
  textName: {
    height: '24px',
    width: '224px',
    fontFamily: 'Open Sans',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#505255',
  },
  status_text: {
    fontSize: 16,
    color: '#24B8EC',
    margin: '0 15px',
  },

  status_inactive: {
    fontSize: 16,
    color: '#A2A5A8',
    marginLeft: 10,
  },
  status_view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#ccc',
  },
}));

export const LeftSideContainer = styled.div`
  display: flex;
  align-items: center;
  width: 385px;
  @media (max-width: 1920px) {
    width: 378px;
  }
  @media (max-width: 1440px) {
    width: 330px;
  }
  @media (max-width: 1366px) {
    width: 325px;
  }
`;

export const CenterContainer = styled.div`
  width: 235px;
  @media (max-width: 1920px) {
    width: 255px;
  }
  @media (max-width: 1440px) {
    width: 160px;
  }
  @media (max-width: 1366px) {
    width: 125px;
  }
`;

export const RightSideContainer = styled.div`
  width: 290px;
  @media (max-width: 1920px) {
    width: 309px;
  }
  @media (max-width: 1440px) {
    width: 190px;
  }
  @media (max-width: 1366px) {
    width: 180px;
  }
`;

export const FinalContainer = styled.div`
  width: 208px;
  @media (max-width: 1920px) {
    width: 210px;
  }
  @media (max-width: 1440px) {
    width: 330px;
  }
  @media (max-width: 1366px) {
    width: 130px;
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
    width: 39px;
    margin-right: 24px;
  }
  @media (max-width: 1366px) {
    width: 39px;
    margin-right: 15px;
  }
`;

export const ContainerStatus = styled.div`
  width: 170px;
  margin-right: 40px;
  @media (max-width: 1920px) {
    width: 170px;
    margin-right: 40px;
  }
  @media (max-width: 1440px) {
    width: 210px;
    margin-right: 0px;
  }
  @media (max-width: 1366px) {
    width: 80px;
  }
`;

export const ContainerActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 126px;
  margin-right: 40px;
  @media (max-width: 1920px) {
    width: 126px;
  }
  @media (max-width: 1440px) {
    width: 210px;
    margin-right: 0px;
  }
  @media (max-width: 1366px) {
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
`;

export const NameContainer = styled.div`
  width: 309px;
  @media (max-width: 1920px) {
    width: 309px;
  }
  @media (max-width: 1440px) {
    width: 215px;
  }
  @media (max-width: 1366px) {
    width: 210px;
  }
`;

export const ProfContainer = styled.div`
  @media (max-width: 1920px) {
    width: 224px;
    margin-right: 40px;
  }
  @media (max-width: 1440px) {
    width: 210px;
    margin-right: 0px;
  }
  @media (max-width: 1366px) {
    width: 200px;
  }
`;
export const ImageContainer = styled.div``;

export const DetailsButton = styled(IconButton)`
  margin-left: 64px;
  @media (max-width: 1920px) {
    margin-left: 64px;
  }
  @media (max-width: 1440px) {
    margin-left: 44px;
  }
  @media (max-width: 1366px) {
    margin-left: 44px;
  }
`;
