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

interface IProps {
  show: boolean;
  item: DepositItem;
  onClose?: () => void;
}

const DepositsDetailsModal: React.FC<IProps> = ({ show, item, onClose }) => {
  if (!item) {
    return null;
  }

  return (
    <Modal
      show={show}
      title={<Title text={'Deposit Details'} />}
      modalClassName={styles.container}
      onClose={onClose}
    >
      <div className={styles['container__inner']}>
        <DetailsContainer className={styles.details}>
          <DetailList
            details={[
              { label: 'Date / Time', value: datetimeFromEpoch(item.time) },
              {
                label: 'Amount',
                value: <BitcoinValue value={formatBitcoin(item.amount)} className={styles.value} />,
              },
              {
                label: 'Status',
                value: <TransactionStatus status={item.status} showText />,
              },
            ]}
          />
        </DetailsContainer>

        <CopyField label={'Transaction hash'} value={item.hash} />
      </div>
    </Modal>
  );
};

export default DepositsDetailsModal;
