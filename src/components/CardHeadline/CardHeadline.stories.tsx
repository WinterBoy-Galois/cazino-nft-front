import React from 'react';
import { text } from '@storybook/addon-knobs';

import CardHeadline from '.';

export default {
  title: 'Components/CardHeadline',
  component: CardHeadline,
};

const data = {
  headline: 'Headline',
};

export const Default = () => <CardHeadline>{text('Text', data.headline)}</CardHeadline>;
