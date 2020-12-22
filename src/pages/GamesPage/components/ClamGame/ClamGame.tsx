import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import ClamGameBoard from '../../../../components/ClamGameBoard';
import SpinnerButton from '../../../../components/SpinnerButton';
import BitcoinValue from '../../../../components/BitcoinValue';
import BetAmountControl from '../../../../components/BetAmountControl';
import { formatBitcoin } from '../../../../common/util/format.util';
import clsx from 'clsx';
import styles from './ClamGame.module.scss';

interface IProps {
  loadingBet?: boolean;
}

const ClamGame: React.FC<IProps> = ({ loadingBet }) => {
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
                <div className={styles.profit__label}>Profit (&times;49.748)</div>
                <div>
                  <BitcoinValue value={formatBitcoin(0.04885313)} />
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className={clsx(styles.profit__container, styles.align_items__right)}>
                <div className={styles.profit__label}>Selected</div>
                <div>3</div>
              </div>
            </div>
          </div>

          <div className={clsx('row', styles.justify_content__center)}>
            <div className={clsx('col-12 col-xl-4', styles.amount__container)}>
              <BetAmountControl label="Bet Amount" amount={0.04885313} min={0.00000001} max={15} />
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
  return <ClamGame loadingBet={false} />;
};
