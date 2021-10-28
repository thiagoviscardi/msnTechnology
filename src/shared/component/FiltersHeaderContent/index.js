import React from 'react';
import InputSearchModal from 'shared/component/inputSearchModal';
import FilterShiftsModal from 'shared/component/FilterShiftsModal';
import FilterTab from 'shared/component/filterTab';
import { Container, SecondContainer } from './styles';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';

function FiltersHeaderContent({
  currentContext = ProfessionalSchedulePageContext,
  onlyOneScale = false,
  buttonFilter = false,
  showSearchButton = true,
  secondComponent = <></>,
}) {
  return (
    <Container>
      <FilterTab
        type="localScales"
        showSearchButton={showSearchButton}
        defaultContext={currentContext}
      />
      <InputSearchModal currentContext={currentContext} />
      <FilterShiftsModal
        currentContext={currentContext}
        onlyOneScale={onlyOneScale}
        buttonFilter={buttonFilter}
      />
      <SecondContainer>{secondComponent}</SecondContainer>
    </Container>
  );
}

export default FiltersHeaderContent;
