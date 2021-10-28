import React, { useState, createContext, useContext } from 'react';

const ConfigContext = createContext({});

export const ConfigProvider = ({ children }) => {
  const jsonHospitais = localStorage.getItem('plantãoExtra@hospital');
  const initialState = {
    open: true,
    hospitalId: [],
    hospitalData:
      jsonHospitais && JSON.parse(jsonHospitais)
        ? JSON.parse(jsonHospitais)
        : [],
  };
  const [config, setConfig] = useState(initialState);
  //utilizar localstorage
  return (
    <ConfigContext.Provider
      value={{
        config,
        setConfig,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('The context The Config must be within a valid provider');
  }
  return context;
}
