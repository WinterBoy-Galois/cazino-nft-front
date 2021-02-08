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
import { error as errorToast, info } from '../../components/Toast';
import clsx from 'clsx';
import validate from 'bitcoin-address-validation';

interface IProps {
  show: boolean;
  loading: boolean;
  error?: any;
  onClose?: () => void;
  cashier?: Cashier;
  balance?: number;
  depositAddress?: string;
  onTransactionsLinkClick?: () => void;
  onWithdraw?: (amount: number, depositAddress: string) => void;
}

const CashierModal: React.FC<IProps> = ({
  show: defaultShow,
  onClose = () => null,
  cashier,
  balance,
  loading,
  error,
  depositAddress: defaultDepositAddress = '',
  onTransactionsLinkClick,
  onWithdraw = () => null,
}) => {
  const { t } = useTranslation(['modals']);
  const [modalType, setModalType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [isValidated, setValidated] = useState(false);
  const [depositAddress, setDepositAddress] = useState(defaultDepositAddress);
  const [isSmallAmount, setSmallAmount] = useState(false);
  const [show, setShow] = useState(defaultShow);

  useEffect(() => setShow(defaultShow), [defaultShow]);

  useEffect(() => {
    if (validate(depositAddress)) setValidated(true);
    else setValidated(false);
  }, [depositAddress]);

  useEffect(() => setDepositAddress(defaultDepositAddress), [defaultDepositAddress]);

  useEffect(() => {
    if (cashier?.minWithdraw && amount) setSmallAmount(cashier.minWithdraw > amount);
  }, [amount]);

  const handleWithdraw = () => {
    onWithdraw(amount, depositAddress);
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    setModalType('deposit');
    onClose();
  };

  return (
    <Modal show={show} onClose={handleClose} title={t('cashier.title')}>
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
                      <div className={clsx(styles.withdraw__label, 'col-6 col-md-7')}>Balance</div>
                      <div className={clsx(styles.withdraw__value, 'col-6 col-md-5')}>
                        <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
                        <span>{formatBitcoin(balance)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row">
                      <div className={clsx(styles.withdraw__label, 'col-6 col-md-7')}>
                        Blockchain Fee
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
                        Minimum Withdraw Amount
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
                  value={depositAddress}
                  validationMessage={isValidated ? '' : 'Address is not valid.'}
                  onChangeValue={depositAddress => setDepositAddress(depositAddress)}
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
                  isError={isSmallAmount}
                />

                {isSmallAmount ? (
                  <div className={styles.withdraw__amount_control__error}>Amount is too small.</div>
                ) : null}
              </div>

              <div className={clsx(styles.withdraw__row, 'col-12 col-md-10 col-lg-8')}>
                <Button
                  className={styles.withdraw__button}
                  onClick={handleWithdraw}
                  disabled={isSmallAmount || !isValidated}
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
  const [withdraw] = useMutation(WITHDRAW);

  useEffect(() => {
    if (!data?.me.depositAddress && !loading && props.show) {
      refetch();
    }
  }, [data, refetch, props.show, loading]);

  if (props.show && auth.state !== 'SIGNED_IN') {
    navigate(pathname);
    return null;
  }

  const handleWithdraw = async (amount: number, depositAddress: string) => {
    const { data, errors } = await withdraw({
      variables: { amount: amount, address: depositAddress },
    });

    if (errors || data.withdraw?.errors)
      errorToast('Your withdrawal is failed, please try again later.');
    else if (data?.withdraw?.result) info('Withdraw transaction successfully submitted.');
    else errorToast('Your withdrawal is failed, please try again later.');
  };

  return (
    <CashierModal
      {...props}
      loading={loading}
      error={error}
      cashier={data?.setupCashier}
      balance={auth.user?.balance}
      depositAddress={data?.me.depositAddress}
      onTransactionsLinkClick={handleTransactionsClick}
      onWithdraw={handleWithdraw}
    />
  );
};
