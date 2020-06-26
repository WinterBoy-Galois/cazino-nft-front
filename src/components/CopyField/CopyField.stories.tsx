import React from 'react';
import { storiesOf } from '@storybook/react';
import CopyField from '.';
import { withKnobs, text } from '@storybook/addon-knobs';

storiesOf('Components/CopyField', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => (
    <div style={{ padding: '2rem', backgroundColor: '#2d4560', minHeight: '100vh' }}>
      {storyFn()}
    </div>
  ))
  .add('default', () => (
    <CopyField
      label={text('Label', 'SERVER SEED HASH')}
      value={text('Value', 'aa580a0ed83b7e4d102b8eaa3a17543d472efb7001ab38044d81e5b4ae3b764b')}
    />
  ));
