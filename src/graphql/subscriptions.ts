import gql from 'graphql-tag';

export const LEADERBOARDS_SUBSCRIPTION = gql`
  subscription leaderboardChanged {
    leaderboardChanged {
      daily {
        username
        userid
        wager
        bonus
      }
      weekly {
        username
        userid
        wager
        bonus
      }
      monthly {
        username
        userid
        wager
        bonus
      }
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
      multiplier
    }
  }
`;

export const BALANCE = gql`
  subscription balance {
    balance {
      user {
        id
        balance
      }
      amount
      event
    }
  }
`;

export const BONUS_NOTIFICATION = gql`
  subscription bonusReceived {
    bonusReceived {
      bonusid
      userid
      position
      amount
      balance
      type
    }
  }
`;
