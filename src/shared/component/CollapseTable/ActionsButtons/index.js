import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { IconButton, Tooltip } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import HasPermission from 'utils/checkPermission';

const ActionsButtons = ({
  permissions,
  type,
  handleAccept,
  handleBlock,
  rowData,
  setOpenAlert,
  redirectTo,
  setSelectedRow,
  handleChangeId,
  open,
  seletedRow,
  row,
  defaultButtons = false,
  maxWidth = 60,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleDeleteClick = () => {
    if (type === 'moderation') {
      handleBlock(rowData.id);
    } else {
      setSelectedRow(rowData);
      setOpenAlert(true);
    }
  };

  const handleRedirect = () => {
    type === 'moderation'
      ? handleAccept(rowData.id)
      : history.push(`${redirectTo}/${rowData?.id}`);
  };

  const hasUpdatePermission = HasPermission(permissions.update);
  const hasDeletePermission = HasPermission(permissions.delete);
  const hasAcceptPermission = HasPermission(permissions.accept);
  const hasRecusePermission = HasPermission(permissions.recuse);

  return (
    <TableCell style={{ maxWidth }}>
      <div className={classes.container_buttons}>
        {!defaultButtons ? (
          <>
            <Tooltip
              title={hasAcceptPermission ? 'Aceitar' : 'Você não tem permissão'}
            >
              <IconButton
                className={classes.button}
                onClick={hasAcceptPermission ? handleRedirect : undefined}
                aria-label="acept"
              >
                <CheckIcon color="primary" className={classes.icon} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={hasRecusePermission ? 'Recusar' : 'Você não tem permissão'}
            >
              <IconButton
                className={classes.button}
                onClick={hasRecusePermission ? handleDeleteClick : undefined}
                aria-label="recuse"
              >
                <BlockIcon className={classes.icon} />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
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
          </>
        )}

        <Tooltip title="Expandir">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              handleChangeId(row.id);
            }}
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

export default ActionsButtons;
