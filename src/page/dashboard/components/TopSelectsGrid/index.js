import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DashboardPageContext } from 'page/dashboard/index';
import CustomSelect from 'shared/component/forms/CustomSelect';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 3,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const professionalTypes = [
  { label: 'Todos os profissionais', value: 'all' },
  { label: 'Médico', value: 'doctor' },
  { label: 'Multi-profissional', value: 'multi' },
];

export default function TopSelectsGrid() {
  const classes = useStyles();
  const {
    userLogged,
    loadingCompanies,
    handleChangeCompany,
    company,
    searchCompany,
    companyPagination,
    topCompanyPagination,
    dataCompany,
    loadingUnits,
    dataUnits,
    unitSelected,
    handleChangeUnit,
    searchUnit,
    unitPagination,
    topUnitPagination,
    setDashboardFilter,
  } = useContext(DashboardPageContext);

  const formatCompaniesOptions =
    dataCompany &&
    dataCompany.length > 0 &&
    dataCompany.map((company) => ({
      label: company.name,
      value: company.id,
    }));

  const formatUnitsOptions = dataUnits.map((company) => ({
    label: company.name,
    value: company.id,
  }));

  const [stateProfessionalType, setStateProfessionalType] = useState('');
  const handleChangeProfessionalType = (val) => {
    setStateProfessionalType(val);
    setDashboardFilter((oldState) => ({
      ...oldState,
      group_type: val?.value,
    }));
  };

  // Grupo 1 - sistema pode ver o combo de empresa

  return (
    <div className={classes.root}>
      <Grid justify="flex-start" container spacing={3}>
        {userLogged.group.id === 1 && (
          <Grid data-cy="select_company" item xs>
            <CustomSelect
              name="company"
              loading={loadingCompanies}
              placeholder="Selecione a empresa responsável"
              handleChange={handleChangeCompany}
              value={company}
              searchItem={searchCompany}
              pagination={companyPagination}
              toTopPagination={topCompanyPagination}
              options={formatCompaniesOptions}
              isClearable
            />
          </Grid>
        )}
        <Grid data-cy="select_unit" item xs>
          <CustomSelect
            name="unit"
            loading={loadingUnits}
            placeholder="Selecione o hospital"
            handleChange={handleChangeUnit}
            value={unitSelected}
            searchItem={searchUnit}
            pagination={unitPagination}
            toTopPagination={topUnitPagination}
            options={formatUnitsOptions}
            isClearable
          />
        </Grid>

        <Grid data-cy="select_group_type" item xs>
          <CustomSelect
            name="group_type"
            loading={false}
            placeholder="Selecione o tipo de profissional"
            handleChange={handleChangeProfessionalType}
            value={stateProfessionalType}
            options={professionalTypes}
            isClearable
          />
        </Grid>
      </Grid>
    </div>
  );
}
