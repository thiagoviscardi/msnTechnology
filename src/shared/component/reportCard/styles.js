import appColors from 'utils/appColors';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  title: {
    fontSize: 14,
    color: appColors.GRAY_TEXT_COLOR,
  },
  qtdText: {
    fontSize: 36,
    color: appColors.GRAY_TEXT_COLOR,
  },
}));

export const ContainerCard = styled(Paper)`
  height: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  border-radius: 10px;
`;
