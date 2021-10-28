import React, { useState, useContext, useEffect, memo, useMemo } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import CustomSelect from 'shared/component/forms/CustomSelect';
import {
  RadioInput,
  RadioInputGroup,
} from 'shared/component/maskedField/checkBox';
import ModalButtons from '../../ModalButtons';
import { useStyles } from './styles';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';
import CalendarDayInput from './CalendarDayInput';
import InputQuantitySchedules from './InputQuantitySchedules';

const schema = Yup.object().shape({
  schedule: Yup.object().shape({
    id: Yup.number().required('Obrigatório'),
  }),
});

const ScheduleForm = ({
  onSubmit,
  setRepeatType,
  yearMonth = {},
  loading = false,
  selectedDays = [],
  blockedDays = [],
  setSelectedDays = () => {},
  handleCheckAgendaStatus = () => {},
}) => {
  const classes = useStyles();

  const { agendaDetails, detailsSchedule } = useContext(
    ProfessionalSchedulePageContext
  );

  const [schedule, setSchedule] = useState(null);
  const [repeat, setRepeat] = useState(null);
  const [optionsScheduleHour, setOptionsScheduleHour] = useState([]);

  const mountInitialHours = (schedules) => {
    setOptionsScheduleHour([
      ...schedules.map((item, index) => ({
        value: index,
        id: index,
        label: `${item[0].hour_start} - ${item[0].hour_end}`,
        hour_start: item[0].hour_start,
        hour_end: item[0].hour_end,
      })),
    ]);
  };

  useEffect(() => {
    if (detailsSchedule?.scaleData && detailsSchedule?.scaleData?.schedules) {
      mountInitialHours(detailsSchedule?.scaleData?.schedules);
    }
  }, [detailsSchedule]);

  useEffect(() => {
    if (optionsScheduleHour.length > 0) {
      const SCHEDULE_PERIOD = `${detailsSchedule?.selected_schedule.hour_start} - ${detailsSchedule?.selected_schedule.hour_end}`;
      setSchedule({
        ...optionsScheduleHour.find((item) => item.label === SCHEDULE_PERIOD),
      });
    }
  }, [optionsScheduleHour]);

  useEffect(() => {
    if (schedule) {
      handleCheckAgendaStatus({ schedule });
    }
  }, [schedule, yearMonth]);

  const formInitialValues = useMemo(() => {
    return {
      schedule: { ...schedule },
      repeat: { id: '' },
      repeat_week_type: 'date',
    };
  }, [schedule]);

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={formInitialValues}
      validationSchema={schema}
      validateOnBlur
      enableReinitialize
    >
      {({ values, setFieldValue, errors }) => (
        <Form>
          <>
            <div style={{ margin: '15px 0' }}>
              <h3 style={{ fontSize: 18, fontWeight: 400 }}>
                {agendaDetails?.user?.name} - {detailsSchedule?.scaleData.name}
              </h3>
            </div>
            <div style={{ margin: '20px 0' }}>
              <Field
                name="schedule"
                placeholder="Horário"
                options={optionsScheduleHour}
                value={schedule}
                handleChange={(val) => {
                  setSchedule(val);
                  setFieldValue('schedule.id', val.value);
                  setFieldValue('schedule.hour_start', val.hour_start);
                  setFieldValue('schedule.hour_end', val.hour_end);
                }}
                menuList={() => ({ height: 116, overflowY: 'auto' })}
                errors={errors?.schedule && errors?.schedule?.value}
                component={CustomSelect}
                loading={false}
              />
            </div>
            <div style={{ margin: '10px 0' }}>
              <Field
                name="repeat"
                placeholder="Repetir"
                options={[
                  { value: 1, label: 'Não se repete' },
                  { value: 2, label: 'Nos dias pares' },
                  { value: 3, label: 'Nos dias ímpares' },
                  { value: 4, label: 'A cada 7 dias' },
                  { value: 5, label: 'De segunda a sexta' },
                ]}
                value={repeat}
                handleChange={(val) => {
                  setRepeat(val);
                  setRepeatType(val);
                  setFieldValue('repeat.id', val.value);
                }}
                menuList={() => ({ height: 116, overflowY: 'auto' })}
                errors={errors?.repeat && errors?.repeat?.value}
                component={CustomSelect}
                loading={false}
              />
            </div>
            {values.repeat.id === 5 && (
              <div className={classes.container_radio_group}>
                <RadioInputGroup
                  name="repeat_week_type"
                  handleChange={(value) => {
                    setFieldValue('repeat_week_type', value.target.value);
                  }}
                  value={values?.repeat_week_type}
                >
                  <div className={classes.container_repeat_type}>
                    <RadioInput
                      value="date"
                      label="Repetir até o dia"
                      disabled={values?.repeat_week_type !== 'date'}
                      style={{ cursor: 'pointer !important' }}
                      onClick={() => setFieldValue('repeat_week_type', 'date')}
                    />
                    <CalendarDayInput
                      blockedDays={blockedDays}
                      yearMonth={yearMonth}
                      selectedDays={selectedDays}
                      setSelectedDays={setSelectedDays}
                      detailsSchedule={detailsSchedule}
                      disabled={values?.repeat_week_type !== 'date'}
                      onClick={() => setFieldValue('repeat_week_type', 'date')}
                    />
                  </div>
                  <div className={classes.container_repeat_type}>
                    <RadioInput
                      value="schedules"
                      label="Repetir até completar"
                      disabled={values?.repeat_week_type !== 'schedules'}
                      onClick={() =>
                        setFieldValue('repeat_week_type', 'schedules')
                      }
                    />
                    <InputQuantitySchedules
                      values={values}
                      yearMonth={yearMonth}
                      selectedDays={selectedDays}
                      blockedDays={blockedDays}
                      setSelectedDays={setSelectedDays}
                    />
                    <div
                      className={
                        values?.repeat_week_type !== 'schedules'
                          ? classes.disabled
                          : classes.enabled
                      }
                    >
                      plantões
                    </div>
                  </div>
                </RadioInputGroup>
              </div>
            )}
            <ModalButtons selectedDays={selectedDays} loading={loading} />
          </>
        </Form>
      )}
    </Formik>
  );
};

export default memo(ScheduleForm);
