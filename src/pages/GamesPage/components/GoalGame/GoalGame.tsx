import React, { useState, useEffect, useReducer, Reducer, useCallback } from 'react';
import GoalGameBoard from '../../../../components/GoalGameBoard';
import GoalGameStages from '../../../../components/GoalGameStages';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import { useMutation, useQuery } from '@apollo/client';
import clsx from 'clsx';
import ButtonGroup from '../../../../components/ButtonGroup';
import styles from './GoalGame.module.scss';
import BitcoinValue from '../../../../components/BitcoinValue';
import BetAmountControl from '../../../../components/BetAmountControl';
import SpinnerButton from '../../../../components/SpinnerButton';
import { useStateValue } from '../../../../state';
import { useTranslation } from 'react-i18next';
import { SETUP_GOAL } from '../../../../graphql/queries';
import { MAKE_BET_GOALS, CASH_OUT_GOALS, ADVANCE_GOALS } from '../../../../graphql/mutations';
import { appConfig } from '../../../../common/config';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { error as errorToast, success, info } from '../../../../components/Toast';
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

const PROBABILITES = [
  {
    label: 'High',
    value: PROBABILITY_HIGH,
    summary: '2 of 3 win',
  },
  {
    label: 'Middle',
    value: PROBABILITY_MIDDLE,
    summary: '1 of 2 win',
  },
  {
    label: 'Low',
    value: PROBABILITY_LOW,
    summary: '1 of 3 win',
  },
];

interface IProps {
  loadingSetup?: boolean;
  errorSetup?: any;
  loadingBet?: boolean;
  errorBet?: any;
  onStartGame?: (betAmount: number, probability: string) => void;
  session?: any;
  updateSession?: (session: any) => void;
  onPlaceBet?: (betId: string, selection: number, currentStep: number) => void;
  onCashOut?: (betId: string) => void;
  showProfitCutModal?: () => void;
  lastSelection?: number;
  setLastSelection?: (selection: number) => void;
}

const GoalGame: React.FC<IProps> = ({
  loadingSetup,
  errorSetup,
  loadingBet,
  errorBet,
  onStartGame = () => null,
  session,
  updateSession = () => null,
  onPlaceBet = () => null,
  onCashOut = () => null,
  showProfitCutModal = () => null,
  lastSelection,
  setLastSelection = () => null,
}) => {
  const [{ auth }] = useStateValue();
  const { t } = useTranslation(['games']);
  const [state, dispatch] = useReducer<Reducer<GoalGameState, GoalGameAction>>(
    goalGameReducer,
    getInitialState()
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (auth.state !== 'SIGNED_IN') {
      dispatch({ type: 'RESET' });
    }
  }, [auth.state]);

  useEffect(() => {
    if (errorBet) {
      dispatch({ type: 'END' });
    }
  }, [errorBet]);

  // Cash Out
  useEffect(() => {
    if (session?.allowNext === false && state.gameState === GameState.GAME_ENDED) {
      dispatch({ type: 'RESET' });

      return;
    }
  }, [session]);

  // Start the game
  useEffect(() => {
    if (session?.betId && state.gameState === GameState.IDLE) {
      dispatch({
        type: 'START',
        payload: { session },
      });

      return;
    }
  }, [session]);

  // Show ProfitCut Modal
  useEffect(() => {
    if (session?.profitCut) {
      showProfitCutModal();

      return;
    }
  }, [session]);

  // Show Won / Lost for each stage
  useEffect(() => {
    if (session && lastSelection !== -1) {
      dispatch({
        type: 'SET_GAME_STATE',
        payload: {
          gameState: session.allowNext ? GameState.WON : GameState.LOST,
        },
      });

      const initTimer = setTimeout(() => {
        setLastSelection(-1);

        dispatch({ type: session.allowNext ? 'START' : 'END' });
      }, appConfig.goalsGameTimeout);

      const resetTimer = setTimeout(() => {
        if (!session.allowNext) {
          updateSession(null);

          dispatch({ type: 'RESET' });
        }
      }, appConfig.goalsGameTimeout * 2);

      return () => {
        clearTimeout(initTimer);
        clearTimeout(resetTimer);
      };
    }
  }, [session]);

  if (loadingSetup) {
    return <Loading className={styles.loading} />;
  }

  if (errorSetup) {
    return <Error />;
  }

  const handleStartGame = async () => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    dispatch({ type: 'START' });

    onStartGame(state.amount, state.probability);

    return;
  };

  const handleCashOut = async () => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    if (session === null) return;

    if (session.currentStep === 0) return;

    dispatch({ type: 'END' });

    onCashOut(session.betId);
  };

  const handlePlaceBet = async (selection?: number) => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    if (typeof selection === 'number' && state.gameState === GameState.IN_PROGRESS) {
      onPlaceBet(session.betId, selection, session.currentStep);

      return;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board__container}>
        <div className="row">
          <GoalGameBoard
            className="col-12"
            gameState={state.gameState}
            selection={lastSelection}
            handlePlaceBet={handlePlaceBet}
          />
        </div>

        <div className="row">
          <div
            className={clsx(
              'col-12 col-md-6 col-lg-4',
              styles.probability__container,
              state.gameState === GameState.IDLE
                ? null
                : styles.probability__container__visibility__hidden
            )}
          >
            <div className={styles.probability__label}>Probability</div>

            <ButtonGroup
              name="probability"
              items={PROBABILITES.map(item => ({
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

        {state.gameState !== GameState.IDLE ? (
          <GoalGameStages
            profits={session?.profits}
            isEnded={[GameState.GAME_ENDED, GameState.LOST].includes(state.gameState)}
            className={styles.stages__container}
            currentStep={session?.currentStep}
            selections={session?.selections}
          />
        ) : null}
      </div>

      <div className={styles.controls__wrapper}>
        <div className="container">
          <div
            className={clsx(
              'row',
              styles.profit__row,
              styles.margin__horizontal_auto,
              state.gameState === GameState.IN_PROGRESS ? null : styles.profit__visibility__hidden
            )}
          >
            <div className={clsx('col-6', styles.profit)}>
              <div className={clsx(styles.profit__item, styles.profit__item__left)}>
                <div className={styles.profit__label}>
                  {t('goal.profitTotal')}&nbsp;(&times;&nbsp;
                  {session?.totalProfit.multiplier.toFixed(3)})
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
                  {session?.nextProfit.multiplier.toFixed(3)})
                </div>
                <div>
                  <BitcoinValue value={formatBitcoin(session?.nextProfit.profit)} />
                </div>
              </div>
            </div>
          </div>

          <div className={clsx('row', styles.justify_content__center)}>
            <div
              className={clsx(
                'col-12 col-xl-4',
                styles.amount__container,
                state.gameState == GameState.IDLE ? null : styles.amount__disabled
              )}
            >
              <BetAmountControl
                label={t('goal.amount')}
                amount={state.amount}
                min={0.00000001}
                max={auth.user?.balance ?? 15}
                onChange={amount => dispatch({ type: 'SET_AMOUNT', payload: { amount } })}
                readonly={state.gameState !== GameState.IDLE}
              />
            </div>

            <div className={clsx(styles.controls__button, 'col-12 col-xl-4')}>
              <SpinnerButton
                onClick={() => {
                  state.gameState === GameState.IDLE ? handleStartGame() : handleCashOut();
                }}
                loading={loadingBet || state.isRunning}
                disabled={
                  ![GameState.IDLE, GameState.IN_PROGRESS].includes(state.gameState) ||
                  session?.currentStep === 0
                }
              >
                {state.gameState === GameState.IDLE ? 'start' : 'take money'}
              </SpinnerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalGame;

export const GoalGameWithData: React.FC<RouteComponentProps> = () => {
  const { data, loading: loadingSetup, error: errorSetup } = useQuery(SETUP_GOAL);
  const [{ auth }, dispatch] = useStateValue();
  const [makeBetGoals, { loading: loadingBet }] = useMutation(MAKE_BET_GOALS);
  const [advanceGoals, { loading: loadingAdvance }] = useMutation(ADVANCE_GOALS);
  const [cashoutGoals, { loading: loadingCashOut }] = useMutation(CASH_OUT_GOALS);
  const [error, setError] = useState();
  const [session, setSession] = useState(null);
  const [profitCut, setProfitCut] = useState(null);
  const [maxProfit, setMaxProfit] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selections, setSelections] = useState([]);
  const [lastSelection, setLastSelection] = useState(-1);

  const updateSession = (newSession: any) => {
    setSession(newSession);
    setSelections(newSession?.selections ? newSession.selections : []);
    setProfitCut(newSession?.profitCut ? newSession.profitCut : null);
  };

  const checkErrors = (dataRes: any, errors: any) => {
    if (errors || dataRes?.errors) {
      setError(errors ?? dataRes?.errors);

      if (dataRes?.errors[0]?.code === 'MAX_PROFIT') {
        return errorToast('Your bet may reaches the profit limit.');
      }

      return errorToast("Your bet couldn't be placed, please try again.");
    }
  };

  const handleStartGame = async (betAmount: number, probability: string) => {
    const { data, errors } = await makeBetGoals({
      variables: { betAmount, difficulty: probability },
    });

    checkErrors(data.makeBetGoals, errors);

    updateSession(data.makeBetGoals.session);

    setTimeout(() => {
      dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.makeBetGoals.balance } });
      info(`Your balance has been updated: ${formatBitcoin(data.makeBetGoals.balance)}`);
    }, appConfig.goalsGameTimeout);
  };

  const handlePlaceBet = async (betId: string, selection: number, currentStep: number) => {
    const { data, errors } = await advanceGoals({
      variables: { betId, selection },
    });

    checkErrors(data.advanceGoals, errors);

    setLastSelection(selection);
    if (data.advanceGoals?.allowNext) {
      updateSession(
        Object.assign({}, session, {
          totalProfit: data.advanceGoals.totalProfit,
          nextProfit: data.advanceGoals.nextProfit,
          allowNext: data.advanceGoals.allowNext,
          currentStep: data.advanceGoals.nextStep,
          selections: [...selections, { selected: selection, step: currentStep }],
        })
      );
    } else {
      updateSession(
        Object.assign({}, session, {
          allowNext: false,
          selections: data.advanceGoals.result,
        })
      );
    }

    if (data.advanceGoals?.balance) {
      setTimeout(() => {
        dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.advanceGoals.balance } });

        if (data.advanceGoals?.profit.profit) {
          const toast = `Your balance has been updated: ${formatBitcoin(
            +data.advanceGoals.profit.profit
          )}`;

          if (+data.advanceGoals.profit.profit >= 0) {
            success(toast);
          } else {
            info(toast);
          }
        }
      }, appConfig.goalsGameTimeout);
    }
  };

  const handleCashOutGoals = async (betId: string) => {
    const { data, errors } = await cashoutGoals({ variables: { betId } });

    checkErrors(data.cashoutGoals, errors);

    if (data.cashoutGoals?.balance) {
      setTimeout(() => {
        updateSession(
          Object.assign({}, session, {
            allowNext: false,
            // selections: data.cashoutGoals.result,
          })
        );

        dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.cashoutGoals.balance } });

        if (data.cashoutGoals?.profit.profit) {
          const toast = `Your balance has been updated: ${formatBitcoin(
            +data.cashoutGoals.profit.profit
          )}`;

          if (+data.cashoutGoals.profit.profit >= 0) {
            success(toast);
          } else {
            info(toast);
          }
        }
      }, appConfig.goalsGameTimeout);
    }
  };

  useEffect(() => {
    if (data?.setupGoals) {
      updateSession(data.setupGoals.session);
      setMaxProfit(data.setupGoals.maxProfit);
    }
  }, [data]);

  const showProfitCutModal = useCallback(
    () =>
      profitCut &&
      auth.state === 'SIGNED_IN' &&
      navigate(`${pathname}?dialog=profit-cut`, {
        state: {
          maxProfit,
          profitCut,
        },
      }),
    [pathname, auth.state, maxProfit, profitCut]
  );

  return (
    <GoalGame
      loadingSetup={loadingSetup}
      loadingBet={loadingBet || loadingAdvance || loadingCashOut}
      errorSetup={errorSetup}
      errorBet={error}
      onStartGame={handleStartGame}
      session={session}
      updateSession={updateSession}
      onPlaceBet={handlePlaceBet}
      onCashOut={handleCashOutGoals}
      showProfitCutModal={showProfitCutModal}
      lastSelection={lastSelection}
      setLastSelection={setLastSelection}
    />
  );
};
