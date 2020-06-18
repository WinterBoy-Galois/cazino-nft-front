import React, { useMemo } from 'react';
import styles from './GoalsBetResults.module.scss';
import { GoalSelection } from '../../../../../../models/betDetails.model';
import Goals from '../../../../../icons/games/Goals';
import { isNullOrUndefined } from 'util';

interface IProps {
  selections: GoalSelection[];
}

const GoalsBetResults: React.FC<IProps> = ({ selections }) => {
  selections = useMemo(() => selections.sort((s1, s2) => s2.step - s1.step), [selections]);

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
          <li key={s.step} className={`${styles.list__item} ${getHighlightClass(s, i)}`}>
            <div className={styles.step}>{s.step + 1}</div>
            <div className={styles.goals}>
              {Array.from(new Array(3)).map((_, i) => (
                <div key={`goal_${i}`} className={styles.goal}>
                  <div className={styles.goal__index}>{i}</div>
                  <Goals
                    className={`${styles.goal__ball} ${
                      s.luckySpots.includes(i) ? styles['goal__ball--win'] : ''
                    }
                    ${s.selected === i ? styles['goal__ball--selected'] : ''}`}
                  />
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
