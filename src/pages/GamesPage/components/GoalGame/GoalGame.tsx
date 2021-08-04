import React, { useState, useEffect, useReducer, Reducer } from 'react';
import GoalGameBoard from '../../../../components/GoalGameBoard';
import GoalGameAdvances from '../../../../components/GoalGameAdvances';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import { useMutation, useQuery } from '@apollo/client';
import clsx from 'clsx';
import ButtonGroup from '../../../../components/ButtonGroup';
import styles from './GoalGame.module.scss';
import BitcoinValue from '../../../../components/BitcoinValue';
import Bitcoin from '../../../../components/icons/social/Bitcoin';
import BetAmountControl from '../../../../components/BetAmountControl';
import SpinnerButton from '../../../../components/SpinnerButton';
import { useStateValue } from '../../../../state';
import { useTranslation } from 'react-i18next';
import { SETUP_GOAL } from '../../../../graphql/queries';
import { MAKE_BET_GOALS, CASH_OUT_GOALS, ADVANCE_GOALS } from '../../../../graphql/mutations';
import { appConfig } from '../../../../common/config';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { error as errorToast } from '../../../../components/Toast';

import useSound from 'use-sound';
import {
  toast_v1,
  balance_updated_v1,
  button_click_v1,
  goal_lost_v1,
  goal_select_v1,
  goal_win_v1,
} from '../../../../components/App/App';

import {
  PROBABILITY_HIGH,
  PROBABILITY_MIDDLE,
  PROBABILITY_LOW,
  GoalGameState,
  GoalGameAction,
  goalGameReducer,
  getInitialState,
} from './lib/reducer';
import { GoalGameState as GameState } from '../../../../models/goalGameState.model';
import { formatBitcoin } from '../../../../common/util/format.util';
import { useIsAuthorized } from '../../../../hooks/useIsAuthorized';
import User from '../../../../models/user.model';
import { updateUserAction } from '../../../../user/user.actions';
import { useUserState } from '../../../../user/UserProvider';
import { usePendingBetHook } from '../../../../hooks/usePendingBet.hook';
import { isForbiddenError } from '../../../../common/util/error.util';

interface IProps {
  loadingSetup?: boolean;
  errorSetup?: any;
  loadingBet?: boolean;
  errorBet?: any;
  onRestart?: () => void;
  onStartGame?: (betAmount: number, probability: string) => void;
  session?: any;
  onPlaceBet?: (betId: string, selection: number, currentStep: number) => void;
  onCashOut?: (betId: string) => void;
  maxProfit?: number;
  profitCut?: any;
  user?: User;
}

const deviceSize = { xxl: 6, xl: 5, lg: 4, md: 3, sm: 2, xs: 1 };

const GoalGame: React.FC<IProps> = ({
  loadingSetup,
  errorSetup,
  loadingBet,
  errorBet,
  onRestart = () => null,
  onStartGame = () => null,
  session,
  onPlaceBet = () => null,
  onCashOut = () => null,
  maxProfit,
  profitCut,
  user,
}) => {
  const isAuthorized = useIsAuthorized();
  const { t } = useTranslation(['games']);
  const [state, dispatch] = useReducer<Reducer<GoalGameState, GoalGameAction>>(
    goalGameReducer,
    getInitialState()
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [lastSpot, setLastSpot] = useState<any>(null);
  const [lastAdvanceStatus, setLastAdvanceStatus] = useState<any>(null);
  const [lastStatusTimer, setLastStatusTimer] = useState<any>(null);
  const [device, setDevice] = useState(deviceSize.xl);
  const [isCashOut, setCashOut] = useState(false);
  const [isAlerted, setAlerted] = useState(false);
  const [isGameStartedBtnClicked, setGameStartBtnClicked] = useState(false);

  const [play] = useSound(button_click_v1.default);
  const [playGoalSelect] = useSound(goal_select_v1.default);
  const [playGoalWin] = useSound(goal_win_v1.default);
  const [playLoss] = useSound(goal_lost_v1.default);
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  const PROBABILITIES = [
    {
      label: t('goal.high'),
      value: PROBABILITY_HIGH,
      summary: t('goal.high_summary'),
    },
    {
      label: t('goal.middle'),
      value: PROBABILITY_MIDDLE,
      summary: t('goal.middle_summary'),
    },
    {
      label: t('goal.low'),
      value: PROBABILITY_LOW,
      summary: t('goal.low_summary'),
    },
  ];

  useEffect(() => {
    // init bet amount
    dispatch({
      type: 'SET_AMOUNT',
      payload: { amount: isAuthorized ? appConfig.defaultBetAmount : 0 },
    });

    const checkDeviceSize = () => {
      if (window.innerWidth >= 1500) setDevice(deviceSize.xxl);
      else if (window.innerWidth >= 1200) setDevice(deviceSize.xl);
      else if (window.innerWidth >= 992) setDevice(deviceSize.lg);
      else if (window.innerWidth >= 768) setDevice(deviceSize.md);
      else if (window.innerWidth >= 576) setDevice(deviceSize.sm);
      else setDevice(deviceSize.xs);
    };

    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);

    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  useEffect(() => {
    if (isAuthorized && profitCut && maxProfit && !isAlerted) {
      if (session.profitCut === 'CUT') setAlerted(true);

      (async () =>
        await navigate(`${pathname}?dialog=profit-cut`, { state: { maxProfit, profitCut } }))();
    }
  }, [profitCut, maxProfit]);

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
    if (!errorBet) {
      if (isGameStartedBtnClicked) {
        dispatch({ type: 'START' });
        setGameStartBtnClicked(false);
        setCashOut(false);
      }
      return;
    }

    if (errorBet[0]?.code === 'MAX_PROFIT')
      (async () => {
        await navigate(`${pathname}?dialog=profit-cut`, {
          state: { errorMessage: errorBet[0].message },
        });
      })();
  }, [errorBet]);

  useEffect(() => {
    if (session?.betId && state.gameState === GameState.IDLE) {
      dispatch({
        type: 'START',
        payload: { session },
      });
    }

    if (lastSpot !== null && session && lastAdvanceStatus === null && !isCashOut) {
      if (session?.lucky === true) setLastAdvanceStatus('Won');
      else if (session?.lucky === false) setLastAdvanceStatus('Lost');
      else {
        const isWon =
          session.selections.filter(
            (selection: any) =>
              selection.step === session.currentStep - 1 &&
              selection.luckySpots.includes(selection.selected)
          ).length > 0;

        setLastAdvanceStatus(isWon ? 'Won' : 'Lost');
      }

      setLastStatusTimer(
        setTimeout(async () => {
          setLastSpot(null);
          setLastAdvanceStatus(null);
          setLastStatusTimer(null);
          clearTimeout(lastStatusTimer);
        }, appConfig.goalsGameTimeout / 3)
      );
    }
  }, [session]);

  useEffect(() => {
    if (lastSpot !== null) return;
    if (lastAdvanceStatus !== null) return;
    if (lastStatusTimer !== null) return;
    if (session?.__typename !== 'GoalsComplete') return;

    setTimeout(() => dispatch({ type: 'END' }), 500);
  }, [session, lastSpot, lastAdvanceStatus, lastStatusTimer]);

  useEffect(() => {
    if (lastSpot !== null && isSound) {
      if (lastAdvanceStatus === null) {
        (async () => {
          await playGoalSelect();
        })();
      } else if (lastAdvanceStatus === 'Won' && lastStatusTimer !== null) {
        (async () => {
          await playGoalWin();
        })();
      } else if (lastStatusTimer !== null) {
        (async () => {
          await playLoss();
        })();
      }
    }
  }, [lastSpot, lastAdvanceStatus, lastStatusTimer]);

  if (loadingSetup) {
    return <Loading className={styles.loading} />;
  }

  if (errorSetup) {
    return <Error />;
  }

  const handleStartGame = async () => {
    if (!isAuthorized) {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    setGameStartBtnClicked(true);
    await onStartGame(state.amount, state.probability);
  };

  const handleTryAgain = () => {
    dispatch({ type: 'RESET' });
    onRestart();
    setCashOut(false);
    setLastSpot(null);
    setLastAdvanceStatus(null);
    setLastStatusTimer(null);
  };

  const handleCashOut = async () => {
    if (!isAuthorized) {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    if (session?.currentStep && session?.__typename !== 'GoalsComplete') {
      setCashOut(true);
      onCashOut(session.betId);
    }
  };

  const handlePlaceBet = async (selection?: number) => {
    if (!isAuthorized) {
      return await navigate(`${pathname}?dialog=sign-in`);
    }
    if (
      lastSpot === null &&
      lastAdvanceStatus === null &&
      typeof selection === 'number' &&
      state.gameState === GameState.IN_PROGRESS
    ) {
      setLastSpot(selection);
      await onPlaceBet(session.betId, selection, session.currentStep);
    }
  };

  const getButtonLabel = () => {
    if (lastAdvanceStatus && lastAdvanceStatus !== 'Won') return t('goal.try_again');
    if (state.gameState === GameState.IDLE) return t('goal.start');
    if (state.gameState === GameState.IN_PROGRESS)
      return session?.lucky === false ? t('goal.try_again') : t('goal.take_money');
    if (state.gameState === GameState.GAME_ENDED) {
      return isCashOut || session?.lucky ? t('goal.play_again') : t('goal.try_again');
    }
  };

  const handleButtonClick = async () => {
    setAlerted(false);
    if (isSound) {
      await play();
    }
    if (state.gameState === GameState.IDLE) return handleStartGame();

    if (state.gameState === GameState.GAME_ENDED) return handleTryAgain();

    return handleCashOut();
  };

  const renderGameResultMessage = () => {
    if (lastSpot === null || lastAdvanceStatus === null) return null;

    if (lastAdvanceStatus === 'Won')
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
                GOAAAL!!!
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
                {session?.totalProfit.multiplier.toFixed(appConfig.goalsMultiplierPrecision)}
              </div>

              <div className={clsx('col', styles.text_align__left)}>
                <Bitcoin className={clsx(styles.icon, styles.icon__bitcoin)} />
                {formatBitcoin(session?.totalProfit.profit)}
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

  const renderGameProbability = () => (
    <div
      className={clsx(
        'row',
        state.gameState === GameState.IDLE
          ? null
          : styles.probability__container__visibility__hidden
      )}
    >
      <div
        className={clsx(
          'col-12 col-md-10 col-lg-6 col-xl-4',
          styles.probability__container,
          device <= deviceSize.lg ? styles.probability__container__mobile : null
        )}
      >
        <ButtonGroup
          name="probability"
          items={PROBABILITIES.map((item: any) => ({
            ...item,
            onClick: () => {
              dispatch({ type: 'SET_PROBABILITY', payload: { probability: item.value } });
            },
            checked: state.probability === item.value,
          }))}
          className={styles.probability__button_group}
        />
      </div>
    </div>
  );

  return (
    <div
      style={{ marginTop: 0 }}
      className={styles.container}
      onClick={() => {
        if (lastStatusTimer !== null) {
          setLastSpot(null);
          setLastAdvanceStatus(null);
          clearTimeout(lastStatusTimer);
          setLastStatusTimer(null);
        }
      }}
    >
      <div className={styles.game_section_main_container}>
        {state.gameState !== GameState.IDLE && device > deviceSize.xl ? (
          <GoalGameAdvances
            profits={session?.profits}
            isEnded={state.gameState === GameState.GAME_ENDED}
            className={styles.advances__container}
            currentStep={session?.currentStep}
            selections={session?.selections}
            hideMiddleBall={state.probability === PROBABILITY_MIDDLE}
          />
        ) : null}
        <div className={styles.board__container}>
          {renderGameProbability()}
          <div className="row">
            <div
              className={clsx('col-12', styles.board__probability_text)}
              style={{
                visibility: state.gameState === GameState.IN_PROGRESS ? 'visible' : 'hidden',
              }}
            >
              <span>
                {
                  PROBABILITIES.filter(
                    (probability: any) => probability.value === state.probability
                  )[0]?.summary
                }
              </span>
            </div>
            <GoalGameBoard
              className="col-12"
              handlePlaceBet={handlePlaceBet}
              allowNext={session?.allowNext}
              lastSpot={lastSpot}
              lastAdvanceStatus={lastAdvanceStatus}
              hideMiddleBall={state.probability === PROBABILITY_MIDDLE}
              gameState={state.gameState}
              isCashOut={isCashOut}
            />
          </div>
        </div>
      </div>

      <div className={styles.controls__wrapper}>
        <div className={clsx('container-sm', styles.controls__wrapper__container)}>
          <div
            className={clsx(
              'row',
              styles.controls__wrapper__container__row,
              styles.profit__row,
              styles.margin__horizontal_auto,
              state.gameState === GameState.IN_PROGRESS ? null : styles.profit__visibility__hidden,
              lastSpot || lastAdvanceStatus ? styles.profit__visibility__hidden : null
            )}
          >
            <div className={clsx('col-6', styles.profit)}>
              <div className={clsx(styles.profit__item, styles.profit__item__left)}>
                <div className={styles.profit__label}>
                  {t('goal.profitTotal')}&nbsp;(&times;&nbsp;
                  {session?.totalProfit.multiplier.toFixed(appConfig.goalsMultiplierPrecision)})
                </div>
                <div>
                  <BitcoinValue value={formatBitcoin(session?.totalProfit.profit)} />
                </div>
              </div>
            </div>

            <div className={clsx('col-6', styles.profit)}>
              <div className={clsx(styles.profit__item, styles.profit__right)}>
                <div className={styles.profit__label}>
                  {t('goal.profitNext')}&nbsp;(&times;&nbsp;
                  {session?.nextProfit.multiplier.toFixed(appConfig.goalsMultiplierPrecision)})
                </div>
                <div>
                  <BitcoinValue value={formatBitcoin(session?.nextProfit.profit)} />
                </div>
              </div>
            </div>
          </div>

          {renderGameResultMessage()}

          <div className={clsx('row', styles.justify_content__center)}>
            <div
              className={clsx(
                'col-12 col-xl-5',
                styles.amount__container,
                state.gameState == GameState.IDLE ? null : styles.amount__disabled,
                styles.bet_amount_container
              )}
            >
              <BetAmountControl
                label={t('goal.amount')}
                amount={state.amount}
                min={0}
                max={user?.balance ?? 15}
                onChange={amount => dispatch({ type: 'SET_AMOUNT', payload: { amount } })}
                readonly={state.gameState !== GameState.IDLE}
              />
            </div>

            <div className={clsx(styles.controls__button, styles.action_button, 'col-12 col-xl-5')}>
              <SpinnerButton
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
          <div className={clsx('row', styles.justify_content__center)}>
            {state.gameState !== GameState.IDLE && device <= deviceSize.xl ? (
              <GoalGameAdvances
                profits={session?.profits}
                isEnded={state.gameState === GameState.GAME_ENDED}
                className={styles.advances__container}
                currentStep={session?.currentStep}
                selections={session?.selections}
                hideMiddleBall={state.probability === PROBABILITY_MIDDLE}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

interface PlaceBetVariables {
  betId: string;
  selection: number;
  currentStep: number;
}

export default GoalGame;

export const GoalGameWithData: React.FC<RouteComponentProps> = () => {
  const { data, loading: loadingSetup, error: errorSetup } = useQuery(SETUP_GOAL);
  const [{ user }, dispatch] = useUserState();
  const [makeBetGoals, { loading: loadingBet }] = useMutation(MAKE_BET_GOALS, {
    errorPolicy: 'all',
  });
  const [advanceGoals, { loading: loadingAdvance }] = useMutation(ADVANCE_GOALS, {
    errorPolicy: 'all',
  });
  const [cashoutGoals, { loading: loadingCashOut }] = useMutation(CASH_OUT_GOALS, {
    errorPolicy: 'all',
  });
  const [error, setError] = useState<any>();
  const [session, setSession] = useState<any>(null);
  const [profitCut, setProfitCut] = useState<any>(null);
  const [maxProfit, setMaxProfit] = useState<any>(0);
  const [selections, setSelections] = useState<any>([]);
  const { t } = useTranslation(['games']);

  const [playToast] = useSound(toast_v1.default);
  const [playToastBalanceUpdated] = useSound(balance_updated_v1.default);
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  const [setPendingBet] = usePendingBetHook<PlaceBetVariables>({
    loading: loadingBet,
    action: ({ betId, selection, currentStep }) => handlePlaceBet(betId, selection, currentStep),
  });

  const onPlayToast = async () => {
    if (isSound) {
      await playToast();
    }
  };

  const onPlayToastBalanceUpdated = async () => {
    if (isSound) {
      await playToastBalanceUpdated();
    }
  };

  const handleRestart = () => {
    setSession(null);
    setSelections([]);
    setProfitCut(null);
  };

  const initSession = (goalsGameSetupObj: any) => {
    if (goalsGameSetupObj?.__typename !== 'GoalsGameSetup') return;

    setSession(goalsGameSetupObj.session);
    setSelections(goalsGameSetupObj.session?.selections || []);
    setProfitCut(goalsGameSetupObj.session?.profitCut || null);

    if (goalsGameSetupObj.balance)
      dispatch(updateUserAction({ balance: goalsGameSetupObj.balance }));
  };

  const handleStartGame = async (betAmount: number, probability: string) => {
    const { data, errors } = await makeBetGoals({
      variables: { betAmount, difficulty: probability },
    });

    if (errors || data.makeBetGoals?.errors) {
      setError(errors ?? data.makeBetGoals?.errors);

      if (data.makeBetGoals?.errors[0]?.code === 'MAX_PROFIT') return;
      await onPlayToast();
      return errorToast(t('your_bet_could_not_be_placed'));
    }

    await initSession(data.makeBetGoals);
    // await onPlayToastBalanceUpdated();
    // info(`Your balance has been updated: ${formatBitcoin(data.makeBetGoals.balance)}`);
  };

  const handlePlaceBet = async (betId: string, selection: number, currentStep: number) => {
    const variables: PlaceBetVariables = { betId, selection, currentStep };
    const { data, errors } = await advanceGoals({ variables });

    if (errors || data.advanceGoals?.errors) {
      setError(errors ?? data.advanceGoals?.errors);
      if (isForbiddenError(errors)) {
        await setPendingBet(variables);
      } else {
        await onPlayToast();
        return errorToast(t('your_bet_could_not_be_placed'));
      }
    }

    switch (data.advanceGoals.__typename) {
      case 'GoalsStep':
        const __selections = [
          ...selections,
          {
            __typename: 'GoalsRow',
            selected: selection,
            step: currentStep,
            luckySpots: [selection],
          },
        ];

        setSession(
          Object.assign({}, session, {
            ...data.advanceGoals,
            currentStep: data.advanceGoals.allowNext
              ? data.advanceGoals.nextStep
              : session.currentStep,
            selections: __selections,
          })
        );

        setProfitCut(data.advanceGoals.profitCut);
        setSelections(__selections);
        break;

      case 'GoalsComplete':
        setSession(
          Object.assign({}, session, {
            ...data.advanceGoals,
            allowNext: false,
            currentStep: 10,
            selections: data.advanceGoals.result,
          })
        );

        if (data.advanceGoals.balance) {
          dispatch(updateUserAction({ balance: data.advanceGoals.balance }));

          if (data.advanceGoals.profit.profit) {
            // const toast = `${t('your_ballance_has_been_updated')}: ${formatBitcoin(
            //   +data.advanceGoals.profit.profit
            // )}`;
            if (+data.advanceGoals.profit.profit > 0) {
              await onPlayToastBalanceUpdated();
              // success(toast);
            } else {
              // await onPlayToast();
              // info(toast);
            }
          }
        }

        setProfitCut(data.advanceGoals.profitCut);
        setSelections(data.advanceGoals.result);
        break;
    }
  };

  const handleCashOutGoals = async (betId: string) => {
    const { data, errors } = await cashoutGoals({ variables: { betId } });

    if (errors || data.cashoutGoals?.errors) {
      setError(errors ?? data.cashoutGoals?.errors);
      await onPlayToast();
      return errorToast(t('your_bet_could_not_be_placed'));
    }

    setSession(
      Object.assign({}, session, {
        ...data.cashoutGoals,
        allowNext: false,
        currentStep: 10,
        selections: data.cashoutGoals.result,
      })
    );

    if (data.cashoutGoals.balance) {
      dispatch(updateUserAction({ balance: data.cashoutGoals.balance }));

      if (data.cashoutGoals.profit.profit) {
        // const toast = `${t('your_ballance_has_been_updated')}: ${formatBitcoin(
        //   +data.cashoutGoals.profit.profit
        // )}`;

        if (+data.cashoutGoals.profit.profit > 0) {
          await onPlayToastBalanceUpdated();
          // success(toast);
        } else {
          await onPlayToast();
          // info(toast);
        }
      }
    }

    setProfitCut(data.cashoutGoals.profitCut);
    setSelections(data.cashoutGoals.result);
  };

  useEffect(() => {
    if (data?.setupGoals) {
      (async () => {
        await initSession(data.setupGoals);
      })();

      setMaxProfit(data.setupGoals.maxProfit);
    }
  }, [data]);

  return (
    <GoalGame
      user={user}
      loadingSetup={loadingSetup}
      loadingBet={loadingBet || loadingAdvance || loadingCashOut}
      errorSetup={errorSetup}
      errorBet={error}
      onStartGame={handleStartGame}
      session={session}
      onPlaceBet={handlePlaceBet}
      onCashOut={handleCashOutGoals}
      onRestart={handleRestart}
      maxProfit={maxProfit}
      profitCut={profitCut}
    />
  );
};
