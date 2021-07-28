import React, { useState, useMemo } from 'react';
import styles from './Preferences.module.scss';
import CardHeadline from '../../../../components/CardHeadline';
import DetailsContainer from '../../../../components/DetailsContainer';
import SwitchInput from '../../../../components/SwitchInput';
import Loading from '../../../../components/Loading';
import { Preferences as PreferencesModel } from './lib/preferences';
import Error from '../../../../components/Error';
import { useTranslation } from 'react-i18next';

interface IProps {
  className?: string;
  hideUsername?: boolean;
  hideProfit?: boolean;
  hideWager?: boolean;
  onPreferenceChange?: (preferences: PreferencesModel) => void;
  loading: boolean;
  preferences?: PreferencesModel;
}

const Preferences: React.FC<IProps> = ({
  className = '',
  onPreferenceChange = () => null,
  loading,
  preferences: initialPreferences,
}) => {
  const { t } = useTranslation(['profile', 'common']);
  const [preferences, setPreferences] = useState(initialPreferences);

  useMemo(() => setPreferences(initialPreferences), [initialPreferences]);

  const handleChangeValue = (hideUsername: boolean, hideProfit: boolean, hideWager: boolean) => {
    setPreferences({ hideUsername, hideProfit, hideWager });
    onPreferenceChange({ hideUsername, hideProfit, hideWager });
  };

  return (
    <DetailsContainer background={'DARK'} className={className}>
      <CardHeadline>{t('preferences.headline')}</CardHeadline>
      {loading && <Loading />}

      {!loading && !preferences && <Error>{t('common:errors.UNEXPECTED')}</Error>}

      {!loading && preferences && (
        <div className={styles.container}>
          <SwitchInput
            label={t('preferences.hideUsernameLabel')}
            id={'username'}
            value={preferences.hideUsername}
            onChangeValue={hideUsername =>
              handleChangeValue(hideUsername, preferences.hideProfit, preferences.hideWager)
            }
          />

          <SwitchInput
            label={t('preferences.hideProfitLabel')}
            id={'profit'}
            value={preferences.hideProfit}
            onChangeValue={hideProfit =>
              handleChangeValue(preferences.hideUsername, hideProfit, preferences.hideWager)
            }
          />

          <SwitchInput
            label={t('preferences.hideWagerLabel')}
            id={'wager'}
            value={preferences.hideWager}
            onChangeValue={hideWager =>
              handleChangeValue(preferences.hideUsername, preferences.hideProfit, hideWager)
            }
          />
        </div>
      )}
    </DetailsContainer>
  );
};

export default Preferences;
