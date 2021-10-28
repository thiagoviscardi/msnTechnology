import React, { useState, useEffect } from 'react';
import { StyledTextField } from './styles';
import moment from 'moment';
import { Field } from 'formik';

function InputQuantitySchedules({
  values,
  blockedDays = [],
  selectedDays = [],
  yearMonth = {},
  setSelectedDays = () => {},
}) {
  const [repeatQuantity, setRepeatQuantity] = useState(selectedDays.length);

  useEffect(() => {
    setRepeatQuantity(selectedDays.length);
  }, [selectedDays]);

  const isDayBloqued = (day) => {
    return !!blockedDays.find(
      (item) =>
        moment(item, 'YYYY-MM-DD').format('YYYY-MM-DD') ===
        moment(day, 'YYYY-MM-DD').format('YYYY-MM-DD')
    );
  };

  const getQuantityDays = (quantity) => {
    const currentSelectedDate = `${yearMonth?.year}-${yearMonth?.month}`;
    const firstDaySelected = moment(currentSelectedDate, 'YYYY-MM')
      .startOf('month')
      .toDate();
    const limitDays = parseInt(quantity);
    var i = 0;
    var dates = [];

    // 0 -> sábado / 6 -> domingo
    const exeptDays = [0, 6];

    while (dates.length < limitDays) {
      const date = moment(firstDaySelected).add(i, 'days').toDate();
      const weekDay = moment(date).day();
      if (!exeptDays.includes(weekDay) && !isDayBloqued(date)) {
        dates.push(date);
      }
      i++;
    }
    setSelectedDays(dates);
  };

  const handleChange = (number) => {
    getQuantityDays(number);
  };

  return (
    <Field
      placeholder=""
      name="repeat_quantity"
      variant="outlined"
      type="number"
      onChange={(e) => {
        setRepeatQuantity(e?.target?.value);
        handleChange(e?.target?.value);
      }}
      inputProps={{ min: 0 }}
      value={repeatQuantity}
      disabled={values?.repeat_week_type !== 'schedules'}
      component={StyledTextField}
    />
  );
}

export default InputQuantitySchedules;
