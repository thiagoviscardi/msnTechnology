import React from 'react';

import 'react-day-picker/lib/style.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import { formatDate } from 'react-day-picker/moment';

import { CustomContainer } from './styles';

const ShowToday = () => {
  const formatedDate = (date) => {
    return `${formatDate(date, 'LL', 'pt-br')}`;
  };

  return (
    <CustomContainer>
      <span style={{ fontSize: 14, marginRight: 10 }}>{`${formatedDate(
        moment()
      )}`}</span>
    </CustomContainer>
  );
};

export default ShowToday;
