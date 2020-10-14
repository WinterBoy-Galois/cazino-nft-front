import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import styles from './Carousel.module.scss';
import { useStateValue } from '../../state';

const Carousel: React.FC = () => {
  const [swiper, setSwiper] = useState<SwiperCore | null>();

  const [
    {
      sidebar: { isOpen },
    },
  ] = useStateValue();

  useEffect(() => {
    setTimeout(() => {
      swiper?.update();
    }, 220);
  }, [isOpen, swiper]);

  const params = {
    spaceBetween: 16,
    speed: 600,
    pagination: {
      // el: `.swiper-pagination`,
      clickable: true,
    },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
  };

  SwiperCore.use([Autoplay, Pagination]);

  return (
    <div className={styles.container}>
      <Swiper {...params} onSwiper={swiper => setSwiper(swiper)}>
        <SwiperSlide className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>
              Your friends make <strong>BETS</strong>
              <br /> you get <strong>BITS</strong>!
            </div>
            <div className={styles.subline}>
              Best referral program comissions you will ever find
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>
              I&apos;m the <strong>SECOND</strong> Slide.
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>
              I&apos;m the <strong>THIRD</strong> Slide.
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>
              I&apos;m the <strong>FOURTH</strong> Slide.
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>
              I&apos;m the <strong>FIFTH</strong> Slide.
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
