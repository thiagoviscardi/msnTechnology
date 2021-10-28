import React, { useState, useContext, useEffect, memo, useMemo } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import CustomSelect from 'shared/component/forms/CustomSelect';
import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';
import ModalButtons from '../../ModalButtons';
import CustomSelectProfessionals from 'shared/component/forms/CustomSelectProfessionals';

const schema = Yup.object().shape({
  professional: Yup.object().shape({
    id: Yup.number().required('Obrigatório'),
  }),
  schedule: Yup.object().shape({
    id: Yup.number().required('Obrigatório'),
  }),
});

const ScheduleForm = ({
  onSubmit,
  setRepeatType,
  yearMonth = {},
  loading = false,
  handleCheckAgendaStatus = () => {},
}) => {
  const { detailsSchedule, selectedUnit = {} } = useContext(
    ScheduleWeekPageContext
  );

  const [professional, setProfessional] = useState(null);
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
    if (professional && schedule) {
      handleCheckAgendaStatus({ schedule, professional });
    }
  }, [professional, schedule, yearMonth]);

  const formInitialValues = useMemo(() => {
    return {
      professional: { id: professional?.value || '' },
      schedule: { ...schedule },
      repeat: { id: '' },
    };
  }, [professional, schedule]);

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
      validateOnBlur
      enableReinitialize
    >
      {({ setFieldValue, errors }) => (
        <Form>
          <>
            <div style={{ margin: '15px 0' }}>
              <h3 style={{ fontSize: 18, fontWeight: 400 }}>
                {detailsSchedule?.scaleData.name}
              </h3>
            </div>
            <div style={{ margin: '20px 0' }}>
              <CustomSelectProfessionals
                name="professional"
                placeholder="Selecione o profissional"
                menuList={() => ({ height: 116, overflowY: 'auto' })}
                handleChange={(data) => {
                  setProfessional(data);
                  setFieldValue('professional.id', data?.value);
                }}
                id="InputProfissional"
                value={professional}
                errors={errors?.professional && errors?.professional?.id}
                unit_id={selectedUnit?.id}
                group_id={detailsSchedule?.scaleData?.group_id}
                group_type="custom"
                isClearable
              />
            </div>
            {professional && professional?.value && (
              <>
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
              </>
            )}

            <ModalButtons loading={loading} />
          </>
        </Form>
      )}
    </Formik>
  );
};

export default memo(ScheduleForm);
