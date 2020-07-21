import { GraphQLError } from 'graphql';
import { TFunction } from 'i18next';

import { GenericError } from '../../models/genericError.model';
import ApplicationError from '../../models/applicationError.model';

const getFromGraphQLErrors = (errors?: GraphQLError[]) => {
  if (errors === undefined || errors.length <= 0) {
    return [];
  }

  const result: ApplicationError[] = [];

  errors.forEach((error: any) => {
    if (
      error.source !== undefined &&
      error.code !== undefined &&
      error.message !== undefined &&
      error.args !== undefined
    ) {
      const newError: ApplicationError = {
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

const getFromGenericErrors = (errors?: GenericError[]) => {
  if (errors === undefined || errors.length <= 0) {
    return [];
  }

  const result: ApplicationError[] = [];

  errors.forEach((error: any) => {
    if (
      error.source !== undefined &&
      error.code !== undefined &&
      error.message !== undefined &&
      error.args !== undefined
    ) {
      const newError: ApplicationError = {
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

const getMessageFromCode = (t: TFunction, code: string) => {
  switch (code) {
    case 'AUTH_ERROR':
      return t('errors.AUTH_ERROR');
    default:
      return t('errors.SERVER_ERROR');
  }
};

export { getFromGraphQLErrors, getFromGenericErrors, getMessageFromCode };
