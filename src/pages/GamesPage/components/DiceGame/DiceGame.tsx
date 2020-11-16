import React, { Reducer, useEffect, useReducer, useState } from 'react';
import DiceGameBoard from '../../../../components/DiceGameBoard';
import SpinnerButton from '../../../../components/SpinnerButton';
import { SETUP_DICE } from '../../../../graphql/queries';
import styles from './DiceGame.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import clsx from 'clsx';
import { MAKE_BET_DICE } from '../../../../graphql/mutations';
import { useStateValue } from '../../../../state';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { error, info, success } from '../../../../components/Toast';
import useTargetSliderMin from '../../../../hooks/useTargetSliderMin.hook';
import useTargetSliderMax from '../../../../hooks/useTargetSliderMax.hook';
import { DiceGameAction, diceGameReducer, DiceGameState } from './lib/reducer';
import { DiceGameState as GameState } from '../../../../models/diceGameState.model';
import { appConfig } from '../../../../common/config';

interface IProps {
  loadingBet?: boolean;
  loadingSetup?: boolean;
  minProbability?: number;
  maxProbability?: number;
  he?: number;
  onPlaceBet?: (amount: number, target: number, over: boolean) => void;
  result?: number;
  errorSetup?: any;
  over?: boolean;
}

const DiceGame: React.FC<IProps> = ({
  onPlaceBet = () => null,
  loadingBet,
  result = 0,
  loadingSetup,
  errorSetup,
  minProbability = 0,
  maxProbability = 100,
}) => {
  const [{ auth }] = useStateValue();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [state, dispatch] = useReducer<Reducer<DiceGameState, DiceGameAction>>(diceGameReducer, {
    target: 50,
    result,
    amount: 0.0001,
    multiplier: 0,
    probability: 0,
    gameState: GameState.IDLE,
    over: false,
    isRunning: false,
  });

  const minTarget = useTargetSliderMin(minProbability, maxProbability);
  const maxTarget = useTargetSliderMax(minProbability, maxProbability);

  useEffect(() => {
    if (result) {
      const resultTimer = setTimeout(() => {
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
  }, [result]);

  const handlePlaceBet = async () => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    dispatch({ type: 'START' });
    dispatch({ type: 'SET_RESULT', payload: { result: 0 } });
    dispatch({ type: 'CALC_GAME_STATE' });

    onPlaceBet(state.amount, state.target, false);
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

      <div className={styles.controls}>
        <div className="container">
          <div className={styles.controls__button}>
            <SpinnerButton onClick={handlePlaceBet} loading={loadingBet || state.isRunning}>
              start
            </SpinnerButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceGame;

export const DiceGameWithData: React.FC<RouteComponentProps> = () => {
  const [, dispatch] = useStateValue();
  const { data, loading: loadingSetup, error: errorSetup } = useQuery(SETUP_DICE);
  const [makeBetDice, { loading: loadingBet }] = useMutation(MAKE_BET_DICE);
  const [result, setResult] = useState();

  const handlePlaceBet = async (amount: number, target: number, over: boolean) => {
    const { data, errors } = await makeBetDice({ variables: { betAmount: amount, target, over } });

    if (errors) {
      error("Your bet couldn't be placed, please try again.");
    }

    setResult(data?.makeBetDice?.result);

    setTimeout(() => {
      dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data?.makeBetDice?.balance } });
      const toast = `Your balance has been updated: ${+data?.makeBetDice?.profit}`;
      if (+data?.makeBetDice?.profit > 0) {
        success(toast);
      } else {
        info(toast);
      }
    }, appConfig.diceGameTimeout);
  };

  return (
    <DiceGame
      loadingSetup={loadingSetup}
      loadingBet={loadingBet}
      minProbability={data?.setupDice?.minProbability}
      maxProbability={data?.setupDice?.maxProbability}
      he={data?.setupDice?.he}
      onPlaceBet={handlePlaceBet}
      result={result}
      errorSetup={errorSetup}
    />
  );
};
