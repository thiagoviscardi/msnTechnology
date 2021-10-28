import { icons } from 'asset';

export const Tabs = [
  {
    title: 'Grupos de permissões',
    info: 'Edite e cadastre grupos de permissões',
    icon: icons.people,
    link: '/settings/perfil-de-permissoes',
    permission: 'permission/r',
  },
  {
    title: 'Lista de permissões',
    info: 'Edite e confira a lista de permissões do sistema ',
    icon: icons.formatListBulleted,
    link: '/settings/permissions-list',
    permission: 'permission/r',
  },
  {
    title: 'Companhias',
    info: 'Edite ou cadastre companhias no sistema',
    icon: icons.domain,
    link: '/settings/companhias',
    permission: 'company/r',
  },
  {
    title: 'Bancos',
    info: 'Edite ou cadastre bancos no sistema',
    icon: icons.accountBalance,
    link: '/settings/banks',
    permission: null,
  },
  {
    title: 'Notificações',
    info: 'Cadastre novas notificações ou edite as atuais',
    icon: icons.notificationsNone,
    link: '/settings/notificacoes',
    permission: 'notification/r',
  },
  {
    title: 'Suporte',
    info: 'Cadastre novos materiais de suporte ou edite os atuais',
    icon: icons.sms,
    link: '/settings/suporte',
    permission: 'support/r',
  },
  {
    title: 'Países',
    info: 'Cadastre e edite os países',
    icon: icons.social,
    link: '/settings/paises',
    permission: 'country/r',
  },
  {
    title: 'Estados',
    info: 'Cadastre e edite os estados',
    icon: icons.map,
    link: '/settings/estados',
    permission: 'state/r',
  },
  {
    title: 'Cidades',
    info: 'Cadastre e edite as cidades',
    icon: icons.place,
    link: '/settings/cidades',
    permission: 'city/r',
  },
];
