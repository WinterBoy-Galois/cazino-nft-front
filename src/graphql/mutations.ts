import gql from 'graphql-tag';

export const CHANGE_SERVER_SEED = gql`
  mutation ChangeServerSeed($clientSeed: String) {
    changeServerSeed(clientSeed: $clientSeed) {
      ... on Seeds {
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

export const ACTIVATE_ACCOUNT = gql`
  mutation ActivateAccount($code: String!) {
    activateAccount(code: $code) {
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

export const SIGN_IN = gql`
  mutation SignIn($email: String, $password: String, $remember: Boolean) {
    signIn(email: $email, password: $password, remember: $remember) {
      ... on LoginResult {
        accessToken
        user {
          id
          username
          avatarUrl
          balance
          email
          isActivated
          depositAddress
          refCode
        }
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

export const SIGN_UP = gql`
  mutation SignUp(
    $email: String
    $password: String
    $username: String
    $token: String
    $ref: String
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      captcha: $token
      ref: $ref
    ) {
      ... on LoginResult {
        accessToken
        user {
          id
          username
          avatarUrl
          balance
          depositAddress
          refCode
        }
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

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const RESEND_ACTIVATION_CODE = gql`
  mutation ResendActivationCode {
    resendActivationCode {
      ... on GenericBoolean {
        result
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

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(uuid: $token, newPassword: $newPassword) {
      ... on LoginResult {
        accessToken
        user {
          id
          username
          avatarUrl
          balance
          depositAddress
        }
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

export const RECOVER_PASSWORD = gql`
  mutation RecoverPassword($email: String!) {
    forgotPassword(email: $email) {
      ... on GenericBoolean {
        result
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

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    modifyPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
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

export const UPDATE_PREFERENCES = gql`
  mutation UpdatePreferences($hideUsername: Boolean!, $hideProfit: Boolean!, $hideWager: Boolean!) {
    modifyPreferences(
      hideUsername: $hideUsername
      hideTotalProfit: $hideProfit
      hideTotalWager: $hideWager
    ) {
      ... on User {
        id
        hideUsername
        hideTotalProfit
        hideTotalWager
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

export const UPDATE_AVATAR = gql`
  mutation updateAvatar($index: Int!) {
    modifyAvatar(index: $index) {
      ... on User {
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

export const MAKE_BET_DICE = gql`
  mutation makeBetDice($betAmount: Float!, $over: Boolean!, $target: Float!) {
    makeBetDice(betAmount: $betAmount, over: $over, target: $target) {
      ... on BetResultDice {
        id
        result
        lucky
        multiplier
        profit
        balance
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

export const MAKE_BET_CLAMS = gql`
  mutation makeBetClams($betAmount: Float!, $selection: [Int]) {
    makeBetClams(betAmount: $betAmount, selection: $selection) {
      ... on BetResultClams {
        id
        result
        lucky
        multiplier
        profit
        balance
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

export const MAKE_BET_GOALS = gql`
  mutation makeBetGoals($betAmount: Float!, $difficulty: GoalsDifficulty!) {
    makeBetGoals(betAmount: $betAmount, difficulty: $difficulty) {
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

export const ADVANCE_GOALS = gql`
  mutation advanceGoals($betId: ID!, $selection: Int!) {
    advanceGoals(betId: $betId, selection: $selection) {
      ... on GoalsStep {
        id
        totalProfit {
          multiplier
          profit
        }
        nextProfit {
          multiplier
          profit
        }
        nextStep
        profitCut
        allowNext
      }
      ... on GoalsComplete {
        id
        lucky
        profit {
          multiplier
          profit
        }
        balance
        profitCut
        result {
          step
          luckySpots
          selected
        }
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

export const CASH_OUT_GOALS = gql`
  mutation cashoutGoals($betId: ID!) {
    cashoutGoals(betId: $betId) {
      ... on GoalsComplete {
        id
        lucky
        balance
        profit {
          multiplier
          profit
        }
        profitCut
        result {
          step
          luckySpots
          selected
        }
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

export const WITHDRAW = gql`
  mutation withdraw($amount: Float!, $address: String!) {
    withdraw(amount: $amount, address: $address) {
      ... on GenericBoolean {
        result
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

export const CLAIM_FAUCET = gql`
  mutation claimFaucet {
    claimFaucet {
      ... on User {
        balance
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

export const MAKE_BET_MINES = gql`
  mutation makeBetMines($betAmount: Float!, $mines: Int!) {
    makeBetMines(betAmount: $betAmount, mines: $mines) {
      __typename
      ... on MinesGameSetup {
        session {
          ... on MinesGameSessionSetup {
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

export const ADVANCE_MINES = gql`
  mutation advanceMines($betId: ID!, $selection: Int!) {
    advanceMines(betId: $betId, selection: $selection) {
      ... on MinesStep {
        id
        totalProfit {
          multiplier
          profit
        }
        nextProfit {
          multiplier
          profit
        }
        profitCut
        allowNext
        result
      }
      ... on MinesComplete {
        id
        lucky
        balance
        profit {
          multiplier
          profit
        }
        minePositions
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

export const CASH_OUT_MINES = gql`
  mutation cashoutMines($betId: ID!) {
    cashoutMines(betId: $betId) {
      ... on MinesComplete {
        id
        lucky
        balance
        profit {
          multiplier
          profit
        }
        minePositions
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

export const CLAIM_BONUS = gql`
  mutation claimBonus($bonusId: ID!) {
    claimBonus(bonusId: $bonusId) {
      ... on User {
        balance
      }
      ... on GenericErrorArray {
        errors {
          code
          message
        }
      }
    }
  }
`;

export const CLAIM_COMMISSION = gql`
  mutation claimCommissions {
    claimCommissions {
      ... on User {
        id
        username
        email
        balance
        hideUsername
        hideTotalProfit
        hideTotalWager
        isActivated
        avatarUrl
        totalWager
        totalProfit
        mostPlayed
        totalBets
        luckyBets
        depositAddress
        refCode
        refCommissions
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
