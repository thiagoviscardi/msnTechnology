import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import classe from './style.js';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import Divider from '@material-ui/core/Divider';
import { Divisor, DivisorButton } from './style';
import { Typography } from '@material-ui/core';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
// import ButtonExclude from 'page/disagreements';

//DEIXAR RESPONSIVO
//SIMULAR REQUISIÇÃO

const DisagreementCard = ({ nome, area, data, perfil, plantao }) => {
  const classes = classe();

  return (
    <div className={classes.cardDisagreement}>
      <Paper className={classes.paper}>
        <Grid item xs={15} className={classes.Avatar}>
          <Avatar
            style={{
              width: 48,
              height: 48,
              marginRight: 16,
              marginLeft: 10,
              marginTop: 16,
            }}
            src={perfil}
          />
          <Grid item xs={8} className={classes.Titulo}>
            <Typography
              style={{
                width: 240,
                marginRight: 38,
                height: 24,
                color: '#505255',
                fontSize: 16,
                marginTop: 16,
              }}
            >
              {nome}
            </Typography>
            <Typography
              style={{
                color: '#A2A5A8',
                fontSize: 14,
              }}
            >
              {area}
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.subtitle}>
          <EventBusyIcon
            style={{
              marginTop: 24,
              color: '#505255',
              fontWeight: 1000,
              fontSize: 20,
              marginLeft: 15,
            }}
            fontSize="small"
          />
          <Typography
            style={{
              marginLeft: '5%',
              color: '#505255',
              fontFamily: 'Arial',
              fontSize: 12,
              marginTop: 24,
            }}
          >
            Conflito de horário no dia {data}, sábado
          </Typography>
        </div>

        <div className={classes.contentPai}>
          <Grid item xs={15} className={classes.contents}>
            <Grid item xs={2} className={classes.data}>
              <Typography
                style={{
                  color: '#A2A5A8',
                  width: 48,
                  fontWeight: 400,
                  height: 18,
                  fontSize: 12,
                  marginRight: 24,
                  marginLeft: 20,
                  marginTop: 0,
                }}
              >
                {plantao[0].inicio}
              </Typography>
              <Typography
                style={{
                  color: '#A2A5A8',
                  width: 48,
                  fontWeight: 400,
                  height: 18,
                  fontSize: 12,
                  marginRight: 24,
                  marginLeft: 20,
                  marginTop: 8,
                }}
              >
                {plantao[0].fim}
              </Typography>
            </Grid>
            <Grid item xs={5} className={classes.informs}>
              <Typography
                style={{
                  fontWeight: 400,
                  color: '#505255',
                  fontSize: 12,
                  marginTop: 0,
                  marginLeft: 15,
                }}
              >
                {plantao[0].nome}
              </Typography>
              <Typography
                style={{
                  color: '#8B8E93',
                  fontSize: 12,
                  width: 300,
                  marginTop: 8,
                  marginLeft: 15,
                }}
              >
                {plantao[0].hospital}
              </Typography>
              <Typography
                style={{
                  color: '#8B8E93',
                  fontSize: 12,
                  width: 100,

                  marginTop: 8,
                  marginLeft: 15,
                }}
              >
                {plantao[0].valor}
              </Typography>
              <DivisorButton>
                <CancelOutlinedIcon
                  style={{ marginTop: 8 }}
                  color="primary"
                  fontSize="small"
                />
                <Typography
                  color="primary"
                  style={{ marginTop: 8, fontSize: 12 }}
                >
                  Excluir este plantão
                </Typography>
              </DivisorButton>
            </Grid>
          </Grid>
          <Divisor>
            <Divider
              style={{
                background: 'red',
                marginRight: '2%',
                height: 1,
                width: '30%',
                marginTop: 10,
              }}
            />
            <Typography color="error" style={{ marginTop: 0 }}>
              em conflito
            </Typography>
            <Divider
              style={{
                background: 'red',
                marginLeft: '2%',
                height: 1,
                marginTop: '3%',
                width: '30%',
              }}
            />
          </Divisor>

          <Grid item xs={15} className={classes.contents}>
            <Grid item xs={2} className={classes.data}>
              <Typography
                style={{
                  color: '#A2A5A8',
                  width: 48,
                  fontWeight: 400,
                  height: 18,
                  fontSize: 12,
                  marginRight: 24,
                  marginLeft: 20,
                  marginTop: 0,
                }}
              >
                {plantao[1].inicio}
              </Typography>
              <Typography
                style={{
                  color: '#A2A5A8',
                  width: 48,
                  fontWeight: 400,
                  height: 18,
                  fontSize: 12,
                  marginRight: 24,
                  marginLeft: 20,
                  marginTop: 8,
                }}
              >
                {plantao[1].fim}
              </Typography>
            </Grid>
            <Grid item xs={5} className={classes.informs}>
              <Typography
                style={{
                  fontWeight: 400,
                  color: '#505255',
                  fontSize: 12,
                  marginTop: 0,
                  marginLeft: 15,
                }}
              >
                {plantao[1].nome}
              </Typography>
              <Typography
                style={{
                  color: '#8B8E93',
                  fontSize: 12,
                  width: 300,
                  marginTop: 8,
                  marginLeft: 15,
                }}
              >
                {plantao[1].hospital}
              </Typography>
              <Typography
                style={{
                  color: '#8B8E93',
                  fontSize: 12,
                  width: 100,

                  marginTop: 8,
                  marginLeft: 15,
                }}
              >
                {plantao[1].valor}
              </Typography>
              {/* <ButtonExclude> */}
              <DivisorButton>
                <CancelOutlinedIcon
                  style={{ marginTop: 8 }}
                  color="primary"
                  fontSize="small"
                />
                <Typography
                  color="primary"
                  style={{ marginTop: 8, fontSize: 12 }}
                >
                  Excluir este plantão
                </Typography>
              </DivisorButton>
              {/* </ButtonExclude> */}
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

export default DisagreementCard;

//FAZER BOTÃO DE EXPORTAÇÃO
//FAZER BOTÃO DE EXCLUSÃO
