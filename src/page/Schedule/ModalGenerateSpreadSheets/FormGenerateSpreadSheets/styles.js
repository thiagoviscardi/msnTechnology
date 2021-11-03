import styled from 'styled-components';
import appColors from 'utils/appColors';

export const ContainerFormModal = styled.div`
  margin-top: 25px;
`;

export const Legend = styled.div`
  //styleName: Buttons Desktop / BTN3;
  font-family: 'Open Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.01em;
  text-align: left;

  color: ${appColors.CIRURGICAL};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  margin-bottom: 0px;
`;

export const InputItem = styled.div`
  flex: 1;
  flex-grow: ${(props) => props.flexGrow || 1};
  min-width: 150px;
`;
