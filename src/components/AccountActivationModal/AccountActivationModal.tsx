import React from 'react';
import styles from './AccountActivationModal.module.scss';
import Modal from '../Modal';
import CodeInput from '../CodeInput';
import activationIllustration from '../../assets/images/auth/safe-locker.svg';
import { useMutation } from '@apollo/react-hooks';
import { ACTIVATE_ACCOUNT } from '../../graphql/mutations';
import { ApolloError } from 'apollo-client';
import { useStateValue } from '../../state';
import { success } from '../Toast';
import Link from '../Link';
import Uppercase from '../Uppercase';

interface IProps {
  show: boolean;
  loading: boolean;
  error?: ApolloError;
  onClose?: () => void;
  onActivateUser?: (code: string) => void;
  onResendEmail?: () => void;
}

const AccountActivationModal: React.SFC<IProps> = ({
  show,
  onClose,
  onActivateUser,
  loading,
  onResendEmail,
}) => {
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

          <Uppercase>
            <span>{"Didn't receive an email from us?"}</span>
            &nbsp;
            <Link onClick={onResendEmail}>resend email</Link>
          </Uppercase>
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
  const [, dispatch] = useStateValue();

  const handleActivateAccount = async (code: string) => {
    await activateAccount({ variables: { code } });
    dispatch({ type: 'MODAL_HIDE' });
    dispatch({ type: 'AUTH_UPDATE_USER', payload: { isActivated: true } });
    success('Your account was successfully activated');
  };

  const handleResendEmail = () => null;

  return (
    <AccountActivationModal
      show={show}
      loading={loading}
      error={error}
      onClose={onClose}
      onActivateUser={handleActivateAccount}
      onResendEmail={handleResendEmail}
    />
  );
};

export default AccountActivationModal;
export { AccountActivationModalWithData };
