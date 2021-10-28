import {
  CircularProgress,
  Paper,
  GridList,
  GridListTile,
} from '@material-ui/core';
import React, { useRef } from 'react';
import ControlledPagination from 'shared/component/ControledPagination';
import appColors from 'utils/appColors';
import useStyles from './styles';
import useWindowSize from 'hook/windowSize';

const DefaultCardTable = ({
  renderItem = null,
  dataList = [],
  loading = true,
  deleteLoading = false,
  totalList = 0,
  page = 1,
  perPage = 12,
  handleChangePage = () => {},
  cellHeight = 'auto',
  nCols = 3,
  spacing = 40,
}) => {
  const classes = useStyles();
  const gridRef = useRef(null);
  const size = useWindowSize();

  const getNCols = () => {
    if (size.width > 1600) {
      return nCols;
    } else if (size.width >= 1150) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <Paper elevation={0} className={classes.root}>
      {loading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress
            size={90}
            style={{
              color: appColors.PRIMARY_COLOR,
            }}
          />
        </div>
      ) : (
        <GridList
          ref={gridRef}
          className={classes.cardsControl}
          cellHeight={cellHeight}
          cols={getNCols()}
          spacing={spacing}
        >
          {dataList?.map((tile, i) => (
            <GridListTile key={String(i)}>
              {renderItem({ item: tile })}
            </GridListTile>
          ))}
        </GridList>
      )}
      <div className={classes.pagination_control}>
        <ControlledPagination
          total={totalList}
          page={page}
          perPage={perPage}
          loading={deleteLoading}
          onChange={handleChangePage}
        />
      </div>
    </Paper>
  );
};

export default DefaultCardTable;
