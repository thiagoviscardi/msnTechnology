import React from 'react';
import { useStyles, FormContainer } from './styles';
import { Typography, Icon, Button } from '@material-ui/core';
import { stateList } from 'shared/stateList';
import { Field, Form, Formik } from 'formik';
import CustomSelect from 'shared/component/forms/CustomSelect';
import * as Yup from 'yup';
import CustomMaskField from 'shared/component/forms/CustomMaskField';
import RadioGroup from 'shared/component/radioGroup';
import Chip from '@material-ui/core/Chip';
import useUnit from 'hook/unit';
import useScpecialties from 'hook/specialties';
import ModalListSpecialties from 'shared/component/modalListSpecialties';
import ModalListHospital from 'page/adminRegister/components/ModalListHospital';

export default function RegisterDoctor() {
  const classes = useStyles();

  const { getUnits, units } = useUnit();
  const { specialties, getSpecialties } = useScpecialties();

  const [state, setState] = React.useState({
    openModalHospital: false,
    openModalSpecialties: false,
    pageUnit: 1,
    perPageUnits: 20,
    searchUnits: '',
    pageSpecialties: 1,
    perPageSpecialties: 20,
    searchSpecialties: '',
  });
  const {
    openModalHospital,
    pageUnit,
    perPageUnits,
    searchUnits,
    openModalSpecialties,
    perPageSpecialties,
    pageSpecialties,
    searchSpecialties,
  } = state;
  const { dataUnits, totalUnits, loadingUnits } = units;
  const { dataSpecialties, totalSpecialties, loadingSpecialties } = specialties;
  const handleOpenModal = () => {
    setState({ ...state, openModalHospital: true });
  };

  const handleCloseModalHospital = () => {
    setState({ ...state, openModalHospital: false });
  };
  const handleOpenModalSpecialties = () => {
    setState({ ...state, openModalSpecialties: true });
  };
  const handleCloseModalSpecialties = () => {
    setState({ ...state, openModalSpecialties: false });
  };
  React.useEffect(() => {
    getUnits(pageUnit, perPageUnits, searchUnits);
  }, [pageUnit, searchUnits]);

  const totalPages = Math.ceil(totalUnits / perPageUnits);

  React.useEffect(() => {
    getSpecialties(pageSpecialties, perPageSpecialties, searchSpecialties);
  }, [pageSpecialties, searchSpecialties]);

  const totalPagesSpecialties = Math.ceil(
    totalSpecialties / perPageSpecialties
  );
  const initialValues = {
    crm: '',
    civilStatus: '',
    account: '',
  };
  const schema = Yup.object().shape({
    crm: Yup.object().shape({
      number: Yup.number().typeError('Apenas numeros'),
      validate: Yup.string('Obrigatório'),
    }),
    civilStatus: Yup.string().required('Obrigatório'),
    account: Yup.string().required('Obrigatório'),
  });
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
  const searchFunctionSpecialties = (searchInput) => {
    searchInput.target.value === ''
      ? setState({
          ...state,
          searchSpecialties: searchInput.target.value,
          pageSpecialties: 1,
        })
      : setState({
          ...state,
          searchSpecialties: searchInput.target.value,
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
  const onScrollBottomSpecialties = (event) => {
    const bottomSpecialties =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight;

    if (
      bottomSpecialties &&
      !loadingSpecialties &&
      pageSpecialties < totalPagesSpecialties
    ) {
      setState({ ...state, pageSpecialties: pageSpecialties + 1 });
    }
    if (event.currentTarget.scrollTop === 0 && pageSpecialties > 1) {
      setState({ ...state, pageSpecialties: pageSpecialties - 1 });
    }
  };
  const [chipSpecialty, setchipSpecialty] = React.useState([]);
  const handleDelete = (chipToDelete) => () => {
    setchipSpecialty((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const [chipHospital, setchipHospital] = React.useState([]);
  const handleDeleteHospital = (chipToDelete) => () => {
    setchipHospital((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const allStates = stateList.map((state) => ({
    label: state.uc,
    value: state.id,
  }));
  return (
    <div>
      <Formik
        // onSubmit={formSubmit}
        validationSchema={schema}
        initialValues={initialValues}
        validateOnBlur
        values
      >
        {({ handleChange, setFieldTouched, setFieldValue }) => (
          <Form>
            <div>
              <Typography className={classes.textHeader}>
                Especiaidades
              </Typography>
            </div>
            <div style={{ display: 'flex', minWidth: '100%' }}>
              <div className={classes.chipContainer}>
                {chipSpecialty.map((data) => {
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
                            : handleDelete(data)
                        }
                        className={classes.chip}
                      />
                    </div>
                  );
                })}
              </div>
              <div>
                <Button
                  onClick={handleOpenModalSpecialties}
                  className={classes.addSpecialty}
                  style={{ marginTop: 32 }}
                >
                  <Icon style={{ marginRight: 10, fontSize: 20 }}>
                    add_circle_outline
                  </Icon>
                  Adicionar especialidade
                </Button>
              </div>
              {openModalSpecialties && (
                <ModalListSpecialties
                  especialidades={dataSpecialties}
                  total={totalPagesSpecialties}
                  loading={loadingSpecialties}
                  openModal={openModalSpecialties}
                  handleClose={handleCloseModalSpecialties}
                  searchFunction={searchFunctionSpecialties}
                  onScrollBottom={onScrollBottomSpecialties}
                  adicionarSpecialties={(selected) => {
                    setchipSpecialty(
                      selected.map((s) => {
                        return { key: s.id, label: s.name };
                      })
                    );
                    setState({ ...state, openModalSpecialties: false });
                  }}
                />
              )}
            </div>

            <div>
              <Typography className={classes.text}>Conselho</Typography>
            </div>
            <div>
              <FormContainer style={{ justifyContent: 'flex-start' }}>
                <div>
                  <Field
                    label="Número do conselho"
                    style={{ width: 232, marginRight: 32 }}
                    name="crm.number"
                    variant="outlined"
                    component={CustomMaskField}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ width: '15.9%', marginRight: 32 }}>
                  <Field
                    name="conselho"
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    placeholder={'Conselho - UF'}
                    options={allStates}
                    setState={() => {}}
                    menuList={() => ({ height: 116, overflowY: 'auto' })}
                    component={CustomSelect}
                  />
                </div>
                <div>
                  <Field
                    label="Validade"
                    style={{ width: 232 }}
                    name="crm.validate"
                    mask=""
                    format="##/##/####"
                    variant="outlined"
                    component={CustomMaskField}
                    onChange={handleChange}
                  />
                </div>
              </FormContainer>
            </div>
            <div>
              <Typography className={classes.text}>
                Empresa do profissional
              </Typography>

              <FormContainer style={{ justifyContent: 'flex-start' }}>
                <div style={{ width: '31.9%' }}>
                  <Field
                    name="enterprises"
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    placeholder={'Selecione a empresa'}
                    // loading={loading}
                    // options={allCivilStatus}
                    setState={() => {}}
                    menuList={() => ({ height: 116, overflowY: 'auto' })}
                    component={CustomSelect}
                  />
                </div>
              </FormContainer>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: 32 }}>
                  <Typography className={classes.textRadio}>
                    Recebimento
                  </Typography>
                  <RadioGroup
                    title1="Nota Fiscal"
                    title2="Associado"
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div>
                  <Typography className={classes.textRadio}>Tipo</Typography>
                  <RadioGroup
                    title1="Pessoa Jurídica"
                    title2="Pessoa Física"
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>
            </div>

            <div>
              <Typography className={classes.text}>
                Companhia vinculada{' '}
              </Typography>

              <FormContainer style={{ justifyContent: 'flex-start' }}>
                <div style={{ width: '31.9%' }}>
                  <Field
                    name="companies"
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    placeholder={'Selecione a companhia'}
                    // loading={loading}
                    // options={allCivilStatus}
                    setState={() => {}}
                    menuList={() => ({ height: 116, overflowY: 'auto' })}
                    component={CustomSelect}
                  />
                </div>
              </FormContainer>
            </div>
            <div>
              <Typography className={classes.text}>
                Hospitais Permitidos
              </Typography>
            </div>
            <div style={{ display: 'flex', minWidth: '100%' }}>
              <div className={classes.chipContainerHospital}>
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
                  handleClose={handleCloseModalHospital}
                  searchFunction={searchFunction}
                  onScrollBottom={onScrollBottom}
                  adicionar={(selected) => {
                    setchipHospital(
                      selected.map((s) => {
                        return { key: s.id, label: s.name };
                      })
                    );
                    setState({ ...state, openModalHospital: false });
                  }}
                />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
