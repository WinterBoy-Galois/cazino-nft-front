import React, { useCallback, useEffect, useMemo } from 'react';
import { RouteComponentProps } from '@reach/router';
import { GoalGameProvider, useGoalGameState } from './GoalGame.provider';
import { GameSectionComponent } from '../GameSection/GameSection.component';
import { Controls } from './components/Controls';
import { ControlsAdditional } from './components/ControlsAdditional';
import { Advances } from './components/Advances';
import { Game } from './components/Game';
import { MutationUpdaterFunction, useMutation, useQuery } from '@apollo/client';
import { SETUP_GOAL } from '../../../../graphql/queries';
import { ADVANCE_GOALS, CASH_OUT_GOALS, MAKE_BET_GOALS } from '../../../../graphql/mutations';
import { error as errorToast } from '../../../../components/Toast';
import {
  balance_updated_v1,
  button_click_v1,
  goal_lost_v1,
  goal_select_v1,
  goal_win_v1,
  toast_v1,
} from '../../../../components/App/App';
import { useOptionalSound } from '../../../../hooks/useOptionalSound.hook';
import { useTranslation } from 'react-i18next';
import { GoalGameStatus, GoalsDifficulty, PlaceBetVariables } from './GoalGame.types';
import { usePendingBetHook } from '../../../../hooks/usePendingBet.hook';
import { isForbiddenError } from '../../../../common/util/error.util';
import { resetGame, updateGoalValue } from './GoalGame.actions';
import { appConfig } from '../../../../common/config';
import { useDirectionMap } from './GoalGame.utils';
import { updateUserAction } from '../../../../user/user.actions';
import { useUserState } from '../../../../user/UserProvider';

let animationTimeout: NodeJS.Timeout;

const advanceUpdate: MutationUpdaterFunction<any, any, any, any> = (
  cache: any,
  { data }: any,
  context
) => {
  cache.modify({
    fields: {
      setupGoals(current: any) {
        const allowNext = data?.advanceGoals?.allowNext;
        const result = data?.advanceGoals?.result;
        const selections = allowNext
          ? [
              ...current.session.selections,
              {
                __typename: 'GoalsRow',
                selected: context?.variables?.selection,
                step: context?.variables?.currentStep,
                luckySpots: [context?.variables?.selection],
              },
            ]
          : Array.isArray(result)
          ? result
          : [];

        return {
          ...current,
          session: {
            ...current.session,
            currentStep: allowNext ? data?.advanceGoals?.nextStep : current.session.currentStep,
            selections,
            profitCut: data?.advanceGoals?.profitCut || current?.session?.profitCut,
            nextProfit: data?.advanceGoals?.nextProfit || current?.session?.nextProfit,
            totalProfit: data?.advanceGoals?.totalProfit || current?.session?.totalProfit,
          },
        };
      },
    },
  });
};

const makeBetUpdate: MutationUpdaterFunction<any, any, any, any> = (cache: any, { data }: any) => {
  cache.modify({
    fields: {
      setupGoals(current: any) {
        const dataSelections = data?.makeBetGoals?.session?.selections;
        return {
          ...current,
          session: {
            ...current.session,
            ...data?.makeBetGoals?.session,
            selections: Array.isArray(dataSelections) ? dataSelections : [],
          },
        };
      },
    },
  });
};

const cashOutUpdate: MutationUpdaterFunction<any, any, any, any> = (cache: any, { data }: any) => {
  cache.modify({
    fields: {
      setupGoals(current: any) {
        const dataSelections = data?.cashoutGoals?.result;
        return {
          ...current,
          session: {
            ...current.session,
            ...data?.cashoutGoals,
            selections: Array.isArray(dataSelections) ? dataSelections : [],
            currentStep: 10,
            allowNext: false,
          },
        };
      },
    },
  });
};

const GoalGameModuleC: React.FC = () => {
  const { t } = useTranslation(['games']);
  const [state, dispatch] = useGoalGameState();
  const [, userDispatch] = useUserState();
  const { data: setupData, loading: setupLoading, error: errorSetup } = useQuery(SETUP_GOAL);
  const [makeBetGoals, { loading: loadingBet }] = useMutation(MAKE_BET_GOALS, {
    errorPolicy: 'all',
    update: makeBetUpdate,
  });
  const [advanceGoals, { loading: advanceGoalsLoading }] = useMutation(ADVANCE_GOALS, {
    errorPolicy: 'all',
    update: advanceUpdate,
  });
  const [cashoutGoals, { loading: loadingCashOut }] = useMutation(CASH_OUT_GOALS, {
    errorPolicy: 'all',
    update: cashOutUpdate,
  });
  const [setPendingBet] = usePendingBetHook<PlaceBetVariables>({
    loading: loadingBet,
    action: ({ betId, selection, currentStep }) => handlePlaceBet(betId, selection, currentStep),
  });

  // selectors
  const session = useMemo(() => setupData?.setupGoals?.session, [setupData?.setupGoals?.session]);
  const ballAmount = useMemo(() => (session?.difficulty === GoalsDifficulty.MIDDLE ? 2 : 3), [
    session?.difficulty,
  ]);
  const directionMap = useDirectionMap(ballAmount);
  const direction = useMemo(
    () => (state?.lastSpot !== null ? directionMap[state.lastSpot] : 'middle'),
    [directionMap, state?.lastSpot]
  );
  const isLoading = useMemo(() => setupLoading || loadingCashOut, [setupLoading, loadingCashOut]);
  const isError = useMemo(() => !!errorSetup, [errorSetup]);

  // Sounds section
  const playToast = useOptionalSound(toast_v1.default);
  const playToastBalanceUpdated = useOptionalSound(balance_updated_v1.default);
  const play = useOptionalSound(button_click_v1.default);
  const playGoalSelect = useOptionalSound(goal_select_v1.default);
  const playGoalWin = useOptionalSound(goal_win_v1.default);
  const playLoss = useOptionalSound(goal_lost_v1.default);

  // Game Actions
  const jump = useCallback(() => {
    clearTimeout(animationTimeout);
    dispatch(updateGoalValue('animationInProgress', true));
    animationTimeout = setTimeout(
      () => dispatch(updateGoalValue('animationInProgress', false)),
      appConfig.goalsGameTimeout / 3
    );
  }, [dispatch]);

  const onUpdateBalance = useCallback(
    async data => {
      if (data.balance) {
        userDispatch(updateUserAction({ balance: data.balance }));

        if (data.profit.profit) {
          if (+data.profit.profit > 0) {
            await playToast();
          } else {
            await playToastBalanceUpdated();
          }
        }
      }
    },
    [playToast, playToastBalanceUpdated, userDispatch]
  );

  const handlePlaceBet = useCallback(
    async (betId: string, selection: number, currentStep: number) => {
      if (advanceGoalsLoading || state.animationInProgress) {
        return null;
      }
      playGoalSelect();
      const variables: PlaceBetVariables = { betId, selection, currentStep };
      const { data, errors } = await advanceGoals({ variables });
      if (errors || data.advanceGoals?.errors) {
        dispatch(updateGoalValue('error', errors ?? data.advanceGoals?.errors));
        if (isForbiddenError(errors)) {
          await setPendingBet(variables);
        } else {
          await playToast();
          return errorToast(t('your_bet_could_not_be_placed'));
        }
      }

      const isWon =
        (data?.advanceGoals?.__typename === 'GoalsStep' && !!data?.advanceGoals?.nextStep) ||
        (data?.advanceGoals?.__typename === 'GoalsComplete' && data?.advanceGoals?.lucky);
      jump();
      dispatch(updateGoalValue('lastSpot', selection));
      dispatch(updateGoalValue('lastLucky', isWon));
      if (isWon) {
        playGoalWin();
      } else {
        playLoss();
      }

      switch (data?.advanceGoals?.__typename) {
        case 'GoalsStep':
          return console.log('goal step');
        case 'GoalsComplete':
          playToastBalanceUpdated();
          dispatch(updateGoalValue('status', GoalGameStatus.GAME_ENDED));
          await onUpdateBalance(data?.advanceGoals);
          return console.log('goal compolete');
      }
    },
    [
      advanceGoals,
      advanceGoalsLoading,
      dispatch,
      jump,
      onUpdateBalance,
      playGoalSelect,
      playGoalWin,
      playLoss,
      playToast,
      playToastBalanceUpdated,
      setPendingBet,
      state.animationInProgress,
      t,
    ]
  );

  // Check if game is already running
  useEffect(() => {
    if (!setupLoading && setupData?.setupGoals) {
      initGame(setupData.setupGoals);
      // set max profit data.setupGoals.maxProfit
    }
    // eslint-disable-next-line
  }, [setupLoading]);

  const initGame = useCallback(
    (data?: any) => {
      if (data?.session) {
        play();
        dispatch(updateGoalValue('status', GoalGameStatus.IN_PROGRESS));
      }
    },
    [dispatch, play]
  );

  const startGame = useCallback(
    async (betAmount: number, difficulty: GoalsDifficulty) => {
      const { data, errors } = await makeBetGoals({
        variables: { betAmount, difficulty },
      });

      if (errors || data.makeBetGoals?.errors) {
        dispatch(updateGoalValue('error', errors ?? data.makeBetGoals?.errors));
        if (data.makeBetGoals?.errors[0]?.code === 'MAX_PROFIT') return;
        await playToast();
        return errorToast(t('your_bet_could_not_be_placed'));
      }

      initGame(data.makeBetGoals);
    },
    [dispatch, initGame, makeBetGoals, playToast, t]
  );

  // Game Button Events
  const onStart = useCallback(() => {
    void startGame(state.amount, state.probability);
  }, [startGame, state.amount, state.probability]);

  const onCashOut = useCallback(async () => {
    const { data, errors } = await cashoutGoals({ variables: { betId: session?.betId } });
    dispatch(resetGame());
    if (errors || data.cashoutGoals?.errors) {
      dispatch(updateGoalValue('error', errors ?? data.cashoutGoals?.errors));
      await playToast();
      return errorToast(t('your_bet_could_not_be_placed'));
    }
    await onUpdateBalance(data?.cashoutGoals);
  }, [cashoutGoals, dispatch, onUpdateBalance, playToast, session?.betId, t]);

  const onTryAgain = useCallback(() => {
    dispatch(resetGame());
    onStart();
  }, [dispatch, onStart]);

  const additionalData = useMemo(
    () => (
      <Advances
        profits={session?.profits}
        selections={session?.selections}
        ballAmount={ballAmount}
        currentStep={session?.currentStep}
        status={state.status}
      />
    ),
    [session?.profits, session?.selections, session?.currentStep, ballAmount, state.status]
  );
  const game = useMemo(
    () => (
      <Game
        session={session}
        ballAmount={ballAmount}
        placeBet={handlePlaceBet}
        status={state.status}
        direction={direction}
        animationInProgress={state.animationInProgress}
        lastLucky={state.lastLucky}
      />
    ),
    [
      ballAmount,
      direction,
      handlePlaceBet,
      session,
      state.animationInProgress,
      state.lastLucky,
      state.status,
    ]
  );
  const controls = useMemo(
    () => (
      <Controls
        onCashOut={onCashOut}
        onTryAgain={onTryAgain}
        isLoading={isLoading}
        onStart={onStart}
      />
    ),
    [isLoading, onCashOut, onStart, onTryAgain]
  );
  const controlsAdditional = useMemo(
    () => (
      <ControlsAdditional
        isActive={state.status === GoalGameStatus.IN_PROGRESS}
        multiplier={session?.totalProfit?.multiplier}
        profit={session?.totalProfit?.profit}
        nextMultiplier={session?.nextProfit?.multiplier}
        nextProfit={session?.nextProfit?.profit}
      />
    ),
    [
      session?.nextProfit?.multiplier,
      session?.nextProfit?.profit,
      session?.totalProfit?.multiplier,
      session?.totalProfit?.profit,
      state.status,
    ]
  );

  return (
    <GameSectionComponent
      fullWidth
      isError={isError}
      isLoading={isLoading}
      additionalData={additionalData}
      game={game}
      controls={controls}
      controlsAdditional={controlsAdditional}
    />
  );
};

export const GoalGameModule: React.FC<RouteComponentProps> = () => {
  return (
    <GoalGameProvider>
      <GoalGameModuleC />
    </GoalGameProvider>
  );
};
