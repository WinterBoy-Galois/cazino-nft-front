import React from 'react';
import clsx from 'clsx';
import styles from './ButtonGroup.module.scss';

interface IProps {
  items?: {
    label?: string;
    summary?: string;
    value?: string;
    onClick?: () => void;
    checked?: boolean;
  }[];
  name?: string;
  className?: string;
}

const ButtonGroup: React.FC<IProps> = ({ className, items, name }) => {
  return (
    <div className={clsx(className, styles.button_group__container)}>
      {items?.map((item, idx) => (
        <div
          key={`button-${idx}`}
          className={clsx(
            styles.button_group__button,
            item?.checked ? styles.button_group__button__checked : null
          )}
        >
          <input
            type="radio"
            value={item.value}
            name={name}
            id={`${name}-${item.value}`}
            checked={item?.checked}
            onChange={item.onClick}
            className={clsx(styles.button_group__button__input)}
          />
          <label
            htmlFor={`${name}-${item.value}`}
            className={clsx(styles.button_group__button__label)}
          >
            <span>{item.label}</span>
            <span>{item.summary}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default ButtonGroup;
