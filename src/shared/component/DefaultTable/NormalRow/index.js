import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ActionsButtons from '../ActionsButtons';

export default function NormalRow({
  permissions = {},
  row = [],
  columns = [],
  redirectTo = '/inicio',
  showExportButton = true,
  handleOpenModal = null,
  showActions = true,
  setOpenAlert = () => {},
  setSelectedRow = () => {},
}) {
  function fetchFromObject(obj, prop) {
    if (typeof obj === 'undefined') {
      return '...';
    }

    var _index = prop.indexOf('.');
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
    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
      <>
        {columns.map((column, index) => {
          if (column?.render) {
            return column.render(row, index);
          }
          const value = getValueField(row[column.id], row, column.id);
          return (
            <TableCell key={column.id} align={column.align}>
              {column.format && typeof value === 'number'
                ? column.format(value)
                : value}
            </TableCell>
          );
        })}
      </>
      {showActions && (
        <ActionsButtons
          permissions={permissions}
          rowData={row}
          onClick={() => {}}
          handleOpenModal={handleOpenModal}
          setOpenAlert={setOpenAlert}
          redirectTo={redirectTo}
          setSelectedRow={setSelectedRow}
          showExportButton={showExportButton}
        />
      )}
    </TableRow>
  );
}
