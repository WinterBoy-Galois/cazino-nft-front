import React, { Reducer, useReducer, useState } from 'react';
import MineGameBoard from '../../../../components/MineGameBoard';
import SpinnerButton from '../../../../components/SpinnerButton';
import { SETUP_DICE } from '../../../../graphql/queries';
import styles from './MineGame.module.scss';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import clsx from 'clsx';
import { useStateValue } from '../../../../state';
import Loading from '../../../../components/Loading';
import { DiceGameAction, diceGameReducer, DiceGameState, getInitialState } from './lib/reducer';
import BetAmountControl from '../../../../components/BetAmountControl';

interface IProps {
  loadingBet?: boolean;
  loadingSetup?: boolean;
  minProbability?: number;
  maxProbability?: number;
  he?: number;
}

const MineGame: React.FC<IProps> = ({ loadingBet, loadingSetup, he = 0.01 }) => {
  const [{ auth }] = useStateValue();
  const [state, dispatch] = useReducer<Reducer<DiceGameState, DiceGameAction>>(
    diceGameReducer,
    getInitialState(he)
  );
  const [flagStart, setFlagStart] = useState(true);
  const [winCounts, setWinCounts] = useState(18);
  const handlePlaceBet = () => {
    setFlagStart(!flagStart);
  };
  const onMinus = () => {
    if (winCounts > 0) {
      setWinCounts(winCounts - 1);
    }
  };
  const onPlus = () => {
    setWinCounts(winCounts + 1);
  };
  if (loadingSetup) {
    return <Loading className={styles.loading} />;
  }
  const take_opacity_3 = {
    opacity: 0.2,
  };
  const take_opacity_1 = {
    opacity: 1,
  };
  return (
    <div className={styles.container}>
      <div className={clsx('container', styles.board__container)}>
        <MineGameBoard className={'xxx'} value={flagStart} />
      </div>
      {!flagStart ? (
        <div className={styles.total_profit}>
          <div className={styles.grid2}>
            <div className={styles.pl_profit}>TOTAL PROFIT</div>
            <div className={styles.pl_profit_win}>TOTAL PROFIT ON NEXT WIN</div>
          </div>
        </div>
      ) : (
        <div className={styles.pt_profit} />
      )}
      <div className={styles.controls__wrapper}>
        {!flagStart ? (
          <div className={styles.total_price}>
            <div className={styles.grid2}>
              <div className={clsx(styles.pl_profit, styles.flex_left)}>
                <div>&times;49.748</div>
                <div className={styles.pl_15}>0.04885313</div>
              </div>
              <div className={clsx(styles.pl_profit_win, styles.flex_left)}>
                <div>&times;49.748</div>
                <div className={styles.pl_15}>0.04885313</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.pt_profit_price} />
        )}
        <div className={clsx(styles.btn_group, 'container')}>
          <div className={styles.controls__wrapper__btn_grid}>
            <div style={flagStart ? take_opacity_1 : take_opacity_3}>
              <div className={styles.win_counts}>
                <div className={styles.win_counts__minus} onClick={onMinus}>
                  &mdash;
                </div>
                <div>
                  <div className={styles.take_color}>MINES</div>
                  <div className={styles.count_font}>{winCounts}</div>
                </div>
                <div className={styles.win_counts__plus} onClick={onPlus}>
                  +
                </div>
              </div>
            </div>
            <div
              className={styles.amount__container}
              style={flagStart ? take_opacity_1 : take_opacity_3}
            >
              <BetAmountControl
                className={styles.button_mine_game}
                amount={state.amount}
                min={0.00000001}
                max={auth.user?.balance ?? 15}
                onChange={amount => dispatch({ type: 'SET_AMOUNT', payload: { amount } })}
              />
            </div>
            <div className={styles.controls__button}>
              <SpinnerButton
                className={`${styles.button}`}
                onClick={handlePlaceBet}
                loading={loadingBet}
              >
                {flagStart ? 'START' : 'TAKE MONEY'}
              </SpinnerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MineGame;

export const MineGameWithData: React.FC<RouteComponentProps> = () => {
  const { data, loading: loadingSetup } = useQuery(SETUP_DICE);
  return (
    <MineGame
      loadingSetup={loadingSetup}
      minProbability={data?.setupDice?.minProbability}
      maxProbability={data?.setupDice?.maxProbability}
      he={data?.setupDice?.he}
    />
  );
};
