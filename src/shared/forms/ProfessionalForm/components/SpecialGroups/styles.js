import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 14px;
  margin-bottom: 7px;
  /* && ~ .MuiTypography-root {
    margin-top: 14px;
    margin-bottom: 14px;
  } */
`;

export const InputItem = styled.div`
  flex-grow: ${(props) => props.flexGrow || 1};
  margin: 3px 15px 0 0;
  min-width: 150px;
  flex: 1;
  align-content: stretch;
  flex-direction: column;
`;
