import gql from 'graphql-tag';

export const RECENT_BETS = gql`
  {
    recentBets {
      allBets {
        id
        time
        userid
        username
        gameid
        bet
        profit
      }
      myBets {
        id
        time
        userid
        username
        gameid
        bet
        profit
      }
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
