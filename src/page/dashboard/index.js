import React, { createContext, useState, useEffect } from 'react';
import useUnit from 'hook/unit';
import { useAuth } from 'hook/auth';
import { useDashboard } from 'hook/dashboard';
import useCompanies from 'hook/companies';
import Layout from 'shared/component/Layout';
import TopSelectsGrid from 'page/dashboard/components/TopSelectsGrid';
import CenterReportCardsGrid from 'page/dashboard/components/CenterReportCardsGrid';
import BottomDetailsReportGrid from 'page/dashboard/components/BottomDetailsReportGrid';
import { useConfig } from 'hook/config';

export const DashboardPageContext = createContext({});

export default function DashboardPage() {
  //const { userLogged } = useAuth(); thiago to do voltar a esse userLogged depois
  const userLogged = { group: { id: 1 } };
  userLogged.group.id = 1;

  const {
    loading: loadingDashboard,
    dashboardData,
    getDashboardInfo,
  } = useDashboard();
  const { units, getUnits } = useUnit();
  const { config, setConfig } = useConfig();

  const { loadingUnits, dataUnits, totalUnits } = units;
  const { companies, getCompanies } = useCompanies();
  const { dataCompany, loadingCompanies, totalCompanies } = companies;

  const [company, setCompany] = useState();
  const [unitSelected, setUnitSelected] = useState('');

  const [dashboardFilter, setDashboardFilter] = useState({
    date_start: null,
    date_end: null,
    group_type: null,
    status: null,
    // unit_id: null,
    // company_id: null, to do thiago mudar depois
    unit_id: 1,
    company_id: 1,
  });

  const [filterCompany, setFilterCompany] = React.useState({
    companyPage: 1,
    companyPerPage: 30,
    companySearch: '',
    companiesOptions: [],
  });
  const { companyPage, companyPerPage, companySearch } = filterCompany;

  const [filterUnit, filterStateUnit] = useState({
    unitPage: 1,
    unitPerPage: 30,
    unitSearch: '',
    unitsOptions: [],
  });
  const { unitPage, unitPerPage, unitSearch } = filterUnit;

  useEffect(() => {
    if (userLogged.group.id !== 1) getUnits(1, unitPerPage, unitSearch);
  }, []);

  useEffect(() => {
    if (company) getUnits(unitPage, unitPerPage, unitSearch, company.value);
    else {
      getUnits(unitPage, unitPerPage, unitSearch);
    }
  }, [unitPage, unitSearch]);

  useEffect(() => {
    if (userLogged.group.id === 1)
      getCompanies(companyPage, companyPerPage, companySearch);
  }, [companyPage, companySearch]);

  const companyPagination = () => {
    const totalPage = Math.ceil(totalCompanies / companyPerPage);
    companyPage < totalPage &&
      setFilterCompany({ ...filterCompany, companyPage: companyPage + 1 });
  };

  const topCompanyPagination = () => {
    companyPage > 1 &&
      setFilterCompany({ ...filterCompany, companyPage: companyPage - 1 });
  };

  const searchCompany = (companyValue) => {
    setFilterCompany({ ...filterCompany, companySearch: companyValue });
  };

  const handleChangeCompany = (val) => {
    setCompany(val);
    setDashboardFilter((oldState) => ({ ...oldState, company_id: val?.value }));
    if (val && val.value) getUnits(1, unitPerPage, unitSearch, val?.value);
  };

  const handleChangeUnit = (val) => {
    setUnitSelected(val);
    const standardCompany = dataUnits?.find(
      (unit) => unit.id === val?.value
    )?.company;
    if (standardCompany) {
      const standardCompanySelect = {
        label: standardCompany?.name,
        value: standardCompany?.id,
      };
      handleChangeCompany(standardCompanySelect);
    }

    setDashboardFilter((oldState) => ({ ...oldState, unit_id: val?.value }));
  };

  const searchUnit = (unitValue) => {
    filterStateUnit({ ...filterUnit, unitSearch: unitValue });
  };

  const unitPagination = () => {
    const totalPage = Math.ceil(totalUnits / unitPerPage);
    unitPage < totalPage &&
      filterStateUnit({ ...filterUnit, unitPage: unitPage + 1 });
  };

  const topUnitPagination = () => {
    unitPage > 1 && filterStateUnit({ ...filterUnit, unitPage: unitPage - 1 });
  };

  const handleDateChange = ({ date_start, date_end }) => {
    setDashboardFilter((oldState) => ({
      ...oldState,
      date_start,
      date_end,
    }));
  };

  useEffect(() => {
    const { date_start, date_end } = dashboardFilter;
    if ((date_start, date_end)) getDashboardInfo(dashboardFilter);
  }, [dashboardFilter]);

  useEffect(() => {
    const jsonHospitais = localStorage.getItem('plantãoExtra@hospital');
    setConfig({
      ...config,
      hospitalData: jsonHospitais && JSON.parse(jsonHospitais),
    });
  }, []);
  return (
    <Layout
      title="Dashboard"
      handleDateChange={handleDateChange}
      isLoading={loadingDashboard}
    >
      <div style={{ marginRight: 20, minHeight: '100vh' }}>
        <DashboardPageContext.Provider
          value={{
            userLogged,
            loadingCompanies,
            company,
            dataCompany,
            loadingUnits,
            dataUnits,
            unitSelected,
            dashboardData,
            loadingDashboard,
            handleChangeCompany,
            searchCompany,
            companyPagination,
            topCompanyPagination,
            handleChangeUnit,
            searchUnit,
            unitPagination,
            topUnitPagination,
            setDashboardFilter,
          }}
        >
          <TopSelectsGrid />
          {dashboardData && Object.keys(dashboardData).length > 0 && (
            <>
              <CenterReportCardsGrid />
              <BottomDetailsReportGrid />
            </>
          )}
        </DashboardPageContext.Provider>
      </div>
    </Layout>
  );
}
