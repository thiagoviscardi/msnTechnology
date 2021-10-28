import React from 'react';
import { useStyles, AntTab, AntTabs } from './styles';
import Layout from 'shared/component/Layout';
import { Button } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import IndividualReportCard from 'shared/component/individualReportCard';
import { Link } from 'react-router-dom';
import { useConfig } from 'hook/config';
import useShifts from 'hook/shifts';
import moment from 'moment';
import Tabs from 'shared/component/tabPanel';
import appColors from 'utils/appColors';
import usePersistedState from 'hook/usePersistedState';
import '../../shared/fixedtab.css';

export default function DayScalePage() {
  const dateObj = new Date();
  const day = moment(dateObj).format('YYYY-MM-DD');
  const { config } = useConfig();
  const { getAllScalesStatus, scales } = useShifts();
  const { dataScales } = scales;
  const [state, setState] = usePersistedState('plantaoextra@dayScale', {
    value: 0,
    unitId: config.hospitalData.length > 0 ? config.hospitalData[0].id : '',
    statusRealizado: 14,
  });
  const { value, unitId } = state;
  const dataSelected = localStorage.getItem('calendarDayPiker');
  const daySelect = dataSelected && moment(dataSelected).format('YYYY-MM-DD');
  const [date, setDate] = React.useState(daySelect ? daySelect : day);

  React.useEffect(() => {
    getAllScalesStatus(unitId, date, date);
  }, [unitId, date]);

  const abas = config.hospitalData.map((item) => ({
    name: item.name,
    id: item.id,
  }));

  const handleChange = (event, newValue) => {
    setState({
      ...state,
      value: newValue,
      unitId:
        config.hospitalData.length > 0 && config.hospitalData[newValue].id,
    });
  };

  const handleDateChange = ({ formated_date }) => {
    setDate(formated_date);
  };
  const classes = useStyles();

  return (
    <Layout
      title="Escala do dia"
      handleDateChange={handleDateChange}
      calendarWeek={false}
      isLoading={false}
    >
      <div id="fixed-tab">
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          {abas.map((option, i) => (
            <AntTab key={i} label={option.name} />
          ))}
        </AntTabs>
        <Divider style={{ marginTop: -2, paddingTop: 2, marginBottom: 30 }} />
      </div>
      <div className={classes.rowContainer} data-cy="container_cards">
        {dataScales && (
          <Tabs value={value} index={0}>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                  situation_status: [{ id: 14, name: 'Realizado' }],
                  filter: 'custom',
                },
              }}
            >
              <Button data-cy="container_cards_btn_realizado">
                <IndividualReportCard
                  key={1}
                  title="Plantões realizados"
                  quantity={dataScales && dataScales.finished}
                  type="dayScale"
                  icon="done_all"
                  colorIcon={appColors.PRIMARY_COLOR}
                />
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                  situation_status: [{ id: 13, name: 'Ocorrendo' }],
                  filter: 'custom',
                },
              }}
            >
              <Button type="button">
                <IndividualReportCard
                  title="Plantões ocorrendo"
                  quantity={dataScales && dataScales.happening}
                  type="dayScale"
                  icon="av_timer"
                  colorIcon="green"
                />
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                  situation_status: [{ id: 12, name: 'Escalado' }],
                  filter: 'custom',
                },
              }}
            >
              <Button type="button">
                <IndividualReportCard
                  title="Plantões escalados"
                  quantity={dataScales && dataScales.scaled}
                  type="dayScale"
                  icon="query_builder"
                  colorIcon="blue"
                />
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                },
              }}
            >
              <Button type="button">
                <IndividualReportCard type="allScale" />
              </Button>
            </Link>
          </Tabs>
        )}
        {dataScales && (
          <Tabs value={value} index={1}>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                  situation_status: [{ id: 14, name: 'Realizado' }],
                  filter: 'custom',
                },
              }}
            >
              <Button>
                <IndividualReportCard
                  key={1}
                  title="Plantões realizados"
                  quantity={dataScales && dataScales.finished}
                  type="dayScale"
                  icon="done_all"
                  colorIcon={appColors.PRIMARY_COLOR}
                />
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                  situation_status: [{ id: 13, name: 'Ocorrendo' }],
                  filter: 'custom',
                },
              }}
            >
              <Button type="button">
                <IndividualReportCard
                  title="Plantões ocorrendo"
                  quantity={dataScales && dataScales.happening}
                  type="dayScale"
                  icon="av_timer"
                  colorIcon="green"
                />
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                  situation_status: [{ id: 12, name: 'Escalado' }],
                  filter: 'custom',
                },
              }}
            >
              <Button type="button">
                <IndividualReportCard
                  title="Plantões escalados"
                  quantity={dataScales && dataScales.scaled}
                  type="dayScale"
                  icon="query_builder"
                  colorIcon="blue"
                />
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                },
              }}
            >
              <Button type="button">
                <IndividualReportCard type="allScale" />
              </Button>
            </Link>
          </Tabs>
        )}
        {dataScales && (
          <Tabs value={value} index={2}>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                  situation_status: [{ id: 14, name: 'Realizado' }],
                  filter: 'custom',
                },
              }}
            >
              <Button>
                <IndividualReportCard
                  key={1}
                  title="Plantões realizados"
                  quantity={dataScales && dataScales.finished}
                  type="dayScale"
                  icon="done_all"
                  colorIcon={appColors.PRIMARY_COLOR}
                />
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                  situation_status: [{ id: 13, name: 'Ocorrendo' }],
                  filter: 'custom',
                },
              }}
            >
              <Button type="button">
                <IndividualReportCard
                  title="Plantões ocorrendo"
                  quantity={dataScales && dataScales.happening}
                  type="dayScale"
                  icon="av_timer"
                  colorIcon="green"
                />
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                  situation_status: [{ id: 12, name: 'Escalado' }],
                  filter: 'custom',
                },
              }}
            >
              <Button type="button">
                <IndividualReportCard
                  title="Plantões escalados"
                  quantity={dataScales && dataScales.scaled}
                  type="dayScale"
                  icon="query_builder"
                  colorIcon="blue"
                />
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              to={{
                pathname: `/escala-do-dia/specific`,
                state: {
                  date,
                },
              }}
            >
              <Button type="button">
                <IndividualReportCard type="allScale" />
              </Button>
            </Link>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
