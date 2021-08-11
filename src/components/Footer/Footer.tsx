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
import { useStateValue } from '../../state';
import { buildDate } from '../../common/util';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';

const renderFooterLinks = (footer: FooterList[], isSidebarOpen: boolean) =>
  footer.map((f, i) => (
    <div className={`col-6 ${!isSidebarOpen ? 'col-lg-2' : 'col-xl-2'}`} key={`footer-list-${i}`}>
      <ul className={`${styles.list} ${isSidebarOpen && styles['list--spacing']}`}>
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

const getFooterData = (t: TFunction, isAuthorized: boolean): FooterList[] => [
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
        label: t('links.about.bonuses'),
        path: isAuthorized ? '/bonuses' : '/bonuses-intro',
      },
      {
        label: t('links.about.affiliates'),
        path: '/affiliates-intro',
      },
      {
        label: t('links.about.fairness'),
        path: '/fairness',
      },
    ],
  },
  {
    headline: t('links.support.headline'),
    items: [
      {
        label: t('links.support.faq'),
        path: '/faq',
      },
    ],
  },
  {
    headline: t('links.legal.headline'),
    items: [
      {
        label: t('links.legal.privacyPolicy'),
        path: '/privacy-policy',
      },
      {
        label: t('links.legal.termsOfUse'),
        path: '/terms-of-use',
      },
    ],
  },
];

const Footer: React.FC = () => {
  const isAuthorized = useIsAuthorized();
  const { t } = useTranslation(['footer']);
  const year = new Date().getFullYear();
  const [
    {
      sidebar: { isOpen },
    },
  ] = useStateValue();

  return (
    <div className={styles.container}>
      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${!isOpen ? 'col-lg-2' : 'col-xl-2'}`}>
            <div className={styles['language-select']}>
              <LanguageSelect />
            </div>
            <div>
              <Logo className={styles.logo} fillClassName={styles.logo__fill} />
            </div>
            <div className={styles.copyright}>&copy; {year} cazzzino.com</div>
          </div>

          {renderFooterLinks(getFooterData(t, isAuthorized), isOpen)}

          <div className={`col-6 ${!isOpen ? 'col-lg-2' : 'col-xl-2'}`}>
            <ul className={`${styles.list} ${isOpen && styles['list--spacing']}`}>
              <li className={styles['list__item--headline']}>Social</li>
              <li className={styles.list__item}>
                <a
                  href="https://twitter.com/"
                  className={`${styles.list__item__link} ${styles.social__link}`}
                >
                  <Twitter className={styles.social__icon} />
                  <span className={styles.social__label}>{t('links.social.twitter')}</span>
                </a>
              </li>
              <li className={styles.list__item}>
                <a
                  href="https://www.facebook.com/"
                  className={`${styles.list__item__link} ${styles.social__link}`}
                >
                  <Facebook className={styles.social__icon} />
                  <span className={styles.social__label}>{t('links.social.facebook')}</span>
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
                  <span className={styles.social__label}>{t('links.social.bitcoinTalk')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-12 col-lg-9 ${styles.seals}`}>
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
          <div className={`col-12 col-lg-3 ${styles.build}`}>
            <small>
              {`Last build: ${new Intl.DateTimeFormat('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }).format(buildDate)}`}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
