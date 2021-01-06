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
        multiplier
      }
      myBets {
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
          source
          code
          message
          args
        }
      }
    }
  }
`;

export const USER_INFO_AVATAR_URL = gql`
  query UserInfoAvatarUrl($userId: ID) {
    userInfo(id: $userId) {
      __typename
      ... on PublicUser {
        id
        avatarUrl
      }
      ... on GenericErrorArray {
        errors {
          source
          code
          message
          args
        }
      }
    }
  }
`;

export const BET_DETAILS = gql`
  query BetDetails($betId: ID) {
    betDetails(id: $betId) {
      ... on BetDetails {
        bet
        profit
        profitCut
        multiplier
        gameResult {
          ... on DiceResult {
            target
            over
            winChance
            resultFloat
          }
          ... on MinesResult {
            mineCount
            minePositions
            open
          }
          ... on GoalsResult {
            difficulty
            selections {
              step
              luckySpots
              selected
            }
          }
          ... on ClamsResult {
            selection
            resultInteger
          }
        }
      }
    }
  }
`;

export const BET_DETAILS_SERVER_SEED = gql`
  query BetDetailsServerSeed($betId: ID) {
    betDetails(id: $betId) {
      ... on BetDetails {
        seedDetails {
          __typename
          ... on SeedDetailsOther {
            serverSeedHash
          }
          ... on SeedDetailsOwn {
            activeGames
            serverSeedHash
            serverSeed
            clientSeed
            nonce
            results
            verificationUrl
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
      avatarUrl
      balance
      email
      isActivated
      depositAddress
    }
  }
`;

export const ME_STATISTICS_PREFERENCES = gql`
  query Me {
    me {
      id
      totalWager
      totalProfit
      mostPlayed
      totalBets
      luckyBets
      hideUsername
      hideTotalProfit
      hideTotalWager
    }
  }
`;

export const SETUP_CASHIER = gql`
  query SetupCashier {
    setupCashier {
      networkFee
      depositConfirmations
      minWithdraw
    }
    me {
      id
      depositAddress
    }
  }
`;

export const DEPOSITS = gql`
  query Deposits($page: Int, $limit: Int) {
    transactionsDeposit(page: $page, limit: $limit) {
      page
      limit
      total
      items {
        status
        time
        hash
        amount
      }
    }
  }
`;

export const SETUP_DICE = gql`
  query SetupDice {
    setupDice {
      ... on DiceGameSetup {
        minProbability
        maxProbability
        he
      }
    }
  }
`;

export const SETUP_CLAMS = gql`
  query setupClams {
    setupClams {
      ... on ClamsGameSetup {
        he
      }
    }
  }
`;

export const TRANSACTION_BETS = gql`
  query Bets($page: Int, $limit: Int) {
    transactionsBet(page: $page, limit: $limit) {
      page
      limit
      total
      items {
        id
        time
        game
        amount
        multiplier
        profit
      }
    }
  }
`;
