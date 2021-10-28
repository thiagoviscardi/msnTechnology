import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

const CalendarPickerPopover = ({ label = '', children }) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const onClose = () => setPopoverOpen(false);

  const onOpen = () => {
    setPopoverOpen(true);
  };
  return (
    <>
      <Button
        variant="outlined"
        style={{ border: 'none', width: 370 }}
        buttonRef={buttonRef}
        onClick={onOpen}
      >
        {label}
      </Button>
      <Popover
        open={popoverOpen}
        onClose={onClose}
        anchorEl={buttonRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            overflowY: 'initial',
            overflowX: 'initial',
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {children({ onClose })}
      </Popover>
    </>
  );
};

export default CalendarPickerPopover;
