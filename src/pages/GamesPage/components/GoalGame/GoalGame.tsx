import React, { useState, useEffect, useReducer, Reducer } from 'react';
import GoalGameBoard from '../../../../components/GoalGameBoard';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import { useMutation, useQuery } from '@apollo/client';
import clsx from 'clsx';
import ButtonGroup from '../../../../components/ButtonGroup';
import styles from './GoalGame.module.scss';
import BetAmountControl from '../../../../components/BetAmountControl';
import SpinnerButton from '../../../../components/SpinnerButton';
import { useStateValue } from '../../../../state';
import { useTranslation } from 'react-i18next';
import { SETUP_GOAL } from '../../../../graphql/queries';
import { MAKE_BET_GOALS } from '../../../../graphql/mutations';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import {
  PROBABILITES,
  GoalGameState,
  GoalGameAction,
  goalGameReducer,
  getInitialState,
} from './lib/reducer';
import { GoalGameState as GameState } from '../../../../models/goalGameState.model';

interface IProps {
  loadingBet?: boolean;
  loadingSetup?: boolean;
  errorSetup?: any;
  errorBet?: any;
}

const probabilities = [
  {
    label: 'High',
    value: PROBABILITES.HIGH,
    summary: '2 of 3 wins',
  },
  {
    label: 'Middle',
    value: PROBABILITES.MIDDLE,
    summary: '1 of 2 wins',
  },
  {
    label: 'Low',
    value: PROBABILITES.LOW,
    summary: '1 of 3 wins',
  },
];

const GoalGame: React.FC<IProps> = ({ loadingBet, loadingSetup, errorSetup, errorBet }) => {
  const [{ auth }] = useStateValue();
  const [probability, setProbability] = useState(PROBABILITES.HIGH);
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

  if (loadingSetup) {
    return <Loading className={styles.loading} />;
  }

  if (errorSetup) {
    return <Error />;
  }

  return (
    <div className={styles.container}>
      <div className={clsx('container', styles.board__container)}>
        <div className="row">
          <GoalGameBoard className="col-12" />
        </div>

        <div className="row">
          <div className={clsx('col-12 col-md-6 col-lg-4', styles.probability__container)}>
            <div className={styles.probability__label}>Probability</div>

            <ButtonGroup
              name="probability"
              items={probabilities.map(item => ({
                ...item,
                onClick: () => {
                  setProbability(item.value);
                  dispatch({ type: 'SET_PROBABILITY', payload: { probability: item.value } });
                },
                checked: probability === item.value,
              }))}
              className={styles.probability__button_group}
            />
          </div>
        </div>
      </div>

      <div className={styles.controls__wrapper}>
        <div className="container">
          <div className={clsx('row', styles.justify_content__center)}>
            <div className={clsx('col-12 col-xl-4', styles.amount__container)}>
              <BetAmountControl
                label={t('goal.amount')}
                amount={state.amount}
                min={0.00000001}
                max={auth.user?.balance ?? 15}
                onChange={amount => dispatch({ type: 'SET_AMOUNT', payload: { amount } })}
              />
            </div>

            <div className={clsx(styles.controls__button, 'col-12 col-xl-4')}>
              <SpinnerButton
                loading={loadingBet || state.isRunning}
                disabled={state.gameState !== GameState.IDLE}
              >
                start
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
  const [, dispatch] = useStateValue();
  const [makeBetClams, { loading: loadingBet }] = useMutation(MAKE_BET_GOALS);
  const [error, setError] = useState();

  return (
    <GoalGame
      loadingSetup={loadingSetup}
      loadingBet={loadingBet}
      errorSetup={errorSetup}
      errorBet={error}
    />
  );
};
