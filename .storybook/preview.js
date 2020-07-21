import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addParameters } from '@storybook/react';
import '!style-loader!css-loader!sass-loader!./scss-loader.scss';
import '../src/i18n';

addParameters({
  options: {
    panelPosition: 'right',
    showRoots: true,
  },
  viewport: { viewports: INITIAL_VIEWPORTS, defaultViewport: 'iphone6' },
  backgrounds: [
    { name: 'Primary', value: '#091b33', default: true },
    { name: 'Secondary', value: '#2d4560' },
  ],
});
