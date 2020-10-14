import React, { Fragment } from 'react';
import styles from './ProfitLabel.module.scss';
import { formatMultiplier } from '../../common/util/format.util';

interface IProps {
  label: string;
  multiplier: number;
}

const ProfitLabel: React.FC<IProps> = ({ label, multiplier }) => {
  return (
    <Fragment>
      {label} (<span className={styles['profit-label']}>{formatMultiplier(multiplier)}</span>)
    </Fragment>
  );
};

export default ProfitLabel;
