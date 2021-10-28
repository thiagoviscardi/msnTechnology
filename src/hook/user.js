import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useUser = () => {
  const { requestIntercept, saveUserLogged } = useAuth();

  const [userList, setUserList] = useState({
    list: [],
    loadingList: false,
    errorList: null,
    total: 0,
  });
  const [user, setUser] = useState({
    userData: {},
    loadingData: false,
    error: null,
  });

  const [password, setPassword] = useState({
    passwordData: '',
    loadingPassword: false,
    errorPassword: null,
  });

  const [editUser, setEditUser] = useState({
    userData: {},
    erroruserData: null,
    loadingEditUser: false,
  });
  const [avatarUser, setAvatarUser] = useState({
    avatar: {},
    avatarLoading: false,
    avatarError: null,
  });

  const getUserId = async (id) => {
    setUser({ ...user, loadingData: true });
    try {
      const response = await requestIntercept(api.get, `/v1/users/${id}`);
      if (response.status !== 200) {
        throw response;
      }
      setUser({
        ...user,
        userData: response.data.data,
        loadingData: false,
      });
    } catch (err) {
      setUser({ ...user, loadingData: false, error: err });
    }
  };
  const editPassword = async (id, pass) => {
    try {
      const response = await api.put(`/v1/users/${id}/pass`, {
        password: pass,
      });
      if (response.status !== 200) {
        throw response;
      }
      setPassword({
        ...password,
        passwordData: response.data.data,
      });
      return response;
    } catch (err) {
      setPassword({ ...password, errorPassword: err });
    }
  };
  const editUserData = async (payLoad, id) => {
    setEditUser({ ...editUser, loadingEditUser: true });
    const { name, genre, cpf, rg, group, company, units, cell_phone, email } =
      payLoad;
    try {
      const response = await api.put(`/v2/admin/users/${id}`, {
        name,
        genre,
        cpf,
        rg,
        group,
        company,
        units,
        cell_phone,
        email,
      });
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }
      setEditUser({
        ...editUser,
        userData: response.data.data,
        loadingEditUser: false,
      });
      saveUserLogged(response.data.data);
    } catch (err) {
      setEditUser({
        ...editUser,
        erroruserData: err,
        loadingEditUser: false,
      });
    }
  };

  const criateImageUser = async ({ id, file }) => {
    setAvatarUser({
      ...avatarUser,
      avatarLoading: true,
    });
    const data = new FormData();
    data.append('picture', file);
    try {
      const response = await api.post(`/v1/users/${id}/picture`, data);
      if (response.status !== 200) {
        throw response;
      }
      setAvatarUser({
        ...avatarUser,
        avatar: response.data.data,
        avatarLoading: false,
      });
      saveUserLogged(response.data.data);
    } catch (err) {
      setAvatarUser({ ...avatarUser, avatarError: err, avatarLoading: false });
    }
  };

  const getUsers = async (params) => {
    const { page, perPage, search } = params;
    setUserList({ ...userList, loadingList: true });
    try {
      const response = await requestIntercept(api.get, `/v1/users`, {
        page,
        per_page: perPage,
        search,
      });
      if (response.status !== 200) {
        throw response;
      }
      setUserList((oldState) => ({
        ...oldState,
        loadingList: false,
        list: response.data.data,
        total: response.data.total,
      }));
    } catch (err) {
      setUserList({ ...user, loadingList: false, errorList: err.msg });
    }
  };

  const getUserStandardInformation = async ({ id }) => {
    setUser({ ...user, loading: true });
    try {
      const response = await requestIntercept(
        api.get,
        `/v2/admin/users/${id}/standard_information`
      );
      if (response.status !== 200) {
        throw response;
      }
      setUser((oldState) => ({
        ...oldState,
        loading: false,
        data: response.data.data,
        total: response.data.total,
      }));
    } catch (err) {
      setUser({ ...user, loading: false, error: err });
    }
  };

  return {
    user,
    userList,
    getUsers,
    password,
    editUser,
    avatarUser,

    // func
    getUserStandardInformation,
    getUserId,
    editPassword,
    editUserData,
    criateImageUser,
  };
};

export default useUser;
