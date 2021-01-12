import React, { useState } from 'react';
import GoalGameBoard from '../../../../components/GoalGameBoard';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import clsx from 'clsx';
import ButtonGroup from '../../../../components/ButtonGroup';
import styles from './GoalGame.module.scss';
import BetAmountControl from '../../../../components/BetAmountControl';
import SpinnerButton from '../../../../components/SpinnerButton';
import { useStateValue } from '../../../../state';
import { useTranslation } from 'react-i18next';

interface IProps {
  loadingBet?: boolean;
}

const probabilities = [
  {
    label: 'High',
    value: 'high',
    summary: '2 of 3 wins',
  },
  {
    label: 'Middle',
    value: 'middle',
    summary: '1 of 2 wins',
  },
  {
    label: 'Low',
    value: 'low',
    summary: '1 of 3 wins',
  },
];

const GoalGame: React.FC<IProps> = ({ loadingBet }) => {
  const [{ auth }] = useStateValue();
  const [probability, setProbability] = useState('high');
  const { t } = useTranslation(['games']);

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
                onClick: () => setProbability(item.value),
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
                min={0.00000001}
                max={auth.user?.balance ?? 15}
              />
            </div>

            <div className={clsx(styles.controls__button, 'col-12 col-xl-4')}>
              <SpinnerButton loading={loadingBet}>start</SpinnerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalGame;

export const GoalGameWithData: React.FC<RouteComponentProps> = () => {
  return <GoalGame loadingBet={false} />;
};
