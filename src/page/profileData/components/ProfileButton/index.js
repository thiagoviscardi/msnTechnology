import React from 'react';
import { Icon, Typography } from '@material-ui/core';
import { useStyles, HoverButton, StyledInput } from './styles';

const ProfileButton = (props) => {
  const { readImageFile, avatarSubmit } = props;
  const classes = useStyles();

  return (
    <HoverButton className={classes.logoButton}>
      <div className={classes.iconContainer}>
        <Icon style={{ color: '#A2A5A8' }}>photo_camera</Icon>
        <Typography className={classes.logoText}>
          Adicionar
          <br />
          Imagem
        </Typography>
      </div>
      <StyledInput
        name="image"
        onChange={(event) => {
          const file = event.currentTarget.files[0];
          readImageFile(file);
          avatarSubmit(file);
        }}
        type="file"
        accept="image/*"
        style={{ borderRadius: ' 50% ' }}
        multiple={false}
      />
    </HoverButton>
  );
};

export default ProfileButton;
