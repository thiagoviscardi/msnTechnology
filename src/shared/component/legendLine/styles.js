import styled from 'styled-components';

export const StyledContentLegendChart = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 10px;
`;

export const StyledLegendChart = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledBallChart = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 25px;
  background-color: ${(props) => props.color};
`;
