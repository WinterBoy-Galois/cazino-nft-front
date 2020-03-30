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
