import styled from 'styled-components';

export const ContainerFormModal = styled.div`
  margin-top: 50px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 7px;
`;

export const InputItem = styled.div`
  flex: 1;
  flex-grow: ${(props) => props.flexGrow || 1};
  min-width: 150px;
`;
