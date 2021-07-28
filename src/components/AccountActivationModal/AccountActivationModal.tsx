import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './AccountActivationModal.module.scss';
import Modal from '../Modal';
import CodeInput from '../CodeInput';
import activationIllustration from '../../assets/images/auth/safe-locker.svg';
import { useMutation } from '@apollo/client';
import { ACTIVATE_ACCOUNT, RESEND_ACTIVATION_CODE } from '../../graphql/mutations';
import { useStateValue } from '../../state';
import { success, info } from '../Toast';
import Link from '../Link';
import Uppercase from '../Uppercase';
import ApplicationError from '../../models/applicationError.model';
import { useTranslation } from 'react-i18next';
import { getFromGraphQLErrors, getFromGenericErrors } from '../../common/util/error.util';
import ErrorSummary from '../ErrorSummary';
import { useLocation, useNavigate } from '@reach/router';
import { updateUserAction } from '../../user/user.actions';
import { useUserState } from '../../user/UserProvider';

interface IProps {
  show: boolean;
  loading: boolean;
  errors?: ApplicationError[];
  onClose?: () => void;
  onActivateUser?: (code: string) => void;
  onResendEmail?: () => void;
}

const AccountActivationModal: React.FC<IProps> = ({
  show,
  onClose,
  onActivateUser,
  loading,
  onResendEmail,
  errors,
}) => {
  const { t } = useTranslation(['auth']);
  const codeRef = useRef<any>();

  const clearInput = () => {
    if (codeRef.current?.textInput[0]) {
      codeRef?.current?.textInput[0].focus();
      for (let i = 0; i < 6; i++) {
        if (codeRef?.current?.textInput[i] && codeRef?.current?.state.input[i]) {
          codeRef.current.state.input[i] = '';
          codeRef.current.textInput[i].value = '';
        }
      }
    }
  };

  const handleResendEmail = useCallback(() => {
    if (onResendEmail) {
      onResendEmail();
    }
    clearInput();
  }, [onResendEmail]);

  useEffect(() => {
    if (errors?.length) {
      clearInput();
    }
  }, [errors]);

  return (
    <Modal show={show} onClose={onClose} title={t('accountActivation.headline')}>
      <div className="row">
        <div className="col-12 col-md-8">
          <h1 className={styles.headline}>{t('accountActivation.subHeadline')}</h1>

          <p className={styles.text}>
            {t('accountActivation.text1')}
            <br />
            {t('accountActivation.text2')}
          </p>

          <div className={styles['code-input']}>
            <CodeInput onComplete={onActivateUser} disabled={loading} ref={codeRef} />
            {errors && (
              <ErrorSummary
                errors={errors}
                showBorder={false}
                className={styles.error}
                showGeneralErrorsOnly={false}
              />
            )}
          </div>

          <Uppercase>
            <span>{t('accountActivation.resendEmailText')}</span>
            &nbsp;
            <Link onClick={handleResendEmail}>{t('accountActivation.resendEmail')}</Link>
          </Uppercase>
        </div>
        <div className={`col-12 col-md-4 ${styles.illustration}`}>
          <img src={activationIllustration} alt={t('accountActivation.signInCharacter')} />
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
  const { t } = useTranslation(['auth', 'common']);
  const [activateAccount, { loading }] = useMutation(ACTIVATE_ACCOUNT);
  const [resendActivationCode] = useMutation(RESEND_ACTIVATION_CODE);
  const [, dispatch] = useStateValue();
  const [, userDispatch] = useUserState();
  const [errors, setErrors] = useState<ApplicationError[]>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleActivateAccount = async (code: string) => {
    setErrors([]);
    const { data, errors: activateAccountErrors } = await activateAccount({ variables: { code } });

    if (activateAccountErrors) {
      return setErrors(getFromGraphQLErrors(activateAccountErrors, t));
    } else if (data?.activateAccount?.errors) {
      return setErrors(getFromGenericErrors(data.activateAccount.errors, t));
    }

    dispatch({ type: 'MODAL_HIDE' });
    userDispatch(updateUserAction({ isActivated: true }));

    success(t('accountActivation.success'));
    navigate(pathname);
  };

  const handleResendEmail = async () => {
    const { data, errors: resendActivationCodeErrors } = await resendActivationCode();

    if (resendActivationCodeErrors) {
      return setErrors(getFromGraphQLErrors(resendActivationCodeErrors, t));
    } else if (data?.resendActivationCode?.errors) {
      return setErrors(getFromGenericErrors(data.resendActivationCode.errors, t));
    }

    info(t('accountActivation.resendSuccess'));
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }

    setErrors([]);
  };

  return (
    <AccountActivationModal
      show={show}
      loading={loading}
      errors={errors}
      onClose={handleClose}
      onActivateUser={handleActivateAccount}
      onResendEmail={handleResendEmail}
    />
  );
};

export default AccountActivationModal;
export { AccountActivationModalWithData };
