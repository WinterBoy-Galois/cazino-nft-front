import React from 'react';
import { datetimeFromEpoch } from '../../common/util/date.util';
import { formatBitcoin } from '../../common/util/format.util';
import BitcoinValue from '../BitcoinValue';
import CopyField from '../CopyField';
import DetailList from '../DetailList';
import DetailsContainer from '../DetailsContainer';
import Modal from '../Modal';
import styles from './DepositsDetailsModal.module.scss';
import TransactionStatus from '../TransactionStatus';
import Title from './components/Title';
import { DepositItem } from '../../models/depositItem.model';
import { useTranslation } from 'react-i18next';

interface IProps {
  show: boolean;
  item: DepositItem;
  onClose?: () => void;
}

const DepositsDetailsModal: React.FC<IProps> = ({ show, item, onClose }) => {
  const { t } = useTranslation(['modals']);

  if (!item) {
    return null;
  }

  return (
    <Modal
      show={show}
      title={<Title text={t('depositsDetails.title')} />}
      modalClassName={styles.container}
      onClose={onClose}
    >
      <div className={styles['container__inner']}>
        <DetailsContainer className={styles.details}>
          <DetailList
            details={[
              { label: t('depositsDetails.date_time'), value: datetimeFromEpoch(item.time) },
              {
                label: t('depositsDetails.amount'),
                value: <BitcoinValue value={formatBitcoin(item.amount)} className={styles.value} />,
              },
              {
                label: t('depositsDetails.status'),
                value: <TransactionStatus status={item.status} showText />,
              },
            ]}
          />
        </DetailsContainer>

        <CopyField label={t('depositsDetails.transaction_hash')} value={item.hash} />
      </div>
    </Modal>
  );
};

export default DepositsDetailsModal;
