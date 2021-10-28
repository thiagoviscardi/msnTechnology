import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './style';
import { ContainerLogin, ContainerLogo, InsideContainerLogo } from './style';
import LoginCarousel from './component/carousel';
import LoginForm from './component/form';
import { appImages } from 'asset';
import { useAuth } from 'hook/auth';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {
  const classes = styles();
  const history = useHistory();
  const { loading, error, isAuth, login } = useAuth();

  React.useEffect(() => {
    if (isAuth) {
      history.replace('/inicio');
    }
  }, [isAuth]);

  return (
    <Grid container component="main" className={classes.root}>
      <ContainerLogo>
        <img src={appImages.logo} alt="" className={classes.logo} />
      </ContainerLogo>
      <CssBaseline />
      <Grid
        style={{ marginTop: '100px' }}
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
      >
        <LoginCarousel />
      </Grid>
      <Grid item xs={12} sm={8} md={5} elevation={6} square>
        {/* tinha acima o component={Paper} */}
        <div>
          <ContainerLogin>
            <InsideContainerLogo>
              <img
                src={appImages.logoLogin}
                alt="Logo"
                className={classes.logo}
                style={{ width: '70%' }}
              />
              <LoginForm handleSubmit={login} error={error} loading={loading} />
            </InsideContainerLogo>
          </ContainerLogin>
        </div>
      </Grid>
    </Grid>
  );
}
