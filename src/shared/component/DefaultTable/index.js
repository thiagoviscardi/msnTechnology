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
import NormalRow from './NormalRow';

export default function DefaultTable({
  permissions = {},
  dataList = [],
  columns = [],
  pageByProps = '',
  loading = false,
  useTimeOut = true,
  deleteLoading = false,
  totalList = 0,
  perPage = 10,
  redirectTo = '/inicio',
  showExportButton = true,
  showActions = true,
  handleOpenModal = null,
  handleChangePage = () => {},
  onDeleteRequest = () => {},
}) {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [seletedRow, setSelectedRow] = useState(null);

  const handleAlertDialogClose = () => {
    setOpenAlert(false);
  };

  const onDeleteConfirm = () => {
    onDeleteRequest(seletedRow.id);
    useTimeOut
      ? setTimeout(() => {
          handleAlertDialogClose();
        })
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
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    {showActions && (
                      <TableCell style={{ maxWidth: 200 }}>Ações</TableCell>
                    )}
                  </>
                </TableRow>
              </TableHead>
              <TableBody data-cy="dataTable_support">
                <>
                  {dataList.map((row) => (
                    <NormalRow
                      permissions={permissions}
                      key={row?.id}
                      row={row}
                      columns={columns}
                      redirectTo={redirectTo}
                      showActions={showActions}
                      showExportButton={showExportButton}
                      setOpenAlert={setOpenAlert}
                      setSelectedRow={setSelectedRow}
                      handleOpenModal={handleOpenModal}
                    />
                  ))}
                </>
              </TableBody>
            </Table>
          </TableContainer>
        </TableStyles>
      )}
      <div className={classes.pagination_control}>
        <ControlledPagination
          total={totalList}
          perPage={perPage}
          loading={deleteLoading}
          onChange={handleChangePage}
          pageByProps={pageByProps}
        />
      </div>
      <AlertDialog
        isOpen={openAlert}
        isLoading={deleteLoading}
        handleClose={handleAlertDialogClose}
        onConfirm={onDeleteConfirm}
        title="Excluir registro?"
        description={`Realmente deseja excluir ${seletedRow?.name} ?`}
      />
    </Paper>
  );
}
