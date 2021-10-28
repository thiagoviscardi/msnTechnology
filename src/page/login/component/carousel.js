import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './presentation.scss';
import './style.css';
import { useAuth } from 'hook/auth';
import { appImages } from 'asset';
import { CarouselLogin } from './style';

const LoginCarousel = () => {
  const { isAuth } = useAuth();

  return (
    <CarouselLogin
      autoPlay={!isAuth}
      infiniteLoop
      swipeScrollTolerance={3}
      showThumbs={false}
      showStatus={false}
      useKeyboardArrows
      className="presentation-mode"
    >
      <div key="content-0" className="my-slide">
        <img
          src={appImages.logoDentista}
          alt="Img Dentista"
          style={{ width: '100%' }}
        />
      </div>
      <div key="content-1" className="my-slide">
        <img
          src={appImages.logoDentista}
          alt="Img Dentista"
          style={{ width: '100%' }}
        />
      </div>
      <div key="content-2" className="my-slide">
        <img
          src={appImages.logoDentista}
          alt="Img Dentista"
          style={{ width: '100%' }}
        />
      </div>
    </CarouselLogin>
  );
};

export default LoginCarousel;
