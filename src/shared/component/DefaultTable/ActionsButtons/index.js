import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import HasPermission from 'utils/checkPermission';

const ActionsButtons = ({
  permissions,
  rowData,
  onClick,
  setOpenAlert,
  redirectTo,
  setSelectedRow,
  showExportButton,
  handleOpenModal,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleDeleteClick = () => {
    setSelectedRow(rowData);
    setOpenAlert(true);
  };

  const handleRedirect = () => {
    if (handleOpenModal) handleOpenModal(rowData);
    else history.push(`${redirectTo}/${rowData?.id}`);
  };

  const hasUpdatePermission = HasPermission(permissions.update);
  const hasDeletePermission = HasPermission(permissions.delete);

  return (
    <TableCell>
      <div className={classes.container_buttons}>
        {showExportButton && (
          <Tooltip title="Exportar">
            <IconButton
              className={classes.button}
              onClick={onClick}
              aria-label="export"
            >
              <InsertDriveFileIcon className={classes.icon} />
            </IconButton>
          </Tooltip>
        )}
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
      </div>
    </TableCell>
  );
};

export default ActionsButtons;
