import React from 'react';
import { storiesOf } from '@storybook/react';
import PageableModal from '.';

storiesOf('Components/PageableModal', module).add('default', () => (
  <PageableModal
    show={true}
    pages={[<div key={0}>Page 1</div>, <div key={1}>Page 2</div>, <div key={2}>Page 3</div>]}
  />
));
