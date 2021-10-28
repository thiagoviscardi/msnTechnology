import React, { useState } from 'react';
import { useStyles, TableControl } from './styles';
import { Divider, Icon, IconButton } from '@material-ui/core';
import { toPrice } from 'utils/converters';
import { useConfig } from 'hook/config';
import Layout from 'shared/component/Layout';
import TabPanel from 'shared/component/tabPanel';
import { AntTab, AntTabs } from 'shared/component/TabsComponents';
import ContainerCollapse from './components/ContainerCollapse';
import CollapseTable from 'shared/component/CollapseTable';
import moment from 'moment';
import useReport from 'hook/report';
import ActionsButtons from './components/ActionsButtons';
import ProfileRow from './components/profileRow';
import InputModal from 'shared/component/inputModal';
import { icons } from 'asset';
import FilterShiftsModal from './components/FilterModal';
import ChipFilter from './components/ChipFilter';
import ProfessionalModal from './components/ProfessionalModal';
import useUser from 'hook/user';
import usePersistedState from 'hook/usePersistedState';
import '../../shared/fixedtab.css';

export default function ReportShiftsPage() {
  const classes = useStyles();
  const { config } = useConfig();
  const { getUserStandardInformation, user } = useUser();
  const { data } = user;

  const { reports, reportsWithDetails, getReports, getReportsWithDetails } =
    useReport();
  const { list: listReports, loading: loadingReports, pagination } = reports;
  const { listWithDetails, paginationWithDetails } = reportsWithDetails;

  const [currentTab, setCurrentTab] = usePersistedState(
    'plantaoextra@shiftTabs',
    {
      value: 0,
    }
  );
  const [userDetailModal, setUserDetailModal] = useState(false);

  const [reportsFilter, setReportsFilter] = React.useState({
    page: 1,
    perPage: 10,
    search: '',
    unitId: config.hospitalData.length > 0 ? config.hospitalData[0].id : null,
  });
  const { page, perPage, search, unitId } = reportsFilter;

  const [userShiftsFilter, setUserShiftsFilter] = React.useState({
    pageUserShifts: 1,
    perPageUserShifts: 4,
  });
  const { pageUserShifts, perPageUserShifts } = userShiftsFilter;
  const [id, setId] = useState('');
  const [seletedRow, setSelectedRow] = useState(0);
  const [searchModal, setSearchModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [openByProps, setOpenByProps] = useState(false);
  const [filterType, setFilterType] = useState('universal');
  const [selectedScaleList, setSelectedScaleList] = useState([]);
  const [selectedSituationStatusList, setSelectedSituationStatusList] =
    useState([]);

  const [week, setWeek] = useState({
    dateStart: moment().format('YYYY-MM-DD'),
    dateEnd: moment().format('YYYY-MM-DD'),
  });
  const { dateStart, dateEnd } = week;
  const openSearchModal = () => {
    setSearchModal(!searchModal);
  };

  const detailsRow = (id) => {
    setId(id);
  };
  const openFilterModal = () => {
    setFilterModal(!filterModal);
  };

  const onChangeShifts = (e) => {
    setReportsFilter({ ...reportsFilter, search: e, page: 1 });
  };

  React.useEffect(() => {
    if (selectedSituationStatusList.length === 0) {
      setFilterType('universal');
    }
  }, [selectedSituationStatusList, listReports]);

  React.useEffect(() => {
    getReports({
      page,
      perPage,
      search,
      unitId,
      dateStart,
      dateEnd,
      situationStatus: selectedSituationStatusList,
      scaleId: selectedScaleList,
      filter: filterType,
    });
  }, [
    reportsFilter,
    selectedScaleList,
    selectedSituationStatusList,
    week,
    filterType,
  ]);

  React.useEffect(() => {
    getReportsWithDetails({
      page: pageUserShifts,
      perPage: perPageUserShifts,
      unitId,
      dateStart,
      dateEnd,
      userId: id,
      filter: filterType,
      situationStatus: selectedSituationStatusList,
      scaleId: selectedScaleList,
    });
  }, [pageUserShifts, id, openByProps]);

  const handleChangePage = (page) => {
    setReportsFilter({ ...reportsFilter, page });
  };

  const handleChangeUnit = (unit) => {
    setSelectedSituationStatusList([]);
    setSelectedScaleList([]);
    setReportsFilter({
      ...reportsFilter,
      unitId: unit.id,
      search: '',
      page: 1,
    });
  };

  const handleChangeTab = (event, newValue) => {
    setCurrentTab({ ...currentTab, value: newValue });
  };
  const newPageDetails = () => {
    setUserShiftsFilter({
      ...userShiftsFilter,
      pageUserShifts: pageUserShifts + 1,
    });
  };
  const prevPageDetails = () => {
    setUserShiftsFilter({
      ...userShiftsFilter,
      pageUserShifts: pageUserShifts - 1,
    });
  };

  const componentMinimizable = () => (
    <ContainerCollapse
      rowData={listWithDetails}
      loadingReports={loadingReports}
      pagination={paginationWithDetails}
      prevPage={prevPageDetails}
      nextPage={newPageDetails}
      selectedSituationStatusList={selectedSituationStatusList}
    />
  );

  const abas = config.hospitalData.map((item) => ({
    name: item.name,
    id: item.id,
  }));

  const handleDateChange = ({ date_start, date_end }) => {
    setWeek({
      ...week,
      dateStart: date_start,
      dateEnd: date_end,
    });
  };

  const removeFilter = (removedFilter, itemLength) => {
    if (itemLength > 3) {
      const newScaleList =
        selectedScaleList.length > 0 &&
        selectedScaleList.filter((scale) => scale.id !== removedFilter);
      setSelectedScaleList(newScaleList);
    } else {
      const newSituationStatusList =
        selectedSituationStatusList.length > 0 &&
        selectedSituationStatusList.filter(
          (situationStatus) => situationStatus.id !== removedFilter
        );
      setSelectedSituationStatusList(newSituationStatusList);
    }
  };

  const selectedArrays = [...selectedScaleList, ...selectedSituationStatusList];

  const userDetails = (id) => {
    setUserDetailModal(!userDetailModal);
    getUserStandardInformation({
      id,
    });
  };
  const resetPageDetails = () => {
    setUserShiftsFilter({ ...userShiftsFilter, pageUserShifts: 1 });
  };

  return (
    <Layout
      title="Plantões"
      backArrow
      calendarRange
      handleDateChange={handleDateChange}
    >
      <div id="fixed-tab">
        <AntTabs
          onChange={handleChangeTab}
          value={currentTab.value}
          aria-label="ant example"
        >
          {abas.map((option, i) => (
            <AntTab
              key={i}
              onClick={() => handleChangeUnit(option)}
              label={option.name}
            />
          ))}
        </AntTabs>
        <Divider style={{ marginBottom: 24, paddingTop: 2, marginRight: 20 }} />
        <div className={classes.inputContainer}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={openSearchModal}>
              <Icon>search</Icon>
            </IconButton>
            <IconButton onClick={openFilterModal}>
              <img src={icons.filter} style={{ width: 26 }} />
            </IconButton>
            {selectedArrays &&
              selectedArrays.length > 0 &&
              selectedArrays.map((filter) => (
                <ChipFilter
                  key={filter.id}
                  name={filter.name}
                  id={filter.id}
                  itemLength={Object.keys(filter).length}
                  onClick={removeFilter}
                />
              ))}
          </div>
          <InputModal
            value={search}
            placeholder="Busque por profissionais"
            handleClose={openSearchModal}
            open={searchModal}
            onchange={onChangeShifts}
          />
          <FilterShiftsModal
            openFilter={filterModal}
            handleClose={openFilterModal}
            filterModal={filterModal}
            setSelectedScaleList={setSelectedScaleList}
            selectedScaleList={selectedScaleList}
            selectedSituationStatusList={selectedSituationStatusList}
            setSelectedSituationStatusList={setSelectedSituationStatusList}
            setFilterModal={setFilterModal}
            setFilterType={setFilterType}
            unitId={unitId}
            dateStart={dateStart}
          />
        </div>
      </div>
      <div className={classes.root}>
        {config?.hospitalData.map((option, i) => (
          <TabPanel key={option.id} value={currentTab.value} index={i}>
            <TableControl>
              <CollapseTable
                dataList={listReports}
                columns={[
                  {
                    id: 'name',
                    label: 'Profissional',
                    minWidth: 170,
                    render: (rowData) => (
                      <ProfileRow
                        id={rowData.id}
                        name={rowData.name}
                        userImage={rowData.image}
                        specialty={rowData.group.name}
                        onClick={userDetails}
                      />
                    ),
                  },
                  {
                    id: 'total_on_duty',
                    label: 'N. de plantões',
                    minWidth: 100,
                  },
                  {
                    id: 'total_price',
                    label: 'Valor Total',
                    minWidth: 100,
                    format: (price) => `R$ ${toPrice(price)}`,
                  },
                  {
                    id: 'actions',
                    minWidth: 100,
                    render: (rowData) => (
                      <ActionsButtons
                        handleDetailsPage={resetPageDetails}
                        setOpenByProps={setOpenByProps}
                        seletedRow={seletedRow}
                        openByProps={openByProps}
                        row={rowData}
                        detailRequest={detailsRow}
                        setSelectedRow={setSelectedRow}
                      />
                    ),
                  },
                ]}
                loading={loadingReports}
                totalList={pagination?.total_items}
                redirectTo="/cadastros/administradores/cadastrar"
                perPage={perPage}
                handleChangePage={handleChangePage}
                showActionsButtons={false}
                componentMinimizable={componentMinimizable}
                seletedRow={seletedRow}
                open={false}
                openByProps={openByProps}
              />
            </TableControl>
          </TabPanel>
        ))}
      </div>
      <ProfessionalModal
        openDetails={userDetailModal}
        handleCloseDetails={userDetails}
        user={data}
      />
    </Layout>
  );
}
