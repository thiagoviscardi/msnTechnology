import React, { useEffect } from 'react';
import {
  useStyles,
  DefaultContainer,
  InputContainer,
  InputItem,
} from './styles';
import {
  Typography,
  Button,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import CustomSelect from 'shared/component/selectComponent';
import CustomSelectComplete from 'shared/component/forms/CustomSelect';
import TextField from '@material-ui/core/TextField';
import useSpecialty from 'hook/specialty';
import useScales from 'hook/scales';
import useUser from 'hook/user';
import { useGroups } from 'hook/groups/index';
import { useParams } from 'react-router-dom';
import {
  RadioInput,
  RadioInputGroup,
} from 'shared/component/maskedField/checkBox';
import Layout from 'shared/component/Layout';
import CurrencyInput from 'shared/component/maskedField/currencyInput';
import { ModalResponseAlert } from 'page/Schedule/WeekSchedule/components/ModalResponseAlert';

export default function ScalesRegistration() {
  const { specialty, getSpecialty } = useSpecialty();

  const { data, getList } = useGroups();
  const { dataSpecialty } = specialty;
  const { unit_id } = useParams();
  const { scale_id } = useParams();
  const { getUsers, userList } = useUser();
  const { list, total, loadingList } = userList;
  const [openSendFinish, setOpenSendFinish] = React.useState(false);
  const [doctorsOptions, setDoctorsOptionsToSelect] = React.useState([]);
  const [userFilters, setUserFilters] = React.useState({
    page: 1,
    perPage: 30,
    search: '',
  });
  const totalPage = Math.ceil(total / userFilters.perPage);
  const searchUser = (e) => {
    setUserFilters({ ...userFilters, search: e, page: 1 });
  };
  const debounce = function (fn, d) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, d);
    };
  };
  const debounceForData = debounce(searchUser, 300);

  const paginationUser = () => {
    userFilters.page < totalPage &&
      setUserFilters({ ...userFilters, page: userFilters.page + 1 });
  };
  const toTopPaginationUser = () => {
    userFilters.page > 1 &&
      setUserFilters({ ...userFilters, page: userFilters.page - 1 });
  };

  useEffect(() => {
    userFilters.search && getUsers(userFilters);
  }, [userFilters]);
  useEffect(() => {
    userFilters.search
      ? setDoctorsOptionsToSelect([
          ...list.map((item) => ({ label: item.name, value: item.id })),
        ])
      : setDoctorsOptionsToSelect([]);
  }, [list]);

  useEffect(() => {
    if (typeof scale_id !== 'undefined') {
      getSpecificScale(unit_id, scale_id).then((data) => {
        setInitialValues({
          name: data.name,
          type_remuneration:
            data?.type_remuneration === 2 ? '' : data.type_remuneration,
          status: data.status,
          scale_type: {
            id: data.scale_type?.id,
            name: data.scale_type?.name,
          },
          group_id: data.group?.id,
          specialty: data.specialty,
          specialty_id: data.specialty?.id,
          coordinator: {
            value: data.coordinator?.id,
            label: data.coordinator?.name,
          },
          technical_manager: {
            id: data.technical_manager?.id,
          },
          budget: data.budget,
          price: data.price,
          procedure_id: data.procedure?.id,
          signature_is_required: data.signature_is_required,
          signature_is_automatic: data.signature_is_automatic,
          professional_type: verifyProfessionalType(data.specialty),
        });
        setCoordinator({
          label: data.coordinator?.name,
          value: data.coordinator?.id,
        });
        setTechnicalManager({
          label: data.technical_manager?.name,
          value: data.technical_manager?.id,
        });
      });
    } else {
      setInitialValues({ ...initialValues, name: '' });
    }
    getSpecialty({});
    getList({ type: '2', per_page: '999' });
  }, []);

  const verifyProfessionalType = (specialty) => (specialty ? 0 : 1);

  const { status, loading, createScale, getSpecificScale, editScalesId } =
    useScales();
  useEffect(() => {
    if (status === 200 || status === 201) setOpenSendFinish(true);
  }, [status]);
  const handleCloseModal = () => {
    history.push(`/cadastros/escalas`);
  };
  const handleScalesSubmit = (data) => {
    if (typeof scale_id !== 'undefined') {
      editScalesId(newItem(data), Number.parseInt(unit_id));
    } else {
      createScale(newItem(data), Number.parseInt(unit_id));
    }
  };
  const allSpecialty = dataSpecialty.map((state) => ({
    label: state.name,
    value: state.id,
  }));

  const allGroups = data.map((state) => ({
    label: state.name,
    value: state.id,
  }));

  const scaleList = [
    {
      id: 1,
      label: 'Plantão',
      uc: 'AC',
    },
    {
      id: 2,
      label: 'Ambulatório',
    },
  ];

  const allScales = scaleList.map((tipeScale) => ({
    label: tipeScale.label,
    value: tipeScale.id,
  }));

  const history = useHistory();
  const classes = useStyles();

  const [coordinator, setCoordinator] = React.useState(null);
  const [technicalManager, setTechnicalManager] = React.useState(null);

  const onRemunerationChange = (e, setFieldValue) => {
    const { value } = e.target;
    setFieldValue('type_remuneration', value);
  };

  const [initialValues, setInitialValues] = React.useState({
    name: null,
    type_remuneration: '1',
    status: 1,
    scale_type: {
      id: 1,
      name: 'Plantão',
    },
    group_id: '',
    specialty_id: 0,
    coordinator: null,
    technical_manager: null,
    budget: '',
    price: 0,
    procedure_id: 0,
    signature_is_required: 0,
    signature_is_automatic: 0,
    professional_type: 0,
  });

  const newItem = (values) => ({
    budget: Number.parseInt(values.budget),
    coordinator_id: coordinator.value,
    group_id: !values.specialty_id ? values.group_id : null,
    id: scale_id,
    name: values.name,
    price: values.price,
    procedure_id: values.procedure,
    professional_type: values.professional_type,
    scale_type: values.scale_type,
    signature_is_automatic: values.signature_is_automatic,
    signature_is_required: values.signature_is_required,
    specialty_id: !values.group_id ? values.specialty_id : null,
    status: values.status,
    technical_manager_id: technicalManager.value,
    type_remuneration: values.type_remuneration,
    unit: { id: Number.parseInt(unit_id) },
  });

  const registerUnitScalesListSchema = Yup.object().shape({
    name: Yup.string().required('Informe o nome da escala'),
    budget: Yup.string().required('Informe o Valor estimado'),
    professional_type: Yup.number()
      .required()
      .typeError('Por favor escolha uma opção'),
    type_remuneration: Yup.number().required('Tipo de Remuneração é requerido'),
    group_id: Yup.number()
      .test('is-multiprofessional-type', 'Grupo obrigatório', function (value) {
        return (
          this.parent.professional_type === 0 ||
          (this.parent.professional_type === 1 && value)
        );
      })
      .typeError('Por favor escolha um grupo'),
    specialty_id: Yup.number()
      .test('is-medical-type', 'Especialidade obrigatória', function (value) {
        return (
          (this.parent.professional_type === 0 && value) ||
          this.parent.professional_type === 1
        );
      })
      .typeError('Por favor escolha uma especialidade'),
    coordinator: Yup.string()
      .required('Por favor pesquise uma opção')
      .typeError('Por favor pesquise uma opção'),
    technical_manager: Yup.string()
      .required('Por favor pesquise uma opção')
      .typeError('Por favor pesquise uma opção'),
  });

  return (
    <Layout title="Escalas" showToday backArrow>
      <>
        <DefaultContainer>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={registerUnitScalesListSchema}
            onSubmit={handleScalesSubmit}
            validateOnBlur
          >
            {({
              values,
              errors,
              touched,
              handleblur,
              setFieldValue,
              handleChange,
              setFieldTouched,
            }) => (
              <Form>
                {values.name !== null && (
                  <>
                    <div className={classes.rootSelect}>
                      <Typography className={classes.titleEscala}>
                        Configurar plantão
                      </Typography>
                    </div>
                    <div className={classes.rootSelect}>
                      <div>
                        <TextField
                          name="name"
                          onChange={handleChange}
                          value={values.name}
                          className={classes.textField}
                          label="Nome da escala"
                          variant="outlined"
                        />
                        <ErrorMessage name="name">
                          {(msg) => (
                            <FormHelperText error id="component-error-text">
                              {msg}
                            </FormHelperText>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className={classes.selectFieldTypeScale}>
                        <Field
                          menuList={() => ({ overflowY: 'auto' })}
                          name="scale_type"
                          setFieldTouched={setFieldTouched}
                          value={values.scale_type}
                          setFieldValue={setFieldValue}
                          placeholder={'Tipo de escala'}
                          options={allScales}
                          setState={() => {}}
                          component={CustomSelect}
                        />
                      </div>
                    </div>
                    <div className={classes.rootSelect}>
                      <Typography className={classes.textRadio}>
                        Qual é o tipo do profissional ?
                      </Typography>

                      <InputContainer>
                        <InputItem id="professional_type">
                          <RadioInputGroup
                            row
                            name="professional_type"
                            handleChange={(e) => {
                              const type = Number(e.target.value);
                              setFieldValue('professional_type', type);
                            }}
                            value={values.professional_type}
                          >
                            <RadioInput value={0} label="Médico" />
                            <RadioInput value={1} label="Multiprofissional" />
                          </RadioInputGroup>
                        </InputItem>
                      </InputContainer>
                    </div>
                    {values.professional_type === 0 && (
                      <>
                        <div className={classes.containerDoctor}>
                          <InputContainer>
                            <InputItem>
                              <div className={classes.selectFieldProfessional}>
                                <Field
                                  menuList={() => ({
                                    height: 120,
                                    overflowY: 'auto',
                                  })}
                                  name="specialty_id"
                                  setFieldTouched={setFieldTouched}
                                  setFieldValue={setFieldValue}
                                  placeholder={'Selecione a especialidade'}
                                  options={allSpecialty}
                                  setState={() => {}}
                                  value={values?.specialty}
                                  component={CustomSelect}
                                />
                              </div>
                            </InputItem>
                          </InputContainer>
                          <div className={classes.budgetContainer}>
                            <CurrencyInput
                              className="budget"
                              name="budget"
                              value={values.budget}
                              setFieldValue={setFieldValue}
                              label="Valor Estimado"
                              handleblur={handleblur}
                              error={errors}
                              touched={touched}
                              widthStyle={'360px'}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {values.professional_type === 1 && (
                      <>
                        <div className={classes.containerDoctor}>
                          <InputContainer>
                            <InputItem>
                              <div className={classes.selectFieldProfessional}>
                                <Field
                                  menuList={() => ({
                                    height: 120,
                                    overflowY: 'auto',
                                  })}
                                  name="group_id"
                                  setFieldTouched={setFieldTouched}
                                  setFieldValue={setFieldValue}
                                  placeholder={'Selecione o grupo'}
                                  options={allGroups}
                                  value={values?.group}
                                  setState={() => {}}
                                  component={CustomSelect}
                                />
                              </div>
                            </InputItem>
                          </InputContainer>
                          <div className={classes.budgetContainer}>
                            <CurrencyInput
                              className="budget"
                              name="budget"
                              value={values.budget}
                              setFieldValue={setFieldValue}
                              label="Valor Estimado"
                              handleblur={handleblur}
                              error={errors}
                              touched={touched}
                              widthStyle={'360px'}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div
                      data-cy="containerInput"
                      className={classes.rootSelect}
                      style={{ marginLeft: 5 }}
                    >
                      <div
                        data-cy="div_select_coordinator"
                        className={classes.selectFieldProfessional}
                      >
                        <Field
                          menuList={() => ({
                            height: 120,
                            overflowY: 'auto',
                          })}
                          name="coordinator"
                          placeholder="Pesquise o coordenador da escala"
                          options={doctorsOptions}
                          loading={loadingList}
                          value={coordinator}
                          handleChange={(value) => {
                            setCoordinator(value);
                            setFieldValue('coordinator', value);
                          }}
                          onMenuClose={() => {
                            setDoctorsOptionsToSelect([]);
                            setUserFilters({ ...userFilters, search: '' });
                          }}
                          component={CustomSelectComplete}
                          searchItem={debounceForData}
                          pagination={paginationUser}
                          toTopPagination={toTopPaginationUser}
                          isClearable
                          errors={errors && errors.coordinator}
                        />
                      </div>
                      <div
                        data-cy="div_select_technical_manager"
                        style={{ marginLeft: 3 }}
                        className={classes.selectFieldProfessional}
                      >
                        <Field
                          menuList={() => ({
                            height: 120,
                            overflowY: 'auto',
                          })}
                          name="technical_manager"
                          placeholder="Pesquise o responsável técnico"
                          options={doctorsOptions}
                          loading={loadingList}
                          value={technicalManager}
                          handleChange={(value) => {
                            setTechnicalManager(value);
                            setFieldValue('technical_manager', value);
                          }}
                          onMenuClose={() => {
                            setDoctorsOptionsToSelect([]);
                          }}
                          component={CustomSelectComplete}
                          searchItem={debounceForData}
                          pagination={paginationUser}
                          toTopPagination={toTopPaginationUser}
                          isClearable
                          errors={errors && errors.technical_manager}
                        />
                      </div>
                    </div>
                    <div className={classes.signatureSelect}>
                      <Typography className={classes.textRadio}>
                        A assinatura eletrônica é obrigatória?
                      </Typography>

                      <InputContainer>
                        <InputItem id="signature_is_required">
                          <RadioInputGroup
                            row
                            name="signature_is_required"
                            handleChange={(e) => {
                              setFieldValue(
                                'signature_is_required',
                                Number(e.target.value)
                              );
                            }}
                            value={Number(values.signature_is_required)}
                          >
                            <RadioInput label="Sim" value={1} />
                            <RadioInput label="Não" value={0} />
                          </RadioInputGroup>
                        </InputItem>
                      </InputContainer>
                    </div>
                    <div className={classes.signatureSelect}>
                      {Number(values.signature_is_required) === 1 && (
                        <>
                          <Typography className={classes.textRadio}>
                            Deseja que a assinatura eletrônica seja automática?
                          </Typography>
                          <InputContainer>
                            <InputItem>
                              <RadioInputGroup
                                row
                                name="signature_is_automatic"
                                handleChange={(e) =>
                                  setFieldValue(
                                    'signature_is_automatic',
                                    Number(e.target.value)
                                  )
                                }
                                value={Number(values.signature_is_automatic)}
                              >
                                <RadioInput label="Sim" value={1} />
                                <RadioInput label="Não" value={0} />
                              </RadioInputGroup>
                            </InputItem>
                          </InputContainer>
                        </>
                      )}
                    </div>
                    <div className={classes.signatureSelect}>
                      <Typography className={classes.textRadio}>
                        Tipo de remuneração
                      </Typography>
                      <InputContainer>
                        <InputItem>
                          <RadioInputGroup
                            row
                            name="type_remuneration"
                            handleChange={(e) =>
                              onRemunerationChange(e, setFieldValue)
                            }
                            value={String(values.type_remuneration)}
                          >
                            <RadioInput label="Por Plantão" value="1" />
                            {/* <RadioInput label="Por Produção" value="2" /> */}
                            <RadioInput label="Remuneração Mensal" value="3" />
                          </RadioInputGroup>
                        </InputItem>
                      </InputContainer>
                    </div>
                    <div style={{ maxWidth: '73%' }}></div>
                    <div style={{ maxWidth: '73%' }}>
                      <div className={classes.rootButton}>
                        <Button
                          className={classes.buttonCancel}
                          style={{ padding: 0, marginRight: 21 }}
                          onClick={history.goBack}
                        >
                          CANCELAR
                        </Button>
                        {typeof scale_id !== 'undefined' ? (
                          <>
                            <Button
                              data-cy="btn_cadastrar"
                              loading={loading}
                              type="submit"
                              className={classes.buttonSave}
                            >
                              EDITAR
                            </Button>
                            {openSendFinish && (
                              <ModalResponseAlert
                                openSendFinish={openSendFinish}
                                messageTitleAlert="Escala editada com sucesso!"
                                handleCloseSendFinish={handleCloseModal}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            <Button
                              data-cy="btn_cadastrar"
                              loading={loading}
                              type="submit"
                              disabled={loading}
                              className={classes.buttonSave}
                            >
                              {loading ? (
                                <CircularProgress
                                  size={12}
                                  style={{ marginRight: 3 }}
                                />
                              ) : (
                                <Typography className={classes.registerText}>
                                  Cadastrar
                                </Typography>
                              )}
                            </Button>
                            {openSendFinish && (
                              <ModalResponseAlert
                                openSendFinish={openSendFinish}
                                messageTitleAlert="Escala cadastrada com sucesso!"
                                handleCloseSendFinish={handleCloseModal}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </DefaultContainer>
      </>
    </Layout>
  );
}
