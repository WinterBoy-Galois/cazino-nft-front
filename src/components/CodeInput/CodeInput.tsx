import React from 'react';
import styles from './CodeInput.module.scss';
import ReactCodeInput from 'react-code-input';

interface IProps {
  name?: string;
  fields?: number;
  onComplete?: (code: string) => void;
  disabled?: boolean;
  value?: string;
  ref?: any;
}

const CodeInput: React.ForwardRefExoticComponent<IProps> = React.forwardRef(
  ({ name = 'code-input', fields = 6, onComplete, disabled }, ref) => {
    return (
      <ReactCodeInput
        ref={ref as React.RefObject<ReactCodeInput>}
        name={name}
        inputMode={'numeric'}
        type={'number'}
        fields={fields}
        className={styles.container}
        filterKeyCodes={[188, 187, 190, 189, 109, 107, 110]}
        onChange={value => (onComplete && value.length === 6 ? onComplete(value) : null)}
        disabled={disabled}
        pattern={'[0-9]*'}
      />
    );
  }
);

CodeInput.displayName = 'CodeInput';

export default CodeInput;
