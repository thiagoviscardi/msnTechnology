import React from 'react';
import { useStyles } from './styles';
import {
  Modal,
  Icon,
  Typography,
  Divider,
  Button,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { Formik, Field, Form, FieldArray } from 'formik';
import SearchInput from 'shared/component/forms/SearchInput';
import FilterCheckBox from '../FilterCheckBox';
import useScales from 'hook/scales';

export default function FilterShiftsModal({
  openFilter,
  handleClose,
  filterModal,
  selectedScaleList,
  selectedSituationStatusList,
  setSelectedScaleList,
  setSelectedSituationStatusList,
  setFilterModal,
  setFilterType,
  unitId,
  dateStart,
}) {
  const { scalesFilter, getFilterScales } = useScales();
  const { dataScalesFilter, loadingScales, totalScales } = scalesFilter;

  const [stateScales, setStateScales] = React.useState([]);
  const [scaleFilter, setScaleFilter] = React.useState({
    scalePage: 1,
    scalePerPage: 10,
    scaleSearch: '',
  });
  const { scalePage, scalePerPage, scaleSearch } = scaleFilter;
  const totalScalePage = Math.ceil(totalScales / scalePerPage);
  const initialValues = { situationStatus: '', scales: [] };
  const classes = useStyles();
  const [clearFilters, setClearFilters] = React.useState(false);

  const getInitialScales = () => {
    setStateScales([
      ...dataScalesFilter.map((item) => ({
        id: item.id,
        name: item.name,
        checked: selectedScaleList.find((custom) => custom.id === item.id)
          ? true
          : false,
      })),
    ]);
  };

  React.useEffect(() => {
    getInitialScales();
  }, [unitId, openFilter, selectedScaleList, selectedSituationStatusList]);

  const onClearFilter = (status) => setClearFilters(status);

  const clearAllFilters = () => {
    setClearFilters(true);
  };

  React.useEffect(() => {
    getFilterScales(scalePage, scalePerPage, unitId, dateStart, scaleSearch);
  }, [scaleFilter, unitId]);

  const onScrollBottom = (event) => {
    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight;

    if (bottom && !loadingScales && scalePage < totalScalePage) {
      setScaleFilter({ ...scaleFilter, scalePage: scalePage + 1 });
      event.currentTarget.scrollTop = 3;
    }
    if (event && event.currentTarget.scrollTop === 0 && scalePage > 1) {
      setScaleFilter({ ...scaleFilter, scalePage: scalePage - 1 });
    }
  };

  const onFilter = (data) => {
    if (data.scales && data.scales.length > 0) {
      const scaleSelectedList = data.scales.filter((item) =>
        dataScalesFilter.map((scale) => item == scale.id)
      );

      const scaleWithDetails = scaleSelectedList.map((scale) => {
        const formatando = parseInt(scale);
        const scaleById = dataScalesFilter.filter(
          (item) => item.id === formatando
        );
        return scaleById;
      });
      const scaleDetailsList = scaleWithDetails.map((item) => item[0]);
      selectedScaleList.length > 0
        ? setSelectedScaleList([...selectedScaleList, ...scaleDetailsList])
        : setSelectedScaleList([...scaleDetailsList]);
    }
    if (data.situationStatus && data.situationStatus.length > 0) {
      setFilterType('custom');
      const situationStatusSelectedList = data.situationStatus.filter((item) =>
        checkStatusArray.map((situationStatus) => item == situationStatus.id)
      );
      const situationStatusSelectedListWithDetails =
        situationStatusSelectedList.map((situationStatus) => {
          const formatando = parseInt(situationStatus);
          const situationStatusById = checkStatusArray.filter(
            (item) => item.id === formatando
          );
          return situationStatusById;
        });
      const situationStatusDetailsList =
        situationStatusSelectedListWithDetails.map((item) => item[0]);
      selectedSituationStatusList.length > 0
        ? setSelectedSituationStatusList([
            ...selectedSituationStatusList,
            ...situationStatusDetailsList,
          ])
        : setSelectedSituationStatusList([...situationStatusDetailsList]);
    }
    if (
      data.situationStatus.length === 0 &&
      data.scales.length === 0 &&
      selectedSituationStatusList.length === 0 &&
      selectedScaleList.length === 0
    ) {
      setFilterType('universal');
    }
    setFilterModal(!filterModal);
  };

  const handleSearch = (e) => {
    const busca = e.target.value;
    setScaleFilter({ ...scaleFilter, scaleSearch: busca });
  };
  const debounce = function (fn, d) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, d);
    };
  };
  const debounceForData = debounce(handleSearch, 500);

  const [checkStatusArray, setCheckStatusArray] = React.useState([]);

  React.useEffect(() => {
    setCheckStatusArray([
      {
        id: 12,
        name: 'Escalado',
        checked: selectedSituationStatusList.find((item) => item.id === 12)
          ? true
          : false,
      },
      {
        id: 13,
        name: 'Ocorrendo',
        checked: selectedSituationStatusList.find((item) => item.id === 13)
          ? true
          : false,
      },
      {
        id: 14,
        name: 'Realizado',
        checked: selectedSituationStatusList.find(
          (item) => item.id === 14 || item.id === 34
        )
          ? true
          : false,
      },
    ]);
  }, [openFilter, unitId, openFilter, selectedSituationStatusList]);

  return (
    <Modal
      className={classes.modal}
      open={openFilter}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus
    >
      <Paper className={classes.paperContainer}>
        <div className={classes.divPadding}>
          <div>
            <div className={classes.rowContainer}>
              <Icon className={classes.iconStyles}>filter_alt</Icon>
              <Typography className={classes.titleStyles}>Filtros</Typography>
            </div>
          </div>
          <Formik onSubmit={onFilter} initialValues={initialValues}>
            {({ values }) => (
              <Form>
                <div className={classes.rowPadding}>
                  <div className={classes.leftContainer}>
                    <SearchInput
                      onChange={debounceForData}
                      dividerOn
                      placeholder="Busque as escalas"
                    />
                    <div
                      className={classes.scrollContainer}
                      onScroll={onScrollBottom}
                    >
                      <FieldArray
                        name="scales"
                        render={(arrayHelp) => (
                          <div>
                            {!loadingScales &&
                              stateScales &&
                              stateScales.length > 0 &&
                              stateScales.map((option) => (
                                <div key={option.id} style={{ width: '100%' }}>
                                  <Field
                                    hospitais={values.scales}
                                    arrayhelp={arrayHelp}
                                    arraychecked={selectedScaleList}
                                    setarraychecked={setSelectedScaleList}
                                    name="scales.id"
                                    id={option.id.toString()}
                                    label={option.name}
                                    checkedprops={option.checked}
                                    clearfilters={clearFilters.toString()}
                                    setfiltertype={setFilterType}
                                    onclearfilters={onClearFilter}
                                    component={FilterCheckBox}
                                  />
                                </div>
                              ))}
                            {loadingScales && (
                              <div className={classes.loadingContainer}>
                                <CircularProgress />
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <Divider
                    orientation="vertical"
                    className={classes.dividerStyles}
                  />
                  <div style={{ marginBottom: 12, marginTop: 9, width: 140 }}>
                    <Typography className={classes.statusTitle}>
                      Filtro por status:
                    </Typography>
                    <FieldArray
                      name="situationStatus"
                      render={(arrayHelp) => (
                        <div>
                          {checkStatusArray.map((option) => (
                            <div key={option.id} style={{ width: '100%' }}>
                              <Field
                                hospitais={values.situationStatus}
                                arrayhelp={arrayHelp}
                                arraychecked={selectedSituationStatusList}
                                setarraychecked={setSelectedSituationStatusList}
                                name="situationStatus.id"
                                id={option.id.toString()}
                                checkedprops={option.checked}
                                label={option.name}
                                clearfilters={clearFilters.toString()}
                                setfiltertype={setFilterType}
                                onclearfilters={onClearFilter}
                                component={FilterCheckBox}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className={classes.closeBar}>
                  <Button onClick={clearAllFilters}>
                    <Icon style={{ fontSize: 21, color: '#A2A5A8' }}>
                      close
                    </Icon>
                    <Typography className={classes.clearAllText}>
                      Limpar todos
                    </Typography>
                  </Button>
                  <Button className={classes.filterButton} type="submit">
                    <Typography className={classes.filterText}>
                      Filtrar
                    </Typography>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </Modal>
  );
}
