import React from 'react';

const Tabs = ({ value, index, children }) => {
  return value === index && <div>{children}</div>;
};

export default Tabs;
