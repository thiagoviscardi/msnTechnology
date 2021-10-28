import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 25px;
  display: flex;
`;

export const TableLegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-right: 15px;

  div {
    background: ${({ color }) => color};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 8px;
    content: '';
  }
`;
