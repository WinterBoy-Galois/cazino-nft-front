import React, { useState, useRef, ReactNode } from 'react';
import styles from './LanguageSelect.module.scss';
import { useTranslation } from 'react-i18next';
import deFlag from '../../assets/images/flags/de.svg';
import gbFlag from '../../assets/images/flags/gb.svg';
import { TFunction } from 'i18next';
import { useClickOutside } from '../../hooks/useClickOutside.hook';

const getLanguages = (t: TFunction) => [
  { code: 'de', label: t(`languages.de.label`), flag: deFlag },
  { code: 'en', label: t(`languages.en.label`), flag: gbFlag },
];

const getLanguageCode = (code: string) => {
  if (code.length <= 2) {
    return code;
  }

  return code.substr(0, 2);
};

const LanguageSelect: React.FC = () => {
  const wrapperRef = useRef(null);
  const [showList, setShowList] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleList = () => setShowList(!showList);
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    toggleList();
  };

  useClickOutside(wrapperRef, () => setShowList(false));

  const renderFlag = (code: string): ReactNode => {
    switch (getLanguageCode(code)) {
      case 'de':
        return <img src={deFlag} className={styles.flag__image} alt={code} />;

      case 'en':
        return <img src={gbFlag} className={styles.flag__image} alt={code} />;

      default:
        i18n.changeLanguage('en');
        return renderFlag('en');
    }
  };

  return (
    <div className={styles.container} ref={wrapperRef}>
      <div className={styles.flag} onClick={toggleList}>
        <div className={styles.menu} style={{ display: showList ? 'block' : 'none' }}>
          <ul className={styles.menu__list}>
            {getLanguages(t)
              .filter(l => l.code !== getLanguageCode(i18n.language))
              .map((l, i) => (
                <li
                  key={`lang-${i}`}
                  className={styles.menu__list__item}
                  onClick={() => changeLanguage(l.code)}
                >
                  {renderFlag(l.code)}
                  <span className={styles.menu__label}>{l.label}</span>
                </li>
              ))}
          </ul>
          <div className={styles.menu__arrow} />
        </div>
        {renderFlag(i18n.language)}
      </div>
    </div>
  );
};

export default LanguageSelect;
