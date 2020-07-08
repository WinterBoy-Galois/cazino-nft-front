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

export const SIGN_IN = gql`
  mutation SignIn($email: String, $password: String) {
    signIn(email: $email, password: $password) {
      ... on LoginResult {
        accessToken
      }
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

export const SIGN_UP = gql`
  mutation SignIn($email: String, $password: String, $username: String) {
    registerUser(username: $username, email: $email, password: $password) {
      ... on LoginResult {
        accessToken
      }
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

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;
