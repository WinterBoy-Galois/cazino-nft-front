import React from 'react';
import styles from './AccountActivationModal.module.scss';
import { GraphQLError } from 'graphql';
import Modal from '../Modal';
import CodeInput from '../CodeInput';
import activationIllustration from '../../assets/images/auth/safe-locker.svg';

interface IProps {
  show: boolean;
  loading: boolean;
  error?: GraphQLError;
  onClose?: () => void;
}

const AccountActivationModal: React.SFC<IProps> = ({ show, onClose }) => {
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
            <CodeInput />
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
  return (
    <AccountActivationModal
      show={show}
      loading={false}
      // error={error}
      onClose={onClose}
    />
  );
};

export default AccountActivationModal;
export { AccountActivationModalWithData };
