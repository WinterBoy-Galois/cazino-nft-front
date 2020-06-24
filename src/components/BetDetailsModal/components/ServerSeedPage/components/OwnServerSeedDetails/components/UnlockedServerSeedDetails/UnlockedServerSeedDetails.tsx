import React, { Fragment } from 'react';
import styles from './UnlockedServerSeedDetails.module.scss';
import { ServerSeedDetailsOwn } from '../../../../../../../../models/serverSeedDetails.model';
import CopyField from '../../../../../../../CopyField';
import Link from '../../../../../../../Link';

interface IProps {
  ownDetails: ServerSeedDetailsOwn;
}

const UnlockedServerSeedDetails: React.FC<IProps> = ({ ownDetails }) => {
  return (
    <Fragment>
      <CopyField
        className={styles.field}
        label={'Server seed hash'}
        value={ownDetails.serverSeedHash}
      />
      <CopyField className={styles.field} label={'Server seed'} value={ownDetails.serverSeed} />
      <CopyField className={styles.field} label={'client seed'} value={ownDetails.clientSeed} />
      <CopyField className={styles.field} label={'nonce'} value={ownDetails.nonce} />

      <h2 className={styles.headline}>result</h2>
      <ul>
        {ownDetails.results.map((r, i) => (
          <li key={`${r}_${i}`}>{r}</li>
        ))}
      </ul>

      <h2 className={styles.headline}>Third party verfication</h2>
      <p className={styles.text}>
        REPL.IT is third party interactive programming environment. In order for you to allow verify
        bet results, we have created scripts for each game, which takes as input set of seeds,
        nonce, generating result.
      </p>

      <Link className={styles.link} href={ownDetails.verificationUrl}>
        Verify on REPL.IT
      </Link>
    </Fragment>
  );
};

export default UnlockedServerSeedDetails;
