import React, { useState, createContext, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import api from 'service/api';
import interceptResponse from 'service/interceptResponse';
import ls from 'localstorage-slim';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const tokenData = localStorage.getItem('plantaoextra@token');
  const [authToken, setAuthToken] = useState(
    JSON.parse(tokenData) ? JSON.parse(tokenData) : ''
  );
  const userData = localStorage.getItem('plantaoextra@user');
  const [userLogged, setUserLogged] = useState(
    JSON.parse(userData) ? JSON.parse(userData) : ''
  );
  const [userPermissions, setUserPermissions] = useState({
    dataPermissions: [],
    loadingPermissions: false,
    errorPermissions: null,
  });
  const saveToken = (token) => {
    if (token) {
      localStorage.setItem('plantaoextra@token', JSON.stringify(token));
      setAuthToken(token);
    } else {
      const tokenData = localStorage.getItem('plantaoextra@token');
      if (tokenData !== 'undefined' && tokenData) {
        const tokenParse = JSON.parse(tokenData);
        api.setHeader('Authorization', `Bearer ${tokenParse.access_token}`);
        setAuthToken(tokenParse);
      }
    }
  };

  const updateUserLogged = async () => {
    const userFromStorage = localStorage.getItem('plantaoextra@user');
    if (userFromStorage !== 'undefined' && userFromStorage) {
      const user = JSON.parse(userFromStorage);
      const userUpdated = await getUserById(user.id);
      saveUserLogged(userUpdated);
    }
  };

  const saveUserLogged = (user) => {
    if (user) {
      localStorage.setItem('plantaoextra@user', JSON.stringify(user));
      setUserLogged(user);
      setIsAuth(true);
    } else {
      const userLoggedData = localStorage.getItem('plantaoextra@user');
      if (userLoggedData !== 'undefined' && userLoggedData) {
        setUserLogged(JSON.parse(userLoggedData));
        setIsAuth(true);
      }
    }
  };

  React.useEffect(() => {
    saveToken();
    saveUserLogged();
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      api.setHeader('Authorization', 'cGxhbnRhb2JhY2tvZmZpY2U6YnJ1eW5wYW4=');
      const response = await api.post('/v1/oauth/token', {
        username: email,
        password,
        grant_type: 'password',
      });
      if (response.status !== 200) {
        throw response;
      }
      api.setHeader('Authorization', `Bearer ${response.data.access_token}`);
      const permissions = await requestIntercept(
        api.get,
        '/v1/oauth/permissions'
      );
      setUserPermissions({
        ...userPermissions,
        dataPermissions: permissions.data,
      });
      ls.set('plantaoextra@userPermissions', permissions.data, {
        encrypt: true,
      });
      saveToken(response.data);

      const user = await getUserLogged(response.data.access_token);
      saveUserLogged(user);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.data.msg);
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    const { refresh_token } = authToken;
    try {
      api.setHeader('Authorization', `Bearer ${refresh_token}`);
      const response = await api.post('/v1/oauth/refresh');
      if (response.status !== 200) {
        throw response;
      }
      api.setHeader('Authorization', `Bearer ${response.data.access_token}`);
      saveToken(response.data);
      updateUserLogged();
    } catch (e) {
      setError('Não foi possível autenticar');
      logout();
    }
    setLoading(false);
  };

  const requestIntercept = async (
    func,
    url,
    params = null,
    data = null,
    notIntercept = false
  ) => {
    const response = await func(url, params, data);
    if (response.status === 401) {
      await refreshToken();
      const responseTakeTwo = await func(url, params, data);
      if (responseTakeTwo.status === 401) {
        logout();
      }
      return responseTakeTwo;
    }
    const isValid = notIntercept ? true : interceptResponse(response, false);
    if (isValid) {
      return response;
    }
  };

  const getUserById = async (user_id) => {
    setLoading(true);
    try {
      const response = await requestIntercept(api.get, `/v1/users/${user_id}`);
      return response.data.data;
    } catch (err) {
      setError('Erro ao buscar na API');
    }
    setLoading(false);
  };

  const getUserLogged = async (access_token) => {
    setLoading(true);
    try {
      const access_token_decode = jwt_decode(access_token);
      var user_id = access_token_decode.identity.user_id;
      const response = await requestIntercept(api.get, `/v1/users/${user_id}`);
      return response.data.data;
    } catch (err) {
      setError('Erro ao buscar na API');
    }
    setLoading(false);
  };

  const getUserPermissions = async () => {
    setUserPermissions({ ...userPermissions, loadingPermissions: true });
    try {
      if (authToken != '') {
        api.setHeader('Authorization', `Bearer ${authToken.access_token}`);
        const response = await requestIntercept(
          api.get,
          '/v1/oauth/permissions'
        );
        if (response.status !== 200) {
          throw response;
        }
        ls.set('plantaoextra@userPermissions', response.data, {
          encrypt: true,
        });
        setUserPermissions({
          ...userPermissions,
          loadingPermissions: false,
          dataPermissions: response.data,
        });
      }
    } catch (err) {
      setUserPermissions({
        ...userPermissions,
        loadingPermissions: false,
        errorPermissions: err,
      });
    }
  };

  const logout = () => {
    setIsAuth(false);
    setAuthToken();
    setUserLogged();
    localStorage.removeItem('plantaoextra@token');
    localStorage.removeItem('plantãoExtra@hospital');
    localStorage.removeItem('plantaoextra@user');
    localStorage.removeItem('calendarDayPiker');
    localStorage.removeItem('selectedScale');
    localStorage.removeItem('hospTabSelected');
    localStorage.removeItem('selectedLocalUnit');
    localStorage.removeItem('selectedSchedule');
    localStorage.removeItem('selectedUnitProfSchedule');
    localStorage.removeItem('plantaoextra@statusProfessional');
    localStorage.removeItem('plantaoextra@professional');
    localStorage.removeItem('plantaoextra@typeProfessional');
    localStorage.removeItem('plantaoextra@admin');
    localStorage.removeItem('plantaoextra@userPermissions');
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        isAuth,
        userLogged,
        userPermissions,
        getUserPermissions,
        // func
        login,
        logout,
        requestIntercept,
        setUserLogged,
        saveUserLogged,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('The context The Perfil must be within a valid provider');
  }
  return context;
}
