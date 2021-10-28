import React from 'react';

const TabPanel = ({ value, index, children }) => {
  return value === index && <div>{children}</div>;
};

export default TabPanel;
