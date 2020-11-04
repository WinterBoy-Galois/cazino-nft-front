import React, { useEffect, useState } from 'react';
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
import { error, success } from '../../../../components/Toast';
import useTargetSliderMin from '../../../../hooks/useTargetSliderMin.hook';
import useTargetSliderMax from '../../../../hooks/useTargetSliderMax.hook';

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
  result: initialResult = 0,
  loadingSetup,
  errorSetup,
  minProbability = 0,
  maxProbability = 100,
  over = false,
}) => {
  const [target, setTarget] = useState<number>(50);
  const [result, setResult] = useState<number>(initialResult);

  const minTarget = useTargetSliderMin(minProbability, maxProbability);
  const maxTarget = useTargetSliderMax(minProbability, maxProbability);

  useEffect(() => setResult(initialResult), [initialResult]);

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
          onChangeTarget={t => {
            setResult(0);
            setTarget(t);
          }}
          result={result}
          target={target}
          minValue={minTarget}
          maxValue={maxTarget}
          over={over}
        />
      </div>

      <div className={styles.controls}>
        <div className="container">
          <div className={styles.controls__button}>
            <SpinnerButton onClick={() => onPlaceBet(0.00001, target, false)} loading={loadingBet}>
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
  const { data, loading: loadingSetup, error: errorSetup } = useQuery(SETUP_DICE);
  const [makeBetDice, { loading: loadingBet }] = useMutation(MAKE_BET_DICE);
  const [{ auth }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [result, setResult] = useState();

  const handlePlaceBet = async (amount: number, target: number, over: boolean) => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    const { data, errors } = await makeBetDice({ variables: { betAmount: amount, target, over } });

    if (errors) {
      error("Your bet couldn't be placed, please try again.");
    }

    setResult(data?.makeBetDice?.result);

    dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data?.makeBetDice?.balance } });
    success(`Your balance has been updated: ${+data?.makeBetDice?.profit}`);
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
