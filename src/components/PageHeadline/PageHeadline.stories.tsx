import React from 'react';
import { text } from '@storybook/addon-knobs';

import PageHeadline from '.';

export default {
  title: 'Components/PageHeadline',
  component: PageHeadline,
};

const data = {
  headline: 'Headline',
};

export const Default = () => <PageHeadline>{text('Text', data.headline)}</PageHeadline>;
