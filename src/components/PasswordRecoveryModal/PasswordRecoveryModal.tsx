import React, { useState } from 'react';
import styles from './PasswordRecoveryModal.module.scss';
import Modal, { transitionTimeout } from '../Modal';
import { useMutation } from '@apollo/react-hooks';
import { RECOVER_PASSWORD } from '../../graphql/mutations';
import { info } from '../Toast';
import ApplicationError from '../../models/applicationError.model';
import { useTranslation } from 'react-i18next';
import { getFromGraphQLErrors, getFromGenericErrors } from '../../common/util/error.util';
import ErrorSummary from '../ErrorSummary';
import { useFormik } from 'formik';
import SpinnerButton from '../SpinnerButton';
import TextInput from '../TextInput';
import { validationSchema } from './lib/validationSchema';
import passwordRecoveryIllustration from '../../assets/images/auth/password-recovery.svg';
import Uppercase from '../Uppercase';
import Link from '../Link';

interface IProps {
  show: boolean;
  loading: boolean;
  errors?: ApplicationError[];
  onClose?: () => void;
  onPasswordRecovery?: (email: string) => void;
  onNavigateToSignIn?: () => void;
  onNavigateToSignUp?: () => void;
}

const PasswordRecoveryModal: React.SFC<IProps> = ({
  show,
  loading,
  errors,
  onClose,
  onPasswordRecovery = () => null,
  onNavigateToSignIn,
  onNavigateToSignUp,
}) => {
  const { t } = useTranslation(['auth']);

  const formik = useFormik({
    initialValues: { email: '' },
    validateOnMount: true,
    validationSchema: validationSchema(t),
    onSubmit: async values => {
      onPasswordRecovery(values.email);
    },
  });

  const handleClose = () => {
    setTimeout(() => {
      formik.resetForm({});
      formik.validateForm();
    }, transitionTimeout);

    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal show={show} onClose={handleClose} title={t('passwordReset.headline')}>
      <div className="row">
        <div className={`col-12 col-md-7 ${styles.container}`}>
          <div>
            {errors && (
              <ErrorSummary
                errors={errors}
                showGeneralErrorsOnly={false}
                className={styles.error}
              />
            )}

            <form onSubmit={formik.handleSubmit}>
              <TextInput
                label={t('labels.email')}
                name="email"
                onChangeValue={v => formik.setFieldValue('email', v)}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                {...(formik.touched.email ? { validationMessage: formik.errors.email } : {})}
              />

              <SpinnerButton
                type="submit"
                color="SECONDARY"
                loading={loading}
                className={styles.button}
              >
                Recover password
              </SpinnerButton>
            </form>
          </div>

          <div>
            <Uppercase className={styles.spacing}>
              MEMORY BACK? <Link onClick={onNavigateToSignIn}>TRY TO SIGN IN!</Link>
            </Uppercase>
            <Uppercase>
              DON’T HAVE AN ACCOUNT? <Link onClick={onNavigateToSignUp}>SIGN UP NOW!</Link>
            </Uppercase>
          </div>
        </div>
        <div className={`col-12 col-md-5 ${styles.illustration}`}>
          <img src={passwordRecoveryIllustration} alt="Sign In Character" />
        </div>
      </div>
    </Modal>
  );
};

interface IWithDataProps {
  show: boolean;
  onClose?: () => void;
}

const PasswordRecoveryModalWithData: React.FC<IWithDataProps> = ({
  show,
  onClose,
}: IWithDataProps) => {
  const { t } = useTranslation(['auth', 'common']);
  const [recoverPassword, { loading }] = useMutation(RECOVER_PASSWORD);
  const [errors, setErrors] = useState<ApplicationError[]>();

  const onPasswordRecovery = async (email: string) => {
    const { data, errors: recoverPasswordErrors } = await recoverPassword({
      variables: { email },
    });

    if (recoverPasswordErrors) {
      return setErrors(getFromGraphQLErrors(recoverPasswordErrors, t));
    } else if (data?.resendActivationCode?.errors) {
      return setErrors(getFromGenericErrors(data.forgotPassword.errors, t));
    }

    info(t('onPasswordRecovery.success'));
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }

    setErrors([]);
  };

  return (
    <PasswordRecoveryModal
      show={show}
      loading={loading}
      errors={errors}
      onClose={handleClose}
      onPasswordRecovery={onPasswordRecovery}
    />
  );
};

export default PasswordRecoveryModal;
export { PasswordRecoveryModalWithData };
