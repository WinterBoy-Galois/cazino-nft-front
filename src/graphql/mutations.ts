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
