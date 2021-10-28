import { InputLabel } from '@material-ui/core';
import Select from 'react-select';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  margin: 18px;
  width: 358px;
  max-width: 100%;
  @media (max-width: 1920px) {
    width: 358px;
    margin: 12px;
  }
  @media (max-width: 1440px) {
    width: 555px;
    margin: 16px;
  }
  @media (max-width: 1366px) {
    width: 520px;
    margin: 14px;
  }
  @media (max-width: 1024px) {
    width: 350px;
    margin: 12px;
  }
  @media (max-width: 768px) {
    width: 226px;
    margin: 12px;
  }
`;
export const StyledInputLabel = styled(InputLabel)`
  && {
    position: absolute;
    top: 1px;
    left: 10px;
    transform: translateY(-50%);
    background: #ededed;
    font-size: 12px;
  }
`;
// export const StyledSelect = styled(Select)`
//   && {
//     & > div {
//       min-height: 20px;
//     }
//   }
// `;

export const StyledDiv = styled('div')`
  && {
    position: relative;
  }
`;
