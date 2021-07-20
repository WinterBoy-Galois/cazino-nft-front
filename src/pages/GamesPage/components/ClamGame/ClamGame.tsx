import React, { useState, useEffect, useReducer, Reducer } from 'react';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import ClamGameBoard from '../../../../components/ClamGameBoard';
import SpinnerButton from '../../../../components/SpinnerButton';
import BitcoinValue from '../../../../components/BitcoinValue';
import BetAmountControl from '../../../../components/BetAmountControl';
import { formatBitcoin } from '../../../../common/util/format.util';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import styles from './ClamGame.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import { SETUP_CLAMS } from '../../../../graphql/queries';
import { useStateValue } from '../../../../state';
import { ClamGameAction, clamGameReducer, ClamGameState, getInitialState } from './lib/reducer';
import { MAKE_BET_CLAMS } from '../../../../graphql/mutations';
import { error as errorToast } from '../../../../components/Toast';
import { appConfig } from '../../../../common/config';
import { ClamsGameState as GameState } from '../../../../models/clamsGameState.model';
import Bitcoin from '../../../../components/icons/social/Bitcoin';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';

import useSound from 'use-sound';
import {
  toast_v1,
  balance_updated_v1,
  button_click_v1,
  clams_win_v1,
  clams_lost_v1,
  clams_select_v1,
} from '../../../../components/App/App';
import { useIsAuthorized } from '../../../../hooks/useIsAuthorized';
import { updateUserAction } from '../../../../user/user.actions';
import { useUserState } from '../../../../user/UserProvider';
import User from '../../../../models/user.model';
import { usePendingBetHook } from '../../../../hooks/usePendingBet.hook';
import { isForbiddenError } from '../../../../common/util/error.util';

interface IProps {
  loadingBet?: boolean;
  he?: number;
  loadingSetup?: boolean;
  errorSetup?: any;
  onPlaceBet?: (betAmount: number, selection: number[]) => void;
  errorBet?: any;
  result?: number;
  setResult?: (result: number) => void;
  multiplier?: number;
  profit?: number;
  user?: User;
}

const ClamGame: React.FC<IProps> = ({
  loadingBet,
  loadingSetup,
  he = 0.01,
  errorSetup,
  onPlaceBet = () => null,
  errorBet,
  result = -1,
  setResult = () => null,
  multiplier = 49.748,
  profit = 0.00773,
  user,
}) => {
  const isAuthorized = useIsAuthorized();
  const { t } = useTranslation(['games']);
  const [state, dispatch] = useReducer<Reducer<ClamGameState, ClamGameAction>>(
    clamGameReducer,
    getInitialState(he)
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [playStart] = useSound(button_click_v1.default);
  const [playWin] = useSound(clams_win_v1.default, { volume: 0.7 });
  const [playLost] = useSound(clams_lost_v1.default, { volume: 0.7 });
  const [playSelect, { stop }] = useSound(clams_select_v1.default, { volume: 0.7 });
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
    if (result !== -1) {
      const resultTimer = setTimeout(() => {
        dispatch({
          type: 'SET_GAME_STATE',
          payload: {
            gameState: state.selection.includes(result) ? GameState.WON : GameState.LOST,
            result,
          },
        });
        if (isSound) {
          if (state.selection.includes(result)) {
            playWin();
          } else {
            playLost();
          }
        }
      }, appConfig.clamsGameTimeout / 2);

      const gameStateTimer = setTimeout(() => {
        dispatch({ type: 'END' });
      }, appConfig.clamsGameTimeout);

      return () => {
        clearTimeout(resultTimer);
        clearTimeout(gameStateTimer);
      };
    }
  }, [result]);

  if (loadingSetup) {
    return <Loading className={styles.loading} />;
  } else if (state.he !== he) {
    dispatch({ type: 'SET_HE', payload: { he } });
  }

  if (errorSetup) {
    return <Error />;
  }

  const handlePlaceBet = async () => {
    if (!isAuthorized) {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    if (isSound) {
      playStart();
    }
    dispatch({ type: 'START' });

    onPlaceBet(state.amount, state.selection);
  };

  const onSelectSound = async () => {
    stop();
    playSelect();
  };
  const renderGameResultMessage = () => {
    if (state.gameState === GameState.IDLE) return null;

    if (state.gameState === GameState.WON)
      return (
        <div className={clsx('row', styles.game_result__row, styles.margin__horizontal_auto)}>
          <div
            className={clsx(
              'col-12 col-xl-4 col-md-6',
              styles.game_result__message_box,
              styles.game_result__message_box__won
            )}
          >
            <div className="row">
              <div className={clsx('col', styles.game_result__message_box__won__title)}>
                You Win!
              </div>
            </div>

            <div className="row">
              <div
                className={clsx(
                  'col',
                  styles.text_align__right,
                  styles.game_result__message_box__won__multiplier
                )}
              >
                &times;&nbsp;{multiplier.toFixed(appConfig.clamsMultiplierPrecision)}
              </div>

              <div className={clsx('col', styles.text_align__left)}>
                <Bitcoin className={clsx(styles.icon, styles.icon__bitcoin)} />
                {formatBitcoin(profit)}
              </div>
            </div>
          </div>
        </div>
      );

    return (
      <div className={clsx('row', styles.game_result__row, styles.margin__horizontal_auto)}>
        <div
          className={clsx(
            'col-12 col-xl-4 col-md-6',
            styles.game_result__message_box,
            styles.game_result__message_box__lost
          )}
        >
          <div className="row">
            <div className={clsx('col', styles.game_result__message_box__lost__title)}>
              {t('oh_try_again')}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={clsx('container-xs', styles.board__container)}>
        <ClamGameBoard
          className={styles.board}
          selection={state.selection}
          setSelection={selection => {
            if (state.gameState !== GameState.IDLE) {
              setResult(-1);
              dispatch({ type: 'RESET', payload: { restart: true } });
            }
            dispatch({ type: 'SELECT_CLAMS', payload: { selection } });
          }}
          isEnded={state.gameState !== GameState.IDLE}
          winningIndex={state.winningIndex}
          onSelectSound={onSelectSound}
        />
      </div>

      <div className={styles.controls__wrapper}>
        <div className="container-sm">
          <div
            className={clsx(
              'row',
              styles.margin__horizontal_auto,
              state.gameState === GameState.IDLE ? null : styles.profit__visibility__hidden
            )}
          >
            <div className="col-6">
              <div className={clsx(styles.profit__container, styles.align_items__left)}>
                <div className={styles.profit__label}>
                  {t('clam.profit')}&nbsp;(&times;&nbsp;
                  {state.multiplier.toFixed(appConfig.clamsMultiplierPrecision)})
                </div>
                <div>
                  <BitcoinValue value={formatBitcoin(state.profit)} />
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className={clsx(styles.profit__container, styles.align_items__right)}>
                <div className={styles.profit__label}>{t('clam.selected')}</div>
                <div>{state.selection.length}</div>
              </div>
            </div>
          </div>

          {renderGameResultMessage()}

          <div className={clsx('row', styles.justify_content__center)}>
            <div
              className={clsx(
                'col-12 col-xl-5',
                styles.amount__container,
                styles.bet_amount_container
              )}
            >
              <BetAmountControl
                label={t('clam.amount')}
                amount={state.amount}
                min={0}
                max={user?.balance ?? 15}
                onChange={amount => dispatch({ type: 'SET_AMOUNT', payload: { amount } })}
              />
            </div>

            <div className={clsx(styles.controls__button, styles.action_button, 'col-12 col-xl-5')}>
              <SpinnerButton
                onClick={handlePlaceBet}
                loading={loadingBet || state.isRunning}
                disabled={state.selection.length < 1 || state.gameState !== GameState.IDLE}
              >
                {t('clam.start')}
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
  selection: number[];
}

export default ClamGame;

export const ClamGameWithData: React.FC<RouteComponentProps> = () => {
  const [{ user }, dispatch] = useUserState();
  const { t } = useTranslation(['games']);
  const { data, loading: loadingSetup, error: errorSetup } = useQuery(SETUP_CLAMS);
  const [makeBetClams, { loading: loadingBet }] = useMutation(MAKE_BET_CLAMS, {
    errorPolicy: 'all',
  });
  const [result, setResult] = useState<number>(-1);
  const [multiplier, setMultiplier] = useState();
  const [profit, setProfit] = useState();
  const [error, setError] = useState();
  const [setPendingBet] = usePendingBetHook<PlaceBetVariables>({
    loading: loadingBet,
    action: ({ betAmount, selection }) => handlePlaceBet(betAmount, selection),
  });

  const [playToast] = useSound(toast_v1.default);
  const [playToastBalanceUpdated] = useSound(balance_updated_v1.default);
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  const handlePlaceBet = async (betAmount: number, selection: number[]) => {
    await setPendingBet(null);
    const variables: PlaceBetVariables = { betAmount, selection };
    const { data, errors } = await makeBetClams({ variables });

    if (errors || data.makeBetClams?.errors) {
      setError(errors ?? data.makeBetClams?.errors);
      if (isForbiddenError(errors)) {
        await setPendingBet(variables);
      } else {
        if (isSound) {
          setTimeout(() => {
            playToast();
          }, 500);
        }
        if (data.makeBetClams?.errors[0]?.code === 'MAX_PROFIT') {
          return errorToast(t('your_bet_may_reaches_the_profit_limit'));
        }

        return errorToast(t('your_bet_could_not_be_placed'));
      }
    }

    setResult(data?.makeBetClams?.result);
    setMultiplier(data?.makeBetClams?.multiplier);
    setProfit(data?.makeBetClams?.profit);

    setTimeout(() => {
      dispatch(updateUserAction({ balance: data.makeBetClams?.balance }));
      // const toast = `${t('your_ballance_has_been_updated')}: ${formatBitcoin(
      //   +data.makeBetClams?.profit
      // )}`;
      if (+data.makeBetClams?.profit > 0) {
        if (isSound) {
          setTimeout(() => {
            playToastBalanceUpdated();
          }, 500);
        }
        // success(toast);
      } else {
        // if (isSound) {
        //   setTimeout(() => {
        //     playToast();
        //   }, 500);
        // }
        // info(toast);
      }
    }, appConfig.clamsGameTimeout);
  };

  return (
    <ClamGame
      user={user}
      he={data?.setupClams?.he}
      loadingSetup={loadingSetup}
      loadingBet={loadingBet}
      errorSetup={errorSetup}
      onPlaceBet={handlePlaceBet}
      errorBet={error}
      result={result}
      setResult={setResult}
      multiplier={multiplier}
      profit={profit}
    />
  );
};
