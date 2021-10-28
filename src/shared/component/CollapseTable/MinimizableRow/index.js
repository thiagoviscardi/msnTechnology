import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Box, Collapse } from '@material-ui/core';
import { useStyles } from './styles';
import ActionsButtons from '../ActionsButtons';
import ActionsButtonsScales from '../ActionsButtonsScales';

const MinimizableRow = ({
  permissions,
  type,
  handleAccept,
  handleBlock,
  openByProps = false,
  row,
  columns = [],
  componentMinimizable = <></>,
  colSpan = columns?.length + 1,
  seletedRow,
  origin,
  redirectTo = '',
  showActionsButtons = true,
  defaultButtons = false,
  maxWidth = 60,
  setOpenAlert = () => {},
  setSelectedRow = () => {},
  onExpandRow = () => {},
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleChangeId = (id) => {
    if (id === seletedRow?.id) {
      setOpen(!open);
      onExpandRow(row, !open);
    } else {
      setOpen(true);
      onExpandRow(row, true);
    }

    setSelectedRow(row);
  };

  function fetchFromObject(obj, prop) {
    if (typeof obj === 'undefined') {
      return '...';
    }
    const _index = prop.indexOf('.');
    if (_index > -1) {
      return fetchFromObject(
        obj[prop.substring(0, _index)],
        prop.substr(_index + 1)
      );
    }

    return obj[prop];
  }

  const getValueField = (valueRow, rowData, idColumn) => {
    if (valueRow) return valueRow;

    try {
      const propertyField = fetchFromObject(rowData, idColumn);
      return propertyField;
    } catch {
      return '...';
    }
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.id}
        className={classes.root}
      >
        <>
          {columns.map((column) => {
            if (column?.render) {
              return column.render(row);
            }
            const value = getValueField(row[column.id], row, column.id);
            return (
              <TableCell key={column.id} align={column.align}>
                {column?.format && value ? column.format(value) : value}
              </TableCell>
            );
          })}
        </>
        {showActionsButtons && (
          <>
            {origin === 'REQUEST' ||
            origin === 'NOTIFICATIONS' ||
            origin === 'SUPPORT' ? (
              <ActionsButtons
                permissions={permissions}
                rowData={row}
                type={type}
                handleAccept={handleAccept}
                handleBlock={handleBlock}
                setOpenAlert={setOpenAlert}
                redirectTo={redirectTo}
                setSelectedRow={setSelectedRow}
                handleChangeId={handleChangeId}
                open={open}
                seletedRow={seletedRow}
                row={row}
                defaultButtons={defaultButtons}
                origin={origin}
                maxWidth={maxWidth}
              />
            ) : (
              <ActionsButtonsScales
                permissions={permissions}
                rowData={row}
                setOpenAlert={setOpenAlert}
                redirectTo={redirectTo}
                setSelectedRow={setSelectedRow}
                handleChangeId={handleChangeId}
                open={open}
                seletedRow={seletedRow}
                row={row}
              />
            )}
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={colSpan}
        >
          <Collapse
            in={(open || openByProps) && seletedRow.id === row.id}
            timeout="auto"
            unmountOnExit
          >
            <Box margin={1}>{componentMinimizable(row)}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default MinimizableRow;
