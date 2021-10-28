import React from 'react';
import { useStyles } from './styles';
import {
  Typography,
  Grid,
  Icon,
  IconButton,
  Divider,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  Button,
  Tooltip,
} from '@material-ui/core';
import ModalChange from './modal';
import useScales from 'hook/scales';
import { formatPrice } from 'utils/formatPrice';
import HasPermission from 'utils/checkPermission';
import { useConfig } from 'hook/config';
export default function CardShiftTable({
  permissions = {},
  hourStart,
  hourEnd,
  scales,
  id,
  handleSubmit,
  setFieldValue,
  handleChange,
  errors,
  seachTimesScale,
  options,
  handleMsgModalScale,
  handleModalSuccess,
}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    addScale: false,
    openModal: false,
    openMenu: false,
    deleteShift: false,
    selectedScale: <></>,
  });
  const { deleteSchedules } = useScales();
  const { openModal } = state;
  const { config } = useConfig();

  const handleOpenModal = (scale) => {
    setState({ ...state, openModal: true, selectedScale: scale });
  };

  const handleCloseModal = () => {
    setState({ ...state, openModal: false });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickPopper = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPopper = Boolean(anchorEl);
  const idPopper = openPopper ? 'simple-popper' : undefined;

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleDeleteShift = () => {
    deleteSchedules(
      scales.map((item) => ({
        id: item.id,
      }))
    )
      .then(() => {
        seachTimesScale();
      })
      .catch((retorno) => {
        handleMsgModalScale(retorno.data.msg);
        handleModalSuccess();
      });
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(open);
  var horaInicio = hourStart.split(':');
  var horaFinal = hourEnd.split(':');
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div>
      <div>
        <Grid container key={id} className={classes.tableRow}>
          <Grid className={classes.hours}>
            <div
              style={{
                display: 'flex',
              }}
            >
              {options === 'show' && (
                <div>
                  <IconButton
                    data-cy="btn_more_vert"
                    className={classes.iconButtonScale}
                    ref={anchorRef}
                    onClick={handleClickPopper}
                  >
                    <Icon>more_vert</Icon>
                  </IconButton>
                  <div>
                    <Popper
                      id={idPopper}
                      open={openPopper}
                      anchorEl={anchorEl}
                      placement="right-start"
                    >
                      <Paper className={classes.paper}>
                        <ClickAwayListener onClickAway={handleClickPopper}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <Button
                              data-cy="btn_excluir_plantao"
                              onClick={handleDeleteShift}
                              style={{
                                textTransform: 'none',
                                width: '100%',
                                fontSize: 16,
                              }}
                            >
                              Excluir plantão
                            </Button>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Popper>
                  </div>
                </div>
              )}

              <div data-cy="div_titulo_plantao">
                <Typography className={classes.textHours}>Início</Typography>
                <Typography className={classes.numberHours}>
                  {horaInicio[0] + ':' + horaInicio[1]}
                </Typography>
                <Typography className={classes.textHours}>Fim</Typography>
                <Typography className={classes.numberHours}>
                  {horaFinal[0] + ':' + horaFinal[1]}
                </Typography>
              </div>
            </div>
          </Grid>
          {scales.map((scale) =>
            scale.status === 0 ? (
              <div>
                <div
                  onClick={() => handleOpenModal(scale)}
                  className={classes.cardNoneShift}
                ></div>
                {openModal && (
                  <ModalChange
                    open={openModal}
                    handleChange={handleChange}
                    scale={scale}
                    scaleSelected={state.selectedScale}
                    handleSubmit={handleSubmit}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    handleCloseModal={handleCloseModal}
                    seachTimesScale={seachTimesScale}
                  />
                )}
              </div>
            ) : (
              <Grid
                container
                key={scale.id}
                className={config.open ? classes.card : classes.cardClose}
              >
                <div className={classes.insideCard}>
                  <Typography className={classes.titleCard}>
                    Valor do plantão
                    <Tooltip
                      title={
                        HasPermission(permissions.update)
                          ? ''
                          : 'Você não tem permissão'
                      }
                    >
                      <IconButton
                        className={classes.iconButton}
                        ref={anchorRef}
                        onClick={
                          HasPermission(permissions.update)
                            ? () => handleOpenModal(scale)
                            : undefined
                        }
                      >
                        <Icon>more_horiz</Icon>
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  {openModal && (
                    <ModalChange
                      open={openModal}
                      handleChange={handleChange}
                      scale={scale}
                      scaleSelected={state.selectedScale}
                      handleSubmit={handleSubmit}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      handleCloseModal={handleCloseModal}
                      seachTimesScale={seachTimesScale}
                    />
                  )}
                  <Typography className={classes.textPrice}>
                    {formatPrice(scale.price)}
                  </Typography>
                  <Divider
                    style={{
                      height: 1,
                      width: 176,
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      className={classes.textHoursCard}
                    >{`${scale.quantity_professional} Vagas`}</Typography>
                  </div>
                </div>
              </Grid>
            )
          )}
        </Grid>
      </div>
      <Divider
        style={{
          width: '100%',
          height: '1px',
          marginBottom: 24,
        }}
      />
    </div>
  );
}
