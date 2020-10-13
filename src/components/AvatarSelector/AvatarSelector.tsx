import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import Avatar from '../Avatar';
import Arrow from '../icons/Arrow';

import styles from './AvatarSelector.module.scss';

interface IProps {
  avatarUrls?: string[];
  avatarUrl?: string;
  className?: string;
  onAvatarChange?: (index: number) => void;
}

SwiperCore.use([Navigation]);

const AvatarSelector: React.SFC<IProps> = ({ avatarUrls, avatarUrl, onAvatarChange }) => {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(
    avatarUrls && avatarUrl ? avatarUrls.indexOf(avatarUrl) : 0
  );
  const prevEl = useRef(null);
  const nextEl = useRef(null);

  if (avatarUrls === undefined || avatarUrls === null || avatarUrls.length <= 0) return null;

  const params = {
    spaceBetween: 0,
    slidesPerView: 3,
    slidesPerGroup: 3,
    grabCursor: false,
  };

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAvatarSelection = (index: number) => {
    setSelectedAvatar(index);
    toggleIsOpen();

    if (onAvatarChange) {
      onAvatarChange(index + 1);
    }
  };

  if (avatarUrls.length <= 0) return <></>;

  return (
    <>
      <div
        className={`${styles.container} ${isOpen ? styles.container__open : ''}`}
        onTransitionEnd={() => {
          swiper?.update();
        }}
      >
        <div>
          <Avatar
            avatarUrl={avatarUrls[selectedAvatar]}
            className={`${styles.avatar} ${styles['avatar__current']}`}
            onClick={() => toggleIsOpen()}
            isEditable={true}
          />
        </div>
        <button
          className={styles['navigation__button--prev']}
          ref={prevEl}
          style={{ visibility: isOpen ? 'visible' : 'hidden' }}
        >
          <Arrow className={styles['navigation__icon--prev']} />
        </button>

        <Swiper
          {...params}
          navigation={{
            prevEl: prevEl.current,
            nextEl: nextEl.current,
            disabledClass: styles.navigation__disabled,
          }}
          onSwiper={swiper => setSwiper(swiper)}
          className={styles.swiper}
          style={{ visibility: isOpen ? 'visible' : 'hidden' }}
        >
          {avatarUrls.map((avatarUrl, index) => {
            if (index === selectedAvatar) return null;

            return (
              <SwiperSlide key={index} className={styles.slider}>
                <Avatar
                  key={index}
                  avatarUrl={avatarUrl}
                  className={`${styles.avatar}`}
                  onClick={() => handleAvatarSelection(index)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button
          className={styles['navigation__button--next']}
          ref={nextEl}
          style={{ visibility: isOpen ? 'visible' : 'hidden' }}
        >
          <Arrow className={styles['navigation__icon--next']} />
        </button>
      </div>
    </>
  );
};

export default AvatarSelector;
