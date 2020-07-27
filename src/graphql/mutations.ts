import gql from 'graphql-tag';

export const CHANGE_SERVER_SEED = gql`
  mutation ChangeServerSeed {
    changeServerSeed {
      ... on GenericErrorArray {
        errors {
          type
          field
          severity
          messageKey
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
  mutation SignUp($email: String, $password: String, $username: String, $token: String) {
    registerUser(username: $username, email: $email, password: $password, captcha: $token) {
      ... on LoginResult {
        accessToken
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
