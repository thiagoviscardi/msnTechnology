import React from 'react';

const TabPanel = ({ value, index, children, fullWidth }) => {
  return (
    value === index && (
      <div style={fullWidth ? { width: '100%' } : {}}>{children}</div>
    )
  );
};

export default TabPanel;
