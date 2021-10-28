import React from 'react';
import { InputBase, IconButton, Divider } from '@material-ui/core';
import styled from 'styled-components';
import { icons } from 'asset';

const StyledIconButton = styled(IconButton)`
  && {
    padding: 0px;
  }
`;

const SearchInput = ({ dividerOn, style, field, placeholder, ...rest }) => (
  <div {...rest} style={{ flex: 1 }}>
    <StyledIconButton type="submit">
      <img
        style={{
          filter:
            'invert(61%) sepia(84%) saturate(2014%) hue-rotate(160deg) brightness(100%) contrast(86%)',
        }}
        alt="search-icon"
        src={icons.search}
      />
    </StyledIconButton>
    <InputBase style={style} {...rest} {...field} placeholder={placeholder} />
    {dividerOn && (
      <Divider
        style={{ height: 2, maxWidth: '90%', backgroundColor: '#24B8EC' }}
      />
    )}
  </div>
);

export default SearchInput;
