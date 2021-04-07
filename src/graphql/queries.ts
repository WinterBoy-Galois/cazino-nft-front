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
      refCommissions
      refCode
      seeds {
        current {
          serverSeedHash
          clientSeed
          nonce
        }
        previous {
          serverSeed
          serverSeedHash
        }
      }
      activeGames
    }
  }
`;

export const AFF_STATS = gql`
  query affStats {
    affStats {
      bets
      refs
      wager
      commissions
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

export const SETUP_GOAL = gql`
  query setupGoals {
    setupGoals {
      ... on GoalsGameSetup {
        session {
          betId
          betAmount
          currentStep
          selections {
            step
            luckySpots
            selected
          }
          difficulty
          profits {
            step
            multiplier
            profit
          }
          totalProfit {
            multiplier
            profit
          }
          nextProfit {
            multiplier
            profit
          }
          allowNext
          profitCut
        }
        balance
        maxProfit
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

export const TRANSACTION_AFFILIATES = gql`
  query AffiliateClaims($page: Int, $limit: Int) {
    transactionsAffiliate(page: $page, limit: $limit) {
      page
      limit
      total
      items {
        id
        claimedAt
        amount
      }
    }
  }
`;

export const TRANSACTION_WITHDRAWALS = gql`
  query transactionsWithdraw($page: Int, $limit: Int) {
    transactionsWithdraw(page: $page, limit: $limit) {
      page
      limit
      total
      items {
        id
        status
        time
        hash
        address
        amount
        fee
      }
    }
  }
`;

export const TRANSACTION_BONUSES = gql`
  query transactionsBonus($page: Int, $limit: Int) {
    transactionsBonus(page: $page, limit: $limit) {
      page
      limit
      total
      items {
        id
        givenAt
        claimedAt
        expiresAt
        amount
        position
        type
        wager
      }
    }
  }
`;

export const FAUCET_INFO = gql`
  query faucetInfo {
    faucetInfo {
      ... on FaucetInfo {
        amount
        every
        canClaim
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

export const SETUP_MINES = gql`
  query setupMines {
    setupMines {
      ... on MinesGameSetup {
        session {
          betId
          betAmount
          mines
          open
          totalProfit {
            multiplier
            profit
          }
          nextProfit {
            multiplier
            profit
          }
          allowNext
          profitCut
        }
        balance
        maxProfit
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

export const BONUSCLAIMS = gql`
  query bonusClaims {
    bonusClaims {
      ... on BonusClaim {
        id
        givenAt
        claimedAt
        expiresAt
        amount
        position
        type
        wager
      }
    }
  }
`;

export const BONUSCOUNTDOWN = gql`
  {
    bonusCountdown {
      daily
      weekly
      monthly
    }
  }
`;
