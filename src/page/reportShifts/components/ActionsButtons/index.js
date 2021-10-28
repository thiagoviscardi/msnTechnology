import React from 'react';
import { IconButton, Tooltip, TableCell } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const ActionsButtons = ({
  handleDetailsPage,
  seletedRow,
  row,
  setSelectedRow,
  openByProps,
  setOpenByProps,
  detailRequest,
}) => {
  const handleChangeArrow = () => {
    handleDetailsPage();
    handleChangeId(row.id);
    detailRequest(row.id);
  };

  const handleChangeId = (id) => {
    if (id === seletedRow.id) {
      setOpenByProps(!openByProps);
    } else {
      setOpenByProps(true);
    }
    setSelectedRow(row);
  };

  return (
    <TableCell>
      <Tooltip title="Expandir">
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={handleChangeArrow}
        >
          {openByProps && seletedRow.id === row.id ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </IconButton>
      </Tooltip>
    </TableCell>
  );
};

export default ActionsButtons;
