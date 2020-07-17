import React from 'react';
import styles from './AccountActivationModal.module.scss';
import Modal from '../Modal';
import CodeInput from '../CodeInput';
import activationIllustration from '../../assets/images/auth/safe-locker.svg';
import { useMutation } from '@apollo/react-hooks';
import { ACTIVATE_ACCOUNT } from '../../graphql/mutations';
import { ApolloError } from 'apollo-client';

interface IProps {
  show: boolean;
  loading: boolean;
  error?: ApolloError;
  onClose?: () => void;
  onActivateUser?: () => void;
}

const AccountActivationModal: React.SFC<IProps> = ({ show, onClose, onActivateUser, loading }) => {
  return (
    <Modal show={show} onClose={onClose} title="ACTIVATE ACCOUNT">
      <div className="row">
        <div className="col-12 col-md-8">
          <h1 className={styles.headline}>Your account successfully created</h1>

          <p className={styles.text}>
            We’ve sent activation code to your e-mail.
            <br />
            Please enter 6 digit number below to activate your account.
          </p>

          <div className={styles['code-input']}>
            <CodeInput onComplete={onActivateUser} disabled={loading} />
          </div>
        </div>
        <div className={`col-12 col-md-4 ${styles.illustration}`}>
          <img src={activationIllustration} alt="Sign In Character" />
        </div>
      </div>
    </Modal>
  );
};

interface IWithDataProps {
  show: boolean;
  userId: string;
  onClose?: () => void;
}

const AccountActivationModalWithData: React.FC<IWithDataProps> = ({
  show,
  onClose,
}: IWithDataProps) => {
  const [activateAccount, { loading, error }] = useMutation(ACTIVATE_ACCOUNT);

  return (
    <AccountActivationModal
      show={show}
      loading={loading}
      error={error}
      onClose={onClose}
      onActivateUser={activateAccount}
    />
  );
};

export default AccountActivationModal;
export { AccountActivationModalWithData };
