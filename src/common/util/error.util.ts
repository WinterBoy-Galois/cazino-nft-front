import { GraphQLError } from 'graphql';
import { TFunction } from 'i18next';

import { GenericError } from '../../models/genericError.model';
import ApplicationError from '../../models/applicationError.model';

const getMessageFromCode = (t: TFunction, code: string) => {
  switch (code) {
    case 'AUTH_ERROR':
      return t('errors.AUTH_ERROR');
    case 'ALREADY_EXIST':
      return t('errors.ALREADY_EXISTS');
    case 'INVALID_ACTIVATION_CODE':
      return t('errors.INVALID_ACTIVATION_CODE');
    default:
      return t('errors.SERVER_ERROR');
  }
};

const getFromGraphQLErrors = (errors?: GraphQLError[], t?: TFunction) => {
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
        localizedMessage: t ? getMessageFromCode(t, error.code) : '',
        args: error.args,
      };

      result.push(newError);
    }
  });

  return result;
};

const getFromGenericErrors = (errors?: GenericError[], t?: TFunction) => {
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
        localizedMessage: t ? getMessageFromCode(t, error.code) : '',
        args: error.args,
      };

      result.push(newError);
    }
  });

  return result;
};

export { getMessageFromCode, getFromGraphQLErrors, getFromGenericErrors };
