import React from 'react';
import { Swiper, Autoplay, Pagination } from 'swiper/js/swiper.esm';
import ReactIdSwiperCustom from 'react-id-swiper/lib/ReactIdSwiper.custom';
import styles from './Carousel.module.scss';

const Carousel: React.SFC = () => {
  const params = {
    Swiper,
    modules: [Autoplay, Pagination],
    spaceBetween: 16,
    speed: 600,
    pagination: {
      el: `.swiper-pagination`,
      clickable: true,
    },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
  };

  return (
    <div className={styles.container}>
      <ReactIdSwiperCustom {...params}>
        <div className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>
              Your friends make <strong>BETS</strong>
              <br /> you get <strong>BITS</strong>!
            </div>
            <div className={styles.subline}>
              Best referral program comissions you will ever find
            </div>
          </div>
        </div>
        <div className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>
              I'm the <strong>SECOND</strong> Slide.
            </div>
          </div>
        </div>
        <div className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>
              I'm the <strong>THIRD</strong> Slide.
            </div>
          </div>
        </div>
        <div className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>
              I'm the <strong>FOURTH</strong> Slide.
            </div>
          </div>
        </div>
        <div className={styles.slide}>
          <div className={styles['carousel__slide-inner']}>
            <div className={styles.headline}>
              I'm the <strong>FIFTH</strong> Slide.
            </div>
          </div>
        </div>
      </ReactIdSwiperCustom>
    </div>
  );
};

export default Carousel;
