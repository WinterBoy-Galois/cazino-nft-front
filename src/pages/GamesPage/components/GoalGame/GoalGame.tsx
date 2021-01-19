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
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { error as errorToast, info, success } from '../../../../components/Toast';
import { appConfig } from '../../../../common/config';
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
    summary: '2 of 3 wins',
  },
  {
    label: 'Middle',
    value: PROBABILITY_MIDDLE,
    summary: '1 of 2 wins',
  },
  {
    label: 'Low',
    value: PROBABILITY_LOW,
    summary: '1 of 3 wins',
  },
];

interface IProps {
  loadingBet?: boolean;
  loadingSetup?: boolean;
  errorSetup?: any;
  errorBet?: any;
  startGame?: (betAmount: number, probability: string) => void;
  session?: any;
  maxProfit?: number;
  onPlaceBet?: (betId: string, selection: number, currentStep: number) => void;
  showProfitCutModal?: () => void;
}

const GoalGame: React.FC<IProps> = ({
  loadingBet,
  loadingSetup,
  errorSetup,
  errorBet,
  startGame = () => null,
  session,
  maxProfit,
  onPlaceBet = () => null,
  showProfitCutModal = () => null,
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
    if (session?.betId) {
      dispatch({
        type: 'START',
        payload: {
          amount: session.betAmount,
          probability: session.difficulty,
        },
      });
    }

    if (session?.profitCut) {
      showProfitCutModal();
    }
  }, [session]);

  if (loadingSetup) {
    return <Loading className={styles.loading} />;
  }

  if (errorSetup) {
    return <Error />;
  }

  const handlePlaceBet = async (selection?: number) => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    if (state.gameState === GameState.IDLE) {
      dispatch({ type: 'START' });

      startGame(state.amount, state.probability);

      return;
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
            isEnded={state.gameState !== GameState.IN_PROGRESS}
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
                onClick={handlePlaceBet}
                loading={loadingBet || state.isRunning}
                disabled={![GameState.IDLE, GameState.IN_PROGRESS].includes(state.gameState)}
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
  const [cashoutGoals] = useMutation(CASH_OUT_GOALS);
  const [error, setError] = useState();
  const [session, setSession] = useState(null);
  const [profitCut, setProfitCut] = useState(null);
  const [maxProfit, setMaxProfit] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selections, setSelections] = useState([]);

  const updateSession = (newSession: any) => {
    setSession(newSession);
    setSelections(newSession.selections);
    if (newSession?.profitCut) setProfitCut(newSession.profitCut);
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

  const startGame = async (betAmount: number, probability: string) => {
    const { data, errors } = await makeBetGoals({
      variables: { betAmount, difficulty: probability },
    });

    checkErrors(data.makeBetGoals, errors);

    dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.makeBetGoals.balance } });

    updateSession(data.makeBetGoals.session);
  };

  const handlePlaceBet = async (betId: string, selection: number, currentStep: number) => {
    const { data, errors } = await advanceGoals({
      variables: { betId, selection },
    });

    checkErrors(data.advanceGoals, errors);

    if (data.advanceGoals?.balance)
      dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.advanceGoals.balance } });

    updateSession(
      Object.assign({}, session, data.advanceGoals, {
        currentStep: data.advanceGoals.nextStep,
        selections: [...selections, { selected: selection, step: currentStep }],
      })
    );
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
      loadingBet={loadingBet}
      errorSetup={errorSetup}
      errorBet={error}
      startGame={startGame}
      session={session}
      maxProfit={maxProfit}
      onPlaceBet={handlePlaceBet}
      showProfitCutModal={showProfitCutModal}
    />
  );
};
