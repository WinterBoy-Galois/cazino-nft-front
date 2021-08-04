import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styles from './CashierModal.module.scss';
import Modal from '../Modal';
import SlideSelect from '../SlideSelect';
import { useNavigate, useLocation } from '@reach/router';
import { useLazyQuery, useMutation } from '@apollo/client';
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
import validate from 'bitcoin-address-validation';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';
import { useUserState } from '../../user/UserProvider';

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
  depositAddress: defaultDepositAddress = '',
  onTransactionsLinkClick,
}) => {
  const { t } = useTranslation(['modals']);
  const [modalType, setModalType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [withdraw] = useMutation(WITHDRAW);
  const [isValidated, setValidated] = useState(false);
  const [depositAddress, setDepositAddress] = useState(defaultDepositAddress);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [isChangedAddress, setChangedAddress] = useState(false);

  useEffect(() => {
    if (validate(withdrawAddress)) setValidated(true);
    else setValidated(false);
  }, [withdrawAddress]);

  useEffect(() => {
    if (show) {
      setModalType('deposit');
      setAmount(0);
      setWithdrawAddress('');
      setChangedAddress(false);
    }
  }, [show]);

  useEffect(() => setDepositAddress(defaultDepositAddress), [defaultDepositAddress]);

  return (
    <Modal show={show} onClose={onClose} title={t('cashier.title')}>
      {loading && <Loading />}
      {!loading && error && <Error />}
      {!loading && !error && !depositAddress && depositAddress !== '' && (
        <Error>{t('cashier.depositNullError')}</Error>
      )}

      {!loading && !error && cashier && (depositAddress || depositAddress === '') && (
        <Fragment>
          <SlideSelect
            className={clsx(
              styles['slide-select'],
              modalType === 'withdraw' ? styles['slide-select-withdraw'] : null
            )}
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
              <div className={clsx(styles.withdraw__row, 'col-12 col-md-10 col-lg-8')}>
                <div className={clsx(styles.withdraw__container, 'row')}>
                  <div className="col-12">
                    <div className="row">
                      <div className={clsx(styles.withdraw__label, 'col-6 col-md-7')}>
                        {t('cashier.balance')}
                      </div>
                      <div className={clsx(styles.withdraw__value, 'col-6 col-md-5')}>
                        <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
                        <span>{formatBitcoin(balance)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row">
                      <div className={clsx(styles.withdraw__label, 'col-6 col-md-7')}>
                        {t('cashier.blockchain_fee')}
                      </div>
                      <div className={clsx(styles.withdraw__value, 'col-6 col-md-5')}>
                        <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
                        <span>{formatBitcoin(cashier.networkFee)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row">
                      <div className={clsx(styles.withdraw__label, 'col-6 col-md-7')}>
                        {t('cashier.min_withdraw_amount')}
                      </div>
                      <div className={clsx(styles.withdraw__value, 'col-6 col-md-5')}>
                        <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
                        <span>{formatBitcoin(cashier.minWithdraw)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={clsx(styles.withdraw__row, 'col-12 col-md-10 col-lg-8')}>
                <TextInput
                  label={t('cashier.bitcoinWalletAddress')}
                  value={withdrawAddress}
                  validationMessage={
                    isValidated || !isChangedAddress ? '' : 'Address is not valid.'
                  }
                  onChangeValue={withdrawAddress => {
                    setWithdrawAddress(withdrawAddress);
                    setChangedAddress(true);
                  }}
                />
              </div>

              <div
                className={clsx(
                  styles.withdraw__row,
                  styles.withdraw__amount_control,
                  'col-12 col-md-10 col-lg-8'
                )}
              >
                <WithdrawAmountControl
                  amount={0}
                  max={balance ? balance - cashier.networkFee : 0}
                  onChange={amount => setAmount(amount)}
                />
              </div>

              <div className={clsx(styles.withdraw__row, 'col-12 col-md-10 col-lg-8')}>
                <Button
                  disabled={amount < cashier.minWithdraw || !isValidated}
                  className={styles.withdraw__button}
                  onClick={async () => {
                    const { data, errors } = await withdraw({
                      variables: { amount: amount, address: depositAddress },
                    });

                    if (errors) errorToast(t('cashier.withdraw_failed'));
                    else if (data?.withdraw?.result) success(t('cashier.withdraw_completed'));
                    else errorToast(t('cashier.withdraw_failed'));
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
  const isAuthorized = useIsAuthorized();
  const [{ user, accessToken }] = useUserState();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [setupCashier, { data, loading, error, refetch }] = useLazyQuery(SETUP_CASHIER);
  const handleTransactionsClick = useCallback(() => navigate('/transactions/deposits'), [navigate]);

  useEffect(() => {
    if (accessToken) {
      setupCashier();
    }
  }, [accessToken]);

  useEffect(() => {
    if (!data?.me.depositAddress && !loading && props.show) {
      refetch?.();
    }
  }, [data, refetch, props.show, loading]);

  if (props.show && !isAuthorized) {
    navigate(pathname);
    return null;
  }

  return (
    <CashierModal
      {...props}
      loading={loading}
      error={error}
      cashier={data?.setupCashier}
      balance={user?.balance}
      depositAddress={data?.me.depositAddress}
      onTransactionsLinkClick={handleTransactionsClick}
    />
  );
};
