import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ControlledPagination from '../ControledPagination';
import { CircularProgress } from '@material-ui/core';
import appColors from 'utils/appColors';
import { useStyles, TableStyles } from './styles';
import AlertDialog from './AlertDialog';
import MinimizableRow from './MinimizableRow';

export default function CollapseTable({
  dataList = [],
  permissions = {},
  pageByProps = '',
  useTimeOut = true,
  type = '',
  handleAccept = () => {},
  handleBlock = () => {},
  columns = [],
  openByProps = false,
  loading = false,
  deleteLoading = false,
  totalList = 0,
  perPage = 10,
  redirectTo = '/inicio',
  componentMinimizable = <></>,
  seletedRow,
  origin,
  showActionsButtons = true,
  defaultButtons = false,
  maxWidth = 60,
  setSelectedRow = () => {},
  onExpandRow = () => {},
  handleChangePage = () => {},
  onDeleteRequest = () => {},
}) {
  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertDialogClose = () => {
    setOpenAlert(false);
  };

  const onDeleteConfirm = () => {
    onDeleteRequest(seletedRow.id);
    useTimeOut
      ? setTimeout(() => {
          handleAlertDialogClose();
        }, 2000)
      : handleAlertDialogClose();
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
        <TableStyles>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column?.align}
                        style={{
                          minWidth: column?.minWidth,
                          maxWidth: column?.maxWidth,
                          width: column?.width,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    {showActionsButtons && (
                      <TableCell style={{ maxWidth: 170 }}>Ações</TableCell>
                    )}
                  </>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList.map((row) => (
                  <MinimizableRow
                    style={{ backgroundColor: 'red' }}
                    type={type}
                    handleAccept={handleAccept}
                    handleBlock={handleBlock}
                    key={row.name}
                    row={row.user ? row.user : row}
                    openByProps={openByProps}
                    columns={columns}
                    permissions={permissions}
                    onExpandRow={onExpandRow}
                    componentMinimizable={componentMinimizable}
                    seletedRow={seletedRow}
                    setSelectedRow={setSelectedRow}
                    setOpenAlert={setOpenAlert}
                    redirectTo={redirectTo}
                    origin={origin}
                    showActionsButtons={showActionsButtons}
                    defaultButtons={defaultButtons}
                    maxWidth={maxWidth}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableStyles>
      )}
      <div className={classes.pagination_control}>
        <ControlledPagination
          total={totalList}
          pageByProps={pageByProps}
          perPage={perPage}
          loading={deleteLoading}
          onChange={handleChangePage}
        />
      </div>
      <AlertDialog
        isOpen={openAlert}
        isLoading={deleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Realmente deseja excluir ${
          seletedRow?.name || seletedRow?.title
        } ?`}
      />
    </Paper>
  );
}
