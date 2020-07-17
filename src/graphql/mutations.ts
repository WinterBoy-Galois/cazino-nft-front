import gql from 'graphql-tag';

export const CHANGE_SERVER_SEED = gql`
  mutation ChangeServerSeed {
    changeServerSeed {
      ... on GenericErrorArray {
        errors {
          type
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
