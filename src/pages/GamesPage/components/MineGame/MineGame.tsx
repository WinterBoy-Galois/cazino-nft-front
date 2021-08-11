import React, { Reducer, useEffect, useReducer, useState } from 'react';
import MineGameBoard from '../../../../components/MineGameBoard';
import SpinnerButton from '../../../../components/SpinnerButton';
import { SETUP_MINES } from '../../../../graphql/queries';
import Bitcoin from '../../../../components/icons/social/Bitcoin';
import styles from './MineGame.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import clsx from 'clsx';
import { ADVANCE_MINES, MAKE_BET_MINES, CASH_OUT_MINES } from '../../../../graphql/mutations';
import { useStateValue } from '../../../../state';
import Loading from '../../../../components/Loading';
import { MinesGameAction, minesGameReducer, MinesGameState, getInitialState } from './lib/reducer';
import { MinesGameState as GameState } from '../../../../models/minesGameState.model';
import BetAmountControl from '../../../../components/BetAmountControl';
import { useTranslation } from 'react-i18next';
import { formatBitcoin } from '../../../../common/util/format.util';
import { error as errorToast } from '../../../../components/Toast'; // error as errorToast, success, info
import { appConfig } from '../../../../common/config';

import useSound from 'use-sound';
import {
  toast_v1,
  balance_updated_v1,
  button_click_v1,
  mines_lost_v1,
} from '../../../../components/App/App';
import { useIsAuthorized } from '../../../../hooks/useIsAuthorized';
import { useUserState } from '../../../../user/UserProvider';
import User from '../../../../models/user.model';
import { updateUserAction } from '../../../../user/user.actions';
import { usePendingBetHook } from '../../../../hooks/usePendingBet.hook';
import { isForbiddenError } from '../../../../common/util/error.util';

interface IProps {
  loadingBet?: boolean;
  loadingSetup?: boolean;
  onPlaceBet?: (betId: string, selection: number) => void;
  onCashOut?: (betId: string) => void;
  errorSetup?: any;
  errorBet?: any;
  onRestart?: () => void;
  onStartGame?: (betAmount: number, mines: number) => void;
  session?: any;
  profitCut?: any;
  maxProfit?: number;
  result?: number;
  user?: User;
}

const MineGame: React.FC<IProps> = ({
  loadingSetup,
  loadingBet,
  onPlaceBet = () => null,
  session,
  onCashOut = () => null,
  errorBet,
  onRestart = () => null,
  maxProfit,
  profitCut,
  onStartGame = () => null,
  user,
}) => {
  const isAuthorized = useIsAuthorized();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation(['games']);
  const [state, dispatch] = useReducer<Reducer<MinesGameState, MinesGameAction>>(
    minesGameReducer,
    getInitialState()
  );
  const [isSetBet, setIsSetBet] = useState(false);
  const [isShowProfit, setShowProfit] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [isGameStartedBtnClicked, setGameStartBtnClicked] = useState(false);
  const [isCashOut, setCashOut] = useState(false);
  const [isAlerted, setAlerted] = useState(false);
  const [lastAdvanceStatus, setLastAdvanceStatus] = useState<any>(null);
  const [lastStatusTimer, setLastStatusTimer] = useState<any>(null);
  const [lucky, setLucky] = useState<any>(null);
  const [isShowAlert, setIsShowAlert] = useState<any>(true);
  const [isControlDisable, setIsControlDisable] = useState<any>(false);

  const [play, { stop }] = useSound(button_click_v1.default);
  const [playMinesLost] = useSound(mines_lost_v1.default);
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  useEffect(() => {
    dispatch({
      type: 'SET_AMOUNT_MINES',
      payload: { amount: isAuthorized ? appConfig.defaultBetAmount : 0 },
    });
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      dispatch({ type: 'RESET_MINES' });
      dispatch({
        type: 'SET_AMOUNT_MINES',
        payload: { amount: 0 },
      });
    } else {
      dispatch({
        type: 'SET_AMOUNT_MINES',
        payload: { amount: appConfig.defaultBetAmount },
      });
    }
  }, [isAuthorized]);
  useEffect(() => {
    if (isAuthorized && profitCut && maxProfit && !isAlerted) {
      if (session.profitCut === 'CUT') setAlerted(true);
      (async () =>
        await navigate(`${pathname}?dialog=profit-cut`, { state: { maxProfit, profitCut } }))();
    }
  }, [profitCut, maxProfit]);
  useEffect(() => {
    if (!errorBet) {
      if (isGameStartedBtnClicked) {
        dispatch({ type: 'START_MINES' });
        setGameStartBtnClicked(false);
        setIsSetBet(false);
        setCashOut(false);
      }
      return;
    }
    if (errorBet[0]?.code === 'MAX_PROFIT')
      (async () => {
        await navigate(`${pathname}?dialog=profit-cut`, {
          state: {
            errorMessage: t('mines.errorMsg'),
          },
        });
      })();
  }, [errorBet]);
  useEffect(() => {
    if (session?.betId && state.gameState === GameState.IDLE) {
      dispatch({
        type: 'START_MINES',
        payload: { session },
      });
    }
    if (session && lastAdvanceStatus === null && !isCashOut) {
      if (session?.lucky === true) setLastAdvanceStatus('Won');
      else if (session?.lucky === false) setLastAdvanceStatus('Lost');
      setLastAdvanceStatus(null);
      setLastStatusTimer(null);
      clearTimeout(lastStatusTimer);
    }
    if (session?.lucky === true) {
      setLucky(true);
      setIsShowAlert(true);
      setTimeout(() => {
        setIsShowAlert(false);
      }, 2000);
    } else if (session?.lucky === false) {
      setLucky(false);
      if (isSound) {
        setTimeout(() => {
          stop();
          playMinesLost();
        }, appConfig.mineGameTimeout / 20);
      }
    } else {
      setLucky(null);
    }
  }, [session]);
  useEffect(() => {
    if (state.gameState === GameState.IN_PROGRESS || session?.open) {
      setIsSetBet(true);
      if (session?.open?.length > 0 || session?.result?.length > 0) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } else {
      setIsSetBet(false);
    }
    if (state.gameState === GameState.IN_PROGRESS) {
      if (session?.lucky === false) {
        setShowProfit(false);
      } else {
        setShowProfit(true);
      }
    } else {
      setIsOpen(true);
      setShowProfit(false);
    }
    if (state.gameState === GameState.IDLE) {
      setIsControlDisable(true);
    } else {
      setIsControlDisable(false);
    }
  }, [state.gameState, session]);
  useEffect(() => {
    if (lastAdvanceStatus !== null) return;
    if (lastStatusTimer !== null) return;
    if (session?.__typename !== 'MinesComplete') return;
    dispatch({
      type: 'END_MINES',
    });
  }, [session, lastAdvanceStatus, lastStatusTimer]);
  if (loadingSetup) {
    return <Loading className={styles.loading} />;
  }
  // if (errorSetup) {
  //   return <Error />;
  // }
  const handleStartGame = async () => {
    if (!isAuthorized) {
      return await navigate(`${pathname}?dialog=sign-in`);
    }
    setGameStartBtnClicked(true);
    onStartGame(state.amount, state.mines);
  };
  const handleTryAgain = () => {
    dispatch({ type: 'RESET_MINES' });
    onRestart();
    setCashOut(false);
    setLastAdvanceStatus(null);
    setLastStatusTimer(null);
  };
  const handleCashOut = async () => {
    if (!isAuthorized) {
      return await navigate(`${pathname}?dialog=sign-in`);
    }
    if (session?.__typename !== 'MinesComplete') {
      setCashOut(true);
      onCashOut(session.betId);
    }
  };
  const handlePlaceBet = async (selection?: number) => {
    if (!isAuthorized) {
      return await navigate(`${pathname}?dialog=sign-in`);
    }
    if (
      lastAdvanceStatus === null &&
      typeof selection === 'number' &&
      state.gameState === GameState.IN_PROGRESS
    ) {
      onPlaceBet(session.betId, selection);
    }
  };
  const getButtonLabel = () => {
    if (lastAdvanceStatus && lastAdvanceStatus !== 'Won') return t('mines.tryAgain').toUpperCase();
    if (state.gameState === GameState.IDLE) return t('mines.start').toUpperCase();
    if (state.gameState === GameState.IN_PROGRESS)
      return session?.lucky === false
        ? t('mines.tryAgain').toUpperCase()
        : t('mines.takeMoney').toUpperCase();
    if (state.gameState === GameState.GAME_ENDED) {
      return isCashOut || session?.lucky
        ? t('mines.playAgain').toUpperCase()
        : t('mines.tryAgain').toUpperCase();
    }
  };
  const handleButtonClick = () => {
    if (isOpen) {
      if (isSound) {
        stop();
        play();
      }
      setAlerted(false);
      if (state.gameState === GameState.IDLE) return handleStartGame();
      if (state.gameState === GameState.GAME_ENDED) return handleTryAgain();
      return handleCashOut();
    }
  };

  // useEffect(() => {
  //   if (errorBet) {
  //     dispatch({ type: 'END_MINES' });
  //   }
  // }, [errorBet]);

  const onMinus = () => {
    if (state.mines > 1 && state.gameState === GameState.IDLE && isAuthorized) {
      const mines = state.mines - 1;
      dispatch({ type: 'SET_MINES', payload: { mines } });
    }
  };
  const onPlus = () => {
    if (state.mines < 24 && state.gameState === GameState.IDLE && isAuthorized) {
      const mines = state.mines + 1;
      dispatch({ type: 'SET_MINES', payload: { mines } });
    }
  };
  const renderGameResultMessage = () => {
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
              {t('mines.youWin').toUpperCase()}
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
              &times;&nbsp;
              {session?.profit.multiplier.toFixed(appConfig.minesMultiplierPrecision)}
            </div>

            <div className={clsx('col', styles.text_align__left)}>
              <Bitcoin className={clsx(styles.icon, styles.icon__bitcoin)} />
              {formatBitcoin(session?.profit.profit)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const take_opacity_3 = {
    opacity: 0.4,
  };
  const take_opacity_1 = {
    opacity: 1,
  };

  return (
    <div className={styles.container}>
      <div className={clsx('container', styles.board__container)}>
        <MineGameBoard
          className={'xxx'}
          handlePlaceBet={handlePlaceBet}
          session={session}
          gameState={state.gameState}
          loadingBet={loadingBet}
          isCashOut={isCashOut}
        />
      </div>
      {isShowProfit && lucky === null ? (
        <div className={styles.total_profit}>
          <div className={styles.grid2}>
            <div className={styles.pl_profit}>
              {t('mines.profitTotal').toUpperCase()}&nbsp;(&times;&nbsp;
              {session?.totalProfit.multiplier.toFixed(appConfig.minesMultiplierPrecision)})
            </div>
            <div className={styles.pl_profit_win}>
              {t('mines.profitNext').toUpperCase()}&nbsp;(&times;&nbsp;
              {session?.nextProfit.multiplier.toFixed(appConfig.minesMultiplierPrecision)})
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.pt_profit} />
      )}
      {/* Showing the result by lucky */}
      {lucky === true && isShowAlert === true && renderGameResultMessage()}

      <div className={styles.controls__wrapper}>
        {isShowProfit && lucky === null ? (
          <div className={styles.total_price}>
            <div className={styles.grid2}>
              <div className={clsx(styles.pl_profit, styles.flex_left)}>
                <div className={styles.pl_15}>{formatBitcoin(session?.totalProfit.profit)}</div>
              </div>
              <div className={clsx(styles.pl_profit_win, styles.flex_left)}>
                <div className={styles.pl_15}>{formatBitcoin(session?.nextProfit.profit)}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.pt_profit_price} />
        )}
        <div className={clsx(styles.btn_group, 'container-sm')}>
          <div className={styles.controls__wrapper__btn_grid}>
            <div style={!isSetBet ? take_opacity_1 : take_opacity_3}>
              <div className={styles.win_counts}>
                <div
                  className={clsx(
                    styles.win_counts__minus,
                    isControlDisable && styles.control_disable
                  )}
                  onClick={onMinus}
                >
                  &mdash;
                </div>
                <div>
                  <div className={styles.take_color}>MINES</div>
                  <div className={styles.count_font}>{state.mines}</div>
                </div>
                <div
                  className={clsx(
                    styles.win_counts__plus,
                    isControlDisable && styles.control_disable
                  )}
                  onClick={onPlus}
                >
                  +
                </div>
              </div>
            </div>
            <div
              className={styles.amount__container}
              style={!isSetBet ? take_opacity_1 : take_opacity_3}
            >
              <BetAmountControl
                label={t('mines.amount')}
                isControlDisable={isControlDisable}
                className={clsx(
                  styles.button_mine_game,
                  !isControlDisable ? styles.bet_control_enable : styles.bet_control_disable
                )}
                amount={state.amount}
                min={0}
                max={user?.balance ?? 15}
                onChange={amount => dispatch({ type: 'SET_AMOUNT_MINES', payload: { amount } })}
                readonly={state.gameState !== GameState.IDLE}
              />
            </div>
            <div
              className={styles.controls__button}
              style={isOpen ? take_opacity_1 : take_opacity_3}
            >
              <SpinnerButton
                className={`${styles.button}`}
                onClick={handleButtonClick}
                loading={loadingBet}
                disabled={state.gameState === GameState.IN_PROGRESS && session?.lucky === false}
              >
                {getButtonLabel()}
              </SpinnerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PlaceBetVariables {
  betId: string;
  selection: number;
}

export default MineGame;

export const MineGameWithData: React.FC<RouteComponentProps> = () => {
  const [{ user }, dispatch] = useUserState();
  const { data, loading: loadingSetup, error: errorSetup } = useQuery(SETUP_MINES);
  const [makeBetMines, { loading: loadingBet }] = useMutation(MAKE_BET_MINES, {
    errorPolicy: 'all',
  });
  const [advanceMines, { loading: loadingAdvance }] = useMutation(ADVANCE_MINES, {
    errorPolicy: 'all',
  });
  const [cashoutMines, { loading: loadingCashOut }] = useMutation(CASH_OUT_MINES, {
    errorPolicy: 'all',
  });
  const [error, setError] = useState();
  const [session, setSession] = useState<any>(null);
  const [profitCut, setProfitCut] = useState<any>(null);
  const [maxProfit, setMaxProfit] = useState<any>(0);
  const { t } = useTranslation(['games']);

  const [playBalanceUpdated] = useSound(balance_updated_v1.default);
  const [playToast] = useSound(toast_v1.default);
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  const [setPendingBet] = usePendingBetHook<PlaceBetVariables>({
    loading: loadingBet,
    action: ({ betId, selection }) => handlePlaceBet(betId, selection),
  });

  const onPlayBalanceUpdated = () => {
    if (isSound) {
      setTimeout(() => {
        // eslint-disable-next-line no-restricted-globals
        stop();
        playBalanceUpdated();
      }, appConfig.mineGameTimeout / 7);
    }
  };

  const onPlayToast = () => {
    if (isSound) {
      setTimeout(() => {
        // eslint-disable-next-line no-restricted-globals
        stop();
        playToast();
      }, appConfig.mineGameTimeout / 7);
    }
  };

  const handleRestart = () => {
    setSession(null);
    setProfitCut(null);
  };
  const initSession = (minesGameSetupObj: any) => {
    if (minesGameSetupObj.__typename !== 'MinesGameSetup') return;
    setSession(minesGameSetupObj.session);
    setProfitCut(minesGameSetupObj.session?.profitCut || null);
    setSession(minesGameSetupObj.session || null);
    if (minesGameSetupObj.balance)
      dispatch(updateUserAction({ balance: minesGameSetupObj.balance }));
  };
  const handleStartGame = async (betAmount: number, mines: number) => {
    const { data, errors } = await makeBetMines({
      variables: { betAmount, mines: mines },
    });
    if (errors || data.makeBetMines?.errors) {
      setError(errors ?? data.makeBetMines?.errors);

      if (data.makeBetMines?.errors[0]?.code === 'MAX_PROFIT') return;
      onPlayToast();
      return errorToast(t('mines.errorTryAgain'));
    }

    initSession(data.makeBetMines);
    // onPlayToast();
    // errorToast(`${t('mines.msgBalance')} ${formatBitcoin(data.makeBetMines.balance)}`);
  };

  const handlePlaceBet = async (betId: string, selection: number) => {
    await setPendingBet(null);
    const variables: PlaceBetVariables = { betId, selection };
    const { data, errors } = await advanceMines({ variables });
    if (errors || data.advanceMines?.errors) {
      setError(errors ?? data.advanceMines?.errors);
      if (isForbiddenError(errors)) {
        await setPendingBet(variables);
      } else {
        onPlayToast();
        if (data.makeBetMines?.errors[0]?.code === 'MAX_PROFIT') {
          return errorToast(t('mines.errorProfitLimit'));
        }
        return errorToast(t('mines.errorTryAgain'));
      }
    }
    switch (data.advanceMines.__typename) {
      case 'MinesStep':
        setSession(
          Object.assign({}, session, {
            ...data.advanceMines,
          })
        );

        setProfitCut(data.advanceMines.profitCut);
        break;

      case 'MinesComplete':
        setSession(
          Object.assign({}, session, {
            ...data.advanceMines,
            allowNext: false,
            lucky: data.advanceMines.lucky,
          })
        );

        if (data.advanceMines.balance) {
          dispatch(updateUserAction({ balance: data.advanceMines.balance }));
          if (data.advanceMines.profit.profit) {
            // const toast = `${t('mines.msgBalance')} ${formatBitcoin(
            //   +data.advanceMines.profit.profit
            // )}`;

            if (+data.advanceMines.profit.profit > 0) {
              onPlayBalanceUpdated();
              // success(toast);
            } else {
              // onPlayToast();
              // errorToast(toast);
            }
          }
        }
        setProfitCut(data.advanceMines.profitCut);
        break;
    }
  };
  const handleCashOutMines = async (betId: string) => {
    const { data, errors } = await cashoutMines({ variables: { betId } });
    if (errors || data.cashoutMines?.errors) {
      setError(errors ?? data.cashoutMines?.errors);
      onPlayToast();
      return errorToast(t('mines.errorTryAgain'));
    }

    setSession(
      Object.assign({}, session, {
        ...data.cashoutMines,
        allowNext: false,
      })
    );

    if (data.cashoutMines.balance) {
      dispatch(updateUserAction({ balance: data.cashoutMines.balance }));
      if (data.cashoutMines.profit.profit) {
        // const toast = `${t('mines.msgBalance')} ${formatBitcoin(+data.cashoutMines.profit.profit)}`;
        if (+data.cashoutMines.profit.profit > 0) {
          onPlayBalanceUpdated();
          // errorToast(toast);
        } else {
          onPlayToast();
          // errorToast(toast);
        }
      }
    }

    setProfitCut(data.cashoutMines.profitCut);
  };

  useEffect(() => {
    if (data?.setupMines) {
      initSession(data.setupMines);
      setMaxProfit(data.setupMines.maxProfit);
    }
  }, [data]);
  return (
    <MineGame
      user={user}
      loadingSetup={loadingSetup}
      loadingBet={loadingBet || loadingAdvance || loadingCashOut}
      onPlaceBet={handlePlaceBet}
      onStartGame={handleStartGame}
      session={session}
      onCashOut={handleCashOutMines}
      onRestart={handleRestart}
      errorSetup={errorSetup}
      errorBet={error}
      maxProfit={maxProfit}
      profitCut={profitCut}
    />
  );
};
