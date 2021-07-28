import React from 'react';
import styles from './Error.module.scss';
import { useTranslation } from 'react-i18next';

interface IProps {
  className?: string;
}

const Error: React.FC<IProps> = ({ children, className }) => {
  const { t } = useTranslation(['common']);

  return (
    <div className={`${className} ${styles.container}`}>{children ?? t('errors.UNEXPECTED')}</div>
  );
};

export default Error;
