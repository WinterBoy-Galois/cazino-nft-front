import React from 'react';
import { text } from '@storybook/addon-knobs';

import SwitchInput from '.';

export default {
  title: 'Components/SwitchInput',
  component: SwitchInput,
};

const data = {
  label: 'Hide username',
};

export const Default = () => <SwitchInput id={'id'} label={text('Label', data.label)} />;
