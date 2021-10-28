import { React, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from 'shared/component/header';
import SideBar from 'shared/component/sidebar';
import estilo from './style';
import FilterTab from 'shared/component/filterTab';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { DefaultContainer } from 'page/shifts/styles';
import InputModal from 'shared/component/inputModal';
import FilterModal from 'shared/component/filterShifts';
import DisagreementCard from 'shared/component/CardDisagreements';
import Divider from '@material-ui/core/Divider';

const Disagreements = () => {
  const classes = estilo();

  const medicos = [
    {
      nome: 'Leila Melo',
      area: 'Oncologia ',
      data: ' 24/02',
      perfil:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEp5hx66bml4UxRn_JYto_1NJeuQ8bl8xRtw&usqp=CAU',
      plantao: [
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
      ],
    },
    {
      nome: 'Leila Melo',
      area: 'Oncologia ',
      data: ' 24/02',
      perfil:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEp5hx66bml4UxRn_JYto_1NJeuQ8bl8xRtw&usqp=CAU',
      plantao: [
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
      ],
    },
    {
      nome: 'Leila Melo',
      area: 'Oncologia ',
      data: ' 24/02',
      perfil:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEp5hx66bml4UxRn_JYto_1NJeuQ8bl8xRtw&usqp=CAU',
      plantao: [
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
      ],
    },
    {
      nome: 'Leila Melo',
      area: 'Oncologia ',
      data: ' 24/02',
      perfil:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEp5hx66bml4UxRn_JYto_1NJeuQ8bl8xRtw&usqp=CAU',
      plantao: [
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
      ],
    },
    {
      nome: 'Leila Melo',
      area: 'Oncologia ',
      data: ' 24/02',
      perfil:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEp5hx66bml4UxRn_JYto_1NJeuQ8bl8xRtw&usqp=CAU',
      plantao: [
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
      ],
    },
    {
      nome: 'Leila Melo',
      area: 'Oncologia ',
      data: ' 24/02',
      perfil:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEp5hx66bml4UxRn_JYto_1NJeuQ8bl8xRtw&usqp=CAU',
      plantao: [
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
      ],
    },
    {
      nome: 'Leila Melo',
      area: 'Oncologia ',
      data: ' 24/02',
      perfil:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEp5hx66bml4UxRn_JYto_1NJeuQ8bl8xRtw&usqp=CAU',
      plantao: [
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
      ],
    },
    {
      nome: 'Leila Melo',
      area: 'Oncologia ',
      data: ' 24/02',
      perfil:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEp5hx66bml4UxRn_JYto_1NJeuQ8bl8xRtw&usqp=CAU',
      plantao: [
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
        {
          nome: 'FISIO-14',
          inicio: '07h30',
          fim: '20h30',
          hospital: 'HUGOL-Hosppital Estadual de Urgências',
          valor: 'R$5200',
        },
      ],
    },
  ];

  const handleDelete = (filterDelete) => () => {
    setOptions((filters) =>
      filters.filter((filter) => filter.id !== filterDelete.id)
    );
  };
  const [state, setState] = useState({
    value: 0,
    open: false,
    openFilter: false,
  });

  const { open, value, openFilter } = state;

  const handleOpen = () => {
    setState({ ...state, open: true, openFilter: false });
  };

  const handleOpenFilter = () => {
    setState({ ...state, open: false, openFilter: true });
  };

  const handleClose = () => {
    setState({ ...state, openFilter: false, open: false });
  };

  const handleChange = (event, newValue) => {
    setState({ ...state, value: newValue });
  };

  const abas = [
    { id: 0, name: 'Hosp-0' },
    { id: 1, name: 'Hosp-1' },
    { id: 2, name: 'Hosp-2' },
    { id: 3, name: 'Hosp-3' },
  ];

  const [options, setOptions] = useState([
    { id: 0, name: 'ONCOL-11' },
    { id: 1, name: 'FISIO-14' },
    { id: 2, name: 'ONCOL-11' },
    { id: 3, name: 'FISIO-13' },
  ]);

  return (
    <>
      <Grid item xs={12} className={classes.root}>
        <DefaultContainer>
          <div className={classes.Header}>
            <Header backArrow={true} title={'Divergências'} />
          </div>

          <SideBar />
          <Tabs
            style={{ paddingLeft: '1.5%', marginTop: '0%' }}
            indicatorColor="primary"
            textColor="primary"
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            {abas.map((e, i) => {
              return <Tab key={i} label={e.name} />;
            })}
          </Tabs>
          <Divider />
          <FilterTab
            options={options}
            handleOpen={handleOpen}
            handleOpenFilter={handleOpenFilter}
            handleDelete={handleDelete}
          />
        </DefaultContainer>
        {open && <InputModal open={open} handleClose={handleClose} />}

        {openFilter && (
          <FilterModal
            options={options}
            openFilter={openFilter}
            handleClose={handleClose}
          />
        )}
      </Grid>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: 308,
          height: 1000,

          flexWrap: 'wrap',
        }}
      >
        {medicos.map((element) => {
          return (
            <DisagreementCard
              key={element.nome}
              nome={element.nome}
              area={element.area}
              data={element.data}
              perfil={element.perfil}
              //Array de objetos
              plantao={element.plantao}
            />
          );
        })}
      </div>
    </>
  );
};

export default Disagreements;
