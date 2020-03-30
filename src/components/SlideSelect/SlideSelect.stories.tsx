import React from 'react';
import { storiesOf } from '@storybook/react';
import SlideSelect from '.';
import { action } from '@storybook/addon-actions';

storiesOf('Components/SlideSelect', module)
  .add('Time Aggregation', () => (
    <div style={{ padding: '1rem' }}>
      <SlideSelect
        selectItems={[
          { label: 'Daily', onClick: action('daily selected') },
          { label: 'Weekly', onClick: action('weekly selected') },
          { label: 'Monthly', onClick: action('monthly selected') },
        ]}
      />
    </div>
  ))
  .add('Cashier', () => (
    <div style={{ padding: '1rem' }}>
      <SlideSelect
        selectItems={[
          { label: 'Deposit', onClick: action('deposit selected') },
          { label: 'Withdraw', onClick: action('withdraw selected') },
        ]}
      />
    </div>
  ));
