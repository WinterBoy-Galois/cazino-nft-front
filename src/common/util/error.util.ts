// import { GraphQLError, Source } from 'graphql';
// import { GenericError } from '../../models/genericError.model';

export interface CazzzinoError {
  source: string | null;
  code: string;
  message: string;
  args: [string] | null;
}

const getGeneralErrors = (errors: any[] | undefined) => {
  if (errors === undefined || errors.length <= 0) {
    return [];
  }

  const result: CazzzinoError[] = [];

  errors.forEach((error: any) => {
    if (
      error.source !== undefined &&
      error.code !== undefined &&
      error.message !== undefined &&
      error.args !== undefined
    ) {
      const newError: CazzzinoError = {
        source: error.source,
        code: error.code,
        message: error.message,
        args: error.args,
      };

      if (newError.source === null) {
        result.push(newError);
      }
    }
  });

  return result;
};

const getMessageFromCode = (code: string) => {
  switch (code) {
    case 'AUTH_ERROR':
      return 'Invalid password';
    default:
      return 'Unknown server error - administrators are notified';
  }
};

export { getGeneralErrors, getMessageFromCode };
