import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    backgroundColor: appColors.BACKGROUND_COLOR,
    maxHeight: 250,
    overflowY: 'auto',
  },
  scrollContainer: {
    maxHeight: 250,
    overflowY: 'auto',
  },
  loadingContainer: {
    textAlign: 'center',
    margin: 5,
  },
}));

export const StyledList = styled(List)`
  width: 100%;
  background-color: ${appColors.BACKGROUND_COLOR};
  max-height: 250px;
  overflow-y: auto;
  ::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  ::-webkit-scrollbar {
    width: 5px;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: #a2a5a8;
    border-radius: 10px;
  }
  .MuiListItemIcon-root {
    color: rgba(0, 0, 0, 0.54);
    display: inline-flex;
    min-width: 20px;
    flex-shrink: 0;
  }
`;

export const InputContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  margin: 15px 0;
`;

export const ChipsContainer = styled.div`
  min-height: 50px;
  height: auto;
  display: flow-root;
  justify-content: space-between;
  background: ${appColors.BACKGROUND_COLOR};
  border-radius: 10px;
  max-width: 100%;
  margin-botton: 15px;
  margin-top: 5px;
  border: solid #24b8ec 1px;
`;
