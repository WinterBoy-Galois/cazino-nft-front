import gql from 'graphql-tag';

const balanceFragment = gql`
  fragment balanceFragment on CashierNotification {
    user {
      id
      balance
    }
    amount
    event
  }
`;

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

export const DEPOSIT = gql`
  ${balanceFragment}
  subscription deposit {
    deposit {
      ...balanceFragment
    }
  }
`;

export const WITHDRAW = gql`
  ${balanceFragment}
  subscription withdraw {
    withdraw {
      ...balanceFragment
    }
  }
`;

export const BONUS_NOTIFICATION = gql`
  subscription bonusReceived {
    bonusReceived {
      userid
      amount
    }
  }
`;
