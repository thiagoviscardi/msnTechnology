import React from 'react';
import { useStyles, HoverButton, ProfilePicImage, StyledInput } from './styles';

const ProfileImage = (props) => {
  const { readImageFile, previewUrl, logoSubmit } = props;
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
          logoSubmit(file);
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
