import { icons } from 'asset';

export const Tabs = [
  {
    title: 'Hospitais',
    info: 'Cadastre, edite ou exporte informações de hospitais',
    icon: icons.hospital,
    link: '/cadastros/hospitais',
    permission: 'unit/r',
  },
  {
    title: 'Escalas',
    info: 'Cadastre, edite ou exporte informações de escala de plantões',
    icon: icons.event,
    link: '/cadastros/escalas',
    permission: 'scale/r',
  },
  {
    title: 'Empresas',
    info: 'Cadastre, edite ou exporte informações de empresas dos profissionais',
    icon: icons.business,
    link: '/cadastros/empresas',
    permission: 'company/r',
  },
  {
    title: 'Profissionais',
    info: 'Cadastre, edite e exporte informações de profissionais',
    icon: icons.personAdd,
    link: '/cadastros/profissionais',
    permission: 'professional/r',
  },
  {
    title: 'Administradores',
    info: 'Cadastre, edite e exporte informações de administradores',
    icon: icons.people,
    link: '/cadastros/administradores',
    permission: 'user/r',
  },
  {
    title: 'Moderação',
    info: 'Aprove ou recuse profissionais cadastrados pelo aplicativo',
    icon: icons.phoneIphone,
    link: '/cadastros/solicitacoes',
    permission: 'moderation/r',
  },
];
