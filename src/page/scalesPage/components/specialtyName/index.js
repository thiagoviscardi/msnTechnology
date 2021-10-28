import React from 'react';

const SpecialtyName = ({ rowData }) => {
  return rowData.group ? (
    <div style={{ display: 'table-cell', padding: 16 }}>
      <p style={{ fontSize: '0.875rem' }}>{rowData.group.name}</p>
    </div>
  ) : (
    <div style={{ display: 'table-cell', padding: 16 }}>
      <p style={{ fontSize: '0.875rem' }}>{rowData.specialty?.name}</p>
    </div>
  );
};

export default SpecialtyName;
