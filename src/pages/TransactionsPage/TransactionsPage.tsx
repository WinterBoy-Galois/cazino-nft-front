import { Redirect, RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DetailsContainer from '../../components/DetailsContainer';
import NavLink from '../../components/NavLink';
import PageContentContainer from '../../components/PageContentContainer';
import PageHeadline from '../../components/PageHeadline';
import { BetsWithData } from './components/Bets';
import { DepositsWithData } from './components/Deposits';
import { WithdrawalsWithData } from './components/Withdrawals';
import { BonusesWithData } from './components/Bonuses';
import { AffiliatesWithData } from './components/Affiliates';
import styles from './TransactionsPage.module.scss';

const TransactionsPage: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation(['transactions']);

  return (
    <div className={`container ${styles.container}`}>
      <PageHeadline>{t('pageHeadline')}</PageHeadline>

      <PageContentContainer>
        <nav className={styles.nav}>
          <NavLink
            to={'withdrawals'}
            className={styles['nav__link']}
            activeClassName={styles['nav__link--active']}
          >
            {t('buttonName.withdrawals').toUpperCase()}
          </NavLink>
          <NavLink
            to={'deposits'}
            className={styles['nav__link']}
            activeClassName={styles['nav__link--active']}
          >
            {t('buttonName.deposits').toUpperCase()}
          </NavLink>
          <NavLink
            to={'bets'}
            className={styles['nav__link']}
            activeClassName={styles['nav__link--active']}
          >
            {t('buttonName.bets').toUpperCase()}
          </NavLink>
          <NavLink
            to={'bonuses'}
            className={styles['nav__link']}
            activeClassName={styles['nav__link--active']}
          >
            {t('buttonName.bonuses').toUpperCase()}
          </NavLink>
          {/*<NavLink*/}
          {/*  to={'bonuses'}*/}
          {/*  className={styles['nav__link']}*/}
          {/*  activeClassName={styles['nav__link--active']}*/}
          {/*>*/}
          {/*  {t('buttonName.achievements').toUpperCase()}*/}
          {/*</NavLink>*/}
          <NavLink
            to={'affiliates'}
            className={styles['nav__link']}
            activeClassName={styles['nav__link--active']}
          >
            {t('buttonName.affiliates').toUpperCase()}
          </NavLink>
        </nav>

        <DetailsContainer className={styles['details-container']}>
          <Router>
            <Redirect from={'/'} to={'withdrawals'} noThrow />
            <WithdrawalsWithData path={'withdrawals'} />
            <DepositsWithData path={'deposits'} />
            <BetsWithData path={'bets'} />
            <BonusesWithData path={'bonuses'} />
            <AffiliatesWithData path={'affiliates'} />
          </Router>
        </DetailsContainer>
      </PageContentContainer>
    </div>
  );
};

export default TransactionsPage;
