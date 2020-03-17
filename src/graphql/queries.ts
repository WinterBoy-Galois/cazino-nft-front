import gql from 'graphql-tag';

export const BETS = gql`
  {
    bets {
      id
      time
      bet
      payout
      profit
    }
  }
`;

export const BET_ADDED = gql`
  subscription onBetAdded {
    betAdded {
      id
      time
      bet
      payout
      profit
    }
  }
`;
