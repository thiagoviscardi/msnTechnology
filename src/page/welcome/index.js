import React, { useCallback, useRef, useState } from 'react';
import { Typography } from '@material-ui/core';
import Layout from 'shared/component/Layout';
import CustomUnitsCheckboxes from 'shared/component/forms/CustomUnitsCheckboxes';
import { useAuth } from 'hook/auth';
import { useStyles } from './styles';
import { useConfig } from 'hook/config';
import { useHistory } from 'react-router-dom';
import HeaderBox from './components/headerBox';
import { useUnits } from 'hook/units';

export default function WelcomePage() {
  const classes = useStyles();
  const history = useHistory();
  const { userLogged } = useAuth();
  const { setConfig } = useConfig();

  const {
    data: dataList,
    loading: loadingUnits,
    total: totalUnits,
    getList,
  } = useUnits();

  const handleSearch = (search) => {
    getList({ page: 1, per_page: 20, status: 'active', search });
  };

  const resetAllKeys = () => {
    localStorage.removeItem('plantaoextra@professional');
    localStorage.removeItem('plantaoextra@admin');
    localStorage.removeItem('plantaoextra@exchangeReport');
    localStorage.removeItem('plantaoextra@dayScale');
    localStorage.removeItem('plantaoextra@checkinDetails');
    localStorage.removeItem('plantaoextra@scales');
    localStorage.removeItem('plantaoextra@dayScale');
    localStorage.removeItem('selectedLocalUnit');
    localStorage.removeItem('plantaoextra@adminList');
  };
  const onSubmit = (values) => {
    if (values?.hospital && values?.hospital.length > 0) {
      setConfig((old) => ({
        ...old,
        hospitalId: values?.hospital.map((item) => item.id.toString()),
        hospitalData: [...values?.hospital.map((item) => item)],
      }));
      localStorage.setItem(
        'plantãoExtra@hospital',
        JSON.stringify([...values?.hospital])
      );
      resetAllKeys();
      history.push('/dashboard');
    }
  };

  const UnitsCheckboxesRef = useRef(null);
  const handleCleanCheckbox = useCallback((unit_id) => {
    UnitsCheckboxesRef.current.handleRemoveAside(unit_id);
  }, []);

  const [selectedUnits, setSelectedUnits] = useState(() => {
    let storageUnits = localStorage.getItem('plantãoExtra@hospital');
    if (storageUnits) {
      storageUnits = JSON.parse(storageUnits);
      return storageUnits;
    }
    return [];
  });

  return (
    <Layout
      title=""
      calendarWeek={false}
      calendarDay={false}
      isLoading={false}
      showHeader={false}
      handleCleanCheckbox={handleCleanCheckbox}
    >
      <div className={classes.root}>
        <div
          data-cy="containerDivHospitalSelecionados"
          className={classes.container}
        >
          <HeaderBox
            userLogged={userLogged}
            totalUnits={totalUnits}
            selectedUnits={selectedUnits}
          />
          <div>
            <Typography className={classes.subText}>
              Selecione os hospitais desejados para visualizar as informações
              dos plantonistas:
            </Typography>
          </div>

          <CustomUnitsCheckboxes
            totalUnits={totalUnits}
            loadingUnits={loadingUnits}
            dataList={dataList}
            getList={getList}
            onSubmit={onSubmit}
            handleSearch={handleSearch}
            selectedUnits={selectedUnits}
            setSelectedUnits={setSelectedUnits}
            ref={UnitsCheckboxesRef}
          />
        </div>
      </div>
    </Layout>
  );
}
