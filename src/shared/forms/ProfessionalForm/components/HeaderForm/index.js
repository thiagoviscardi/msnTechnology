import React from 'react';
import { useStyles } from './styles';
import * as ReadImage from 'blueimp-load-image';
import { useProfessionalDocs } from 'hook/professional/documents';
import ProfileButton from '../ProfileButton';
import ProfileImage from '../ProfileImage';
import ImageMessage from '../ImageMessage';
import { useParams } from 'react-router-dom';

export default function HeaderForm({
  formInitialValues,
  setFileLogo = () => {},
}) {
  const classes = useStyles();
  const { uploadImage } = useProfessionalDocs();

  const { id } = useParams();

  const [state, setState] = React.useState({
    previewUrl: '',
  });
  const { previewUrl } = state;

  React.useEffect(() => {
    if (formInitialValues && id !== ':id') {
      setState({
        ...state,
        previewUrl: formInitialValues?.image_url,
      });
    }
  }, []);

  const logoSubmit = (file) => {
    if (id !== ':id') uploadImage({ id_user: id, file });
    else setFileLogo(file);
  };

  const readImageFile = (file) => {
    var options = { canvas: true };
    ReadImage.parseMetaData(file, (data) => {
      if (data.exif && data.exif.get('Orientation')) {
        options.orientation = data.exif.get('Orientation');
      }
      ReadImage(
        file,
        (img) => {
          setState({
            ...state,
            previewUrl: img.toDataURL(),
          });
        },
        options
      );
    });
  };
  return (
    <div className={classes.imageContainer}>
      {previewUrl ? (
        <ProfileImage
          readImageFile={readImageFile}
          previewUrl={previewUrl}
          logoSubmit={logoSubmit}
        />
      ) : (
        <ProfileButton readImageFile={readImageFile} logoSubmit={logoSubmit} />
      )}
      <ImageMessage content="Recomendamos que a imagem do perfil tenha no mínimo o tamanho de 208 x 208 px." />
    </div>
  );
}
