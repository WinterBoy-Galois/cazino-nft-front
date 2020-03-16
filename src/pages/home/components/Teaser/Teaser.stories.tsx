import React from 'react';
import { storiesOf } from '@storybook/react';
import Teaser from '.';

storiesOf('Pages/Home/Teaser', module).add('default', () => (
  <div className="container">
    <Teaser />
  </div>
));
