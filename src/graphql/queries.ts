import gql from 'graphql-tag';

export const LATEST_BETS = gql`
  {
    bets {
      id
      time
      userid
      username
      gameid
      bet
      profit
    }
  }
`;

export const BETS = gql`
  {
    bets {
      id
      time
      bet
      profit
    }
  }
`;

export const BET_ADDED = gql`
  subscription onBetAdded {
    betAdded {
      id
      time
      userid
      username
      gameid
      bet
      profit
    }
  }
`;
