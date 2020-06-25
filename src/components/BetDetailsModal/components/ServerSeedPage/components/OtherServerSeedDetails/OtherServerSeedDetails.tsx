import React from 'react';
import styles from './OtherServerSeedDetails.module.scss';
import { ServerSeedDetailsOther } from '../../../../../../models/serverSeedDetails.model';
import CopyField from '../../../../../CopyField';
import { useTranslation } from 'react-i18next';

interface IProps {
  otherDetails: ServerSeedDetailsOther;
}

const OtherServerSeedDetails: React.FC<IProps> = ({ otherDetails }) => {
  const { t } = useTranslation(['modals']);

  return (
    <div className={styles.container}>
      <CopyField label={t('serverSeed.serverSeedHash')} value={otherDetails.serverSeedHash} />
    </div>
  );
};

export default OtherServerSeedDetails;
