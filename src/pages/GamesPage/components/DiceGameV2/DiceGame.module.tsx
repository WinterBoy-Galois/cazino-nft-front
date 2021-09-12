import React, { useCallback, useEffect, useMemo } from 'react';
import { Controls, ControlsAdditional, Game } from './components';
import { GameSectionComponent } from '../GameSection/GameSection.component';
import { DiceGameProvider, useDiceGameState } from './DiceGame.provider';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import { useMutation, useQuery } from '@apollo/client';
import { SETUP_DICE } from '../../../../graphql/queries';
import { useIsAuthorized } from '../../../../hooks/useIsAuthorized';
import { DiceGameStatus, PlaceBetVariables, SetupDiceQuery } from './DiceGame.types';
import { MAKE_BET_DICE } from '../../../../graphql/mutations';
import { usePendingBetHook } from '../../../../hooks/usePendingBet.hook';
import {
  balance_updated_v1,
  button_click_v1,
  dice_hit_v1,
  dice_lost_v1,
  dice_win_v1,
  toast_v1,
} from '../../../../components/App/App';
import { useOptionalSound } from '../../../../hooks/useOptionalSound.hook';
import { isForbiddenError } from '../../../../common/util/error.util';
import { error as errorToast } from '../../../../components/Toast';
import { useTranslation } from 'react-i18next';
import { setGameStatus, resetGame, updateDiceValue } from './DiceGame.actions';
import { updateUserAction } from '../../../../user/user.actions';
import { appConfig } from '../../../../common/config';
import { useUserState } from '../../../../user/UserProvider';

let isInProgress = false;

export const DiceGameModuleC: React.FC = () => {
  const { t } = useTranslation('games');
  const [state, dispatch] = useDiceGameState();
  const [, userDispatch] = useUserState();
  const isAuthorized = useIsAuthorized();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, loading: loadingSetup, error: errorSetup } = useQuery<SetupDiceQuery>(SETUP_DICE, {
    skip: !isAuthorized,
  });
  const [makeBetDice, { loading: loadingBet }] = useMutation(MAKE_BET_DICE, { errorPolicy: 'all' });
  const [setPendingBet] = usePendingBetHook<PlaceBetVariables>({
    loading: loadingBet,
    action: ({ betAmount, target, over }) => onPlaceBet(betAmount, target, over),
  });

  useEffect(() => {
    if (data?.setupDice.he) {
      dispatch(updateDiceValue('he', data?.setupDice.he));
    }
  }, [data?.setupDice.he, dispatch]);

  /*
    Sounds block
  */
  const playButtonClick = useOptionalSound(button_click_v1.default);
  const playDiceWin = useOptionalSound(dice_win_v1.default);
  const playLoss = useOptionalSound(dice_lost_v1.default);
  const playToast = useOptionalSound(toast_v1.default);
  const playToastBalance = useOptionalSound(balance_updated_v1.default);
  const playDiceHit = useOptionalSound(dice_hit_v1.default);

  /*
    Place bet Function
  */
  const handleMakeBetError = useCallback(
    async (errors, data, variables) => {
      const err = errors ?? data.makeBetDice?.errors;
      if (err) {
        dispatch(updateDiceValue('error', err));
        if (isForbiddenError(errors)) {
          setPendingBet(variables);
          throw Error('Forbidden error');
        } else {
          await playToast();
          if (data.makeBetDice?.errors[0]?.code === 'MAX_PROFIT') {
            errorToast(t('your_bet_may_reaches_the_profit_limit'));
          }
          errorToast(t('your_bet_could_not_be_placed'));
          throw Error(err);
        }
      }
    },
    [dispatch, playToast, setPendingBet, t]
  );

  const handleMakeBetSuccess = useCallback(
    data => {
      setTimeout(async () => {
        await dispatch(setGameStatus(DiceGameStatus.HITTING));
        await playDiceHit();
        await dispatch(updateDiceValue('result', data?.makeBetDice?.result));
      }, appConfig.diceGameTimeout / 2);
      setTimeout(async () => {
        userDispatch(updateUserAction({ balance: data?.makeBetDice?.balance }));
        if (+data?.makeBetDice?.lucky) {
          await playDiceWin();
          await playToastBalance();
          await dispatch(setGameStatus(DiceGameStatus.WON));
        } else {
          await playLoss();
          await dispatch(setGameStatus(DiceGameStatus.LOST));
        }
        isInProgress = false;
      }, appConfig.diceGameTimeout);
    },
    [dispatch, playDiceHit, playDiceWin, playLoss, playToastBalance, userDispatch]
  );

  const onPlaceBet = useCallback(
    async (betAmount: number, target: number, over: boolean) => {
      try {
        isInProgress = true;
        await setPendingBet(null);
        const variables: PlaceBetVariables = { betAmount, target, over };
        await playButtonClick();
        const { data, errors } = await makeBetDice({
          variables,
        });
        await handleMakeBetError(errors, data, variables);
        await dispatch(resetGame());
        await handleMakeBetSuccess(data);
      } catch (error) {
        isInProgress = false;
        // eslint-disable-next-line no-console
        console.error('Something went wrong', error);
      }
    },
    [
      dispatch,
      handleMakeBetError,
      handleMakeBetSuccess,
      makeBetDice,
      playButtonClick,
      setPendingBet,
    ]
  );

  /*
    Util actions
  */
  const showLoginModal = useCallback(() => {
    return navigate(`${pathname}?dialog=sign-in`);
  }, [pathname, navigate]);

  const onStartGame = useCallback(async () => {
    if (!isAuthorized) return showLoginModal();
    if (isInProgress) return;
    return onPlaceBet(state.amount, state.target, state.isOver);
  }, [isAuthorized, showLoginModal, state.amount, state.target, state.isOver, onPlaceBet]);

  /*
    Util variables
  */
  const isLoading = useMemo(() => loadingSetup, [loadingSetup]);
  const isError = useMemo(() => !!errorSetup, [errorSetup]);

  /*
    Game sections
  */
  const game = useMemo(() => <Game />, []);
  const controls = useMemo(
    () => (
      <Controls
        he={state.he}
        minProbability={1}
        maxProbability={10}
        {...data?.setupDice}
        onStart={onStartGame}
      />
    ),
    [data?.setupDice, onStartGame, state.he]
  );
  const controlsAdditional = useMemo(() => <ControlsAdditional profit={state.profit} />, [
    state.profit,
  ]);

  return (
    <GameSectionComponent
      isError={isError}
      isLoading={isLoading}
      game={game}
      controls={controls}
      controlsAdditional={controlsAdditional}
    />
  );
};

export const DiceGameModule: React.FC<RouteComponentProps> = () => {
  return (
    <DiceGameProvider>
      <DiceGameModuleC />
    </DiceGameProvider>
  );
};
