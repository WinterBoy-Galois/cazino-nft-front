import React from 'react';
import styles from './Footer.module.scss';
import Logo from '../icons/Logo';
import { FooterList } from './lib/footer';
import { Link } from '@reach/router';
import Bitcoin from '../icons/social/Bitcoin';
import Twitter from '../icons/social/Twitter';
import Telegram from '../icons/social/Telegram';
import Facebook from '../icons/social/Facebook';
import Instagram from '../icons/social/Instagram';
import CryptoGamblingFoundationLogo from '../../assets/images/footer/crypto-gambling-foundation.png';
import CryptoGamblingFoundationLogo2x from '../../assets/images/footer/crypto-gambling-foundation@2x.png';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import LanguageSelect from '../LanguageSelect';

const Footer: React.SFC = () => {
  const { t } = useTranslation(['footer']);
  const year = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-2">
            <div className={styles['language-select']}>
              <LanguageSelect />
            </div>
            <div>
              <Logo className={styles.logo} fillClassName={styles.logo__fill} />
            </div>
            <div className={styles.copyright}>&copy; {year} cazzzino.com</div>
          </div>

          {renderFooterLinks(getFooterData(t))}

          <div className="col-6 col-lg-2">
            <ul className={styles.list}>
              <li className={styles['list__item--headline']}>Social</li>
              <li className={styles.list__item}>
                <a
                  href="https://twitter.com/"
                  className={`${styles.list__item__link} ${styles.social__link}`}
                >
                  <Twitter className={styles.social__icon} />
                  <span>{t('links.social.twitter')}</span>
                </a>
              </li>
              <li className={styles.list__item}>
                <a
                  href="https://www.facebook.com/"
                  className={`${styles.list__item__link} ${styles.social__link}`}
                >
                  <Facebook className={styles.social__icon} />
                  {t('links.social.facebook')}
                </a>
              </li>
              <li className={styles.list__item}>
                <a
                  href="https://telegram.org/"
                  className={`${styles.list__item__link} ${styles.social__link}`}
                >
                  <Telegram className={styles.social__icon} />
                  {t('links.social.telegram')}
                </a>
              </li>
              <li className={styles.list__item}>
                <a
                  href="https://bitcointalk.org/"
                  className={`${styles.list__item__link} ${styles.social__link}`}
                >
                  <Bitcoin
                    className={styles.social__icon}
                    innerClassName={styles.social__icon__inner}
                  />
                  {t('links.social.bitcoinTalk')}
                </a>
              </li>
              <li className={styles.list__item}>
                <a
                  href="https://www.instagram.com/"
                  className={`${styles.list__item__link} ${styles.social__link}`}
                >
                  <Instagram className={styles.social__icon} />
                  {t('links.social.instagram')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className={`col-12 ${styles.seals}`}>
            <img
              className={styles.seals__item}
              src={CryptoGamblingFoundationLogo}
              srcSet={`${CryptoGamblingFoundationLogo} 1x, ${CryptoGamblingFoundationLogo2x} 2x`}
              alt="Crypto Gambling Foundation"
            />
            <div className={styles['age-disclaimer']}>
              <div className={styles['age-disclaimer__age']}>18+</div>
              <div className={styles['age-disclaimer__label']}>Responsible Gambling</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

const renderFooterLinks = (footer: FooterList[]) =>
  footer.map((f, i) => (
    <div className="col-6 col-lg-2" key={`footer-list-${i}`}>
      <ul className={styles.list}>
        <li className={styles['list__item--headline']}>{f.headline}</li>
        {f.items.map((item, j) => (
          <li className={styles.list__item} key={`footer-list-item-${j}`}>
            <Link to={item.path} className={styles.list__item__link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));

const getFooterData = (t: TFunction): FooterList[] => [
  {
    headline: t('links.games.headline'),
    items: [
      {
        label: t('common:games.dices'),
        path: '/games/dice',
      },
      {
        label: t('common:games.clam'),
        path: '/games/clam',
      },
      {
        label: t('common:games.mines'),
        path: '/games/mines',
      },
      {
        label: t('common:games.goal'),
        path: '/games/goal',
      },
    ],
  },
  {
    headline: t('links.about.headline'),
    items: [
      {
        label: t('links.about.howToPlay'),
        path: '/',
      },
      {
        label: t('links.about.bonuses'),
        path: '/',
      },
      {
        label: t('links.about.affiliates'),
        path: '/',
      },
      {
        label: t('links.about.fairness'),
        path: '/',
      },
      {
        label: t('links.about.news'),
        path: '/',
      },
    ],
  },
  {
    headline: t('links.support.headline'),
    items: [
      {
        label: t('links.support.contact'),
        path: '/',
      },
      {
        label: t('links.support.faq'),
        path: '/',
      },
    ],
  },
  {
    headline: t('links.legal.headline'),
    items: [
      {
        label: t('links.legal.privacyPolicy'),
        path: '/',
      },
      {
        label: t('links.legal.termsOfUse'),
        path: '/',
      },
    ],
  },
];
