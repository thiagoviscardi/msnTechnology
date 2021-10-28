import React, { useCallback, useRef } from 'react';
import { InputBase, IconButton, Divider, Icon } from '@material-ui/core';
import styled from 'styled-components';
import { icons } from 'asset';

const StyledIconButton = styled(IconButton)`
  && {
    padding: 6px;
  }
`;

const SearchInputDebounce = ({
  dividerOn,
  value,
  style,
  field,
  onChange,
  placeholder,
  handleCloseModal,
  height = 40,
  ...rest
}) => {
  const [search, setSearch] = React.useState(value ? value : '');
  const searchRef = useRef('');

  const handleSearchChange = useCallback((e) => {
    e.preventDefault();
    setSearch(e.target.value);
    searchRef.current = e.target.value;
  });

  const handleClearInput = useCallback((e) => {
    e.preventDefault();
    if (searchRef?.current) {
      setSearch('');
      searchRef.current = '';
      onChange('');
    }
    if (handleCloseModal) {
      setTimeout(() => {
        handleCloseModal();
      }, 500);
    }
  });

  let _timer,
    _timeOut = 500;

  const handleKeyUp = useCallback((e) => {
    clearTimeout(_timer);
    if (e.keyCode == 13) {
      // close on ENTER key
      onChange(searchRef.current);
    } else {
      // send api requests
      _timer = window.setTimeout(function () {
        onChange(searchRef?.current);
      }, _timeOut);
    }
  }, []);

  return (
    <div
      {...rest}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height,
      }}
    >
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
      <InputBase
        data-cy="search"
        ref={searchRef}
        style={style}
        value={search}
        onKeyUp={handleKeyUp}
        onChange={handleSearchChange}
        id="myInput"
        // {...rest}
        {...field}
        placeholder={placeholder}
      />
      {dividerOn && <Divider style={{ backgroundColor: '#24B8EC' }} />}

      <IconButton style={{ padding: 5 }} onClick={handleClearInput}>
        <Icon style={{ fontSize: 20 }}>close</Icon>
      </IconButton>
    </div>
  );
};

export default SearchInputDebounce;
