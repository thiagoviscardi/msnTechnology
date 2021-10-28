import { useAuth } from 'hook/auth';
import ls from 'localstorage-slim';

function HasPermission(permission = null) {
  const { userPermissions } = useAuth(); // userLogged to do thiago
  const userLogged = { group: { id: 1 } };
  userLogged.group.id = 1;
  const isAdmin = userLogged.group.id == 1;
  const permissions =
    userPermissions.dataPermissions.length == 0
      ? ls.get('plantaoextra@userPermissions', { decrypt: true })
      : userPermissions.dataPermissions;
  return isAdmin ||
    (Object.keys(permissions).length !== 0 && permission != null)
    ? isAdmin || Object.prototype.hasOwnProperty.call(permissions, permission)
    : false;
}

export default HasPermission;
