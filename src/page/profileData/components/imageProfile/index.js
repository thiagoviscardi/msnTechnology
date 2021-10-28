import React from 'react';
import { useStyles, HoverButton, ProfilePicImage, StyledInput } from './styles';

const ProfileImage = (props) => {
  const { readImageFile, previewUrl, avatarSubmit } = props;
  const classes = useStyles();
  return (
    <HoverButton className={classes.logoButton}>
      <ProfilePicImage
        resizeMode="cover"
        src={previewUrl ? previewUrl : ''}
        alt=""
      />
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

export default ProfileImage;
