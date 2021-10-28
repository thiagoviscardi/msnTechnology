import React from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import TransformIcon from '@material-ui/icons/Transform';
import appColors from './appColors';

export const StatusSituationType = (classes) => [
  // Plantões que foram agendados por um gerente e lançados para o usuário
  {
    id: '11',
    label: 'Lançado',
    icon: <CompareArrowsIcon className={classes.icon} />,
    color: appColors.PRIMARY_COLOR,
  },
  {
    id: '12',
    label: 'Confirmado',
    icon: <AccessTimeIcon className={classes.icon} />,
    color: '#1F437F',
  },
  {
    id: '13',
    label: 'Ocorrendo',
    icon: <AvTimerIcon className={classes.icon} />,
    color: 'green',
  },
  {
    id: '14',
    label: 'Realizado',
    icon: <DoneAllIcon className={classes.icon} />,
    color: appColors.PRIMARY_COLOR,
  },
  {
    id: '17',
    label: 'Solicitado',
    icon: <AccessTimeIcon className={classes.icon} />,
    color: appColors.PRIMARY_COLOR,
  },

  // Plantões que foram enviados para um colega
  {
    id: '21',
    label: 'Enviado',
    icon: <CompareArrowsIcon className={classes.icon} />,
    color: appColors.PRIMARY_COLOR,
  },
  {
    id: '22',
    label: 'Enviado e Confirmado',
    icon: <TransformIcon className={classes.icon} />,
    color: appColors.PRIMARY_COLOR,
  },
  {
    id: '23',
    label: 'Enviado e Recusado',
    icon: <NotInterestedIcon className={classes.icon} />,
    color: 'red',
  },

  // Plantões que foram recebidos de um colega na unidade
  {
    id: '31',
    label: 'Recebido',
    icon: <CompareArrowsIcon className={classes.icon} />,
    color: appColors.PRIMARY_COLOR,
  },
  {
    id: '32',
    label: 'Recebido e Confirmado',
    icon: <TransformIcon className={classes.icon} />,
    color: appColors.PRIMARY_COLOR,
  },
  {
    id: '33',
    label: 'Recebido e em Andamento',
    icon: <AccessTimeIcon className={classes.icon} />,
    color: 'green',
  },
  {
    id: '34',
    label: 'Recebido e Realizado',
    icon: <DoneAllIcon className={classes.icon} />,
    color: appColors.PRIMARY_COLOR,
  },
  {
    id: '35',
    label: 'Recebido e Recusado',
    icon: <NotInterestedIcon className={classes.icon} />,
    color: 'red',
  },
];
