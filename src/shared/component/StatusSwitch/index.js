import React, { useRef } from 'react';
import { ButtonSwitch, StyledFormControlLabel } from './styles';
import { TableCell, Tooltip } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HasPermission from 'utils/checkPermission';

const StatusSwitch = ({
  permissions = {},
  title = 'Ativar/Desativar',
  rowData = [],
  maxWidth = 170,
  maxWidthLabel = null,
  changeStatus = () => {},
}) => {
  const [checked, setChecked] = React.useState(rowData.status === 1);

  const checkedRef = useRef(rowData.status === 1);

  function toggleSwitch() {
    checkedRef.current = !checkedRef?.current;
    setChecked(checkedRef.current);
    changeStatus(checkedRef.current, rowData);
  }

  const hasUpdatePermission = HasPermission(permissions.update);

  return (
    <TableCell style={{ maxWidth }}>
      <Tooltip
        title={hasUpdatePermission ? title : 'Você não tem permissão'}
        placement="bottom"
        style={maxWidthLabel ? { maxWidth: maxWidthLabel } : {}}
        arrow
      >
        <StyledFormControlLabel>
          <FormControlLabel
            style={maxWidthLabel ? { maxWidth: maxWidthLabel } : {}}
            control={
              <ButtonSwitch
                size="small"
                checked={checked}
                onChange={hasUpdatePermission ? toggleSwitch : undefined}
                name="status"
              />
            }
          />
        </StyledFormControlLabel>
      </Tooltip>
    </TableCell>
  );
};

export default StatusSwitch;
