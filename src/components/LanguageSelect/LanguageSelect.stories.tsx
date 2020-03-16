import React from 'react';
import { storiesOf } from '@storybook/react';
import LanguageSelect from '.';

storiesOf('Components/LanguageSelect', module).add('default', () => (
  <div style={{ height: '100vh', padding: '0 0 0 16px', display: 'flex', alignItems: 'center' }}>
    <LanguageSelect />
  </div>
));
