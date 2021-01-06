import React, { useEffect, useReducer, Reducer } from 'react';
import { RouteComponentProps } from '@reach/router';
import ClamGameBoard from '../../../../components/ClamGameBoard';
import SpinnerButton from '../../../../components/SpinnerButton';
import BitcoinValue from '../../../../components/BitcoinValue';
import BetAmountControl from '../../../../components/BetAmountControl';
import { formatBitcoin } from '../../../../common/util/format.util';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import styles from './ClamGame.module.scss';
import { useQuery } from '@apollo/client';
import { SETUP_CLAMS } from '../../../../graphql/queries';
import { useStateValue } from '../../../../state';
import { ClamGameAction, clamGameReducer, ClamGameState, getInitialState } from './lib/reducer';

interface IProps {
  loadingBet?: boolean;
  he?: number;
  loadingSetup?: boolean;
  errorSetup?: any;
}

const ClamGame: React.FC<IProps> = ({ loadingBet, loadingSetup, he = 0.01, errorSetup }) => {
  const [{ auth }] = useStateValue();
  const { t } = useTranslation(['games']);
  const [state, dispatch] = useReducer<Reducer<ClamGameState, ClamGameAction>>(
    clamGameReducer,
    getInitialState(he)
  );

  useEffect(() => {
    if (auth.state !== 'SIGNED_IN') {
      dispatch({ type: 'RESET' });
    }
  }, [auth.state]);

  return (
    <div className={styles.container}>
      <div className={clsx('container', styles.board__container)}>
        <ClamGameBoard className={styles.board} />
      </div>

      <div className={styles.controls__wrapper}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className={clsx(styles.profit__container, styles.align_items__left)}>
                <div className={styles.profit__label}>{t('clam.profit')}</div>
                <div>
                  <BitcoinValue value={formatBitcoin(0.04885313)} />
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className={clsx(styles.profit__container, styles.align_items__right)}>
                <div className={styles.profit__label}>{t('clam.selected')}</div>
                <div>3</div>
              </div>
            </div>
          </div>

          <div className={clsx('row', styles.justify_content__center)}>
            <div className={clsx('col-12 col-xl-4', styles.amount__container)}>
              <BetAmountControl
                label={t('clam.amount')}
                amount={0.04885313}
                min={0.00000001}
                max={15}
              />
            </div>

            <div className={clsx(styles.controls__button, 'col-12 col-xl-4')}>
              <SpinnerButton loading={loadingBet}>start</SpinnerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClamGame;

export const ClamGameWithData: React.FC<RouteComponentProps> = () => {
  const { data, loading: loadingSetup, error: errorSetup } = useQuery(SETUP_CLAMS);

  return <ClamGame he={data?.setupDice?.he} loadingBet={loadingSetup} errorSetup={errorSetup} />;
};
