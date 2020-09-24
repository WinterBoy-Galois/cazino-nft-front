import React, { Fragment, useCallback, useEffect } from 'react';
import styles from './CashierModal.module.scss';
import Modal from '../Modal';
import SlideSelect from '../SlideSelect';
import { useStateValue } from '../../state';
import { useNavigate, useLocation } from '@reach/router';
import { useQuery } from '@apollo/client';
import { SETUP_CASHIER } from '../../graphql/queries';
import Cashier from '../../models/cashier.model';
import CopyField from '../CopyField';
import Link from '../Link';
import Loading from '../Loading';
import Error from '../Error';
import QRCode from 'qrcode.react';
import TextInput from '../TextInput';
import { useTranslation } from 'react-i18next';

interface IProps {
  show: boolean;
  loading: boolean;
  error?: any;
  onClose?: () => void;
  cashier?: Cashier;
  depositAddress?: string;
  onTransactionsLinkClick?: () => void;
}

const CashierModal: React.FC<IProps> = ({
  show,
  onClose,
  cashier,
  loading,
  error,
  depositAddress = '',
  onTransactionsLinkClick,
}) => {
  const { t } = useTranslation(['modals']);
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
              { label: 'deposit', onClick: () => null },
              { label: 'withdraw', onClick: () => null },
            ]}
          />

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
      depositAddress={data?.me.depositAddress}
      onTransactionsLinkClick={handleTransactionsClick}
    />
  );
};
