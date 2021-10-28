import React, { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { UnitName } from './styles';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';

const HeaderModal = () => {
  const { selectedUnit, handleCloseModalScheduleCall = () => {} } = useContext(
    ProfessionalSchedulePageContext
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 400 }}>Agendar plantão</h2>
        <IconButton
          style={{ padding: 0 }}
          onClick={handleCloseModalScheduleCall}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </div>
      <UnitName>
        <p
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: '#A2A5A8',
            marginTop: 28,
          }}
        >
          {selectedUnit?.name}
        </p>
      </UnitName>
    </>
  );
};

export default HeaderModal;
