import React, { memo, Reducer, useCallback, useEffect, useReducer, useState } from 'react';
import DiceGameBoard from '../../../../components/DiceGameBoard';
import SpinnerButton from '../../../../components/SpinnerButton';
import { SETUP_DICE } from '../../../../graphql/queries';
import styles from './DiceGame.module.scss';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import clsx from 'clsx';
import { MAKE_BET_DICE } from '../../../../graphql/mutations';
import { useStateValue } from '../../../../state';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { error as errorToast } from '../../../../components/Toast';
import useTargetSliderMin from '../../../../hooks/useTargetSliderMin.hook';
import useTargetSliderMax from '../../../../hooks/useTargetSliderMax.hook';
import { DiceGameAction, diceGameReducer, DiceGameState, getInitialState } from './lib/reducer';
import { DiceGameState as GameState } from '../../../../models/diceGameState.model';
import { appConfig } from '../../../../common/config';
import BetControl from '../../../../components/BetControl';
import { calcMultiplier } from '../../../../common/util/betCalc.util';
import BitcoinValue from '../../../../components/BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import { useTranslation } from 'react-i18next';
import BetAmountControl from '../../../../components/BetAmountControl';
import { updateUserAction } from '../../../../user/user.actions';

import useSound from 'use-sound';
import {
  toast_v1,
  balance_updated_v1,
  button_click_v1,
  dice_hit_v1,
  dice_win_v1,
  dice_lost_v1,
} from '../../../../components/App/App';
import { useIsAuthorized } from '../../../../hooks/useIsAuthorized';
import User from '../../../../models/user.model';
import { useUserState } from '../../../../user/UserProvider';
import { isForbiddenError } from '../../../../common/util/error.util';
import { usePendingBetHook } from '../../../../hooks/usePendingBet.hook';

interface IProps {
  loadingBet?: boolean;
  loadingSetup?: boolean;
  minProbability?: number;
  maxProbability?: number;
  he?: number;
  onPlaceBet?: (amount: number, target: number, over: boolean) => void;
  result?: number;
  errorSetup?: any;
  errorBet?: any;
  over?: boolean;
  user?: User;
}

const DiceGame: React.FC<IProps> = ({
  onPlaceBet = () => null,
  loadingBet,
  result = 0,
  loadingSetup,
  errorSetup,
  minProbability = 0,
  maxProbability = 100,
  he = 0.01,
  errorBet,
  user,
}) => {
  const isAuthorized = useIsAuthorized();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation(['games']);
  const [state, dispatch] = useReducer<Reducer<DiceGameState, DiceGameAction>>(
    diceGameReducer,
    getInitialState(he)
  );

  const minTarget = useTargetSliderMin(minProbability, maxProbability);
  const maxTarget = useTargetSliderMax(minProbability, maxProbability);

  const [playDiceHit] = useSound(dice_hit_v1.default);
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  useEffect(() => {
    dispatch({
      type: 'SET_AMOUNT',
      payload: { amount: isAuthorized ? appConfig.defaultBetAmount : 0 },
    });
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      dispatch({ type: 'RESET' });
      dispatch({
        type: 'SET_AMOUNT',
        payload: { amount: 0 },
      });
    } else {
      dispatch({
        type: 'SET_AMOUNT',
        payload: { amount: appConfig.defaultBetAmount },
      });
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (errorBet) {
      dispatch({ type: 'END' });
    }
  }, [errorBet]);

  useEffect(() => {
    if (result) {
      const resultTimer = setTimeout(async () => {
        if (isSound) {
          await playDiceHit();
        }
        dispatch({
          type: 'SET_GAME_STATE',
          payload: { gameState: GameState.HITTING },
        });
        dispatch({ type: 'SET_RESULT', payload: { result } });
      }, appConfig.diceGameTimeout / 2);

      const gameStateTimer = setTimeout(() => {
        dispatch({ type: 'END' });
        dispatch({ type: 'CALC_GAME_STATE' });
      }, appConfig.diceGameTimeout);

      return () => {
        clearTimeout(resultTimer);
        clearTimeout(gameStateTimer);
      };
    }

    dispatch({ type: 'CALC_GAME_STATE' });
  }, [isSound, playDiceHit, result]);

  const handlePlaceBet = async () => {
    if (!isAuthorized) {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    dispatch({ type: 'START' });
    dispatch({ type: 'SET_RESULT', payload: { result: 0 } });
    dispatch({ type: 'CALC_GAME_STATE' });

    await onPlaceBet(state.amount, +state.target.toFixed(2), state.over);
  };

  if (loadingSetup) {
    return <Loading className={styles.loading} />;
  }

  if (errorSetup) {
    return <Error />;
  }

  return (
    <div className={styles.container}>
      <div className={clsx('container', styles.board__container)}>
        <DiceGameBoard
          className={styles.board}
          onChangeTarget={t => dispatch({ type: 'SET_TARGET', payload: { target: t } })}
          result={state.result}
          target={state.target}
          minValue={minTarget}
          maxValue={maxTarget}
          over={state.over}
          gameState={state.gameState}
        />
      </div>

      <div className={styles.controls__wrapper}>
        <div className="container-xl">
          <div className="row">
            <div className="col-12">
              <div className={styles.profit__container}>
                <div className={styles.profit__label}>{t('dice.profit')}</div>
                <div>
                  <BitcoinValue value={formatBitcoin(state.profit)} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 col-xxl-2">
              <BetControl
                label={t('dice.probability')}
                icon="PROBABILITY"
                value={state.probability}
                onChange={probability =>
                  dispatch({ type: 'SET_PROBABILITY', payload: { probability } })
                }
                min={minProbability}
                max={maxProbability}
              />
            </div>
            <div className="col-4 col-xxl-2">
              <BetControl
                label={t('dice.multiplier')}
                icon="MULTIPLIER"
                value={state.multiplier}
                decimalPlaces={appConfig.diceMultiplierPrecision}
                onChange={multiplier =>
                  dispatch({ type: 'SET_MULTIPLIER', payload: { multiplier } })
                }
                min={calcMultiplier(maxProbability, state.he)}
                max={calcMultiplier(minProbability, state.he)}
              />
            </div>
            <div className="col-4 col-xxl-2">
              <BetControl
                label={state.over ? t('dice.rollOver') : t('dice.rollUnder')}
                icon="OVER_UNDER"
                value={state.target}
                readonly
                onClick={() => dispatch({ type: 'TOGGLE_OVER' })}
              />
            </div>

            <div className={clsx('col-12 col-xl-6 col-xxl-4 col-xxxl-3', styles.amount__container)}>
              <BetAmountControl
                amount={state.amount}
                min={0}
                max={user?.balance ?? 15}
                onChange={amount => dispatch({ type: 'SET_AMOUNT', payload: { amount } })}
              />
            </div>

            <div className={clsx(styles.controls__button, 'col-12 col-xl-6 col-xxl-2 col-xxxl-3')}>
              <SpinnerButton
                className={`h-100`}
                onClick={handlePlaceBet}
                loading={loadingBet || state.isRunning}
              >
                start
              </SpinnerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PlaceBetVariables {
  betAmount: number;
  target: number;
  over: boolean;
}

export default DiceGame;

export const DiceGameWithData: React.FC<RouteComponentProps> = memo(() => {
  const { t } = useTranslation('games');
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();
  const [{ user }, dispatch] = useUserState();
  const [setupDice, { data, loading: loadingSetup, error: errorSetup }] = useLazyQuery(SETUP_DICE);
  const [makeBetDice, { loading: loadingBet }] = useMutation(MAKE_BET_DICE, { errorPolicy: 'all' });
  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [setPendingBet] = usePendingBetHook<PlaceBetVariables>({
    loading: loadingBet,
    action: ({ betAmount, target, over }) => handlePlaceBet(betAmount, target, over),
  });

  const [playButtonClick] = useSound(button_click_v1.default);
  const [playDiceWin] = useSound(dice_win_v1.default);
  const [playLoss] = useSound(dice_lost_v1.default);
  const [playToast] = useSound(toast_v1.default);
  const [playToastBalance] = useSound(balance_updated_v1.default);

  useEffect(() => {
    if (user?.id) {
      setupDice();
    }
  }, [setupDice, user?.id]);

  const handlePlaceBet = useCallback(
    async (betAmount: number, target: number, over: boolean) => {
      await setPendingBet(null);
      const variables: PlaceBetVariables = { betAmount, target, over };
      if (isSound) {
        await playButtonClick();
      }
      const { data, errors } = await makeBetDice({
        variables,
      });
      if (errors || data.makeBetDice?.errors) {
        setError(errors ?? data.makeBetDice?.errors);
        if (isForbiddenError(errors)) {
          return setPendingBet(variables);
        } else {
          if (isSound) {
            await playToast();
          }
          if (data.makeBetDice?.errors[0]?.code === 'MAX_PROFIT') {
            return errorToast(t('your_bet_may_reaches_the_profit_limit'));
          }
          return errorToast(t('your_bet_could_not_be_placed'));
        }
      }
      setResult(data?.makeBetDice?.result);

      setTimeout(async () => {
        dispatch(updateUserAction({ balance: data?.makeBetDice?.balance }));
      }, appConfig.diceGameTimeout);

      setTimeout(async () => {
        if (+data?.makeBetDice?.lucky) {
          if (isSound) {
            await playDiceWin();
            await playToastBalance();
          }
        } else {
          if (isSound) {
            await playLoss();
          }
        }
      }, appConfig.diceGameTimeout);
    },
    [
      dispatch,
      isSound,
      makeBetDice,
      playButtonClick,
      playDiceWin,
      playLoss,
      playToast,
      playToastBalance,
      setPendingBet,
      t,
    ]
  );

  return (
    <DiceGame
      user={user}
      loadingSetup={loadingSetup}
      loadingBet={loadingBet}
      minProbability={data?.setupDice?.minProbability}
      maxProbability={data?.setupDice?.maxProbability}
      he={data?.setupDice?.he}
      onPlaceBet={handlePlaceBet}
      result={result}
      errorSetup={errorSetup}
      errorBet={error}
    />
  );
});
