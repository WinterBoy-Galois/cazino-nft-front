import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',
  colorPrimary: '#5DA5ED',
  colorSecondary: '#80A2CC',

  // UI
  appBg: '#292929',
  appContentBg: '#525252',
  appBorderColor: '#7D9CC6',
  appBorderRadius: 8,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#FFFFFF',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#fff',
  barSelectedColor: '#FEC41C',
  barBg: '#275789',

  // Form colors
  inputBg: '#292929',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 8,

  brandTitle: 'cazzino storybook',
  brandUrl: 'https://example.com',
  brandImage: 'images/cazzzino-logo.png',
});
