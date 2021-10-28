import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { IconButton, Tooltip, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import HasPermission from 'utils/checkPermission';

const ActionsButtonsScales = ({
  permissions,
  rowData,
  setOpenAlert,
  redirectTo,
  setSelectedRow,
  handleChangeId,
  open,
  seletedRow,
  row,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleDeleteClick = () => {
    setSelectedRow(rowData);
    setOpenAlert(true);
  };

  const handleRedirect = () => {
    history.push(`${redirectTo}/${rowData?.id}`);
  };

  const hasUpdatePermission = HasPermission(permissions.update);
  const hasDeletePermission = HasPermission(permissions.delete);
  const hasReadPermission = HasPermission(permissions.read);

  return (
    <TableCell>
      <div className={classes.container_buttons}>
        <Grid className={classes.textTable}></Grid>
        <Tooltip
          title={hasUpdatePermission ? 'Editar' : 'Você não tem permissão'}
        >
          <IconButton
            className={classes.button}
            onClick={hasUpdatePermission ? handleRedirect : undefined}
            aria-label="edit"
          >
            <EditIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={hasDeletePermission ? 'Deletar' : 'Você não tem permissão'}
        >
          <IconButton
            className={classes.button}
            onClick={hasDeletePermission ? handleDeleteClick : undefined}
            aria-label="delete"
          >
            <DeleteIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={hasReadPermission ? 'Expandir' : 'Você não tem permissão'}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={
              hasReadPermission
                ? () => {
                    handleChangeId(row.id);
                  }
                : undefined
            }
          >
            {open && seletedRow.id === row.id ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </Tooltip>
      </div>
    </TableCell>
  );
};

export default ActionsButtonsScales;
