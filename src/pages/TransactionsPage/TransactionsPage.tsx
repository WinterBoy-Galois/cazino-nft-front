import { Redirect, RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import DetailsContainer from '../../components/DetailsContainer';
import NavLink from '../../components/NavLink';
import PageContentContainer from '../../components/PageContentContainer';
import PageHeadline from '../../components/PageHeadline';
import Deposits from './components/Deposits';
import styles from './TransactionsPage.module.scss';

const TransactionsPage: React.FC<RouteComponentProps> = () => {
  return (
    <div className="container">
      <PageHeadline>Transactions</PageHeadline>

      <PageContentContainer>
        <nav className={styles.nav}>
          <NavLink
            to={'deposits'}
            className={styles['nav__link']}
            activeClassName={styles['nav__link--active']}
          >
            Deposits
          </NavLink>
        </nav>

        <DetailsContainer className={styles['details-container']}>
          <Router>
            <Redirect from={'/'} to={'deposits'} noThrow />
            <Deposits path={'deposits'} />
          </Router>
        </DetailsContainer>
      </PageContentContainer>
    </div>
  );
};

export default TransactionsPage;
