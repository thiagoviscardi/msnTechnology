import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import theme from 'theme';
import { AuthProvider } from './auth';
import { ConfigProvider } from './config';

const AppProvider = ({ children }) => (
  <AuthProvider>
    <ConfigProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ConfigProvider>
  </AuthProvider>
);

export default AppProvider;
