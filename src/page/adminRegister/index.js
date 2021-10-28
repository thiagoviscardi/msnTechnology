import React from 'react';
import { useStyles, FormContainer } from './styles';
import Layout from 'shared/component/Layout';
import { Typography, Button, Icon, Chip } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import * as Yup from 'yup';
import * as ReadImage from 'blueimp-load-image';
import useUnit from 'hook/unit';
import CustomMaskField from 'shared/component/forms/CustomMaskField';
import CustomSelect from 'shared/component/forms/CustomSelect';
import ProfileButton from './components/ProfileButton';
import ProfileImage from 'shared/forms/UnitForm/components/ProfileImage';
import ImageMessage from 'shared/forms/UnitForm/components/ImageMessage';
import FooterButton from './components/FooterButton';
import Tabs from 'shared/component/tabs';
import useEnterprise from 'hook/enterprises';
import ModalListHospital from './components/ModalListHospital';
import validators from 'utils/validators';
import useAdmin from 'hook/admin';
import usePermissions from 'hook/permissions';

export default function AdminRegister() {
  const classes = useStyles();
  const { registerLogoUnit } = useUnit();
  const { registerAdmin } = useAdmin();
  const { permissions, getPermissions, loadingPermissions } = usePermissions();
  const { enterpriseList, getEnterprise, enterpriseLoading } = useEnterprise();
  const [state, setState] = React.useState({
    previewUrl: '',
    image: '',
    value: 0,
    page: 1,
    perPage: 10,
    search: '',
    openModalHospital: false,
    enterprises: [],
    permissionsList: [],
    pageUnit: 1,
    perPageUnits: 20,
    searchUnits: '',
    pagePermissions: 1,
    perPagePermissions: 20,
  });
  const {
    previewUrl,
    value,
    page,
    perPage,
    openModalHospital,
    enterprises,
    permissionsList,
    pageUnit,
    perPageUnits,
    searchUnits,
    pagePermissions,
    perPagePermissions,
  } = state;
  const { getUnits, units } = useUnit();

  const { dataUnits, totalUnits, loadingUnits } = units;

  const totalPages = Math.ceil(totalUnits / perPageUnits);
  React.useEffect(() => {
    getEnterprise(perPage, page);
  }, [page]);

  React.useEffect(() => {
    getPermissions(perPagePermissions, pagePermissions);
  }, [pagePermissions]);
  React.useEffect(() => {
    getUnits(pageUnit, perPageUnits, searchUnits);
  }, [pageUnit, searchUnits]);

  React.useEffect(() => {
    if (enterpriseList && enterpriseList.length > 0) {
      const labelEnterprise = enterpriseList.map((enterprise) => ({
        label: enterprise.name,
        value: enterprise.id,
      }));
      setState({ ...state, enterprises: [...labelEnterprise] });
    }
  }, [enterpriseList]);
  React.useEffect(() => {
    if (permissions && permissions.length > 0) {
      const labelPermissions = permissions.map((permissions) => ({
        label: permissions.name,
        value: permissions.id,
      }));
      setState({ ...state, permissionsList: [...labelPermissions] });
    }
  }, [permissions]);
  const initialValues = {
    name: '',
    lastName: '',
    cpf: '',
    cellPhone: '',
    email: '',
    enterprises: '',
    permissions: '',
  };

  const schema = Yup.object().shape({
    name: Yup.string().required('Obrigatório'),
    lastName: Yup.string().required('Obrigatório'),
    cpf: Yup.string()
      .min(11, 'cpf incompleto')
      .test(...validators.cpfInvalid('cpf inválido'))
      .required('Obrigatório'),
    cellPhone: Yup.string()
      .min(10, 'Telefone Incompleto')
      .required('Obrigatório'),
    email: Yup.string().email('Email inválido').required('Obrigatório'),
    enterprises: Yup.string().required('obrigatório'),
    permissions: Yup.string().required('obrigatório'),
  });

  const pictureSubmit = (file) => {
    registerLogoUnit(file);
  };

  const formSubmit = (values) => {
    registerAdmin(values);
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

  const [chipHospital, setchipHospital] = React.useState([]);

  const handleDeleteHospital = (chipToDelete) => () => {
    setchipHospital((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handleOpenModal = () => {
    setState({ ...state, openModalHospital: true });
    getUnits(pageUnit, perPageUnits, searchUnits);
  };
  const handleClose = () => {
    setState({ ...state, openModalHospital: false });
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
  const handleDateChange = () => {};
  return (
    <Layout
      title="Administradores"
      handleDateChange={handleDateChange}
      calendarWeek={false}
      isLoading={false}
      backArrow={true}
    >
      <Tabs value={value} index={0}>
        <div className={classes.imageContainer}>
          {previewUrl ? (
            <ProfileImage
              readImageFile={readImageFile}
              previewUrl={previewUrl}
              logoSubmit={pictureSubmit}
            />
          ) : (
            <ProfileButton
              readImageFile={readImageFile}
              logoSubmit={pictureSubmit}
            />
          )}
          <ImageMessage />
        </div>
        <Formik
          onSubmit={formSubmit}
          validationSchema={schema}
          initialValues={initialValues}
          validateOnBlur
          values
        >
          {({ setFieldValue, setFieldTouched, handleChange }) => (
            <Form>
              <Typography className={classes.dataHospital}>
                Dados pessoais
              </Typography>
              <FormContainer style={{ justifyContent: 'flex-start' }}>
                <div style={{ width: '31.9%', marginRight: 32 }}>
                  <Field
                    label="Nome"
                    style={{ width: 488 }}
                    name="name"
                    variant="outlined"
                    component={CustomTextField}
                  />
                </div>
                <div style={{ width: '31.9%' }}>
                  <Field
                    label="Sobrenome"
                    style={{ width: 488 }}
                    name="lastName"
                    variant="outlined"
                    component={CustomTextField}
                  />
                </div>
              </FormContainer>
              <FormContainer style={{ justifyContent: 'flex-start' }}>
                <div style={{ width: '14.9%', marginRight: 32 }}>
                  <Field
                    id="cpf"
                    label="CPF"
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
                    name="cellPhone"
                    id="cellPhone"
                    style={{ width: '100%' }}
                    label="Telefone"
                    mask=""
                    format="(##) ####-####"
                    variant="outlined"
                    component={CustomMaskField}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ width: '31.9%' }}>
                  <Field
                    label="E-mail"
                    style={{ width: '100%' }}
                    name="email"
                    variant="outlined"
                    component={CustomTextField}
                  />
                </div>
              </FormContainer>
              <Typography
                style={{ marginTop: 48 }}
                className={classes.dataHospital}
              >
                Informações administrativas
              </Typography>
              <FormContainer style={{ justifyContent: 'flex-start' }}>
                <div style={{ width: '31.9%', marginRight: 32 }}>
                  <Field
                    name="enterprises"
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    placeholder={'Empresa responsável'}
                    loading={enterpriseLoading}
                    options={enterprises}
                    setState={() => {}}
                    menuList={() => ({ height: 116, overflowY: 'auto' })}
                    component={CustomSelect}
                  />
                </div>
                <div style={{ width: '31.9%' }}>
                  <Field
                    name="permissions"
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    placeholder="Perfil de permissões"
                    loading={loadingPermissions}
                    options={permissionsList}
                    setState={() => {}}
                    menuList={() => ({ height: 116, overflowY: 'auto' })}
                    component={CustomSelect}
                  />
                </div>
              </FormContainer>

              <Typography
                style={{ marginTop: 48 }}
                className={classes.dataHospital}
              >
                Hospitais Permitidos
              </Typography>
              <div style={{ display: 'flex', minWidth: '100%' }}>
                <div component="ul" className={classes.chipContainerHospital}>
                  {chipHospital.map((data) => {
                    return (
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
                    );
                  })}
                </div>
                <div>
                  <Button
                    className={classes.addSpecialty}
                    onClick={handleOpenModal}
                  >
                    <Icon style={{ marginRight: 10, fontSize: 20 }}>
                      add_circle_outline
                    </Icon>
                    Adicionar hospital
                  </Button>
                </div>
                {openModalHospital && (
                  <ModalListHospital
                    hospitais={dataUnits}
                    total={totalPages}
                    loading={loadingUnits}
                    openModal={openModalHospital}
                    handleClose={handleClose}
                    searchFunction={searchFunction}
                    onScrollBottom={onScrollBottom}
                    adicionar={(selected) => {
                      setchipHospital(
                        selected.map((s) => {
                          return { key: s.id, label: s.name };
                        })
                      );
                    }}
                  />
                )}
              </div>
              <FooterButton type="submit" />
            </Form>
          )}
        </Formik>
      </Tabs>
    </Layout>
  );
}
