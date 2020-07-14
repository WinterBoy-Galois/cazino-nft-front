import React from 'react';
import { text } from '@storybook/addon-knobs';

import ToastContainer from '.';

export default {
  title: 'Components/ToastContainer',
  component: ToastContainer,
};

const data = {
  message: 'Hello World!',
};

export const Default = () => <ToastContainer message={text('Message', data.message)} />;
