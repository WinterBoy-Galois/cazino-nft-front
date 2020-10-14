import React from 'react';
import { text } from '@storybook/addon-knobs';

import ExternalLink from '.';

export default {
  title: 'Components/ExternalLink',
  component: ExternalLink,
};

const data = {
  href: 'https://test.de',
};

export const Default = () => <ExternalLink href={text('Href', data.href)} />;
