import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styles from './CashierModal.module.scss';
import Modal from '../Modal';
import SlideSelect from '../SlideSelect';
import { useStateValue } from '../../state';
import { useNavigate, useLocation } from '@reach/router';
import { useMutation, useQuery } from '@apollo/client';
import { SETUP_CASHIER } from '../../graphql/queries';
import Cashier from '../../models/cashier.model';
import CopyField from '../CopyField';
import Link from '../Link';
import Loading from '../Loading';
import Error from '../Error';
import QRCode from 'qrcode.react';
import TextInput from '../TextInput';
import { useTranslation } from 'react-i18next';
import Bitcoin from '../icons/social/Bitcoin';
import { formatBitcoin } from '../../common/util/format.util';
import Button from '../../components/Button';
import WithdrawAmountControl from '../../components/WithdrawAmountControl';
import { WITHDRAW } from '../../graphql/mutations';
import { success, error as errorToast } from '../../components/Toast';
import clsx from 'clsx';

interface IProps {
  show: boolean;
  loading: boolean;
  error?: any;
  onClose?: () => void;
  cashier?: Cashier;
  balance?: number;
  depositAddress?: string;
  onTransactionsLinkClick?: () => void;
}

const CashierModal: React.FC<IProps> = ({
  show,
  onClose,
  cashier,
  balance,
  loading,
  error,
  depositAddress = '',
  onTransactionsLinkClick,
}) => {
  const { t } = useTranslation(['modals']);
  const [modalType, setModalType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [withdraw] = useMutation(WITHDRAW);

  return (
    <Modal show={show} onClose={onClose} title={t('cashier.title')}>
      {loading && <Loading />}
      {!loading && error && <Error />}
      {!loading && !error && !depositAddress && <Error>{t('cashier.depositNullError')}</Error>}

      {!loading && !error && cashier && depositAddress && (
        <Fragment>
          <SlideSelect
            className={styles['slide-select']}
            selectItems={[
              { label: 'deposit', onClick: () => setModalType('deposit') },
              { label: 'withdraw', onClick: () => setModalType('withdraw') },
            ]}
          />

          {modalType === 'deposit' ? (
            <div className="row">
              <div className="col-12 col-md-8">
                <CopyField
                  label={t('cashier.bitcoinWalletAddress')}
                  value={depositAddress}
                  className={styles.spacing}
                />

                <TextInput
                  label={t('cashier.requiredConfirmations')}
                  value={`${cashier.depositConfirmations}`}
                  disabled
                />

                <div className={styles.link__container}>
                  <Link className={styles.link} onClick={onTransactionsLinkClick}>
                    {t('cashier.transactionsLinkText')}
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className={styles.qrcode__container}>
                  <QRCode value={depositAddress} renderAs="svg" width={'100%'} height={'100%'} />
                </div>
              </div>
            </div>
          ) : modalType === 'withdraw' ? (
            <div className="row">
              <div className={clsx(styles.withdraw__row, 'col-12 col-md-10')}>
                <div className={clsx(styles.withdraw__container, 'row')}>
                  <div className="col-12">
                    <div className="row">
                      <div className={clsx(styles.withdraw__label, 'col-12 col-md-8')}>Balance</div>
                      <div className={clsx(styles.withdraw__value, 'col-12 col-md-4')}>
                        <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
                        <span>{formatBitcoin(balance)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row">
                      <div className={clsx(styles.withdraw__label, 'col-12 col-md-8')}>
                        Blockchain Fee
                      </div>
                      <div className={clsx(styles.withdraw__value, 'col-12 col-md-4')}>
                        <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
                        <span>{formatBitcoin(cashier.networkFee)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row">
                      <div className={clsx(styles.withdraw__label, 'col-12 col-md-8')}>
                        Minimum Withdraw Amount
                      </div>
                      <div className={clsx(styles.withdraw__value, 'col-12 col-md-4')}>
                        <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
                        <span>{formatBitcoin(cashier.minWithdraw)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={clsx(styles.withdraw__row, 'col-12 col-md-10')}>
                <CopyField
                  label={t('cashier.bitcoinWalletAddress')}
                  value={depositAddress}
                  className={styles.spacing}
                />
              </div>

              <div
                className={clsx(
                  styles.withdraw__row,
                  styles.withdraw__amount_control,
                  'col-12 col-md-10'
                )}
              >
                <WithdrawAmountControl
                  amount={0}
                  max={balance}
                  onChange={amount => setAmount(amount)}
                />
              </div>

              <div className={clsx(styles.withdraw__row, 'col-12 col-md-10')}>
                <Button
                  className={styles.withdraw__button}
                  onClick={async () => {
                    const { data, errors } = await withdraw({
                      variables: { amount: amount, address: depositAddress },
                    });

                    if (errors) errorToast('Withdraw is failed.');
                    else if (data?.withdraw?.result) success('Withdraw is completed.');
                    else errorToast('Withdraw is failed.');
                  }}
                >
                  Withdraw
                </Button>
              </div>
            </div>
          ) : null}
        </Fragment>
      )}
    </Modal>
  );
};

export default CashierModal;

export const CashierModalWithData: React.FC<IProps> = props => {
  const [{ auth }] = useStateValue();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, loading, error, refetch } = useQuery(SETUP_CASHIER);
  const handleTransactionsClick = useCallback(() => navigate('/transactions/deposits'), [navigate]);

  useEffect(() => {
    if (!data?.me.depositAddress && !loading && props.show) {
      refetch();
    }
  }, [data, refetch, props.show, loading]);

  if (props.show && auth.state !== 'SIGNED_IN') {
    navigate(pathname);
    return null;
  }

  return (
    <CashierModal
      {...props}
      loading={loading}
      error={error}
      cashier={data?.setupCashier}
      balance={auth.user?.balance}
      depositAddress={data?.me.depositAddress}
      onTransactionsLinkClick={handleTransactionsClick}
    />
  );
};
