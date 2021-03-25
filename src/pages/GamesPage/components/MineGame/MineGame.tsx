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
const button_click_v1 = require('../../../../sounds/button-click-v1.mp3');
const mines_win_v1 = require('../../../../sounds/mines-win-v1.mp3');
const mines_lost_v1 = require('../../../../sounds/mines-lost-v1.mp3');

const balance_updated_v1 = require('../../../../sounds/balance-updated-v1.mp3');
const toast_v1 = require('../../../../sounds/toast-v1.mp3');

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
}) => {
  const [{ auth }] = useStateValue();
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

  const [play, { stop }] = useSound(button_click_v1.default, { volume: 0.9 });
  const [playMinesWin] = useSound(mines_win_v1.default, { volume: 0.9 });
  const [playMinesLost] = useSound(mines_lost_v1.default, { volume: 0.9 });
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  useEffect(() => {
    if (auth.state !== 'SIGNED_IN') {
      dispatch({ type: 'RESET_MINES' });
    }
  }, [auth.state]);
  useEffect(() => {
    if (auth.state === 'SIGNED_IN' && profitCut && maxProfit && !isAlerted) {
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
      if (isSound) {
        setTimeout(() => {
          stop();
          playMinesWin();
        }, appConfig.mineGameTimeout / 20);
      }
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
    if (auth.state !== 'SIGNED_IN') {
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
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }
    if (session?.__typename !== 'MinesComplete') {
      setCashOut(true);
      onCashOut(session.betId);
    }
  };
  const handlePlaceBet = async (selection?: number) => {
    if (auth.state !== 'SIGNED_IN') {
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
    if (state.mines > 1 && state.gameState === GameState.IDLE && auth.state === 'SIGNED_IN') {
      const mines = state.mines - 1;
      dispatch({ type: 'SET_MINES', payload: { mines } });
    }
  };
  const onPlus = () => {
    if (state.mines < 24 && state.gameState === GameState.IDLE && auth.state === 'SIGNED_IN') {
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
              {session?.totalProfit.multiplier.toFixed(3)}
            </div>

            <div className={clsx('col', styles.text_align__left)}>
              <Bitcoin className={clsx(styles.icon, styles.icon__bitcoin)} />
              {formatBitcoin(session?.totalProfit.profit)}
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
        />
      </div>
      {isShowProfit && lucky === null ? (
        <div className={styles.total_profit}>
          <div className={styles.grid2}>
            <div className={styles.pl_profit}>
              {t('mines.profitTotal').toUpperCase()}&nbsp;(&times;&nbsp;
              {session?.totalProfit.multiplier.toFixed(3)})
            </div>
            <div className={styles.pl_profit_win}>
              {t('mines.profitNext').toUpperCase()}&nbsp;(&times;&nbsp;
              {session?.nextProfit.multiplier.toFixed(3)})
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
        <div className={clsx(styles.btn_group, 'container')}>
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
                min={0.00000001}
                max={auth.user?.balance ?? 15}
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
                disabled={
                  state.gameState === GameState.IN_PROGRESS && session?.currentStep % 10 === 0
                }
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
export default MineGame;

export const MineGameWithData: React.FC<RouteComponentProps> = () => {
  const [, dispatch] = useStateValue();
  const { data, loading: loadingSetup, error: errorSetup } = useQuery(SETUP_MINES);
  const [makeBetMines, { loading: loadingBet }] = useMutation(MAKE_BET_MINES);
  const [advanceMines, { loading: loadingAdvance }] = useMutation(ADVANCE_MINES);
  const [cashoutMines, { loading: loadingCashOut }] = useMutation(CASH_OUT_MINES);
  const [error, setError] = useState();
  const [session, setSession] = useState<any>(null);
  const [profitCut, setProfitCut] = useState<any>(null);
  const [maxProfit, setMaxProfit] = useState<any>(0);
  const [selections, setSelections] = useState<any>([]);
  const { t } = useTranslation(['games']);

  const [playBalanceUpdated] = useSound(balance_updated_v1.default, { volume: 0.9 });
  const [playToast] = useSound(toast_v1.default, { volume: 0.9 });
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  const onPlayBalanceUpdated = () => {
    if (isSound) {
      setTimeout(() => {
        stop();
        playBalanceUpdated();
      }, appConfig.mineGameTimeout / 7);
    }
  };

  const onPlayToast = () => {
    if (isSound) {
      setTimeout(() => {
        stop();
        playToast();
      }, appConfig.mineGameTimeout / 7);
    }
  };

  const handleRestart = () => {
    setSession(null);
    setSelections([]);
    setProfitCut(null);
  };
  const initSession = (minesGameSetupObj: any) => {
    if (minesGameSetupObj.__typename !== 'MinesGameSetup') return;
    setSession(minesGameSetupObj.session);
    setSelections(minesGameSetupObj.session?.selections || []);
    setProfitCut(minesGameSetupObj.session?.profitCut || null);
    setSession(minesGameSetupObj.session || null);
    if (minesGameSetupObj.balance)
      dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: minesGameSetupObj.balance } });
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
    onPlayToast();
    errorToast(`${t('mines.msgBalance')} ${formatBitcoin(data.makeBetMines.balance)}`);
  };

  const handlePlaceBet = async (betId: string, selection: number) => {
    const { data, errors } = await advanceMines({ variables: { betId, selection } });
    if (errors || data.advanceMines?.errors) {
      setError(errors ?? data.advanceMines?.errors);
      onPlayToast();
      if (data.makeBetMines?.errors[0]?.code === 'MAX_PROFIT') {
        return errorToast(t('mines.errorProfitLimit'));
      }
      return errorToast(t('mines.errorTryAgain'));
    }
    switch (data.advanceMines.__typename) {
      case 'MinesStep':
        const __selections = [
          ...selections,
          {
            __typename: 'MinesRow',
            selected: selection,
            luckySpots: [selection],
          },
        ];

        setSession(
          Object.assign({}, session, {
            ...data.advanceMines,
            currentStep: data.advanceMines.allowNext
              ? data.advanceMines.nextStep
              : session.currentStep,
            selections: __selections,
          })
        );

        setProfitCut(data.advanceMines.profitCut);
        setSelections(__selections);
        break;

      case 'MinesComplete':
        setSession(
          Object.assign({}, session, {
            ...data.advanceMines,
            allowNext: false,
            currentStep: 10,
            selections: data.advanceMines.result,
            lucky: data.advanceMines.lucky,
          })
        );

        if (data.advanceMines.balance) {
          dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.advanceMines.balance } });
          if (data.advanceMines.profit.profit) {
            const toast = `${t('mines.msgBalance')} ${formatBitcoin(
              +data.advanceMines.profit.profit
            )}`;

            if (+data.advanceMines.profit.profit >= 0) {
              onPlayBalanceUpdated();
              errorToast(toast);
            } else {
              onPlayToast();
              errorToast(toast);
            }
          }
        }
        setProfitCut(data.advanceMines.profitCut);
        setSelections(data.advanceMines.result);
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
        selections: data.cashoutMines.result,
      })
    );

    if (data.cashoutMines.balance) {
      dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.cashoutMines.balance } });
      if (data.cashoutMines.profit.profit) {
        const toast = `${t('mines.msgBalance')} ${formatBitcoin(+data.cashoutMines.profit.profit)}`;
        if (+data.cashoutMines.profit.profit >= 0) {
          onPlayBalanceUpdated();
          errorToast(toast);
        } else {
          onPlayToast();
          errorToast(toast);
        }
      }
    }

    setProfitCut(data.cashoutMines.profitCut);
    setSelections(data.cashoutMines.result);
  };

  useEffect(() => {
    if (data?.setupMines) {
      initSession(data.setupMines);
      setMaxProfit(data.setupMines.maxProfit);
    }
  }, [data]);
  return (
    <MineGame
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
