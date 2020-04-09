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

export const LEADERBOARDS = gql`
  {
    leaderboards {
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

export const USER_INFO = gql`
  query UserInfo($userId: ID) {
    userInfo(id: $userId) {
      __typename
      ... on PublicUser {
        id
        username
        avatarUrl
        totalWager
        totalProfit
        mostPlayed
        totalBets
        luckyBets
      }
      ... on GenericErrorArray {
        errors {
          type
          field
          messageKey
        }
      }
    }
  }
`;
