/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledButton = styled(Button)`
  && {
    background-color: #3bbcd4;
    color: #fff;
    &:hover {
      background-color: #319db1;
    }
  }
`;

const CustomButton = ({ label, onClick, isLoading = false, ...rest }) => (
  <StyledButton
    {...rest}
    color="primary"
    variant="text"
    onClick={onClick}
    disabled={isLoading}
  >
    {!isLoading ? label : <CircularProgress size={25} />}
  </StyledButton>
);

CustomButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

CustomButton.defaultProps = {
  label: 'Label',
  onClick: () => {},
};

export default CustomButton;
