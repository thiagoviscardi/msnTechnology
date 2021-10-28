import React, { useState, useContext, useEffect } from 'react';
import { useStyles, ContainerModal, ContainerSpecialties } from './styles';
import { Modal, Divider } from '@material-ui/core';
import { TopModal } from './components/TopModal';
import { ScalesCheckboxes } from './components/ScalesCheckboxes';
import { StatusCheckboxes } from './components/StatusCheckboxes';
import { BottomModal } from './components/BottomModal';
import { ExchangesPageContext } from 'page/exchangeReport/index';
import CustomSelectUnitScales from '../forms/CustomSelectUnitScales';

export default function FilterShiftsModal({
  currentContext = ExchangesPageContext,
  onlyOneScale = false,
  buttonFilter = false,
}) {
  const classes = useStyles();

  const {
    openFilter,
    setSelectedSchedule,
    mainFilter,
    selectedUnit,
    scaleInArray,
    findSelectedScale,
    scaleJsonInLocal,
    handleCloseFilter = () => {},
    setMainFilter = () => {},
  } = useContext(currentContext);

  const [cleanAll, setCleanAll] = useState(false);
  const [specialty, setSpecialty] = useState(null);

  const handleCleanAll = () => {
    setCleanAll(true);
    setMainFilter((old) => ({ ...old, scales: [], custom_filter: [] }));
    setTimeout(() => {
      setCleanAll(false);
    }, 200);
  };

  useEffect(() => {
    findSelectedScale &&
      findSelectedScale !== undefined &&
      setSpecialty({
        value: findSelectedScale.value,
        label: findSelectedScale.label,
      });

    if (mainFilter?.scale_id && findSelectedScale === undefined) {
      setSpecialty({
        value: mainFilter?.scale_id,
        label: mainFilter?.scale_name,
      });
    }
    return () => {
      setSpecialty(null);
    };
  }, [mainFilter]);

  const changeLocalScales = (data) => {
    if (scaleJsonInLocal === null) {
      scaleInArray.push({ ...data, unit: selectedUnit.id });
      localStorage.setItem('selectedScale', JSON.stringify(scaleInArray));
    }
    if (
      scaleJsonInLocal &&
      scaleJsonInLocal.length < 3 &&
      (!findSelectedScale || findSelectedScale === undefined)
    ) {
      scaleInArray.push({ ...data, unit: selectedUnit.id });
      localStorage.setItem('selectedScale', JSON.stringify(scaleInArray));
    }
    if (findSelectedScale) {
      scaleInArray &&
        scaleInArray.splice(scaleInArray.indexOf(findSelectedScale), 1);
      scaleInArray.push({ ...data, unit: selectedUnit.id });
      localStorage.setItem('selectedScale', JSON.stringify(scaleInArray));
    }
  };

  return (
    <Modal
      open={openFilter}
      onClose={handleCloseFilter}
      disableAutoFocus
      disableEnforceFocus
    >
      <ContainerModal className={classes.paper}>
        {onlyOneScale && (
          <ContainerSpecialties id="modalEscala">
            <div className={classes.label}> Filtrar por Escala </div>
            <CustomSelectUnitScales
              name="escales.id"
              placeholder="Escalas"
              id="Escalas"
              menuList={() => ({ height: 116, overflowY: 'auto' })}
              handleChange={(data) => {
                setSpecialty(data);
                setSelectedSchedule !== undefined && setSelectedSchedule('');
                changeLocalScales(data);
                setMainFilter((old) => ({
                  ...old,
                  scale_id: data?.value,
                  scale_name: data?.label,
                }));
              }}
              value={specialty}
              unit_id={mainFilter?.unit_id}
              isClearable
            />
          </ContainerSpecialties>
        )}
        {!onlyOneScale && (
          <div className={classes.groupTopModal}>
            <TopModal />
            <div className={classes.containerCheckbox}>
              <ScalesCheckboxes
                cleanAll={cleanAll}
                currentContext={currentContext}
              />
              <Divider
                orientation="vertical"
                style={{
                  height: 200,
                  width: 1,
                  marginTop: 45,
                }}
              />
              <StatusCheckboxes
                cleanAll={cleanAll}
                currentContext={currentContext}
              />
            </div>
          </div>
        )}

        <BottomModal
          handleCloseFilter={handleCloseFilter}
          handleCleanAll={handleCleanAll}
          onlyOneScale={onlyOneScale}
          buttonFilter={buttonFilter}
        />
      </ContainerModal>
    </Modal>
  );
}
