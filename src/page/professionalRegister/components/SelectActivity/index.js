import React from 'react';
import { useStyles } from './styles';
import SelectComponent from 'shared/component/selectComponent';
import { Typography, Button } from '@material-ui/core';
import RegisterDoctor from 'shared/component/professionalRegisterType/registerDoctor';
import RegisterMultiProfessional from 'shared/component/professionalRegisterType/registerMultiProfessional';
import Tabs from 'shared/component/tabs';
import { useHistory } from 'react-router-dom';

export default function SelectActivity() {
  const options = [
    { value: 1, label: 'Médico' },
    { value: 2, label: 'Multi-profissional' },
  ];
  const label = options.map((item) => item.name);
  const [state, setState] = React.useState({
    value: 0,
    valueSelect: '',
  });
  const { value, valueSelect } = state;
  {
    options.map((option, i) => <div key={i} label={option.name} />);
  }
  const handleChange = (value) => {
    setState({ ...state, valueSelect: value, value: value.value });
  };
  const history = useHistory();
  const goBack = () => history.goBack();
  const classes = useStyles();

  return (
    <div style={{ paddingLeft: 0 }}>
      <div style={{ marginTop: 48 }}>
        <SelectComponent
          handleChange={handleChange}
          title="Selecione o área de atuação"
          label={label}
          options={options}
          placeholder="Selecione o área de atuação"
          value={valueSelect}
        />
      </div>
      <Tabs value={value} index={1}>
        <RegisterDoctor />
      </Tabs>
      <Tabs value={value} index={2}>
        <RegisterMultiProfessional />
      </Tabs>

      <div className={classes.buttonContainer}>
        <div className={classes.buttonCancel}>
          <Button>
            <Typography className={classes.textCancel}>Cancelar</Typography>
          </Button>
        </div>
        <div className={classes.buttonBack}>
          <Button onClick={goBack}>
            <Typography className={classes.textBack}>Voltar</Typography>
          </Button>
        </div>
        <div className={classes.buttonNext}>
          <Button>
            <Typography className={classes.textNext}>Próximo</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}
