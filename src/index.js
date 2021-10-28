import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from 'styles/global';
import './asset/style.css';
import AppProvider from './hook';
import reportWebVitals from './reportWebVitals';
import Routes from './route/privateRoutes';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
