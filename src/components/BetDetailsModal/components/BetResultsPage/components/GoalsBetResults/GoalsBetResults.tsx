import React, { useMemo } from 'react';
import styles from './GoalsBetResults.module.scss';
import { GoalsDifficulty, GoalSelection } from '../../../../../../models/betDetails.model';
import { isNullOrUndefined } from 'util';
import goal from '../../../../../../assets/images/games/goals/game-goals-icon.svg';

interface IProps {
  selections: GoalSelection[];
  difficulty: GoalsDifficulty;
}

const GoalsBetResults: React.FC<IProps> = ({ selections, difficulty }) => {
  selections = useMemo(() => selections.slice().sort((s1, s2) => s2.step - s1.step), [selections]);

  const getHighlightClass = (selection: GoalSelection, index: number) => {
    return (!isNullOrUndefined(selection.selected) &&
      selections[index - 1] &&
      isNullOrUndefined(selections[index - 1].selected)) ||
      (selections.filter(s => s.selected === undefined || s.selected === null).length <= 0 &&
        index === 0)
      ? styles['list__item--highlight']
      : '';
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {selections.map((s, i) => (
          <li
            key={`${s.step}_${s.luckySpots.toString()}_${s.selected}`}
            className={`${styles.list__item} ${getHighlightClass(s, i)}`}
          >
            <div className={styles.step}>{s.step + 1}</div>
            <div className={styles.goals}>
              {(difficulty === GoalsDifficulty.GOALS1OUT2 ? [0, 1] : [0, 1, 2]).map((v, i) => (
                <div key={`goal_${i}`} className={styles.goal}>
                  <div className={styles.goal__index}>{v}</div>
                  <div
                    className={`${styles.goal__ball} ${
                      s.luckySpots.includes(v) ? styles['goal__ball--win'] : ''
                    }
                    ${s.selected === v ? styles['goal__ball--selected'] : ''}`}
                  >
                    <img className={styles.goal__ball__icon} src={goal} alt="Goal" />
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsBetResults;
