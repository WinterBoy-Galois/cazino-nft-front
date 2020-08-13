import React, { useState, ReactNode } from 'react';
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import LatestBetsTable from '.';
import Bet from '../../models/bet.model';
import { useBetGenerator, generateRandomBets } from '../../hooks/useBetGenerator.hook';
import { DispatchSpeed, useBetBuffer } from '../../hooks/useBetBuffer.hook';
import { LocationProvider } from '@reach/router';

const users: any = [
  {
    id: 197,
    name: 'ashleypowell',
  },
  {
    id: 121,
    name: 'martinezmark',
  },
  {
    id: 139,
    name: 'heather73',
  },
  {
    id: 183,
    name: 'timothy78',
  },
  {
    id: 169,
    name: 'vgonzalez',
  },
  {
    id: 195,
    name: 'morsekevin',
  },
  {
    id: 179,
    name: 'mullinswalter',
  },
  {
    id: 133,
    name: 'aconley',
  },
  {
    id: 184,
    name: 'sdixon',
  },
  {
    id: 191,
    name: 'johnstanley',
  },
];

const initialBets: Bet[] = generateRandomBets(10, users);
const randomUserFromInitialBets: string = initialBets[
  Math.floor(Math.random() * initialBets.length)
].userid.toString();

interface IProps {
  isActive?: boolean;
  speed?: number;
  betsPerBatch?: number;
  children?: ReactNode;
  currentUserId?: number;
  dispatchSpeed?: DispatchSpeed;
  bufferSize?: number;
  onBetAdded?: (bet: Bet) => void;
  onBetAddedForCurrentUser?: (bet: Bet) => void;
}

const RandomBetsConfiguration: React.FC<IProps> = ({
  isActive = false,
  speed = 1,
  betsPerBatch = 1,
  children,
  currentUserId,
  dispatchSpeed = DispatchSpeed.NORMAL,
  bufferSize = 100,
  onBetAdded,
}: IProps) => {
  const [betsAddedForCurrentUserCounter, setBetsAddedForCurrentUserCounter] = useState(0);

  const { bets, addBets } = useBetBuffer({
    bufferSize,
    dispatchSpeed,
    onBetDispatched: onBetAdded,
    currentUserId,
    onBetAddedForCurrentUser: () => {
      setBetsAddedForCurrentUserCounter(counter => counter + 1);
    },
  });

  const handleOnBetsGenerated = (generatedBets: Bet[]) => {
    addBets(generatedBets);
  };

  useBetGenerator({ isActive, speed, betsPerBatch, users, onBetsGenerated: handleOnBetsGenerated });

  return (
    <>
      {children}
      <div style={{ marginTop: '12px' }}>
        <div>
          Buffered: {bets.length} / {bufferSize}
        </div>
        <div>Bets for current user: {betsAddedForCurrentUserCounter}</div>
      </div>
    </>
  );
};

// More information at Storybook CSF at https://storybook.js.org/docs/formats/component-story-format/

// Configure Component
export default {
  title: 'Components/LatestBetsTable',
  component: LatestBetsTable,
  decorators: [
    withKnobs,
    (storyFn: () => React.ReactNode) => (
      <LocationProvider>
        <div className="container" style={{ height: '500px' }}>
          {storyFn()}
        </div>
      </LocationProvider>
    ),
  ],
};

export const Default = () => (
  <LatestBetsTable
    bets={initialBets}
    signInUserId={randomUserFromInitialBets}
    isLoading={false}
    error={false}
  />
);

export const Empty = () => <LatestBetsTable bets={[]} isLoading={false} error={false} />;

export const Error = () => <LatestBetsTable bets={[]} isLoading={false} error={true} />;

export const Loading = () => <LatestBetsTable bets={[]} isLoading={true} error={false} />;

export const Custom = () => {
  const [bets, setBets] = useState<Bet[]>(initialBets);

  const handleBetAdded = (betAdded: Bet) => {
    const newBets = [betAdded, ...bets.slice(0, 9)];
    setBets(newBets);
  };

  const userDict = users.reduce(
    (acc: any, cur: any) => ({
      ...acc,
      [cur.name]: cur.id,
    }),
    {}
  );

  return (
    <RandomBetsConfiguration
      isActive={boolean('Generate Data', true)}
      speed={number('Generation Speed (ms)', 1000, {
        range: true,
        min: 250,
        max: 5000,
        step: 250,
      })}
      betsPerBatch={number('No of bets', 1, { range: true, min: 1, max: 20, step: 1 })}
      dispatchSpeed={select(
        'Dispatch speed',
        {
          Auto: DispatchSpeed.AUTO,
          Normal: DispatchSpeed.NORMAL,
          Fast: DispatchSpeed.FAST,
          'Very fast': DispatchSpeed.VERY_FAST,
        },
        DispatchSpeed.AUTO
      )}
      currentUserId={select('Current User', userDict, 197)}
      bufferSize={number('Buffer Size', 100, { range: true, min: 1, max: 240, step: 1 })}
      onBetAdded={handleBetAdded}
      onBetAddedForCurrentUser={action('onBetAddedForCurrentUser')}
    >
      <LatestBetsTable
        bets={bets}
        animationSpeed={select(
          'Animation speed',
          {
            Auto: DispatchSpeed.AUTO,
            Normal: DispatchSpeed.NORMAL,
            Fast: DispatchSpeed.FAST,
            'Very fast': DispatchSpeed.VERY_FAST,
          },
          DispatchSpeed.NORMAL
        )}
        isLoading={false}
        error={false}
        signInUserId={'197'}
        reduceMotion={boolean('Reduce Motion', false)}
      />
    </RandomBetsConfiguration>
  );
};

// Customize specific Story
Custom.story = {
  name: 'Demo',
};
