import React from 'react';
import { text } from '@storybook/addon-knobs';

import NavLink from '.';

export default {
  title: 'Components/NavLink',
  component: NavLink,
};

export const Default = () => <NavLink to={'/test'}>{text('Text', 'Test')}</NavLink>;
