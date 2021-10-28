import DashboardPage from 'page/dashboard';
import DayScalePage from 'page/dayScale/index';
import WelcomePage from 'page/welcome';
import ExchangeReport from 'page/exchangeReport';
import Profile from 'page/profile';
import ShiftsPage from 'page/shifts';
import ScalesPage from 'page/scalesPage';
import ScalesRegistration from 'page/scalesRegistration';
import FullScales from 'page/fullScales';
import SettingsPage from 'page/settings';
import RegistrationsPage from 'page/registrations';
import PermissionsListPage from 'page/settings/pages/permissions-list';
import CompanyListPage from 'page/settings/pages/company/list';
import CompanyCreatePage from 'page/settings/pages/company/create';
import CompanyUpdatePage from 'page/settings/pages/company/update';
import Enterprises from 'page/enterprises/list';
import EnterpriseRegisterPage from 'page/enterprises/create';
import EnterpriseUpdatePage from 'page/enterprises/update';
import HospitalPage from 'page/hospital';
import HospitalRegisterPage from 'page/hospitalRegister';
import ProfessionalPage from 'page/professionalPage';
import ProfessionalRegister from 'page/professionalRegister';
import AdminPageList from 'page/admin/list';
import AdminPageCreate from 'page/admin/create';
import AdminUpdatePage from 'page/admin/update';
import SpecificScalePage from 'page/specificScale';
import ProfilePermissions from 'page/settings/pages/profilePermissions';
import ProfilePermissionsCreate from 'page/settings/pages/profilePermissionsCreate';
import ProfilePermissionsUpdate from 'page/settings/pages/profilePermissionsUpdate';
import CountriesListPage from 'page/settings/pages/countries';
import NotificationsListPage from 'page/settings/pages/notifications/list';
import NotificationsCreatePage from 'page/settings/pages/notifications/create';
import NotificationsUpdatePage from 'page/settings/pages/notifications/update';
import ProfileData from 'page/profileData';
import BankPage from 'page/settings/pages/banks';
import Schedule from 'page/Schedule';
import ScheduleWeek from 'page/Schedule/WeekSchedule';
import ProfessionalSchedule from 'page/Schedule/ProfessionalSchedule';
import RequestsPage from 'page/requests';
import HospitalEditPage from 'page/hospitalEdit';
import ReportPage from 'page/reports';
import ReportShiftsPage from 'page/reportShifts';
import ProfissionalEditPage from 'page/professionalEdit';
import CheckInOut from 'page/checkInOut';
import SupportListPage from 'page/settings/pages/support/list';
import SupportCreatePage from 'page/settings/pages/support/create';
import SupportUpdatePage from 'page/settings/pages/support/update';
import StatesListPage from 'page/settings/pages/states';
import CitiesListPage from 'page/settings/pages/cities';

export const routes = [
  {
    path: '/profile',
    component: Profile,
    exact: true,
    permission: null,
  },
  {
    path: '/profile-data',
    component: ProfileData,
    exact: true,
    permission: null,
  },
  {
    path: '/inicio',
    component: WelcomePage,
    exact: true,
    permission: null,
  },
  {
    path: '/plantoes',
    component: ShiftsPage,
    exact: true,
    permission: null,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    exact: true,
    permission: null,
  },
  {
    path: '/escala-do-dia',
    component: DayScalePage,
    exact: true,
    permission: null,
  },
  {
    path: '/agenda',
    component: Schedule,
    exact: true,
    permission: null,
  },
  {
    path: '/agenda/semana',
    component: ScheduleWeek,
    exact: true,
    permission: 'schedule/r',
  },
  {
    path: '/agenda/profissional/:id',
    component: ProfessionalSchedule,
    exact: true,
    permission: null,
  },
  {
    path: '/settings',
    component: SettingsPage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/perfil-de-permissoes',
    component: ProfilePermissions,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/perfil-de-permissoes/cadastrar',
    component: ProfilePermissionsCreate,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/perfil-de-permissoes/editar/:id',
    component: ProfilePermissionsUpdate,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/paises',
    component: CountriesListPage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/estados',
    component: StatesListPage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/cidades',
    component: CitiesListPage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/banks',
    component: BankPage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/permissions-list',
    component: PermissionsListPage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/companhias',
    component: CompanyListPage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/companhias/cadastrar',
    component: CompanyCreatePage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/companhias/editar/:id',
    component: CompanyUpdatePage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/suporte',
    component: SupportListPage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/suporte/cadastrar',
    component: SupportCreatePage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/suporte/editar/:id',
    component: SupportUpdatePage,
    exact: true,
    permission: null,
  },
  {
    path: '/relatorios/checkin',
    component: CheckInOut,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/notificacoes',
    component: NotificationsListPage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/notificacoes/cadastrar',
    component: NotificationsCreatePage,
    exact: true,
    permission: null,
  },
  {
    path: '/settings/notificacoes/editar/:id',
    component: NotificationsUpdatePage,
    exact: true,
    permission: null,
  },
  {
    path: '/relatorio-de-trocas',
    component: ExchangeReport,
    exact: true,
    permission: null,
  },
  {
    path: '/cadastros',
    component: RegistrationsPage,
    exact: true,
    permission: null,
  },
  {
    path: '/cadastros/hospitais',
    component: HospitalPage,
    exact: true,
    permission: 'unit/r',
  },
  {
    path: '/cadastros/solicitacoes',
    component: RequestsPage,
    exact: true,
    permission: 'moderation/r',
  },
  {
    path: '/cadastros/hospitais/cadastrar',
    component: HospitalRegisterPage,
    exact: true,
    permission: 'unit/c',
  },
  {
    path: '/cadastros/hospitais/editar/:id',
    component: HospitalEditPage,
    exact: true,
    permission: 'unit/u',
  },
  {
    path: '/cadastros/escalas',
    component: ScalesPage,
    exact: true,
    permission: 'scale/r',
  },
  {
    path: '/cadastros/escalas/cadastrar/:unit_id',
    component: ScalesRegistration,
    exact: true,
    permission: 'scale/c',
  },
  {
    path: '/cadastros/escalas/cadastrar/:unit_id/:scale_id',
    component: ScalesRegistration,
    exact: true,
    permission: 'scale/c',
  },
  {
    path: '/escala-completa/:unit_id/:id',
    component: FullScales,
    exact: true,
    permission: 'scale/r',
  },
  {
    path: '/escala-completa/:unit_id/:id/:create',
    component: FullScales,
    exact: true,
    permission: 'scale/c',
  },
  {
    path: '/escala-do-dia/specific',
    component: SpecificScalePage,
    exact: true,
    permission: null,
  },
  {
    path: '/cadastros/empresas',
    component: Enterprises,
    exact: true,
    permission: 'company/r',
  },
  {
    path: '/cadastros/empresas/cadastrar',
    component: EnterpriseRegisterPage,
    exact: true,
    permission: 'company/c',
  },
  {
    path: '/cadastros/empresas/editar/:id',
    component: EnterpriseUpdatePage,
    exact: true,
    permission: 'company/u',
  },
  {
    path: '/cadastros/profissionais',
    component: ProfessionalPage,
    exact: true,
    permission: 'professional/r',
  },
  {
    path: '/cadastros/profissional/cadastrar',
    component: ProfessionalRegister,
    exact: true,
    permission: 'professional/c',
  },
  {
    path: '/cadastros/profissional/editar/:id',
    component: ProfissionalEditPage,
    exact: true,
    permission: 'professional/u',
  },
  {
    path: '/cadastros/administradores',
    component: AdminPageList,
    exact: true,
    permission: 'user/r',
  },
  {
    path: '/cadastros/administradores/cadastrar',
    component: AdminPageCreate,
    exact: true,
    permission: 'user/c',
  },
  {
    path: '/cadastros/administradores/editar/:id',
    component: AdminUpdatePage,
    exact: true,
    permission: 'user/u',
  },
  {
    path: '/relatorios',
    component: ReportPage,
    exact: true,
    permission: null,
  },
  {
    path: '/relatorios/plantoes',
    component: ReportShiftsPage,
    exact: true,
    permission: null,
  },
];
