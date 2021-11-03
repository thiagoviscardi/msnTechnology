import { makeStyles, IconButton } from '@material-ui/core';
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
  docStyle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: 54,
  },
  moreDocsContainer: {
    background: '#24B8EC',
    marginTop: 27,
    marginBottom: 12,
  },
  moreDocsText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
}));

export const LeftSideContainer = styled.div`
  display: flex;
  align-items: center;
  width: 509px;
  @media (max-width: 1920px) {
    width: 509px;
  }
  @media (max-width: 1440px) {
    width: 316px;
  }
  @media (max-width: 1366px) {
    width: 296px;
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 520px;
  @media (max-width: 1920px) {
    width: 520px;
  }
  @media (max-width: 1440px) {
    width: 410px;
  }
  @media (max-width: 1366px) {
    width: 400px;
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
  width: 100px;
  margin-right: 25px;
  @media (max-width: 1920px) {
    width: 100px;
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
  width: 224px;
  margin-right: 40px;
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

export const DetailsContainer = styled.div`
  background: #fafafa;
  min-height: 184px;
  max-height: 184px;
  margin-bottom: 16px;
  padding-top: 24px;
  padding-left: 129px;
  padding-right: 16px;
  overflow-y: auto;
  @media (max-width: 1920px) {
    margin-right: 80px;
    padding-left: 129px;
  }
  @media (max-width: 1440px) {
    margin-right: 30px;
    padding-left: 78px;
  }
  @media (max-width: 1366px) {
    margin-right: 20px;
    padding-left: 68px;
  }
`;

export const DocsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 12px;
  padding-left: 87px;
  width: 930px;
  @media (max-width: 1920px) {
    width: 930px;
    padding-left: 87px;
  }
  @media (max-width: 1440px) {
    width: 750px;
    padding-left: 40px;
  }
  @media (max-width: 1366px) {
    width: 730px;
    padding-left: 33px;
  }
`;

export const DocTitleContainer = styled.div`
  padding-left: 87px;
  @media (max-width: 1920px) {
    padding-left: 87px;
  }
  @media (max-width: 1440px) {
    padding-left: 40px;
  }
  @media (max-width: 1366px) {
    padding-left: 33px;
  }
`;
