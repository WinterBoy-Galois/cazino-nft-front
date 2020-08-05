import React from 'react';
import { text, button, boolean } from '@storybook/addon-knobs';
import { ToastContainer, info, error } from '.';
import { success } from '.';

export default {
  title: 'Components/Toast',
  component: ToastContainer,
};

const data = {
  message: 'Hello World!',
};

export const Default = () => {
  text('Toast text', data.message);
  button('Show success toast', () => success(text('Toast text', data.message)));
  button('Show info toast', () => info(text('Toast text', data.message)));
  button('Show error toast', () => error(text('Toast text', data.message)));

  return (
    <div>
      <ToastContainer autoClose={boolean('Auto close', true)} />
    </div>
  );
};
