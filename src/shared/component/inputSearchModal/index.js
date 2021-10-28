import React, { useContext } from 'react';
import { useStyles, ModalInputContainer } from './styles';
import { Modal } from '@material-ui/core';
import { ExchangesPageContext } from 'page/exchangeReport/index';
import SearchInputDebounce from '../forms/SearchInputDebounce';

export default function InputSearchModal({
  currentContext = ExchangesPageContext,
  placeholder = 'Busque por profissionais',
}) {
  const classes = useStyles();

  const {
    openSearchModal,
    setMainFilter = () => {},
    handleCloseSearchModal = () => {},
  } = useContext(currentContext);

  const handleProfessionalSearch = (search) => {
    setMainFilter((oldState) => ({ ...oldState, page: 1, search }));
  };

  return (
    <Modal
      className={classes.modal}
      open={openSearchModal}
      onClose={handleCloseSearchModal}
    >
      <ModalInputContainer className={classes.paper}>
        <SearchInputDebounce
          placeholder={placeholder}
          onChange={handleProfessionalSearch}
          handleCloseModal={handleCloseSearchModal}
          style={{
            alignItems: 'center',
            height: 42,
            width: '90%',
          }}
        />
      </ModalInputContainer>
    </Modal>
  );
}
