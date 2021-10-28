import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles';

function SearchBar() {
  const classes = styles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
      // placeholder="Search…"
      // inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
}

export default SearchBar;
