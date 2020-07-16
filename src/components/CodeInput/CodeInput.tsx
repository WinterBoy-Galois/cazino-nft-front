import React from 'react';
import styles from './CodeInput.module.scss';
import ReactCodeInput from 'react-code-input';

interface IProps {
  name?: string;
  fields?: number;
}

const CodeInput: React.SFC<IProps> = ({ name = 'code-input', fields = 6 }) => {
  return (
    <ReactCodeInput
      name={name}
      inputMode={'numeric'}
      type={'number'}
      fields={fields}
      className={styles.container}
      filterKeyCodes={[188, 187, 190, 189, 109, 107, 110]}
    />
  );
};

export default CodeInput;
