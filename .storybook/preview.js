import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addParameters } from '@storybook/react';
import '!style-loader!css-loader!sass-loader!./scss-loader.scss';
import '../src/i18n';

addParameters({
  layout: 'fullscreen',
  options: {
    panelPosition: 'right',
  },
  viewport: { viewports: INITIAL_VIEWPORTS, defaultViewport: 'iphone6' },
  backgrounds: {
    default: 'Primary',
    values: [
      { name: 'Primary', value: '#091b33' },
      { name: 'Secondary', value: '#2d4560' },
    ],
  },
});
