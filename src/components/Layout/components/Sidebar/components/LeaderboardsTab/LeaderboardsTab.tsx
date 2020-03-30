import React from 'react';
import styles from './LeaderboardsTab.module.scss';
import { useTranslation } from 'react-i18next';
import SlideSelect from '../../../../../SlideSelect';

const LeaderboardsTab: React.SFC = () => {
  const { t } = useTranslation(['sidebar']);

  return (
    <div>
      <SlideSelect
        selectItems={[
          { label: 'Daily', onClick: () => null },
          { label: 'Weekly', onClick: () => null },
          { label: 'Monthly', onClick: () => null },
        ]}
      />
    </div>
  );
};

export default LeaderboardsTab;
