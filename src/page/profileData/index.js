import React from 'react';
import { useStyles, FormContainer } from './styles';
import Layout from 'shared/component/Layout';
import { Typography, Button, Icon } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import * as Yup from 'yup';
import validators from 'utils/validators';
import CustomMaskField from 'shared/component/forms/CustomMaskField';
import FooterButton from './components/footerButoon';
import CustomSelect from 'shared/component/forms/CustomSelect';
import Chip from '@material-ui/core/Chip';
import ModalListHospital from 'page/adminRegister/components/ModalListHospital';
import ModalEditPassword from './components/modalEditPassword';
import useUnit from 'hook/unit';
import useUser from 'hook/user';
import * as ReadImage from 'blueimp-load-image';
import ProfileImage from './components/imageProfile';
import ProfileButton from './components/ProfileButton';
import ImageMessage from './components/imageMessage';
import useGroups from 'hook/useGroups';
import { useAuth } from 'hook/auth';
import useCompany from 'hook/companies';

export default function ProfileData() {
  const classes = useStyles();
  const { getUnits, units } = useUnit();
  const { editUserData, criateImageUser, editUser } = useUser();
  const { loadingEditUser } = editUser;
  const { getGroups, groups } = useGroups();
  const { dataGroup } = groups;
  const { getCompanies, companies } = useCompany();
  const { dataCompany } = companies;
  // const { userLogged } = useAuth(); // to do thiago voltar ao userLogged anterios
  const userLogged = { group: { id: 1 } };
  userLogged.group.id = 1;
  const [genreType, setGenreType] = React.useState('');
  const [group, setGroup] = React.useState({ id: 0 });
  const [company, setCompany] = React.useState({ id: 0 });
  const [open, setOpen] = React.useState('');
  const [state, setState] = React.useState({
    openModalHospital: false,
    pageUnit: 1,
    perPageUnits: 20,
    searchUnits: '',
    openModalEditPassword: false,
    previewUrl: '',
    group: '',
    search: '',
    groupsTotal: [],
    companyTotal: [],
    company: '',
    type: 1,
    pageGroup: 1,
    perPageGroup: 10,
    page: 1,
    perPage: 10,
    searchCompany: '',
  });
  const {
    openModalHospital,
    pageUnit,
    perPageUnits,
    searchUnits,
    openModalEditPassword,
    previewUrl,
    type,
    pageGroup,
    perPageGroup,
    groupsTotal,
    companyTotal,
    page,
    perPage,
    searchCompany,
  } = state;
  const { dataUnits, totalUnits, loadingUnits } = units;
  const [initialValues, setInitialValues] = React.useState({
    name: '',
    cpf: '',
    email: '',
    cell_phone: '',
    company: { id: 0 },
    group: { id: 0 },
    previewUrl: '',
    units: [],
    rg: '',
    genre: '',
  });
  const schema = Yup.object().shape({
    name: Yup.string().required('Obrigatório'),
    cpf: Yup.string()
      .min(11, 'CPF incompleto')
      .test(...validators.cpfInvalid('CPF inválido'))
      .required('Obrigatório'),
    email: Yup.string().required('Obrigatório'),
    cell_phone: Yup.string().required('Obrigatório'),
    rg: Yup.string().required('Obrigatório'),
    genre: Yup.string().required('Obrigatório'),
  });
  const handleOpenModal = () => {
    setState({ ...state, openModalHospital: true });
  };
  const handleCloseModalHospital = () => {
    setState({ ...state, openModalHospital: false });
  };
  const handleOpenModalEdit = () => {
    setState({ ...state, openModalEditPassword: true });
  };
  const handleCloseModalEdit = () => {
    setState({ ...state, openModalEditPassword: false });
  };

  React.useEffect(() => {
    getUnits(pageUnit, perPageUnits, searchUnits);
  }, [pageUnit, searchUnits]);

  const totalPages = Math.ceil(totalUnits / perPageUnits);
  React.useEffect(() => {
    if (userLogged) {
      userLogged.genre === 'M'
        ? setGenreType({ value: 'M', label: 'Masculino' })
        : setGenreType({ value: 'F', label: 'Feminino' });
      setInitialValues(userLogged);
    }
  }, [userLogged]);

  React.useEffect(() => {
    getGroups(type, perPageGroup, pageGroup);
  }, [type, pageGroup]);

  React.useEffect(() => {
    getCompanies(page, perPage, searchCompany);
  }, [page, searchCompany]);

  React.useEffect(() => {
    if (userLogged && userLogged.image_url) {
      setState({ ...state, previewUrl: userLogged.image_url });
    }
  }, [userLogged]);

  const options = [
    { value: 'F', label: 'Feminino' },
    { value: 'M', label: 'Masculino' },
  ];

  React.useEffect(() => {
    if (userLogged && userLogged.group) {
      const labelGroup = {
        value: userLogged.group.id,
        label: userLogged.group.name,
      };
      setGroup({ id: labelGroup });
    }
    if (userLogged && userLogged.company) {
      const labelCompany = {
        value: userLogged.company.id,
        label: userLogged.company.name,
      };
      setCompany({ id: labelCompany });
    }
  }, [userLogged]);

  React.useEffect(() => {
    if (dataGroup && dataGroup.length > 0) {
      const labelGroups = dataGroup.map((group) => ({
        label: group.name,
        value: group.id,
      }));
      setState({ ...state, groupsTotal: labelGroups });
    }
  }, [dataGroup]);

  React.useEffect(() => {
    if (dataCompany && dataCompany.length > 0) {
      const labelCompany = dataCompany.map((company) => ({
        label: company.name,
        value: company.id,
      }));
      setState({ ...state, companyTotal: labelCompany });
    }
  }, [dataCompany]);
  const paginateCompany = () => {
    setState({ ...state, page: page + 1 });
  };
  const paginateToTop = () => {
    setState({ ...state, page: page - 1 });
  };
  const paginateGroup = () => {
    setState({ ...state, pageGroup: page + 1 });
  };
  const paginateToTopGroup = () => {
    setState({ ...state, pageGroup: page - 1 });
  };
  const search = (companySearch) => {
    setState({
      ...state,
      searchCompany: companySearch,
      page: 1,
    });
  };

  const handleChangeCompany = (val) => {
    setCompany(val);
  };
  const handleChangeGroups = (val) => {
    setGroup(val);
  };
  const handleChangeGenre = (val) => {
    setGenreType(val);
  };
  const formSubmit = (values) => {
    const unitsId = chipHospital.map((item) => ({
      id: item.key,
    }));
    editUserData(
      {
        ...values,
        units: unitsId,
        group: { id: values.group.id },
        company: { id: values.company.id },
      },
      userLogged.id
    );
    setOpen(true);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const avatarSubmit = (file) => {
    if (userLogged.id) criateImageUser({ id: userLogged.id, file });
  };
  const searchFunction = (searchInput) => {
    searchInput.target.value === ''
      ? setState({
          ...state,
          searchUnits: searchInput.target.value,
          pageUnit: 1,
        })
      : setState({
          ...state,
          searchUnits: searchInput.target.value,
        });
  };
  const onScrollBottom = (event) => {
    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight;

    if (bottom && !loadingUnits && pageUnit < totalPages) {
      setState({ ...state, pageUnit: pageUnit + 1 });
    }
    if (event.currentTarget.scrollTop === 0 && pageUnit > 1) {
      setState({ ...state, pageUnit: pageUnit - 1 });
    }
  };

  const [chipHospital, setchipHospital] = React.useState([]);
  React.useEffect(() => {
    if (userLogged && userLogged.units && userLogged.units.length > 0) {
      const { units } = userLogged;
      setchipHospital([
        ...units.map((s) => {
          return { key: s.id, label: s.name };
        }),
      ]);
    }
  }, [userLogged]);
  const handleDeleteHospital = (chipToDelete) => () => {
    setchipHospital((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const readImageFile = (file) => {
    var options = { canvas: true };
    ReadImage.parseMetaData(file, (data) => {
      if (data.exif && data.exif.get('Orientation')) {
        options.orientation = data.exif.get('Orientation');
      }
      ReadImage(
        file,
        (img) => {
          setState({
            ...state,
            previewUrl: img.toDataURL(),
            image: img.toDataURL(),
          });
        },
        options
      );
    });
  };
  const isSystem = () => userLogged.group.id === 1;

  return (
    <Layout title="Meu perfil" showToday backArrow>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography className={classes.registerTitle}>
          Dados do usuário
        </Typography>
      </div>
      <div className={classes.imageContainer}>
        {previewUrl ? (
          <ProfileImage
            readImageFile={readImageFile}
            previewUrl={previewUrl}
            avatarSubmit={avatarSubmit}
          />
        ) : (
          <ProfileButton
            type="avatar"
            readImageFile={readImageFile}
            avatarSubmit={avatarSubmit}
          />
        )}
        <ImageMessage content="Recomendamos que a imagem do sua foto tenha no mínimo o tamanho de 208 x 208 px." />
      </div>
      <Formik
        onSubmit={formSubmit}
        validationSchema={schema}
        initialValues={initialValues}
        validateOnBlur
        enableReinitialize
      >
        {({
          setFieldValue,
          setFieldTouched,
          handleChange,
          values,
          handleSubmit,
        }) => (
          <Form>
            <FormContainer style={{ justifyContent: 'flex-start' }}>
              <div style={{ width: '31.9%', marginRight: 32 }}>
                <Field
                  value={values.name && values.name}
                  label="Nome"
                  style={{ width: '100%' }}
                  name="name"
                  variant="outlined"
                  component={CustomTextField}
                />
              </div>
              <div style={{ width: '31.9%', marginRight: 32 }}>
                <Field
                  label="email"
                  value={values.email && values.email}
                  style={{ width: '100%' }}
                  name="email"
                  variant="outlined"
                  component={CustomTextField}
                />
              </div>
              <div style={{ width: '31.9%' }}>
                <Button
                  onClick={handleOpenModalEdit}
                  className={classes.buttonPassword}
                >
                  <Icon style={{ marginRight: 18 }}>vpn_key_outlined</Icon>
                  Alterar senha
                </Button>
                {openModalEditPassword && (
                  <ModalEditPassword
                    openModal={openModalEditPassword}
                    handleClose={handleCloseModalEdit}
                  />
                )}
              </div>
            </FormContainer>

            <FormContainer
              style={{ justifyContent: 'flex-start', marginTop: 32 }}
            >
              <div style={{ width: '14.9%', marginRight: 32 }}>
                <Field
                  label="CPF"
                  value={values.cpf && values.cpf}
                  style={{ width: '100%' }}
                  name="cpf"
                  mask=""
                  format="###.###.###-##"
                  variant="outlined"
                  component={CustomMaskField}
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: '14.9%', marginRight: 32 }}>
                <Field
                  name="cell_phone"
                  value={values.cell_phone && values.cell_phone}
                  style={{ width: '100%' }}
                  label="Telefone"
                  mask=""
                  format="(##) ####-####"
                  variant="outlined"
                  component={CustomMaskField}
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: '14.9%', marginRight: 32 }}>
                <Field
                  name="rg"
                  value={values.rg && values.rg}
                  style={{ width: '100%' }}
                  label="RG"
                  mask=""
                  variant="outlined"
                  component={CustomMaskField}
                  onChange={handleChange}
                />
              </div>
              <div style={{ width: '14.9%' }}>
                <Field
                  name="genre"
                  value={genreType}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  placeholder="Sexo"
                  handleChange={(val) => {
                    handleChangeGenre(val);
                    setFieldValue('genre', val.value);
                  }}
                  options={options}
                  menuList={() => ({ height: 75, overflowY: 'auto' })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  component={CustomSelect}
                />
              </div>
            </FormContainer>
            <Typography
              style={{ marginBottom: 24, marginTop: 48 }}
              className={classes.dataCompany}
            >
              Informações administrativas{' '}
            </Typography>
            <FormContainer style={{ justifyContent: 'flex-start' }}>
              <div style={{ width: '31.9%', marginRight: 32 }}>
                <Field
                  name="company.id"
                  value={company.id}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  placeholder="Companhia responsável"
                  handleChange={(val) => {
                    handleChangeCompany(val);
                    setFieldValue('company.id', val.value);
                  }}
                  options={companyTotal}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  searchItem={search}
                  pagination={paginateCompany}
                  toTopPagination={paginateToTop}
                  component={CustomSelect}
                  isDisabled={!isSystem()}
                />
              </div>
              <div style={{ width: '31.9%' }}>
                <Field
                  name="group.id"
                  value={group.id}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  placeholder="Grupo"
                  handleChange={(val) => {
                    handleChangeGroups(val);
                    setFieldValue('group.id', val.value);
                  }}
                  options={groupsTotal}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  pagination={paginateGroup}
                  toTopPagination={paginateToTopGroup}
                  isDisabled={!isSystem()}
                  component={CustomSelect}
                />
              </div>
            </FormContainer>
            <div>
              <Typography className={classes.text}>
                Hospitais Permitidos
              </Typography>
            </div>
            <div style={{ display: 'flex', minWidth: '100%' }}>
              <div className={classes.chipContainerHospital}>
                {chipHospital.map((data) => {
                  return (
                    <>
                      <div key={data.key}>
                        <Chip
                          style={{
                            fontSize: 16,
                            color: '#505255',
                            justifyContent: 'space-around',
                            marginRight: 16,
                          }}
                          label={data.label}
                          onDelete={
                            data.label === 'React'
                              ? undefined
                              : handleDeleteHospital(data)
                          }
                          className={classes.chipHospital}
                        />
                      </div>
                    </>
                  );
                })}
                <div>
                  <Button
                    className={classes.addHospital}
                    onClick={handleOpenModal}
                  >
                    <Icon style={{ marginRight: 10, fontSize: 20 }}>
                      add_circle_outline
                    </Icon>
                    Adicionar hospital
                  </Button>
                </div>
              </div>
              {openModalHospital && (
                <ModalListHospital
                  name="units"
                  hospitais={dataUnits}
                  total={totalPages}
                  loading={loadingUnits}
                  openModal={openModalHospital}
                  handleClose={handleCloseModalHospital}
                  searchFunction={searchFunction}
                  onScrollBottom={onScrollBottom}
                  adicionar={(selected) => {
                    setchipHospital([
                      ...chipHospital,
                      ...selected.map((s) => {
                        return { key: s.id, label: s.name };
                      }),
                    ]);
                    setState({ ...state, openModalHospital: false });
                  }}
                />
              )}
            </div>
            <FooterButton
              type="submit"
              onClick={handleSubmit}
              loading={loadingEditUser}
              openAlert={open}
              handleCloseAlert={handleCloseAlert}
            />
          </Form>
        )}
      </Formik>
    </Layout>
  );
}
