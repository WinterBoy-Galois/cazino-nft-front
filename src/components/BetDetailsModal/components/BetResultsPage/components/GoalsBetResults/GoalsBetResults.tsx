import React from 'react';
import styles from './GoalsBetResults.module.scss';
// import Mine from '../../../../../../assets/images/games/mines/mines-boom.svg';
import { GoalSelection } from '../../../../../../models/betDetails.model';

interface IProps {
  selections: GoalSelection[];
}

const GoalsBetResults: React.FC<IProps> = () => {
  return <div className={styles.container}>Goals</div>;
};

export default GoalsBetResults;
