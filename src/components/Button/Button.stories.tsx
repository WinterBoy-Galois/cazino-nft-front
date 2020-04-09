import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '.';
import { action } from '@storybook/addon-actions';

storiesOf('Components/Button', module).add('default', () => (
  <Button onClick={action('button click')}>Click</Button>
));
