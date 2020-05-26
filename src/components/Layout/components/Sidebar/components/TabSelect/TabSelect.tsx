import React from 'react';
import styles from './TabSelect.module.scss';
import { useStateValue } from '../../../../../../state';
import { useTranslation } from 'react-i18next';

const tabs = [
  {
    id: 'LATEST_BETS',
    translationId: 'latestBets',
  },
  {
    id: 'MY_BETS',
    translationId: 'myBets',
  },
  {
    id: 'LEADERBOARDS',
    translationId: 'leaderboards',
  },
];

const TabSelect: React.SFC = () => {
  const { t } = useTranslation(['sidebar']);
  const [
    {
      sidebar: { selectedTab },
    },
    dispatch,
  ] = useStateValue();

  return (
    <>
      {tabs.map((tab, i) => (
        <button
          key={`tabSelect_${i}`}
          onClick={() => dispatch({ type: 'SELECT_SIDEBAR_TAB', payload: tab.id })}
          className={`${styles.button} ${selectedTab === tab.id && styles['button--active']}`}
        >
          {t(`tabs.${tab.translationId}`)}
        </button>
      ))}
    </>
  );
};

export default TabSelect;
