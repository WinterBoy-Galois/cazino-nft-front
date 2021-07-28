import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import styles from './Carousel.module.scss';
import { useStateValue } from '../../state';
import { useTranslation } from 'react-i18next';

const Carousel: React.FC = () => {
  const { t } = useTranslation(['components']);
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
              {t('carousel.firstSlide.firstLine')} <strong>{t('carousel.firstSlide.bets')}</strong>
              <br /> {t('carousel.firstSlide.secondLine')}{' '}
              <strong>{t('carousel.firstSlide.bits')}</strong>!
            </div>
            <div className={styles.subline}>{t('carousel.firstSlide.subline')}</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>{t('carousel.secondSlide')}</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>{t('carousel.thirdSlide')}</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>{t('carousel.fourthSlide')}</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>{t('carousel.fifthSlide')}</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
