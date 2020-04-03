import React from 'react';
import styles from './SpacerRow.module.scss';

const SpacerRow: React.FC = () => (
  <tr className={styles.spacer}>
    <td>
      <div />
    </td>
  </tr>
);

export default SpacerRow;
