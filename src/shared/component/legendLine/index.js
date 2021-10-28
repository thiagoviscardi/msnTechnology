import React from 'react';
import {
  StyledContentLegendChart,
  StyledLegendChart,
  StyledBallChart,
} from './styles';

const LegendLine = ({ color = '', legend = '', value = '' }) => {
  return (
    <StyledContentLegendChart>
      <StyledLegendChart>
        <StyledBallChart color={color} />
        {legend}
      </StyledLegendChart>
      {value}
    </StyledContentLegendChart>
  );
};

export default LegendLine;
