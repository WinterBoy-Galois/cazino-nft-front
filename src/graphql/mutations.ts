import gql from 'graphql-tag';

export const CHANGE_SERVER_SEED = gql`
  mutation ChangeServerSeed {
    changeServerSeed {
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
