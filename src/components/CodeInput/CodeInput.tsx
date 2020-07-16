import React from 'react';
import styles from './CodeInput.module.scss';
import ReactCodeInput from 'react-code-input';

interface IProps {
  name?: string;
  fields?: number;
  onComplete?: () => void;
  disabled?: boolean;
}

const CodeInput: React.SFC<IProps> = ({
  name = 'code-input',
  fields = 6,
  onComplete,
  disabled,
}) => {
  return (
    <ReactCodeInput
      name={name}
      inputMode={'numeric'}
      type={'number'}
      fields={fields}
      className={styles.container}
      filterKeyCodes={[188, 187, 190, 189, 109, 107, 110]}
      onChange={value => (onComplete && value.length === 6 ? onComplete() : null)}
      disabled={disabled}
    />
  );
};

export default CodeInput;
