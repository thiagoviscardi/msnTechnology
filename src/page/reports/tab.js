import { icons } from 'asset';

export const Tabs = [
  {
    title: 'Plantões',
    info: 'Confira e exporte o histórico de plantões de cada profissional escalado',
    icon: icons.localHospital,
    link: '/relatorios/plantoes',
    permission: 'report/r',
  },
  {
    title: 'Check-In/Check-Out',
    info: 'Confira e exporte os registros de entrada e saída dos plantões',
    icon: icons.doneAll,
    link: '/relatorios/checkin',
    permission: 'report/r',
  },
];
